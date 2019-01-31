import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DumbComponent } from './dumb.component';
import { LoggableDirective } from './loggable.directive';
import { IsVisibleDirective } from './is-visible.directive';

@NgModule({
  declarations: [
    AppComponent,
    DumbComponent,
		LoggableDirective,
		IsVisibleDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
