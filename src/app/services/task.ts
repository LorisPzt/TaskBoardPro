import { Injectable } from '@angular/core';
import {delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'Task 1'},
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },

  ];

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }

}
