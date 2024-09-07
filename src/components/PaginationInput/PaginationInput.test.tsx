import { render, screen, fireEvent } from '@testing-library/react';
import PaginationInput from './PaginationInput';

describe('PaginationInput Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('renders input with the current page value', () => {
    render(<PaginationInput onPageChange={mockOnPageChange} currentPage={3} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('3');
  });

  test('updates input value on typing', () => {
    render(<PaginationInput onPageChange={mockOnPageChange} currentPage={3} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '5' } });

    expect(input).toHaveValue('5');
  });

  test('calls onPageChange with correct value when input is changed', () => {
    render(<PaginationInput onPageChange={mockOnPageChange} currentPage={3} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '4' } });

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test('prevents page change when input is out of bounds', () => {
    render(<PaginationInput onPageChange={mockOnPageChange} currentPage={3} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '10' } });

    // Input value should not change if it exceeds allowed max page
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test('clears input if an invalid value is entered', () => {
    render(<PaginationInput onPageChange={mockOnPageChange} currentPage={3} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });

    // Empty input should not call onPageChange
    expect(input).toHaveValue('');
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
