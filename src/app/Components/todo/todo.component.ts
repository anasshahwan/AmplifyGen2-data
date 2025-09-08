import { Component, Input } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../../../../amplify/data/resource';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  client = generateClient<Schema>();
  isEditing: boolean = false;

  @Input() todoData: any;

  ngOnInit() {
    console.log(this.todoData);
  }
  startEditing() {
    console.log('Editing');
    this.isEditing = true;
  }
  cancelEditing() {
    this.isEditing = false;
  }
  async updateTodoTitle() {
    const res = await this.client.models.Todo.update({
      id: this.todoData.id,
      content: this.todoData.content,
    });
    console.log(res);
    this.isEditing = false;
  }
  async onStatuschange() {
    const res = await this.client.models.Todo.update({
      id: this.todoData.id,
      isCompleted: this.todoData.isCompleted,
    });
    console.log(res);
  }
}
