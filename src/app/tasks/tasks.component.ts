import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks = [
    {id: 1, title: ""},
    {id: 2, title: ""},
    {id: 3, title: ""},
    {id: 4, title: ""}
  ];
  myTask = {
    id: this.tasks.length + 1,
    title: ""
  };
  editingIndex: number = -1; // Initialize editingIndex to -1

  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  addTask() {
    if (this.myTask.title.trim() === "") {
      alert("Task title cannot be empty.");
      return;
    }
    this.tasks.push(this.myTask);
    this.myTask = {
      id: this.tasks.length + 1,
      title: ""
    };
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(index: number){
    this.tasks.splice(index,1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(task: {id: number, title: string}) {
    // Find the task by id and update its title
    const taskToUpdate = this.tasks.find(t => t.id === task.id);
    if (taskToUpdate) {
      taskToUpdate.title = task.title;
    }
    this.editingIndex = -1; // Reset editingIndex to -1
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
