import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorFormModule } from './creator-form/creator-form.module';
import {UtilModule} from '../util/util.module';


@NgModule({
  imports: [
    CommonModule,
    CreatorFormModule,
    UtilModule
  ],
  declarations: []
})
export class AssetBuilderModule { }
