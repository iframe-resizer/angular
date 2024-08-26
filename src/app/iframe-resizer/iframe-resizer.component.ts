import connectResizer from '@iframe-resizer/core'

import { Component, inject, ViewChild, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { iframeResizerOptions, iframeResizerObject  } from './iframe-resizer.directive';

/*
NOT I USE
*/

@Component({
  selector: 'iframe-resizer',
  standalone: true,
  imports: [ ],
  template: `
  @if (safeSrc) {
    <iframe #iframe [src]="safeSrc"></iframe>
  }
  `,
  styles: `
    iframe {
      width: 100%
    }
  `
})
export class IframeResizerComponent {
  sanitizer = inject(DomSanitizer);

  private iframe: ElementRef|undefined;
  private resizer: iframeResizerObject|undefined;

  @ViewChild('iframe', { static: false }) set iframeElement(content: ElementRef) {
      console.log("iframe, content: ", content);

      if (this.iframe) {
        if (this.resizer) this.resizer.disconnect();
        this.iframe = undefined; 
      }
      if(content) { // initially setter gets called with undefined
          this.iframe = content;

          this.setup();
      } else {
        this.iframe = undefined; 
      }
  }

  // @ViewChild('iframe') iframe: HTMLIFrameElement|undefined;

  @Output() onMessage = new EventEmitter<any>();
  @Input() options:iframeResizerOptions = {
    license: ""
   }
  @Input() src:string|SafeResourceUrl = ""


  safeSrc:SafeResourceUrl|undefined;

  constructor() {

  }

  ngOnInit() {
    console.log("ngOnInit, src: ", this.src)
    this.safeSrc = typeof this.src === "string"  ? this.sanitizer.bypassSecurityTrustResourceUrl(this.src) :  this.src;
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");

    if (this.resizer) this.resizer.disconnect();
  }

  setup() {
  
    console.log("setup, iframe: ", this.iframe)
    this.resizer = connectResizer({ 
      ...this.options, 
      onReady: (iframe:HTMLIFrameElement) => {

        console.log("onReady");
      },
      onClose: (iframeID:any) => {

        console.log("onClose, iframeID: ", iframeID);
      },
      onMessage: (event:{iframe:HTMLIFrameElement, message:string} ) => {  // event:{ iframe:HTMLIFrameElement, message:string }

        console.log("onMessage, message: ", event);

        this.onMessage.next(event.message);
       
      }
      })(this.iframe?.nativeElement); 


    console.log("setup, resizer: ", this.resizer);
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


// function IframeResizer(props) {
//   // eslint-disable-next-line react/prop-types
//   const { title, forwardRef, ...rest } = props
//   const filteredProps = filterIframeAttribs(rest)
//   const iframeRef = useRef(null)

//   const onClose = () => {
//     warning(
//       !iframeRef.current,
//       `[iframe-resizer/react][${iframeRef?.current?.id}] Close event ignored, to remove the iframe update your React component.`,
//     )
//     return !iframeRef.current // Allow React to close this
//   }

//   // This hook is only run once, as once iframe-resizer is bound, it will
//   // deal with changes to the element and does not need recalling
//   useEffect(() => {
//     const iframe = iframeRef.current
//     const resizer = connectResizer({ ...rest, onClose })(iframe)
//     return () => resizer?.disconnect()
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   useImperativeHandle(forwardRef, () => ({
//     getRef: () => iframeRef,
//     getElement: () => iframeRef.current,
//     resize: () => iframeRef.current.iframeResizer.resize(),
//     moveToAnchor: (anchor) =>
//       iframeRef.current.iframeResizer.moveToAnchor(anchor),
//     sendMessage: (message, targetOrigin) => {
//       iframeRef.current.iframeResizer.sendMessage(message, targetOrigin)
//     },
//   }))

//   return <iframe title={title} {...filteredProps} ref={iframeRef} />
// }

// export default IframeResizer
