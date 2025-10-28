import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MenuModule, DatePipe],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  students: Student[] = [];
  rows = 20;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.studentService.getAll().subscribe((data) => {
      this.students = data.map((s) => ({ ...s, dateOfBirth: new Date(s.dateOfBirth) }));
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => this.load());
  }

  getMenuItems(student: Student): MenuItem[] {
    return [
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-pencil',
      //   command: () => this.editStudent(student.id),
      // },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        styleClass: 'text-red-500',
        command: () => this.deleteStudent(student.id),
      },
    ];
  }
}
