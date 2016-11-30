import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { HeaderModule } from './header/header.module';
import { PropertiesModule } from './properties/properties.module';
import { EventsModule } from './events/events.module';
import { GmlModule } from './gml/gml.module';
import { AddEventModule } from './add-event/add-event.module';
import { ModalModule } from './modal/modal.module';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [BrowserModule, HttpModule, HeaderModule, PropertiesModule,
    EventsModule, GmlModule, AddEventModule, ModalModule,
    SharedModule.forRoot(), RouterModule.forRoot(routes)],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
