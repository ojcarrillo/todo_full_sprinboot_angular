import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../services/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(public id: number, public description: string, public isDone: boolean, public targetDate: Date) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string;

  //  [
  //   new Todo(1, 'Aprender a programar angular', false, new Date()),
  //   new Todo(2, 'Mejorar mi forma de programar', false, new Date()),
  //   new Todo(3, 'Ser un experto en Spring-boot', false, new Date())
  // ];

  constructor(private service: TodoDataService, private route: Router) { }

  ngOnInit(): void {
    this.retrieveAllTodos();
  }

  deleteTodo(id) {
    this.service.deleteTodo('demo', id)
      .subscribe(response => {
        console.log(response);
        this.message = `Todo ${id} eliminado correctamente`;
        this.retrieveAllTodos();
      });
  }

  updateTodo(id) {
    this.route.navigate(['todos', id]);
  }

  retrieveAllTodos() {
    this.service.retrieveAllTodos('demo')
      .subscribe(response => {
        this.todos = response;
      });
  }

  createTodo() {
    this.route.navigate(['todos', 0]);
  }

}
