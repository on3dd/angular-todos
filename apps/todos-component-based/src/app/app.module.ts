import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastsModule } from '@angular-todos/toasts';
import { TodosModule } from '@angular-todos/todos';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, NgbModule, ToastsModule, TodosModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
