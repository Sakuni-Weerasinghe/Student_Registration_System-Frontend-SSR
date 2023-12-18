import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api.service.service';
import { Student } from '../../models/studet.model';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-student-course-details',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './student-course-details.component.html',
  styleUrl: './student-course-details.component.css',
  providers: [ApiServiceService]
})
export class StudentCourseDetailsComponent {
  courses_ = new FormControl('');

  selectedCourses: Course[] = [];
  courses: Course[] = [];

  courseList: Course[] = []
  initialCourseList : Course[] = []

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

  saveCourses(){
    console.log('Selected Courses:', this.selectedCourses);
    this.courseList = this.selectedCourses;
  }  

  onCheckboxChange(course: any): void {
    if (course.selected) {
      this.selectedCourses.push(course);
    } else {
      const index = this.selectedCourses.findIndex(selectedCourse => selectedCourse.courseCode === course.courseCode);
      if (index !== -1) {
        this.selectedCourses.splice(index, 1);
      }
    }
  }

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
      next: (response) => {
        //console.log(students);
        this.initialCourseList = response;
        this.courseList = this.initialCourseList;
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }
  

}
