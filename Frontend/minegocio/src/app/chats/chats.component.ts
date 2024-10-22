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

  ngOnInit(): void {}

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
    let instanceName = 'OtraVez';
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
    this.showModal = false; // Cerrar el modal
  }
}
