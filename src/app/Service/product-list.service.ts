import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductListService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  //
  getAllProduct() {
    return this.http.get<any>('http://127.0.0.1:8000/api/product/view');
  }

  
}
