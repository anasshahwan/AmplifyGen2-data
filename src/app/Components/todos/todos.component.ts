import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [ReactiveFormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      taskTitle: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      console.log('Task:', this.todoForm.value.taskTitle);
    } else {
      console.log('field is required.');
    }
  }
}
