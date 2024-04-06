import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent {
  constructor(private http: HttpClient) {
    this.getAllUsers();
  }
  products: any[] = [];
  getAllUsers(): void {
    const url = 'https://ecommerce-node-yxgy.onrender.com/api/v1/user';

    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    this.http
      .get<any[]>(url, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: token,
          email: email,
        },
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.products = response;
      });
  }
}
