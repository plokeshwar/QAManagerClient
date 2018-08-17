import { SuiteService } from '../shared/suite/suite.service';
import { TestcaseService } from '../shared/testcase/testcase.service'
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  test: any = {};
  suite: any = {};

  sub: Subscription;
  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data,
    private router: Router, private testService: TestcaseService,
    private suiteService: SuiteService) {
    this.suite = this.data.suite;
   
    if(this.data.test !=null){
       this.test = this.data.test;
    }
  
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('Params : ' + params['id']);

    });

    if (this.test) {
      this.test.estimatedType = this.convertEstimate('type', this.test.estimate);
      this.test.estimatedValue = this.convertEstimate('', this.test.estimate);
    }
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  save(suiteId, id) {
    if (id == null) {
      this.testService.save(suiteId, this.test).subscribe(result => {
      }, error => console.error(error));
      location.reload()

    } else {
      this.testService.update(suiteId, id, this.test).subscribe(result => {
      }, error => console.error(error));
      location.reload()
    }
  }

  remove(suiteId: string, id: string) {
    this.testService.remove(suiteId, id).subscribe(result => {
      location.reload();
    }, error => console.error(error));
  }

  convertEstimate(type, estimate) {
    if (!estimate) {
      return '';
    }
    if (type === 'type') {
      return estimate.substring(estimate.length - 2, estimate.length);
    } else {
      return estimate.substring(0, estimate.length - 2);
    }
  }

}
