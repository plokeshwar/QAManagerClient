import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatToolbarModule, MatMenuModule,
    MatCardModule, MatChipsModule,
    MatFormFieldModule, MatSelectModule,
    MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatExpansionModule,
    MatDialogModule, MatProgressBarModule,
    MatListModule, MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTabsModule
} from '@angular/material';

export const MaterialModules = [
    FormsModule,
    MatButtonModule,
    MatToolbarModule, MatMenuModule,
    MatCardModule, MatChipsModule,
    MatFormFieldModule, MatSelectModule,
    MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatExpansionModule,
    MatDialogModule, MatProgressBarModule,
    MatListModule, MatCheckboxModule,
    ReactiveFormsModule, MatProgressSpinnerModule,
    MatIconModule, MatAutocompleteModule, MatTooltipModule,
    MatTabsModule
];

@NgModule({
    imports: [MaterialModules],
    exports: [MaterialModules]
})
export class MaterialModule { }
