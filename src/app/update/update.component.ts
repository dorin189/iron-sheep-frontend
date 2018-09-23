import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: number;
  private sub: any;
  result = [];
  errors = [];
  success = '';

  url = 'http://localhost:3000/api/v1/users/';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  updateForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      user_name: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
  })

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number

      });

      let url = this.url + this.id;
      this.httpClient.get(url)
          .subscribe(
              (data:any[]) => {
                  this.result = data[0];
                  this.updateForm.get('first_name').setValue(this.result['first_name']);
                  this.updateForm.get('last_name').setValue(this.result['last_name']);
                  this.updateForm.get('user_name').setValue(this.result['user_name']);
                  this.updateForm.get('email').setValue(this.result['email']);
              }
          );
  }

  update() {
      let url = this.url + this.id;
      this.httpClient.put(url, this.updateForm.value)
          .subscribe(
              (data:any[]) => {
                  this.success = 'User has been created!';
                  this.errors = [];
                  this.updateForm.reset();
              },
              (error) => {
                  this.errors = error.error;
              })
  }

}
