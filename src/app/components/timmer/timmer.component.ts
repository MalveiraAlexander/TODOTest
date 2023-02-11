import { StopTimmerService } from './../../services/stop-timmer.service';
import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'timmer',
  templateUrl: './timmer.component.html',
  styleUrls: ['./timmer.component.scss']
})
export class TimmerComponent implements OnInit {
  @Input() limitMin: number;
  // @Output() stop: EventEmitter<boolean> = new EventEmitter<boolean>();
  TIME_LIMIT = 10;
  FULL_DASH_ARRAY = 283;
  WARNING_THRESHOLD = 10;
  ALERT_THRESHOLD = 5;

  COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: this.WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: this.ALERT_THRESHOLD
    }
  };

  timePassed = 0;
  timeLeft = this.TIME_LIMIT;
  timerInterval = null;
  remainingPathColor = this.COLOR_CODES.info.color;


  ngOnInit(): void {
    this.TIME_LIMIT = this.limitMin * 60;
    this.startTimer();
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  startTimer() {
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;
        document.getElementById("base-timer-label").innerHTML = this.formatTime(
          this.timeLeft
        );
        this.setCircleDasharray();
        this.setRemainingPathColor(this.timeLeft);

        if (this.timeLeft === 0) {
          this.onTimesUp();
        }
      }, 1000);
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = `${time % 60}`;

    if (Number(seconds) < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = this.COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}
