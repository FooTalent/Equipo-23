import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  apiUrl = import.meta.env['NG_APP_API_URL'];
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('user_token'),
  });

  postInstance(instanceName: string) {
    return this.http.post(
      `${this.apiUrl}/api/evolutionApi/instance/create/${instanceName}`,
      {},
      { headers: this.headers }
    );
  }

  postSocket(instanceName: string) {
    return this.http.post(
      `${this.apiUrl}/api/evolutionApi/socket/create/${instanceName}`,
      {},
      { headers: this.headers }
    ) 
  }

  postConversation(instanceName: string, remoteJid: string) {
    return this.http.post(
      `${this.apiUrl}/api/evolution/chat/findMessages/${instanceName}/${remoteJid}`,
      {},
      { headers: this.headers }
    );
    
  }

  postChat(instanceName: string, remoteJid: string, message: string) {
    return this.http.post(
      `${this.apiUrl}/api/evolution/chat/sendMessage/${instanceName}/${remoteJid}/${message}`,
      {},
      { headers: this.headers }
    );
  }

}