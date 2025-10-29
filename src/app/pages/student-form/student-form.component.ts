import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker'; // for date input
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { StudentService } from '../../core/services/student.service';
import { NewStudent, StudyProgramme } from '../../core/models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DatePickerModule,
    MultiSelectModule,
    SelectModule,
    ButtonModule,
    CardModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-from.component.scss'],
})
export class StudentFormComponent implements OnInit {
  student: NewStudent = {
    name: '',
    email: '',
    dateOfBirth: new Date(),
    courses: [],
    studyProgramme: 'Computer Science',
  };

  programmes: StudyProgramme[] = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology',
    'Engineering',
  ];

  availableCourses = ['Math', 'Physics', 'Programming', 'Biology', 'Chemistry', 'AI Fundamentals'];

  constructor(private studentService: StudentService, private messageService: MessageService) {}

  isSaving = false;
  maxDate: Date = new Date();
  minDate: Date = new Date();

  ngOnInit() {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    this.student.dateOfBirth = new Date(this.maxDate);
  }

  saveStudent() {
    if (!this.student.name || !this.student.email) return;
    this.isSaving = true;

    this.studentService.add(this.student).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Student Added',
          detail: `${this.student.name} was successfully added.`,
          life: 3000,
        });
        this.student = {
          name: '',
          email: '',
          dateOfBirth: new Date(),
          courses: [],
          studyProgramme: 'Computer Science',
        };
        this.isSaving = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to Add Student',
          detail: 'An error occurred while adding the student. Please try again.',
          life: 4000,
        });
        this.isSaving = false;
        console.error('Error adding student:', err);
      },
    });
  }
}
