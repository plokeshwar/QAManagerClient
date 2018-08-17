import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project/project.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {


  projects: Array<any>;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getProjects();

    /*this.projects = [
      {
        id: 1, 'name': 'projectOne', 'description': 'This is project one.'
      },
    {
              id: 2, 'name': 'projectTwo', 'description': 'This is project two.'
    }];*/
  }

  getProjects() {
    this.projectService.getAll().subscribe(data => {
      this.projects = data;
    });
  }



}
