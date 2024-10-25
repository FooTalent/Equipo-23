import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
// import { WebsocketService } from '../services/websocket.service';


interface ApiResponse {
  instanceName: string;
  qrcode: {
    base64: string;
  };
}

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  private chatService = inject(ChatService);
// private websocketService = inject(WebsocketService);

  showModal: boolean = false; // Controlar la visibilidad del modal
  qrImage: string = '';

  ngOnInit(): void {
    this.loadChats();
    this.socket();
//  this.setupWebSocket()
  }

  chats: any[] = [];
  conversations: any[] = [];
  message: any = {};
  receivedMessages: any[] = [];

  defaultChats = [
    {
      pushName: 'WhatsApp',
      remoteJid: 'aasdasd',
      // time: '15 min',
      profilePicUrl: '',
    },
  ];

  defaultMessages = [
    {
      fromMe: false,
      remoteJid: '5491136285894@s.whatsapp.net',
      message:
        'Che que onda el navbar, esta raro este de no tener el navbar en una sola seccion',
      messageTimestamp: 1727913110,
    },
    {
      fromMe: true,
      remoteJid: '5491136285894@s.whatsapp.net',
      message: 'Mala suerte amigo, anda pa ya bobo',
      messageTimestamp: 1727828288,
    },
  ];

  defaultMessage = {
    pushName: 'WhatsApp',
    remoteJid: 'aasdasd',
    profilePicUrl: '',
  };

  loadChats(): void {
    if (this.chats.length === 0) {
      this.chats = Array(15).fill(this.defaultChats[0]);
    }
  }

  getMessages() {
    return this.conversations.length > 0
      ? this.conversations
      : this.defaultMessages;
  }

  getMesage() {
    return this.message.length > 0 ? this.message : this.defaultMessage;
  }

  scrollToRight() {
    const element = document.getElementById('messages-box');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
    }
  }
  scrollToLeft() {
    const element = document.getElementById('messages-box');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }

  createInstance() {
    let instanceName = 'UnaVezMas';
    this.chatService.postInstance(instanceName).subscribe({
      next: (response) => {
        const apiResponse = response as {
          instanceName: string;
          qrcode: { base64: string };
        };
        console.log('Instancia creada exitosamente:', apiResponse);
        console.log(apiResponse.qrcode.base64);
        this.qrImage = apiResponse.qrcode.base64;
        this.showModal = true;
      },
      error: (error) => {
        console.error('Error al crear instancia:', error);
      },
    });
  }

  closeModal() {
    this.showModal = false; // Cerrar el modal
  }

  socket() {
    let instanceName = 'UnaVezMas';
    this.chatService.postSocket(instanceName).subscribe({
      next: (response: any) => {
        console.log('Socket creado exitosamente:', response);
        this.chats = response;
        console.log(this.chats);
      },
      error: (error) => {
        console.error('Error al crear socket:', error);
      },
    });
  }

  conversation(remoteJid: string, pushName: string, profilePicUrl: string) {
    let instanceName = 'UnaVezMas';
    this.message = {
      remoteJid,
      pushName,
      profilePicUrl,
    };

    this.chatService.postConversation(instanceName, remoteJid).subscribe({
      next: (response: any) => {
        console.log('Conversación creada exitosamente:', response);
        this.conversations = response.records.slice().reverse();
        console.log(this.conversations);
      },
      error: (error) => {
        console.error('Error al crear conversación:', error);
      },
    });
  }

  chat(message: string) {
    let instanceName = 'UnaVezMas';
    let remoteJid = this.message.remoteJid;

    this.chatService.postChat(instanceName, remoteJid, message).subscribe({
      next: (response: any) => {
        
        console.log('Mensaje enviado exitosamente:', response);
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
      },
    });
  }

  // setupWebSocket() {
  //   this.websocketService.messages$.subscribe((data) => {
  //     console.log('Mensaje recibido:', data);
  //     this.receivedMessages.push(data); // Agregar el nuevo mensaje a la lista
  //   });
  // }
}
