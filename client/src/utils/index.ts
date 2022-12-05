export const getRandomFromRange = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const isRandomBooleanEqTrue = (): boolean => Math.random() > 0.5;
