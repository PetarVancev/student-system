import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    loadComponent: () =>
      import('./pages/overview/overview.component').then((m) => m.OverviewComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/student-form/student-form.component').then((m) => m.StudentFormComponent),
    data: { isEditMode: false },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/student-form/student-form.component').then((m) => m.StudentFormComponent),
    data: { isEditMode: true },
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview' },
];
