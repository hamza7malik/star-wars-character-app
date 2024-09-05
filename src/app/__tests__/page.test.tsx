import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { fetchCharacters } from '@/src/utils/api';

jest.mock('../../utils/api', () => ({
  fetchCharacters: jest.fn(),
}));

describe('Page Component', () => {
  const mockCharacters = [
    {
      name: 'Luke Skywalker',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      url: 'https://swapi.dev/api/people/1/',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading indicator and skeleton cards when loading', async () => {
    (fetchCharacters as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 1,
    });

    render(<Page />);

    // Expect loading indicator to be displayed
    expect(screen.getByTestId('linear-loading')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(10);

    // Simulate the promise resolution for fetchCharacters
    await waitFor(() => screen.getByText('Luke Skywalker'));

    // Check that the SkeletonCard is no longer visible after loading is done
    expect(screen.queryByTestId('skeleton-card')).not.toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('displays character cards after fetching is complete', async () => {
    (fetchCharacters as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 1,
    });

    render(<Page />);

    // Ensure the loading state is shown
    expect(screen.getByTestId('linear-loading')).toBeInTheDocument();

    // Simulate the API call
    await waitFor(() => screen.getByText('Luke Skywalker'));

    // Ensure the character card appears after loading
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByAltText('Luke Skywalker image')).toBeInTheDocument();
  });
});
