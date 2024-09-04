import { validCssColors } from './valid-css-colors';

export const filterValidColors = (colorString: string) => {
  // Convert the color string into an array
  const colorArray = colorString
    .split(',')
    .map((color) => color.trim().toLowerCase());

  // Filter out the colors that are valid in HTML/CSS
  return colorArray.filter((color) => validCssColors.includes(color));
};

export const createGradientString = (colors: string[]): string => {
  if (colors.length === 0) {
    // Fallback color if no valid colors are found
    return 'background-color: #ffffff'; // Use a CSS color string instead of an inline style
  }

  if (colors.length === 1) {
    // Single color fallback
    return `background-color: ${colors[0]}`;
  }

  // Convert color names to valid CSS color values
  const gradientColors = colors.join(', ');

  return `linear-gradient(to right, ${gradientColors})`;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
