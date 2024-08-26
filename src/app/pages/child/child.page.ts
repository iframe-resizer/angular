import { ChangeDetectorRef, Component } from '@angular/core';

import '@iframe-resizer/child'
import { iframeResizer } from '@iframe-resizer/child';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.page.html',
  styleUrl: './child.page.css'
})
export class ChildPage {

  messageLog: string[] = []
  data:any = {
 

  }

  constructor(private cdr: ChangeDetectorRef) {
    window.iFrameResizer = {
      onReady: () => {
        console.log("ChildPage.onReady")
      },
      onMessage: (message:string) => {
        console.log("ChildPage.onMessage: " + message)
        this.onMessage(message);

      },
    }
  }

  onMessage(message:string)  {
    this.messageLog = [...this.messageLog, message];
    this.cdr.detectChanges();
  }

  parentIframe():iframeResizer.IFramePage {
    let win:Window = window;
    return win.parentIFrame;
  }

  getId() {
    this.data.id = this.parentIframe().getId()

  }

  getParentProps() {
    this.parentIframe().getParentProps((props) => {
      this.data.props = JSON.stringify(props)
    })

  }
  
  sendMessage(message:string) {
    this.parentIframe().sendMessage(message)

  }

}
