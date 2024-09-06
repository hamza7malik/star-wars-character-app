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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getFormattedCentimetersToMeters = (cm: string | undefined) => {
  if (cm === 'unknown') {
    return 'Unknown';
  }
  return cm ? `${Number(cm) / 100} meters` : 'N/A';
};

export const getFormattedMass = (mass: string | undefined) => {
  if (mass === 'unknown') {
    return 'Unknown';
  }
  return mass ? `${mass} kg` : 'N/A';
};
