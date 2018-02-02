import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AssetBuilderModule } from './asset-builder/asset-builder.module';
import { CreatorFormComponent } from './asset-builder/creator-form/creator-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatorFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AssetBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
