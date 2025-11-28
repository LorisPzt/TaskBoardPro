import {Component, OnInit} from '@angular/core';
import {Task} from '../services/task';
import {AsyncPipe} from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit{
  // On s'abonne au flux exposé par le service : pas besoin d'appeler getTasks()
  tasks$!: Observable<any[]>;
  count = 0;

  constructor(private task:Task) {
    // Initialisation de tasks$ avec le flux exposé par le service
    this.tasks$ = this.task.tasks$;
  }

  ngOnInit() {
    setInterval(() => {
      this.count++;
    },500);
  }

  addTask(title: string) {
    if (!title || !title.trim()) return;
    this.task.addTask(title.trim());
  }

  removeTask(id: number) {
    this.task.removeTask(id);
  }

  // Méthode utilisée par ngFor pour track par id
  trackById(index: number, item: any) {
    return item.id;
  }

}
