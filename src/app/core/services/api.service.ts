import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChatGptModel } from "../models/chat.model";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class ApiService {
private apiUrl: string = environment.apigpt_fe;

constructor(private http: HttpClient) {}

// Enviar consulta a ChatGPT
sendConsulta(consulta: string): Observable<string> {
  const payload = [
    {
      content: consulta,
      role: "user",
    },
  ];

  return this.http.post<string>(
    `${this.apiUrl}/ask`, // Asegúrate de que "/ask" esté definido en el backend
    payload, 
    {
      responseType: 'text' as 'json', // Asegura que se trate como texto
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).pipe(
    catchError((error: any) => {
      console.error('Error al enviar consulta:', error);
      return throwError(() => new Error('No se pudo enviar la consulta. Intenta nuevamente.'));
    })
  );
}
  

  // Obtener todas las consultas
  getAllConsultas(): Observable<ChatGptModel[]> {
    return this.http.get<ChatGptModel[]>(this.apiUrl);
  }

  // Obtener consultas activas
  getActiveConsultas(): Observable<ChatGptModel[]> {
    return this.http.get<ChatGptModel[]>(`${this.apiUrl}/active`);
  }

  // Obtener consultas inactivas
  getInactiveConsultas(): Observable<ChatGptModel[]> {
    return this.http.get<ChatGptModel[]>(`${this.apiUrl}/inactive`);
  }

  // Obtener consulta por ID
  getConsultaById(id: number): Observable<ChatGptModel> {
    return this.http.get<ChatGptModel>(`${this.apiUrl}/${id}`);
  }

  // Actualizar consulta
  updateConsulta(id: number, newConsulta: string): Observable<ChatGptModel> {
    return this.http.put<ChatGptModel>(
      `${this.apiUrl}/update/${id}`,
      newConsulta
    );
  }

  // Desactivar consulta
  deactivateConsulta(id: number): Observable<ChatGptModel> {
    return this.http.patch<ChatGptModel>(`${this.apiUrl}/deactivate/${id}`, {});
  }

  // Activar consulta
  activateConsulta(id: number): Observable<ChatGptModel> {
    return this.http.patch<ChatGptModel>(`${this.apiUrl}/activate/${id}`, {});
  }

  // Eliminar consulta
  deleteConsulta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


}
