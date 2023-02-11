import { TodoModel } from './models/todo.model';
import { TodoService } from './services/todo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent, CountdownStatus } from 'ngx-countdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  addForm: FormGroup;
  title = 'ToDo';
  showPlay: boolean = false;
  paused: boolean = false;
  config: CountdownConfig;
  todos: TodoModel[];
  total: number;
  private time: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.createForm();
    this.getAll();
  }


  getAll() {
    this.todoService.getAll().subscribe({
      next: (data: TodoModel[]) => {
        this.todos = data;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
        this.getTotal();
      }
    });
  }

  changeToFinished(todo: TodoModel, timmer: CountdownComponent) {
    todo.finished = true;
    let totalTime: number;
    timmer.stop()
    if (this.time) {
      totalTime = this.round((todo.time - (this.time / 60000)));
      todo.timeForComplete = totalTime;
    }
    this.todoService.update(todo, todo.id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: error => {

      },
      complete: () => {
        this.time = undefined;
        this.getTotalAndUpdate(totalTime);
      }
    });
  }

  save() {
    let request = new TodoModel();
    request.description = this.addForm.value.desc;
    request.title = this.addForm.value.title;
    request.finished = false;
    request.paused = false;
    request.time = 30;
    request.timeForComplete = 0;
    this.todoService.addTodo(request).subscribe({
      next: (data) => {},
      complete: () => {
        this.getAll();
        this.addForm.reset();
      }
    });

  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: (data) => {},
      complete: () => {
        this.getAll();
      }
    });
  }

  updateTotal(total: number) {
    this.todoService.updateTotal(total).subscribe({
      next: (data) => {}
    });
  }
  getTotal() {
    this.todoService.getTotal().subscribe({
      next: (data: any) => {
        this.total = data.total;
      },
    });
  }

  getTotalAndUpdate(total: number) {
    this.todoService.getTotal().subscribe({
      next: (data: any) => {
        this.total = data.total + total;
      },
      complete: () => {
        this.updateTotal(this.total + total)
      }
    });
  }

  round(num: number) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  handleEvent(event: CountdownEvent, todo: TodoModel, timmer: CountdownComponent) {
    console.log(event);
    if (CountdownStatus.stop == event.status) {
      this.time = event.left;
    } else if (CountdownStatus.done == event.status) {
      todo.time = todo.time * 2;
      this.todoService.update(todo, todo.id).subscribe({
        next: (data) => {},
        error: error => {},
        complete: () => {
          timmer.restart();
        }
      });
    }
  }

  playPause(timmer: CountdownComponent, todo: TodoModel) {
    todo.paused = !todo.paused;
    if (todo.paused) {
      timmer.pause();
    } else {
      timmer.resume();
    }

  }

  private createForm() {
    this.addForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
      desc: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(150)]),

    });
  }

}
