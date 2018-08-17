import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectComponent } from './project/project.component';
import { SuiteComponent } from './suite/suite.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';

export const routingComponents = [DashboardComponent, ProjectEditComponent];

export const entryComponents = [SuiteComponent, TestComponent];

export const routingProviders = [];

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'project-add',
    component: ProjectEditComponent
  },
  {
    path: 'project-edit/:id',
    component: ProjectEditComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent
  }
  
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
