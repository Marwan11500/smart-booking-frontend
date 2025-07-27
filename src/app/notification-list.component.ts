import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification-list',
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent implements OnInit{
  notifications: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/notifications')
      .subscribe({
        next: (res) => this.notifications = res,
        error: () => alert('❌ Failed to load notifications')
      });
  }
}
