import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimmerComponent } from './components/timmer/timmer.component';
import { PlayPauseComponent } from './components/play-pause/play-pause.component';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
function countdownConfigFactory(): CountdownConfig {
  return { format: `mm:ss` };
}
@NgModule({
  declarations: [
    AppComponent,
    TimmerComponent,
    PlayPauseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
