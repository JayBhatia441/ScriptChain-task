import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service'; 


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.dataService.submitFormData(this.userForm.value).subscribe(
        response => {
            console.log('Success!', response);
            alert("Email sent sucessfully!")

        },
        error => {
            console.error('Error!', error);
            if (error.status === 409) {

                alert('Email already exists. Please use a different email.');
            } else {

                alert('An error occurred. Please try again.');
            }
        }
    );
}
}
