import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  announcement: FormControl;
  heroImage: FormControl;
  @Output() goBack = new EventEmitter();

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.announcement = new FormControl();
    this.heroImage = new FormControl();
  }

  onSave() {
    if (this.announcement.value) {
      this.db.object('/data/announcement').update({ C: this.announcement.value });
    } else if (this.announcement.value) {
      this.db.object('/data/announcement/pic').update({ pic: this.heroImage.value });
    } else {
      this.db.object('/data/announcement').set({
        pic: this.heroImage.value,
        announcement: this.announcement.value
      });
    }
    this.goBack.emit(false);
  }

  onCancel() {
    this.goBack.emit(false);
  }
}
