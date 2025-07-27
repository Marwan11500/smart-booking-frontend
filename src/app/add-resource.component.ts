import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-resource.component.html',
  styleUrl: './add-resource.component.scss'
})
export class AddResourceComponent {
  name: string = "";
  type: string = "";

  constructor(private http: HttpClient, private router: Router){}

  addResource() {
    this.http.post('http://localhost:8080/api/resources', {
      name: this.name,
      type: this.type
    }).subscribe({
      next: () => {
        alert('✅ Resource added!');
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('❌ Failed to add resource')
    });
  }
}
