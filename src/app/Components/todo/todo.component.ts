import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() todoData: any;

  ngOnInit() {
    console.log(this.todoData);
  }
}
