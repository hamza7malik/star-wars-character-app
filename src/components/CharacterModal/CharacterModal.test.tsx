import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterModal from '../CharacterModal/CharacterModal';
import { fetchHomeworld } from '@/src/utils/api';
import { Character } from '@/src/types/types';
import '@testing-library/jest-dom';
import {
  getFormattedCentimetersToMeters,
  formatDate,
  getFormattedMass,
} from '../../utils/helpers';
jest.mock('../../utils/api', () => ({
  fetchHomeworld: jest.fn(),
}));

const character: Character = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: ['https://swapi.dev/api/films/1/'],
  species: [],
  vehicles: [],
  starships: ['https://swapi.dev/api/starships/2/'],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

// Mock homeworld data
const homeworldData = {
  name: 'Tatooine',
  terrain: 'desert',
  climate: 'arid',
  residents: ['https://swapi.dev/api/people/1/'],
};

describe('CharacterModal', () => {
  beforeEach(() => {
    (fetchHomeworld as jest.Mock).mockResolvedValue(homeworldData);
  });

  test('renders modal with character details', async () => {
    await act(async () => {
      render(
        <CharacterModal
          open={true}
          closeCharacterModal={() => {}}
          character={character}
        />
      );
    });

    // Display the character's name as the modal header.
    await waitFor(() => {
      expect(screen.getByTestId('character-modal-header')).toHaveTextContent(
        character.name
      );
    });

    // Include information about the character's height (in meters), mass (in
    // kg), birth year, and the date the person was added to the API (in
    // dd-MM-yyyy format).
    expect(
      screen.getByText(
        `Height: ${getFormattedCentimetersToMeters(character.height)}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Mass: ${getFormattedMass(character.mass)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Birth Year: ${character.birth_year}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Date Created: ${formatDate(character.created)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Number of Films: ${character.films.length}`)
    ).toBeInTheDocument();

    // Fetch and display information about the character's homeworld
    await waitFor(() => {
      expect(
        screen.getByText(`Name: ${homeworldData.name}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Terrain: ${homeworldData.terrain}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Climate: ${homeworldData.climate}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Residents: ${homeworldData.residents.length}`)
      ).toBeInTheDocument();
    });
  });

  test('closes modal on button click', async () => {
    const closeCharacterModal = jest.fn();
    await act(async () => {
      render(
        <CharacterModal
          open={true}
          closeCharacterModal={closeCharacterModal}
          character={character}
        />
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(closeCharacterModal).toHaveBeenCalledTimes(1);
  });

  test('shows loading indicator while fetching homeworld data', async () => {
    (fetchHomeworld as jest.Mock).mockReturnValue(new Promise(() => {}));

    await act(async () => {
      render(
        <CharacterModal
          open={true}
          closeCharacterModal={() => {}}
          character={character}
        />
      );
    });

    // loading indicator tisplayed initially
    expect(screen.getByTestId('linear-loading')).toBeInTheDocument();

    // homeworld data not to be displayed during loading
    await waitFor(() => {
      expect(
        screen.queryByText(`Name: ${homeworldData.name}`)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Terrain: ${homeworldData.terrain}`)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Climate: ${homeworldData.climate}`)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(`Residents: ${homeworldData.residents.length}`)
      ).not.toBeInTheDocument();
    });
  });
});
