import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetbuilderSenderComponent} from './assetbuilder-sender/assetbuilder-sender.component';
import {UtilModule} from '../util/util.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UtilModule
  ],
  declarations: [AssetbuilderSenderComponent],
  exports: [AssetbuilderSenderComponent]
})
export class AssetbuilderModule {
}
