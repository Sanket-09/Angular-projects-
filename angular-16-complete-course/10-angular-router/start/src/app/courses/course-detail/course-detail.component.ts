import { Component ,inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent{
  selectedCourse : Course;
  courseId : number;

  courseService : CourseService = inject(CourseService)  
  activatedRoute : ActivatedRoute = inject(ActivatedRoute); 

  ngOnInit(){
    // this.courseId = this.activatedRoute.snapshot.params['id'];

    // this.courseId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.params.subscribe((data) => {
      this.courseId = +data['id'];
      this.selectedCourse = this.courseService.courses.find( course => course.id === this.courseId);
    })
    

  }
}
