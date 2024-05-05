import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodosModule } from './todos/todos.module';
import { CommonModule } from '@angular/common';
import { ToastsModule } from './toasts/toasts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, NgbModule, ToastsModule, TodosModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
