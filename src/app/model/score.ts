export class BatsmanScore {
  name?: string;
  run = 0;
  out?: string;
  bowler?: string;
  ball = 0;
  fours = 0;
  sixes = 0;
  dots = 0;
  strikeRate = 0;
  active ? = true;
  strike?: boolean;

  constructor(name, strike) {
    this.name = name;
    this.strike = strike;
  }
}

export class BowlerScore {
  name?: string;
  over = 0;
  ball ? = 0;
  run = 0;
  wicket = 0;
  fours = 0;
  sixes = 0;
  dots = 0;
  economyRate = 0;
  active ? = true;

  constructor(name) {
    this.name = name;
  }
}

export class Total {
  run = 0;
  wicket = 0;
  runRate = 0;
  over = 0;
  ball = 0;
}

export class Score {
  type: string;
  outType?: string;
  run?: any;
}

export class InningsCard {
  inningsNumber: number;
  total: Total;
  batting: Array<BatsmanScore> = [];
  bowling: Array<BowlerScore> = [];
  constructor(inningsNumer) {
    this.inningsNumber = inningsNumer;
  }
}

export class ScoreCard {
  toss: string;
  selection: string;
  result: string;
  firstInnings: InningsCard;
  secondInnings: InningsCard;
}
