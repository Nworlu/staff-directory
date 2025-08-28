export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevel: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradeLevel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Country {
  country: string;
  name: string;
  subcountry: string;
}
