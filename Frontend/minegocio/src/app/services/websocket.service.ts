import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private messageSubject = new Subject<any>();
  public messages$ = this.messageSubject.asObservable();
  apiUrl = import.meta.env['NG_APP_API_URL'];

  constructor() {
    this.socket = io(`${this.apiUrl}`, {
      withCredentials: true // Permite el envío de cookies y credenciales
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    this.socket.on('messages.upsert', (data) => {
      console.log('Actualización de chats:', data);
      this.messageSubject.next(data); 
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
    });
  }


}
