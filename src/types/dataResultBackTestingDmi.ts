export interface dataResultBackTestingDmi {
  date: string;
  action: string;
  dateResult: string;

  bougieDataMoin1Variation: number;

  bougieDataPlus1Result: {
    variation: number;
    gapHaut: number;
    gapBas: number;
  };
  bougieDataPlus2GainPerte: boolean;
  bougieDataPlus2: {
    variation: number;
    gapHaut: number;
    gapBas: number;
  };
}
