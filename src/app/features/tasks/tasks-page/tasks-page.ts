import {Component, inject, ViewChild, ViewContainerRef} from '@angular/core';
import {Task} from '../../../home/core/services/task';
import {AsyncPipe} from '@angular/common';
import {TaskHighlight} from '../task-highlight/task-highlight';

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

  @ViewChild('highlightContainer', { read: ViewContainerRef }) highlightContainer!: ViewContainerRef;

  tasks$ = this.taskService.tasks$;


  addTask(title: string) {
    this.taskService.addTask(title.trim());
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }

  highlightTask(taskId: number, taskTitle: string) {
    this.highlightContainer.clear();

    const componentRef = this.highlightContainer.createComponent(TaskHighlight);

    componentRef.instance.taskId = taskId;
    componentRef.instance.taskTitle = taskTitle;
  }
}
