import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuditListComponent } from './audit-list/audit-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AuditListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auditorium';
}
