import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from './core/booking.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent implements OnInit{
  bookings: any[] = [];

  constructor(
    private bookingService: BookingService,
    public auth: AuthService
  ){}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (res) => this.bookings = res,
      error: () => alert('Failed to load bookings')
    });
  }
}
