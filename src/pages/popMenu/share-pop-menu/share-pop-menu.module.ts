import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharePopMenu } from './share-pop-menu';

@NgModule({
  declarations: [
    SharePopMenu,
  ],
  imports: [
    IonicPageModule.forChild(SharePopMenu),
  ],
})
export class SharePopMenuPageModule {}
