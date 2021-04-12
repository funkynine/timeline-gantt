import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateRangeService } from './services/date-range.service';
@NgModule({
  declarations: [
    AppComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ],
  providers: [DateRangeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
