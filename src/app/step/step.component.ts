import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TeststepService } from '../shared/teststep/teststep.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  test: any = {};
  step: any = {};

  sub: Subscription;
  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data,
    private router: Router, private stepService: TeststepService) {
    this.test = this.data.test;

    console.log("Test "+this.test)
   
    if(this.data.step !=null){
       this.step = this.data.step;
    }
  
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log('Params : ' + params['id']);

    });

    
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  save(testId, id) {
    console.log("Test ID "+testId)
    console.log("Step ID "+id)
    if (id == null) {
      this.step
      this.stepService.save(testId, this.step).subscribe(result => {
      }, error => console.error(error));
     // location.reload()

    } else {
      this.stepService.update(testId, id, this.step).subscribe(result => {
      }, error => console.error(error));
     // location.reload()
    }
  }

  remove(testId: string, id: string) {
    this.stepService.remove(testId, id).subscribe(result => {
      location.reload();
    }, error => console.error(error));
  }

  

}
