import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookingRequest {
  resourceId: number;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(data: BookingRequest): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getMyBookings() {
    return this.http.get<any[]>('http://localhost:8080/api/bookings/my');
  }
  
}
