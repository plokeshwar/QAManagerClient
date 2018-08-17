import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../shared/project/project.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  project: any = {};
  response : any;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.projectService.get(id).subscribe((project: any) => {
          if (project) {
            this.project = project;
            this.project.id = project.id;
          } else {
            console.log(`Project with id '${id}' not found, returning to list`);
            this.gotoDashboard();
          }
        });
      }
    });
  }
  
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 9000,
      panelClass: [className]
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }


  save(form: NgForm) {
    this.projectService.save(form).subscribe(result => {
      this.gotoDashboard();
    }, error => console.error(error));
  }

  update(id, form: NgForm) {
    if (id == null) {
      this.response= this.save(form);
      this.openSnackBar(form.name+" Project Created Successfully.", 'Close','blue-snackbar')
     
      } else {
      this.projectService.update(id, form).subscribe(result => {
        this.openSnackBar(form.name+" Project Updated Successfully.", 'Close','blue-snackbar')
      
        this.gotoDashboard();
      }, error => console.log(error));
      
    }
  }

  remove(id) {
    this.projectService.remove(id).subscribe(result => {
      this.gotoDashboard();
    }, error => console.error(error));
  }
}
