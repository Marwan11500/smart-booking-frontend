import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingStateServiceService {
  private selectedResourceId: number | null = null;

  setSelectedResourceId(id: number): void{
    this.selectedResourceId=id;
  }

  getSelectedResourceId(): number | null {
    return this.selectedResourceId;
  }

  
  clear():void{
    this.selectedResourceId = null;
  }
}
