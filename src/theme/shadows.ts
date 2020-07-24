type Shadows = [
  'none',
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export const generateShadows = (
  lightColorRgb: number[] = [16, 37, 81],
  darkColorRgb: number[] = [4, 12, 48],
): Shadows =>
  new Array(25).fill(null).map((_, idx) => {
    if (idx === 0) return 'none';
    return `0 ${idx * 5}px ${idx * 10}px rgba(${darkColorRgb[0]}, ${
      darkColorRgb[1]
    }, ${darkColorRgb[2]}, 0.025), 0 ${idx * 15}px ${idx * 40}px rgba(${
      lightColorRgb[0]
    }, ${lightColorRgb[1]}, ${lightColorRgb[2]}, 0.2)`;
  }) as Shadows;
