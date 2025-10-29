import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';

type StudentWithItems = Student & { items: MenuItem[] };

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
      this.students = data.map((s) => {
        const st: StudentWithItems = {
          ...s,
          dateOfBirth: new Date(s.dateOfBirth),
          items: [] as MenuItem[],
        };

        st.items = [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            routerLink: ['/edit', st.id],
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            styleClass: 'text-red-500',
            command: () => this.deleteStudent(st.id),
          },
        ];

        return st;
      });
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe(() => this.load());
  }
}
