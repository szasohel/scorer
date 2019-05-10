import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {
  @Input() extra;
  constructor() { }

  ngOnInit() {
  }

}
