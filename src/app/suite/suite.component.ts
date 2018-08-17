import { ProjectService } from '../shared/project/project.service';
import { SuiteService } from '../shared/suite/suite.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-suite',
  templateUrl: './suite.component.html',
  styleUrls: ['./suite.component.css']
})
export class SuiteComponent implements OnInit, OnDestroy {
  project: any = {};
  suite: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data,
    private router: Router, private projectService: ProjectService,
    private suiteService: SuiteService) {
    this.project = this.data.project;
  }

  ngOnInit() {
    console.log('Project : ' + this.project.id);
      this.sub = this.route.params.subscribe(params => {
        console.log('Params : ' + params['id']);

      const id = params['id'];
      if (id) {
        this.projectService.get(id).subscribe((project: any) => {
          if (project) {
            this.project = project;
            this.project.id = project.id;
            this.project.name = project.name;
      
          } else {
            console.log(`Project with id '${id}' not found, returning to list`);
            // this.gotoDashboard();
          }
        });
      }
        console.log('Project : ' + this.project.id);
    });


  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToProject(projectId: string) {
    this.router.navigate(['/project' , projectId]);
  }


  save(projectId: string, form: NgForm) {
    this.suiteService.save(projectId, form).subscribe(result => {
      this.goToProject(projectId);
    }, error => console.error(error));
  }

  update(projectId, id, form: NgForm) {
    console.log("project Id "+ projectId)
    if (id == null) {
      this.save(projectId, form);
      location.reload();
      
    } else {
      this.suiteService.update(projectId, id, form).subscribe(result => {
        this.goToProject(projectId);
      }, error => console.error(error));
    }
  }

  remove(projectId: string, id: string) {
    this.suiteService.remove(projectId, id).subscribe(result => {
      this.goToProject(projectId);
    }, error => console.error(error));
  }

   getSuites(id) {
    this.suiteService.getAll(id).subscribe(data => {
      this.suite = data;
    });
  }
}
