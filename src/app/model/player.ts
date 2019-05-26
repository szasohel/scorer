import { BatsmanScore, BowlerScore } from './score';
export class Player {
  name: string;
  match = 0;
  id: number;
  batting = new BatsmanScore(null, null);
  bowling = new BowlerScore(null);
  pic: string;
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

export class TeamList {
  teamGreen: Array<string>;
  teamRed: Array<string>;
}
