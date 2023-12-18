import { Component } from '@angular/core';
import { Student } from '../../models/studet.model';
import { ApiServiceService } from '../../services/api.service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-student-enrollment',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './student-enrollment.component.html',
  styleUrl: './student-enrollment.component.css',
  providers: [ApiServiceService]
})
export class StudentEnrollmentComponent {
  students: Student[] = [];

  constructor(private studentEnrollmentService: ApiServiceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.studentEnrollmentService.getAllStudents()
    .subscribe({
      next: (students) => {
        //console.log(students);
        this.students = students;
      },
      error: (response) => {
        console.log(response);
      }
  });
  }

}
