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
  active ?= true;
  strike?: boolean;

  constructor(name, strike) {
    this.name = name;
    this.strike = strike;
  }
}

export class BowlerScore {
  name?: string;
  over = 0;
  ball ?= 0;
  run = 0;
  wicket = 0;
  fours = 0;
  sixes = 0;
  dots = 0;
  economyRate = 0;
  active ?= true;

  constructor(name) {
    this.name = name;

  }
}

export class Total {
  run: number;
  wicket: number;
  runRate: number;
  over: number;
  ball: number;
}

export class Score {
  type: string;
  outType?: string;
  bowler?: string;
  run: any;
}

export class InningsCard {
  inningsNumber: number;
  batting: Array<BatsmanScore>;
  bowling: Array<BowlerScore>;
}

export class ScoreCard {
  toss: string;
  selection: string;
  result: string;
  firstInnings: InningsCard;
  secondInnings: InningsCard;
}
