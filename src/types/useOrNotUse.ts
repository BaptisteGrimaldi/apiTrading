export interface UseOrNotUse {
  minRsi: () => boolean;
  maxRsi: () => boolean;
  stochastiqueSlowKmin: () => boolean;
  stochastiqueSlowKmax: () => boolean;
  ecartSlowkSlowd: () => boolean;
  macd: () => boolean;
}
