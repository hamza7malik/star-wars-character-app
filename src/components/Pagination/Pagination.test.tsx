import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const onPageChangeMock = jest.fn();

  const defaultProps = {
    currentPage: 1,
    totalPages: 9,
    onPageChange: onPageChangeMock,
  };

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  test('renders the Pagination component', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page 1 of 9')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  test('disables the Previous button on the first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  test('disables the Next button on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={9} />);
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange with the next page number when Next is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const nextButton = screen.getByLabelText('Next page');

    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with the previous page number when Previous is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const prevButton = screen.getByLabelText('Previous page');

    fireEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  test('displays the correct page information', () => {
    render(<Pagination {...defaultProps} currentPage={3} totalPages={9} />);
    expect(screen.getByText('Page 3 of 9')).toBeInTheDocument();
  });
});
