import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deals } from 'deals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  dealsUrl: any = 'http://localhost:8000/deals';
  formUrl: any = 'http://localhost:3000/formData';
  progressUrl: any = 'http://localhost:3004/progress';
  header_Check: boolean = true;
  navication_check: boolean = false;
  header = new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4000',
  });

  constructor(private http: HttpClient) {}

  gettingDealData() {
    return this.http.get(this.dealsUrl);
  }
  deleteData(id: any) {
    return this.http.delete(this.dealsUrl + '/' + id);
  }

  getUpdateData(id: number) {
    const url = `${this.dealsUrl}/${id}`;
    return this.http.get<Deals>(url);
  }
  updateData(id: any, data: any) {
    return this.http.put<Deals>(this.dealsUrl + '/' + id, data);
  }
  postFormData(data: any) {
    return this.http.post<FormData>(this.formUrl, data);
  }
  getFormData() {
    return this.http.get(this.formUrl);
  }

  getProgressData() {
    return this.http.get(this.progressUrl);
  }
  onChangeHeader() {
    this.header_Check = true;
  }
}

interface FormData {
  estClose: string;
  exAsp: string;
  TotalLots: number;
  zip1: string;
  zip2: string;
  zip3: string;
}
