export type StudyProgramme =
  | 'Computer Science'
  | 'Mathematics'
  | 'Physics'
  | 'Biology'
  | 'Engineering';

export interface Student {
  id: number;
  name: string;
  email: string;
  dateOfBirth: Date;
  courses: string[];
  studyProgramme: StudyProgramme;
}

export type NewStudent = Omit<Student, 'id'>;
