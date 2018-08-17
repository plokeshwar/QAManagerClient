import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestcaseService {

  public API = '//localhost:8080/api/v1';
  public TEST_API = this.API + '/suites';

  constructor(private http: HttpClient) {
  }

  getAllTestsPerSuite(suiteId: string): Observable<any> {
    return this.http.get(this.TEST_API + '/' + suiteId + '/tests');
  }

  get(suiteId: string, id: string) {
    return this.http.get(this.TEST_API + '/' + suiteId + '/tests/' + id);
  }


  update(suiteId: string, testId: string, test: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.put(this.TEST_API + '/' + suiteId + '/tests/' + testId, this.updateTestObject(test));
    return result;
  }


  save(suiteId: string, test: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.TEST_API + '/' + suiteId + '/tests', this.updateTestObject(test));
    return result;
  }

  updateTestObject(test) {
    return {
        estimate:	test.estimatedValue + test.estimatedType,
        precondition:	test.precondition,
        status:test.status,
        suiteId	:test.suiteId,
        summary:test.summary
    }
    return test;
  }

  remove(suiteId: string, id: string) {
    return this.http.delete(this.TEST_API + '/' + suiteId + '/tests/' + id);
  }


}
