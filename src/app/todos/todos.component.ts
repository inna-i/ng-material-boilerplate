import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todosService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);

  ngOnInit(): void {
    this.todosService.loadTodos()
      .pipe(
        catchError(err => {
          console.error('Error loading todos', err);
          return [];
        })
      ).subscribe(todos => {
        this.todoItems.set(todos);
      });
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update(todos => {
      return todos.map(todo => {
        if (todo.id === todoItem.id) {
          return {...todoItem, completed: !todoItem.completed};
        }
        return todo;
      });
    });
  }
}
