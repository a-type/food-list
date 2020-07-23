/// <reference types="react-scripts" />

declare module 'readable-fractions' {
  export const toReadableFraction: {
    (num: number, str: true): string;
    (num: number): { denominator: number; error: number; numerator: number };
  };
}
