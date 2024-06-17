import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { Audience } from '../interfaces/Audience';
import { Group } from '../interfaces/Group';

import { AudienceService } from '../services/audience-service';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './audit-list.component.html',
  styleUrl: './audit-list.component.css'
})
export class AuditListComponent implements OnInit{

  

  audiences: Audience[] = [];
  filteredAudiences: Audience[] = [];
  faculties: string[] = [];
  groups: Group[] = [];
  selectedFaculty?: string;
  selectedGroup?: Group;

  constructor(private audienceDataService: AudienceService) {}

  ngOnInit(): void {
    this.audiences = this.audienceDataService.getAudiences();
    this.updateFilteredAudiences();
    this.faculties = [...new Set(this.audiences.map(aud => aud.faculty))];
    this.groups = [
      new Group('All Groups', 0, ''),
      new Group('First Year Engineers', 30, 'Engineering Faculty'),
      new Group('Second Year Engineers', 28, 'Engineering Faculty'),
      new Group('Software Developers', 25, 'Faculty of Computer Science'),
      new Group('Data Analysts', 20, 'Faculty of Computer Science'),
      new Group('Theoretical Mathematicians', 15, 'Mathematics Faculty'),
      new Group('Applied Mathematicians', 18, 'Mathematics Faculty'),
      new Group('Experimental Physicists', 12, 'Faculty of Physics'),
      new Group('Theoretical Physicists', 10, 'Faculty of Physics'),
      new Group('Molecular Biologists', 18, 'Biology Faculty'),
      new Group('Ecologists', 22, 'Biology Faculty'),
      new Group('Philosophy of Science', 20, 'Faculty of Humanities'),
      new Group('Literary Creatives', 15, 'Faculty of Humanities')
    ];
  this.selectedGroup = undefined;
  this.selectedFaculty = undefined;
  }

  updateFilteredAudiences() {
    let filteredAudiences = [...this.audiences];
    
    if (this.selectedFaculty) {
      filteredAudiences = filteredAudiences.filter(aud => aud.faculty === this.selectedFaculty);
    }
    
    if (this.selectedGroup && this.selectedGroup.name !== 'All Groups' && this.selectedGroup.size !== undefined && this.selectedGroup.faculty) {
      filteredAudiences = filteredAudiences.filter(aud => {
        return aud.capacity >= (this.selectedGroup?.size ?? 0) && aud.faculty === this.selectedGroup?.faculty;
      });
    }
    this.filteredAudiences = filteredAudiences;
  } 
  
  
  showAllAudiences() {
    this.selectedFaculty = undefined;
    this.selectedGroup = undefined;
    this.updateFilteredAudiences();
  }

  filterByFaculty(faculty: string | undefined) {
    this.selectedFaculty = faculty;
    this.updateFilteredAudiences();
  }
 
  sortByCapacity() {
    this.filteredAudiences = [...this.filteredAudiences].sort((a, b) => a.capacity - b.capacity);
  }

  sortByName() {
    this.filteredAudiences = [...this.filteredAudiences].sort((a, b) => a.name.localeCompare(b.name));
  }
  filterForGroup(group: Group | undefined) {
    if (group) {
      this.filteredAudiences = this.audiences?.filter(aud => aud.capacity >= group.size && aud.faculty === group.faculty);
      this.updateFilteredAudiences();
    }
  }

}
