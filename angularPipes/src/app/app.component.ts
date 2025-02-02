import { Component, OnInit } from '@angular/core';
import { StudentService } from './Services/student.service';
import { Student } from './Models/Student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [StudentService]
})
export class AppComponent implements OnInit{
  
  title = 'angularPipes';
  students : Student[] | undefined;
  totalMarks : number | undefined;

  constructor(private studentService : StudentService)
  {

  }

  ngOnInit(): void {
    this.students = this.studentService.students;
    this.totalMarks = this.studentService.totalMarks;
  }
}
