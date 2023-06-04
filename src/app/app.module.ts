import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShipConfigurationComponent } from './ship-configuration/ship-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipConfigurationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
