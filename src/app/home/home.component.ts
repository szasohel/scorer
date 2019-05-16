import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showbutton: boolean;
  error: string;

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthed) => {
      this.showbutton = isAuthed;
      this.error = this.authService.error;
      setTimeout(() => {
        this.error = '';
      }, 2000);
    });
  }

}
