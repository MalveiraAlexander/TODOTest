import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StopTimmerService {
  stop: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
}
