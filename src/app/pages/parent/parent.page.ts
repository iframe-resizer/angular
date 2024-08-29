import { Component, ViewChild, inject } from '@angular/core';

import { IframeResizerDirective, iframeResizerElement } from '@iframe-resizer/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ IframeResizerDirective ],
  templateUrl: './parent.page.html',
  styleUrl: './parent.page.css'
})
export class ParentPage {

  sanitizer = inject(DomSanitizer);
  doc = inject(DOCUMENT);

  // @ViewChild(IframeResizerDirective) ifrd:IframeResizerDirective|undefined;


  src:SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/child');

  visible = true;

  constructor() {


  }

  // parnet events

  // onReadyTest(iframe:iframeResizerElement) {
  //   let reseizer = iframe.iFrameResizer

  //   console.log("ParentPage.onReadyTest: ", reseizer);

  //   // reseizer.sendMessage("");
  // }

  onReady(resizer:iframeResizerElement) {
    console.log("ParentPage.onReady: ", resizer);

    
  }

  onMessage($event:{ iframe: iframeResizerElement, message:string }) {
    console.log("ParentPage.onMessage: ", $event);
    $event.iframe.iFrameResizer.sendMessage("Reply back");
  }

  onMouseEnter($event:{ iframe: iframeResizerElement, height:number, width:number, type:string }) {
    console.log("ParentPage.onMouseEnter: ", $event);
  }
  onMouseLeave($event:{ iframe: iframeResizerElement, height:number, width:number, type:string }) {
    console.log("ParentPage.onMouseLeave: ", $event);
  }
  onResized($event:{ iframe: iframeResizerElement, height:number, width:number, type:string }) {
    console.log("ParentPage.onResized: ", $event);
  }
  onScroll($event:{ iframe: iframeResizerElement, top:number, left:number}) {
    console.log("ParentPage.onScroll: ", $event);
  }

  // parent methods 
  resize() {
    // console.log("resize: ", this.ifrd);
    let iframe = this.doc.getElementById("theIframe") as iframeResizerElement
    iframe?.iFrameResizer.resize();
  }
  moveToAnchor (anchor:string) {
    // console.log("moveToAnchor: ", this.ifrd);
    let iframe = this.doc.getElementById("theIframe") as iframeResizerElement
    iframe?.iFrameResizer.moveToAnchor(anchor);
  }

  sendMessage(message:string, targetOrigin?:string) {
    let iframe = this.doc.getElementById("theIframe") as iframeResizerElement
    iframe.iFrameResizer.sendMessage(message);
    // console.log("sendMessage: ", this.ifrd);
    // this.ifrd?.sendMessage(message, targetOrigin)
  }

}
