import {Component, OnInit} from '@angular/core';
import {Task} from '../services/task';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  tasks$! : ReturnType<Task['getTasks']>;
  count = 0;

  constructor(private task:Task) {
    this.tasks$ = this.task.getTasks();
  }

  ngOnInit() {
    setInterval(() => {
      this.count++;
    },500);
  }



}
