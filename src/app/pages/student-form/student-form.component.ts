import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { StudentService } from '../../core/services/student.service';
import { NewStudent, Student, StudyProgramme } from '../../core/models/student.model';

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
  student: NewStudent | Student = {
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

  isSaving = false;
  isEditMode = false;
  maxDate: Date = new Date();
  minDate: Date = new Date();

  constructor(
    private studentService: StudentService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    this.student.dateOfBirth = new Date(this.maxDate);

    this.isEditMode = this.route.snapshot.data['isEditMode'] === true;

    if (this.isEditMode) {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        const id = Number(idParam);
        this.studentService.getById(id).subscribe({
          next: (student) => (this.student = student),
          error: (err) => {
            console.error('Error loading student:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Could not load student for editing.',
            });
            this.router.navigate(['/overview']);
          },
        });
      }
    }
  }

  saveStudent() {
    if (!this.student.name || !this.student.email) return;
    this.isSaving = true;

    if (!this.isEditMode) {
      this.studentService.add(this.student).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Student Added',
            detail: `${this.student.name} was successfully added.`,
            life: 3000,
          });
          this.resetForm();
        },
        error: (err) => this.handleError(err, 'adding'),
      });
    } else {
      const existing = this.student as Student;
      this.studentService.updateCourses(existing.id, existing.courses).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Student Updated',
            detail: 'Courses updated successfully.',
            life: 3000,
          });
          this.isSaving = false;
          this.router.navigate(['/overview']);
        },
        error: (err) => this.handleError(err, 'updating'),
      });
    }
  }

  private resetForm() {
    this.student = {
      name: '',
      email: '',
      dateOfBirth: new Date(this.maxDate),
      courses: [],
      studyProgramme: 'Computer Science',
    };
    this.isSaving = false;
  }

  private handleError(err: any, action: string) {
    console.error(`Error ${action} student:`, err);
    this.messageService.add({
      severity: 'error',
      summary: `Failed to ${action === 'adding' ? 'Add' : 'Update'} Student`,
      detail: `An error occurred while ${action} the student. Please try again.`,
      life: 4000,
    });
    this.isSaving = false;
  }
}
