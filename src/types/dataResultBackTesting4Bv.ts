export interface dataResultBackTesting4Bv {
  dateDebutPattern: string;
  action: string;
  dateResult: string;
  bougieDataResult: {
    variation: number;
    gapHaut: number;
    gapBas: number;
  };
  bougieDataPlus1GainPerte: boolean;
  bougieDataPlus1: {
    variation: number;
    gapHaut: number;
    gapBas: number;
  };
}
