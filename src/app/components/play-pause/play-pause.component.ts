import { EventEmitter, Input, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'play-pause-btn',
  templateUrl: './play-pause.component.html',
  styleUrls: ['./play-pause.component.scss']
})
export class PlayPauseComponent implements OnInit {
  @Output() paused: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isPaused: boolean;

  ngOnInit(): void {

  }

  toggle() {
    this.paused.emit(this.isPaused);
  }
}
