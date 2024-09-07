
import {
  filterValidColors,
  createGradientString,
  truncateText,
  formatDate,
  getFormattedCentimetersToMeters,
  getFormattedMass,
} from '../../utils/helpers';

describe('Utility Functions', () => {
  describe('filterValidColors', () => {
    it('should return only valid CSS colors', () => {
      const input = 'red, blue, invalidColor';
      const result = filterValidColors(input);
      expect(result).toEqual(['red', 'blue']);
    });

    it('should return an empty array for no valid colors', () => {
      const input = 'invalidColor1, invalidColor2';
      const result = filterValidColors(input);
      expect(result).toEqual([]);
    });

    it('should handle an empty string', () => {
      const input = '';
      const result = filterValidColors(input);
      expect(result).toEqual([]);
    });
  });

  describe('createGradientString', () => {
    it('should create a gradient string with multiple colors', () => {
      const colors = ['red', 'blue'];
      const result = createGradientString(colors);
      expect(result).toBe('linear-gradient(to right, red, blue)');
    });

    it('should return a single color background if only one color is provided', () => {
      const colors = ['red'];
      const result = createGradientString(colors);
      expect(result).toBe('background-color: red');
    });

    it('should return fallback color if no colors are provided', () => {
      const colors: string[] = [];
      const result = createGradientString(colors);
      expect(result).toBe('background-color: #ffffff');
    });
  });

  describe('truncateText', () => {
    it('should truncate text to the specified length with ellipsis', () => {
      const text = 'This is a long text that needs truncation';
      const result = truncateText(text, 10);
      expect(result).toBe('This is a ...');
    });

    it('should not truncate text if it is shorter than maxLength', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);
      expect(result).toBe('Short text');
    });
  });

  describe('formatDate', () => {
    it('should format date string as DD-MM-YYYY', () => {
      const dateString = '2024-09-07T00:00:00Z';
      const result = formatDate(dateString);
      expect(result).toBe('07-09-2024');
    });

    it('should handle invalid date strings', () => {
      const dateString = 'invalid-date';
      const result = formatDate(dateString);
      expect(result).toBe('DD-MM-YYYY');
    });
  });

  describe('getFormattedCentimetersToMeters', () => {
    it('should convert centimeters to meters', () => {
      const cm = '172';
      const result = getFormattedCentimetersToMeters(cm);
      expect(result).toBe('1.72 meters');
    });

    it('should return "Unknown" for unknown value', () => {
      const cm = 'unknown';
      const result = getFormattedCentimetersToMeters(cm);
      expect(result).toBe('Unknown');
    });

    it('should return "N/A" for undefined value', () => {
      const result = getFormattedCentimetersToMeters(undefined);
      expect(result).toBe('N/A');
    });
  });

  describe('getFormattedMass', () => {
    it('should format mass with "kg"', () => {
      const mass = '77';
      const result = getFormattedMass(mass);
      expect(result).toBe('77 kg');
    });

    it('should return "Unknown" for unknown value', () => {
      const mass = 'unknown';
      const result = getFormattedMass(mass);
      expect(result).toBe('Unknown');
    });

    it('should return "N/A" for undefined value', () => {
      const result = getFormattedMass(undefined);
      expect(result).toBe('N/A');
    });
  });
});
