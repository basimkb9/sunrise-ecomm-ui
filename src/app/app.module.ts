import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from './service/authservice.service';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MessagesModule
  ],
  providers: [
    provideClientHydration(),
    AuthserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
