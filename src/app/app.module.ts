import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CreatorFormComponent } from './asset-builder/creator-form/creator-form.component';
import { HeaderComponent } from './header/header.component';
import { UtilModule } from './util/util.module';

@NgModule({
  declarations: [
    AppComponent,
    CreatorFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UtilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
