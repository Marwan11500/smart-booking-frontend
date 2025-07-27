import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ResourceService } from '../core/resource.service';
import { BookingStateServiceService } from '../core/booking-state-service.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  resources: any[] = [];

  constructor(
      private bookingState: BookingStateServiceService,
      private router: Router,
      private resourceService: ResourceService,
      public auth: AuthService
    ){}
  
  ngOnInit(): void {
    this.loadResources();
  }
  
  loadResources() {
    this.resourceService.getAll().subscribe({
      next: (res) => this.resources = res,
      error: () => alert('Failed to load resources')
    });
  }
  

  bookResource(resourceId: number) {
    this.bookingState.setSelectedResourceId(resourceId);
    this.router.navigate(['/book']);
  }

}
