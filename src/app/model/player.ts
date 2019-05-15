import { BatsmanScore, BowlerScore } from './score';
export class Player {
  name: string;
  match: number;
  id: number;
  batting: BatsmanScore;
  bowling: BowlerScore;
}

export class TeamList {
  teamGreen: Array<string>;
  teamRed: Array<string>;
}
