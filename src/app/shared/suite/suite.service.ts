import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuiteService {

  public API = '//localhost:8080/api/v1';
  public SUITE_API = this.API + '/projects';

  constructor(private http: HttpClient) {
  }

  getAll(projectId: string): Observable<any> {
    return this.http.get(this.SUITE_API + '/' + projectId + '/suites');
  }

  get(projectId: string, id: string) {
     return this.http.get(this.SUITE_API + '/' + projectId + '/suites/' + id);
  }


  update(projectId: string, id: string, suite: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.put(this.SUITE_API + '/' + projectId + '/suites/' + id, suite);
    return result;
  }


  save(projectId: string, suite: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.SUITE_API + '/' + projectId + '/suites', suite);
    return result;
  }

  remove(projectId: string, id: string) {
    return this.http.delete(this.SUITE_API + '/' + projectId + '/suites/' + id);
  }




}
