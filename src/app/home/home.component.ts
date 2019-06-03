import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showbutton: boolean;
  error: string;
  subscription: Subscription;
  announcement = '';
  pic: any;
  showAdmin = false;


  constructor(private authService: AuthServiceService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.subscription = this.db
      .object('/data/announcement')
      .valueChanges().pipe(
        tap((res: any) => {
          console.log(res);
          this.announcement = res.C;
          this.pic = res.pic;
        })
      ).subscribe();
    this.authService.isAuthenticated$.subscribe((isAuthed) => {
      this.showbutton = isAuthed;
      this.error = this.authService.error;
      setTimeout(() => {
        this.error = '';
      }, 2000);
    });
  }

  goBack(data) {
    this.showAdmin = data;
  }

}
