import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showbutton: boolean;
  constructor(private dialog: MatDialog, private authService: AuthServiceService) {
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthed) => {
      this.dialog.closeAll();
      this.showbutton = isAuthed;
    });
  }
  onSignIn() {
    this.dialog.open(SignInComponent);
  }

  onSignOut() {
    this.authService.logout();
  }
}
