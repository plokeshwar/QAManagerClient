import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectService {

  public API = '//localhost:8080/api/v1';
  public PROJECT_API = this.API + '/projects';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.PROJECT_API);
  }

  get(id: string) {
    return this.http.get(this.PROJECT_API + '/' + id);
  }


  update(id: string, project: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.put(this.PROJECT_API + '/' + id, project);
    return result;
  }


  save(project: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.PROJECT_API, project);
    return result;
  }

  remove(id: string) {
    return this.http.delete(this.PROJECT_API + '/' + id);
  }


}
