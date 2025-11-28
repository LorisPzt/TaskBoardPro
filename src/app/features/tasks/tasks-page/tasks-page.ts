import {Component, inject} from '@angular/core';
import {Task} from '../../../home/core/services/task';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  imports: [
    AsyncPipe
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {

  private taskService = inject(Task);

  tasks$ = this.taskService.tasks$;


  addTask(title: string) {
    this.taskService.addTask(title.trim());
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }
}
