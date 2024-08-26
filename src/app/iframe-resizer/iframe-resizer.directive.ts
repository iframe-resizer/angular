import { Directive, EventEmitter, Input, Output, ElementRef } from '@angular/core';

import connectResizer from '@iframe-resizer/core'

export type iframeResizerObject = {
  moveToAnchor: (anchor: string) => void
  resize: () => void
  sendMessage: (message: string, targetOrigin?: string) => void,
  disconnect: () => void
}

export  type iframeResizerOptions = {
  bodyBackground?: string | null
  bodyMargin?: string | number | null
  bodyPadding?: string | number | null
  checkOrigin?: boolean | string[]
  direction?: 'vertical' | 'horizontal' | 'none'
  inPageLinks?: boolean
  license: string
  offset?: number
  scrolling?: boolean | 'omit'
  tolerance?: number
  warningTimeout?: number
}


@Directive({
  selector: '[iframe-resizer]',
  standalone: true
})
export class IframeResizerDirective {

  private resizer?: iframeResizerObject;

  @Output() onReady = new EventEmitter<IframeResizerDirective>();
  @Output() onMessage = new EventEmitter<{ resizer: IframeResizerDirective, message:string }>();
  
  @Input() options:iframeResizerOptions = {
    license: ""
  }

  constructor(private elementRef: ElementRef) {
    console.log("IframeResizerDirective");
  }


  ngOnInit() {

  }

  
  ngAfterViewInit(): void {
  
    this.resizer = connectResizer({ 
      ...this.options, 
      
      onReady: (iframe:HTMLIFrameElement) => {

        console.log("[IframeResizerDirective].onReady");
        this.onReady.next(this);
      },
      onClose: (iframeID:any) => {

        console.log("[IframeResizerDirective].onClose, iframeID: ", iframeID);
      },
      onMessage: (event:{iframe:HTMLIFrameElement, message:string} ) => {

        console.log("[IframeResizerDirective].onMessage, message: ", event);

        this.onMessage.next({ resizer: this, message: event.message });
       
      }
      })(this.elementRef.nativeElement); 

  }

  ngOnDestroy() {
    console.log("ngOnDestroy");

    this.disconnect();
  }



  // parent methods 
  public disconnect() {
    this.resizer?.disconnect();
  }
  public resize() {
    this.resizer?.resize();
  }
  public moveToAnchor (anchor:string) {
    this.resizer?.moveToAnchor(anchor);
  }

  public sendMessage(message:string, targetOrigin?:string) {
    this.resizer?.sendMessage(message, targetOrigin)
  }



}
