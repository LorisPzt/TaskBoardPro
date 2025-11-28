import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'Task 1'},
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },

  ];

  private lastId = 3;

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }

  addTask(title: string) {
    const newTask = { id: ++this.lastId, title };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
  }

}
