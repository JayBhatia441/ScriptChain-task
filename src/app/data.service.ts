import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/submit'

  constructor(private http: HttpClient) { }

  submitFormData(formData: any) {
    return this.http.post(this.apiUrl, formData);
  }

  
}
