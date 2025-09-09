import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos',
  imports: [ReactiveFormsModule, TodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoForm: FormGroup;
  client = generateClient<Schema>();
  todos: any[] = [];

  ngOnInit() {
    //  this.listTodos();
    //  this.getTodoById('2910xa92');
    this.listTodoRealTime();
  }
  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      taskTitle: ['', Validators.required],
    });
  }

  async insertNewTodo() {
    const res = await this.client.models.Todo.create({
      content: this.todoForm.value.taskTitle,
      isCompleted: false,
    });
    console.log(res);
  }

  async listTodoRealTime() {
    this.client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        this.todos = data.items;
      },
    });
  }
  async listTodos() {
    const res = await this.client.models.Todo.list();
    this.todos = res.data;
  }

  async getTodoById(todoId: string) {
    const res = await this.client.models.Todo.get({ id: todoId });
    console.log(res);
  }

  onSubmit() {
    if (this.todoForm.valid) {
      console.log('Task:', this.todoForm.value.taskTitle);
      this.insertNewTodo();
    } else {
      console.log('field is required.');
    }
  }
}
