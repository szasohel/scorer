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
  total = new Total();
  batting: Array<BatsmanScore> = [];
  bowling: Array<BowlerScore> = [];
  extra = new Extra();
  constructor(inningsNumer) {
    this.inningsNumber = inningsNumer;
  }
}

export class ScoreCard {
  date = `${new Date().getMonth() +
    1}/${new Date().getDate()}/${new Date().getFullYear()}`;
  tossWinner: string;
  toss: string;
  selection: string;
  result: string;
  totalOver: number;
  firstInnings: InningsCard;
  secondInnings: InningsCard;
  constructor(totalOver, tossWinner, selection) {
    this.totalOver = totalOver;
    this.tossWinner = tossWinner;
    this.selection = selection;
    this.toss = `${tossWinner} won the toss and selected to ${selection} first`;
  }
}

export class Extra {
  total = 0;
  WD = 0;
  NB = 0;
  Bye = 0;
  Bye1 = 0;
  Bye2 = 0;
  Bye3 = 0;
  Bye4 = 0;
}
