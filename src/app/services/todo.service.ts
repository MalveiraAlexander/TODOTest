import { TodoModel } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private URL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.URL}/todos`);
  }

  update(todoModel: TodoModel, id: number) {
    return this.http.put(`${this.URL}/todos/${id}`, todoModel);
  }

  getTotal() {
    return this.http.get(`${this.URL}/total`);
  }

  updateTotal(total: number) {
    return this.http.put(`${this.URL}/total`, {total: total});
  }

  addTodo(todoModel: TodoModel) {
    return this.http.post(`${this.URL}/todos`, todoModel);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.URL}/todos/${id}`);
  }
}
