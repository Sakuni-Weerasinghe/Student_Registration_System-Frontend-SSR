import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api.service.service';
import { Student } from '../../models/studet.model';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-course-details',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-course-details.component.html',
  styleUrl: './student-course-details.component.css',
  providers: [ApiServiceService]
})
export class StudentCourseDetailsComponent {
  courses_ = new FormControl('');

  selectedValue: Course[] = [];
  courses: Course[] = [];

  studentDetails: Student = {
    studentId: 0,
    firstName: " ",
    lastName: " ",
    birthday: new Date(),
    gender: " ",
    email: " ",
    phones: " ",
    addressLine1: " ",
    addressLine2: " ",
    addressLine3: " "
  };

  constructor( 
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe({
      next:(params) => {
        const idString = params.get("id");
        if(idString){
          const id = +idString;
          this.apiService.getStudent(id)
          .subscribe({
            next: (response) => {
              this.studentDetails = response;
            }
          })
        }
      }
    });

    this.apiService.getAllCourses()
    .subscribe({
      next: (courses) => {
        //console.log(students);
        this.courses = courses;
      },
      error: (response) => {
        console.log(response);
      }
    });
    
  }
  

}
