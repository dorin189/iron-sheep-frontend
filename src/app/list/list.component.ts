import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  result = [];
  hint = '';
  errors = [];

  constructor(private httpClient: HttpClient, private router: Router) {};

  url = 'http://localhost:3000/api/v1/users';
  ngOnInit() {
    this.httpClient.get(this.url)
        .subscribe(
            (data:any[]) => {
              this.result = data;

            }
        );
  }

  create = () => {
      this.router.navigateByUrl('/create')
  };

  delete = (userId) => {
    this.httpClient.delete(this.url + '/' + userId)
        .subscribe(
            (data:any[]) => {
                this.result = data;
            },
        )
  };

  update = (user) => {
      this.router.navigate(['/update', user.id]);
  };

  search = (hint) => {
      let data = {
          hint: hint
      };
      this.httpClient.post(this.url + '/hint', data)
          .subscribe(
              (data:any[]) => {
                  this.result = data;
                  this.errors = [];
              },
              (error) => {
                  console.log(error.error);
                  this.errors = error.error;
              })
  }
}
