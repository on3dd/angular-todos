import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastsModule } from '@angular-todos/toasts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { TodosModule } from './todos/todos.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    ToastsModule,
    TodosModule,
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
