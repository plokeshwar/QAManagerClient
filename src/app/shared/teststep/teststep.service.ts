import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeststepService {

  public API = '//localhost:8080/api/v1';
  public STEP_API = this.API + '/tests';

  constructor(private http: HttpClient) {
  }

  getAllStepsPerTest(testId: string): Observable<any> {
    return this.http.get(this.STEP_API + '/' + testId + '/steps');
  }

  get(testId: string, id: string) {
    return this.http.get(this.STEP_API + '/' + testId + '/steps/' + id);
  }


  update(testId: string, stepId:string, step: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.put(this.STEP_API + '/' + testId + '/steps/' + stepId, step);
    return result;
  }


  save(testId: string, step: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.STEP_API + '/' + testId + '/steps', step);
    return result;
  }


  remove(testId: string, id: string) {
    return this.http.delete(this.STEP_API + '/' + testId + '/steps/' + id);
  }


}
