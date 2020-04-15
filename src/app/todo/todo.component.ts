import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../services/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(private route: ActivatedRoute, private service: TodoDataService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.todo = new Todo(-1, '', false, new Date());
    // tslint:disable-next-line:triple-equals
    if (this.id != 0) {
      this.service.retrieveTodo('demo', this.id).subscribe(
        response => {
          this.todo = response;
          console.log(this.todo);
        }
      );
    }
  }

  saveTodo() {
    // tslint:disable-next-line:triple-equals
    if (this.id != 0) {
      this.service.createTodo('demo', this.todo).subscribe(
        response => {
          this.router.navigate(['todos']);
        }
      );
    } else {
      this.service.updateTodo('demo', this.id, this.todo).subscribe(
        response => {
          this.router.navigate(['todos']);
        }
      );
    }
  }
}
