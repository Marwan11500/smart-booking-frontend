import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { BookingService } from './core/booking.service';
import { ResourceService, Resource } from './core/resource.service';
import { BookingStateServiceService } from './core/booking-state-service.service';
@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit {
  resources: Resource[]=[];
  resourceId: number = 0;
  startTime: string = '';
  endTime: string = '';

  constructor(
    private bookingService: BookingService,
    private resourceService: ResourceService,
    private auth: AuthService,
    private bookingState: BookingStateServiceService,
    private router: Router) {}

    ngOnInit(): void {
      this.resourceService.getAll().subscribe({
        next: (data) => {
          this.resources = data;
    
          // Prefill selected resource if passed from dashboard
          const selectedId = this.bookingState.getSelectedResourceId();
          if (selectedId !== null) {
            this.resourceId = selectedId;
            this.bookingState.clear(); // clear after using
          }
        },
        error: () => alert('Failed to load resources')
      });
    }
  

  submitBooking() {
    this.bookingService.createBooking({
      resourceId: this.resourceId,
      startTime: this.startTime,
      endTime: this.endTime
    }).subscribe({
      next: () => {
        alert('✅ Booking successful!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('❌ Booking failed.');
      }
    });
  }
}
