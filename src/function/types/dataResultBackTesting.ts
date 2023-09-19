export interface dataResultBackTesting {
  date: string;
  action: string;
  bougieDataPlus1Variation: number;
  bougieDataPlus2Result: {
    variation: number;
    gapHaut: number;
    gapBas: number;
  };
  bougieDataPlus3GainPerte: boolean;
  bougieDataPlus3: {
    variation: number;
    gapHaut: number;
    gapBas: number;
  };
}
