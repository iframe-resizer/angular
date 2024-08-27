import { Directive, EventEmitter, Input, Output, ElementRef } from '@angular/core';

import connectResizer from '@iframe-resizer/core'

import warning from 'warning'


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
  offsetSize?: number
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
  @Output() onClose = new EventEmitter<IframeResizerDirective>();
  @Output() onMessage = new EventEmitter<{ resizer: IframeResizerDirective, message:string }>();
  @Output() onMouseEnter = new EventEmitter<{ resizer: IframeResizerDirective, height:number, width:number, type:string }>();
  @Output() onMouseLeave = new EventEmitter<{ resizer: IframeResizerDirective, height:number, width:number, type:string }>();
  @Output() onResized = new EventEmitter<{ resizer: IframeResizerDirective, height:number, width:number, type:string }>();
  @Output() onScroll = new EventEmitter<{ resizer: IframeResizerDirective, top:number, left:number }>();
  

  @Input() options:iframeResizerOptions = {
    license: ""
  }
  
  @Input() debug:boolean = false;

  constructor(private elementRef: ElementRef) {
    if (this.debug) console.debug("[IframeResizerDirective].constructor");
  }


  ngOnInit() {

  }

  
  ngAfterViewInit(): void {
  
    this.resizer = connectResizer({ 
      ...this.options, 

      waitForLoad: true,

      onReady: (iframe:HTMLIFrameElement) => {

        // console.debug("[IframeResizerDirective].onReady");
        this.onReady.next(this);
      },
      onClose: (iframeID:any) => {

        // console.debug("[IframeResizerDirective].onClose, iframeID: ", iframeID);
        warning(
          !this.resizer,
          `[iframe-resizer/angular][${this.elementRef.nativeElement?.id}] Close event ignored, to remove the iframe update your Angular component.`,
        )
        this.onClose.next(this);
        return false;
      },
      onClosed: (iframe:HTMLIFrameElement) => {

        if (this.debug) console.debug("[IframeResizerDirective].onClosed");
        // this.onReady.next(this);
      },
      onMessage: (event:{iframe:HTMLIFrameElement, message:string} ) => {

        if (this.debug) console.debug("[IframeResizerDirective].onMessage, message: ", event);
        this.onMessage.next({ resizer: this, message: event.message });
       
      },
      onMouseEnter: (event:{iframe:HTMLIFrameElement, height:number, width:number, type:string } ) => {

        if (this.debug) console.debug("[IframeResizerDirective].onMouseEnter, event: ", event);
        this.onMouseEnter.next({ resizer: this, height: event.height, width: event.width, type: event.type  });
       
      },
      onMouseLeave: (event:{iframe:HTMLIFrameElement, height:number, width:number, type:string } ) => {

        if (this.debug) console.debug("[IframeResizerDirective].onMouseLeave, event: ", event);
        this.onMouseLeave.next({ resizer: this, height: event.height, width: event.width, type: event.type  });
       
      },
      onResized: (event:{iframe:HTMLIFrameElement, height:number, width:number, type:string } ) => {

        if (this.debug) console.debug("[IframeResizerDirective].onResized, event: ", event);
        this.onResized.next({ resizer: this, height: event.height, width: event.width, type: event.type  });
       
      },
      onScroll: (event:{iframe:HTMLIFrameElement,top:number, left:number  } ) => {

        if (this.debug) console.debug("[IframeResizerDirective].onScroll, event: ", event);
        this.onScroll.next({ resizer: this, top: event.top, left: event.left });
       
      }
      })(this.elementRef.nativeElement); 

  }

  ngOnDestroy() {
    if (this.debug) console.debug("ngOnDestroy");

    this.resizer?.disconnect();
  }



  // parent methods 
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
