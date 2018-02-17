import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AssetBuilderModule } from './asset-builder/asset-builder.module';
import { CreatorFormComponent } from './asset-builder/creator-form/creator-form.component';
import {MetaModule} from './meta/meta.module';
import { HeaderComponent } from './header/header.component';
import { AssetFormComponent } from './asset-form/asset-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatorFormComponent,
    HeaderComponent,
    AssetFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AssetBuilderModule,
    MetaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
