import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/studet.model';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl:string = "https://localhost:7270/api/";

  constructor(
    private http: HttpClient
  ) { }

  registerStudent(registerStudentRequest : Student): Observable<Student>{
    return this.http.post<Student>(this.baseUrl + 'Student/register-student', registerStudentRequest);
  }

  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl + 'Student')
  }

  getStudent(id: number): Observable<Student>{
    return this.http.get<Student>(this.baseUrl + 'Student/' + id)
  }

  addCourse(courseRegisterRequest : Course): Observable<Course>{
    return this.http.post<Course>(this.baseUrl + 'Course/add-course', courseRegisterRequest);
  }

}
