import {ProjectService} from '../shared/project/project.service';
import {SuiteService} from '../shared/suite/suite.service';
import {TestcaseService} from '../shared/testcase/testcase.service'
import {TeststepService} from '../shared/teststep/teststep.service'
import { SuiteComponent } from '../suite/suite.component';
import { TestComponent } from '../test/test.component'
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import { StepComponent } from '../step/step.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: any = {};
  suite: any = {};
  suites: Array<any>;
  tests : Array<any>;
  test: any ={};
  steps : Array<any>;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router, private stepService : TeststepService,
    private testCaseService: TestcaseService, private projectService: ProjectService, private suiteService: SuiteService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getProjectDetails();
  }

  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);

    if (event.index === 1) {
      this.getSuites(this.project.id);
    
    }

  }

  getProjectDetails() {
    this.sub = this.route.params.subscribe(params => {
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
    });
  }

  getSuites(id) {
    this.suiteService.getAll(id).subscribe(data => {
      this.suites = data;
    });
  }

  getTestsForSuite(suiteId){
    this.testCaseService.getAllTestsPerSuite(suiteId).subscribe(data =>{this.tests=data;})
  }

  getStepsForTest(test){
    console.log("Getting steps for test "+test)

   this.stepService.getAllStepsPerTest(test).subscribe(data =>{
    this.steps = data;
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
      this.save(form);
      this.openSnackBar(form.name+" Created Successfully.", 'Close','blue-snackbar')
      
    } else {
      this.projectService.update(id, form).subscribe(result => {
        this.openSnackBar(form.name+" Updated Successfully.", 'Close','blue-snackbar')
        this.gotoDashboard();
      }, error => console.error(error));
    }
  }
  
  openAddSuiteDialog(){
  this.dialog.open(SuiteComponent, {height: '70%',
  width: '70%', data: {project:this.project}});
  }

  openUpdateTestDialog(suite:any, test:any){
    console.log("In openUpdateTestDialog ")
    console.log("Test ID "+test.id)
    console.log("Suite ID "+suite.id)
    this.dialog.open(TestComponent, {height: '70%',
    width: '70%', data: {suite:suite, test:test}});
    }
  
  openAddTestDialog(suite:any){
    this.dialog.open(TestComponent, {height: '70%',
    width: '70%', data: {suite:suite}});
    }
   
    openAddStepDialog(test:any){
      console.log("In Add Step Dialog with data "+test)
      this.dialog.open(StepComponent, {height: '70%',
      width: '70%', data: {test:test}});
      }
    
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 9000,
      panelClass: [className]
    });
  }

  
  
  remove(id) {
    this.projectService.remove(id).subscribe(result => {
      this.gotoDashboard();
    }, error => console.error(error));
  }
}