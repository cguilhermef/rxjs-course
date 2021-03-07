import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$.pipe(
            tap(() => console.log('HTTP request executed')),
            map((response) => Object.values(response['payload'])),
            shareReplay<Course[]>()
        );

        this.beginnerCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter((course) => course.category === 'BEGINNER'))
        );

        this.beginnerCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter((course) => course.category === 'BEGINNER'))
        );

    }

}
