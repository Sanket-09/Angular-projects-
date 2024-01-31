import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';
import { CoursesComponent } from 'src/app/courses/courses.component';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  courseService = inject(CourseService)
  popularCourses: Course[] = [];

  router:Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute); //injecting the activated routes
  

  navigateToCourses(){
    // this.router.navigate(['courses']);
    this.router.navigateByUrl('courses');
  }

  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }
}
