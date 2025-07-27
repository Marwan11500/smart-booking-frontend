import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  requires2FA: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor( private http: HttpClient ) { }

  register(data: { email: string; password: string; role: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string; role: string }): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`,data);
  }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('pendingEmail');
  }

  verify2FA(email: string, code: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-2fa`, { email, code });
  }
  
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roleObj = payload.role?.[0]; // assuming role is [{ authority: "ROLE_X" }]
    return roleObj?.authority?.replace('ROLE_', '') || null;
  }
  
}
