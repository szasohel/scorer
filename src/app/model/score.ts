export class BatsmanScore {
  name: string;
  run: number;
  out?: boolean;
  bowler?: string;
  ball: number;
  fours: number;
  sixes: number;
  dots: number;
  strikeRate: number;
  active: boolean;
}

export class BowlerScore {
  name: string;
  over: number;
  match: number;
  run: number;
  wicket: number;
  fours: number;
  sixes: number;
  dots: number;
  economyRate: number;
  active: boolean;
}

export class Total {
  Run: number;
  wicket: number;
  runRate: number;
}
