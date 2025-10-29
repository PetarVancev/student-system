import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, NewStudent } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  add(student: NewStudent): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateCourses(id: number, courses: string[]): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${id}`, { courses });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
