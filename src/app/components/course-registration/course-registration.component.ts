import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Course } from '../../models/course.model';
import { NgToastService } from 'ng-angular-popup';
import { ApiServiceService } from '../../services/api.service.service';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-registration.component.html',
  styleUrl: './course-registration.component.css',
  providers: [ApiServiceService]
})
export class CourseRegistrationComponent {
  @ViewChild('courseform')
  courseform!: NgForm;

  courseRegisterRequest: Course = {
    courseId: 0,
    courseName: " ",
    courseCode: " ",
    credits: 0,
    description: " ",
    lecturer: " ",
    selected: false
  };

  constructor(
    private courseService: ApiServiceService,
    private toast: NgToastService){

  }

  addCourse() {
    this.courseService.addCourse(this.courseRegisterRequest)
    .subscribe({
      next: (course) => {
        this.courseform.resetForm();
        this.toast.success({detail:"SUCCESS",summary:"Course Registered! ",duration:3000});
      },
      error: (response) => {

      }
    })
  }

}
