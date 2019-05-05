export class BatsmanScore {
  name?: string;
  run: number;
  out?: string;
  bowler?: string;
  ball: number;
  fours: number;
  sixes: number;
  dots: number;
  strikeRate: number;
  active?: boolean;
}

export class BowlerScore {
  name?: string;
  over: number;
  run: number;
  wicket: number;
  fours: number;
  sixes: number;
  dots: number;
  economyRate: number;
  active?: boolean;
}

export class Total {
  Run: number;
  wicket: number;
  runRate: number;
}

export class Score {
  type: string;
  outType?: string;
  bowler?: string;
  run: number;
}
