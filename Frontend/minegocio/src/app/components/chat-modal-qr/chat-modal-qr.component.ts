import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-modal-qr',
  standalone: true,
  imports: [],
  templateUrl: './chat-modal-qr.component.html',
  styleUrl: './chat-modal-qr.component.css',
})
export class ChatModalQrComponent {
  @Input() qrImage: string = '';
  isOpen: boolean = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}