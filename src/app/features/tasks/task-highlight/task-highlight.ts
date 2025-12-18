import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  imports: [],
  templateUrl: './task-highlight.html',
  styleUrl: './task-highlight.css',
})
export class TaskHighlight {
  @Input() taskTitle: string = '';
  @Input() taskId: number = 0;
}
