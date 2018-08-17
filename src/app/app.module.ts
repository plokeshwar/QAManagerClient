import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents, entryComponents, routingProviders} from './app.routing.module';
import {customProviders, customPipes} from './app.providers';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './app.material.module';
import {HttpClientModule} from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';


import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectEditComponent} from './project-edit/project-edit.component';
import {ProjectComponent} from './project/project.component';
import { SuiteComponent } from './suite/suite.component';
import { TestComponent } from './test/test.component';
import { StepComponent } from './step/step.component';






@NgModule({
  declarations: [
    AppComponent,
    entryComponents,
    routingComponents,
    customPipes,
    ProjectComponent,
    SuiteComponent,
    TestComponent,
    StepComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    MatSnackBarModule,
    
  ],
  providers: [
    customProviders, routingProviders, MatSnackBarModule

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    entryComponents
  ]
})
export class AppModule {}
