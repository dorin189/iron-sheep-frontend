import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    errors = [];
    success = '';

    url = 'http://localhost:3000/api/v1/users';


    constructor(private httpClient: HttpClient) { }

    userForm = new FormGroup({
        first_name: new FormControl(),
        last_name: new FormControl(),
        user_name: new FormControl(),
        password: new FormControl(),
        email: new FormControl()
    })

  ngOnInit() {
  }


  create() {
      this.httpClient.post(this.url, this.userForm.value)
          .subscribe(
              (data:any[]) => {
                  this.success = 'User has been created!';
                  this.errors = [];
                  this.userForm.reset();
              },
              (error) => {
                console.log(error);
                this.errors = error.error;
              })

  }

}
