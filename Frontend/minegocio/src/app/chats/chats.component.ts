import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common'


// Define una interfaz para la respuesta de la API
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


  showModal: boolean = false; // Controlar la visibilidad del modal
  qrImage: string = ''; 

  ngOnInit(): void {
    this.loadChats();
    this.socket();


  }

  chats: any[] = [];

  defaultChats = [
    {
      pushName: 'Leo Carnaghi Martel',
      remoteJid: 'aasdasd',
      // time: '15 min',
      profilePicUrl: '/icons/profile-image.png',
    },
   
  ];

  loadChats(): void {
    if (this.chats.length === 0) {
     
      this.chats = Array(15).fill(this.defaultChats[0]);
    }
  }

  conversations: { text: string; time: string; isSender: boolean }[] = [
    { text: 'Che que onda el navbar, esta raro este de no tener el navbar en una sola seccion', time: '20:30', isSender: false },
    { text: 'Mala suerte amigo, anda pa ya bobo', time: '20:30', isSender: true },
   
  ];


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
        const apiResponse = response as { instanceName: string; qrcode: { base64: string } }; // Assertion
        console.log('Instancia creada exitosamente:', apiResponse);
        console.log(apiResponse.qrcode.base64)
        this.qrImage = apiResponse.qrcode.base64; // Acceder a la propiedad base64 del QR
        this.showModal = true; // Abrir el modal
      },
      error: (error) => {
        console.error('Error al crear instancia:', error);
      },
    });
  }
  

  closeModal() {
    // let instanceName = 'UnaVezMas';
    // this.chatService.postSocket(instanceName).subscribe({
    //   next: (response: any) => {
    //     console.log('Socket creado exitosamente:', response);
    //     this.chats = response; 
    //     console.log(this.chats); 
    //   },
    //   error: (error) => {
    //     console.error('Error al crear socket:', error);
    //   },
    // });
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
}
