import { Injectable } from '@angular/core';
import { Audience } from '../interfaces/Audience';
import { Group } from '../interfaces/Group';

@Injectable({
  providedIn: 'root'
})
export class AudienceService {
  private audiences: Audience[] = [
    new Audience('Lecture Hall 101', 30, 'Engineering Faculty'),
    new Audience('Laboratory 201', 20, 'Engineering Faculty'),
    new Audience('Computer Lab 301', 25, 'Faculty of Computer Science'),
    new Audience('Seminar Room 401', 20, 'Faculty of Computer Science'),
    new Audience('Lecture Hall M201', 15, 'Mathematics Faculty'),
    new Audience('Research Lab F101', 10, 'Faculty of Physics'),
    new Audience('Biology Lab B101', 18, 'Biology Faculty'),
    new Audience('Large Lecture Hall G1', 50, 'Faculty of Humanities'),
    new Audience('Lecture Room G2', 15, 'Faculty of Humanities')
  ];

  constructor() { }

  getAudiences(): Audience[] {
    return this.audiences;
  }

  getAudiencesByFaculty(faculty: string): Audience[] {
    return this.audiences.filter(audience => audience.faculty === faculty);
  }

  getSuitableAudiences(group: Group): Audience[] {
    return this.audiences.filter(audience => audience.capacity >= group.size && audience.faculty === group.faculty);
  }

  sortAudiencesByCapacity(): Audience[] {
    return [...this.audiences].sort((a, b) => a.capacity - b.capacity);
  }

  sortAudiencesByName(): Audience[] {
    return [...this.audiences].sort((a, b) => a.name.localeCompare(b.name));
  }
}