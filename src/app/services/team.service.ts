import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamList = ['Team Red', 'Team Green'];

  constructor() { }

  getTeamList() {
    return this.teamList;
  }
}
