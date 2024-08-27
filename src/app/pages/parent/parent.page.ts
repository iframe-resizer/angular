import { Component, ViewChild, inject } from '@angular/core';

import { IframeResizerDirective } from '../../iframe-resizer/iframe-resizer.directive';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ IframeResizerDirective ],
  templateUrl: './parent.page.html',
  styleUrl: './parent.page.css'
})
export class ParentPage {

  sanitizer = inject(DomSanitizer);

  @ViewChild(IframeResizerDirective) ifrd:IframeResizerDirective|undefined;


  src:SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/child');

  visible = true;

  constructor() {


  }

  // parnet events
  onReady(resizer:IframeResizerDirective) {
    console.log("ParentPage.onReady: ", resizer);

    
  }

  onMessage($event:{ resizer: IframeResizerDirective, message:string }) {
    console.log("ParentPage.onMessage: ", $event);
    $event.resizer.sendMessage("Reply back");
  }

  onMouseEnter($event:{ resizer: IframeResizerDirective, height:number, width:number, type:string }) {
    console.log("ParentPage.onMouseEnter: ", $event);
  }
  onMouseLeave($event:{ resizer: IframeResizerDirective, height:number, width:number, type:string }) {
    console.log("ParentPage.onMouseLeave: ", $event);
  }
  onResized($event:{ resizer: IframeResizerDirective, height:number, width:number, type:string }) {
    console.log("ParentPage.onResized: ", $event);
  }
  onScroll($event:{ resizer: IframeResizerDirective, top:number, left:number}) {
    console.log("ParentPage.onScroll: ", $event);
  }

  // parent methods 
  resize() {
    // console.log("resize: ", this.ifrd);
    this.ifrd?.resize();
  }
  moveToAnchor (anchor:string) {
    // console.log("moveToAnchor: ", this.ifrd);
    this.ifrd?.moveToAnchor(anchor);
  }

  sendMessage(message:string, targetOrigin?:string) {
    // console.log("sendMessage: ", this.ifrd);
    this.ifrd?.sendMessage(message, targetOrigin)
  }

}
