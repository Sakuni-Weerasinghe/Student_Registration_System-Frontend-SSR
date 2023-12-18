import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Student } from '../../models/studet.model';
import { ApiServiceService } from '../../services/api.service.service';
import { NgToastService , NgToastModule} from 'ng-angular-popup';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule,CommonModule,NgToastModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
  providers:[ApiServiceService]
})
export class StudentRegistrationComponent {
  @ViewChild('form')
  form!: NgForm;

  studentRegisterRequest: Student = {
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
    private studentService: ApiServiceService,
    private toast: NgToastService){

  }

  registerStudent() {
    this.studentService.registerStudent(this.studentRegisterRequest)
    .subscribe({
      next: (student) => {
        this.form.resetForm();
        this.toast.success({detail:"SUCCESS",summary:"Student Registered! ",duration:3000});
      },
      error: (response) => {

      }
    })
  }


}
