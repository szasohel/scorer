import { ScoreCardService } from 'src/app/services/score-card.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showbutton: boolean;
  constructor(
    private dialog: MatDialog,
    private authService: AuthServiceService,
    private score: ScoreCardService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuthed => {
      this.dialog.closeAll();
      this.showbutton = isAuthed;
    });
    // this.score
    //   .retrieveScoreCard()
    //   .valueChanges()
    //   .subscribe(res => {
    //     console.log(res);
    //   });
  }
  onSignIn() {
    this.dialog.open(SignInComponent);
  }

  onSignOut() {
    this.authService.logout();
  }
}
