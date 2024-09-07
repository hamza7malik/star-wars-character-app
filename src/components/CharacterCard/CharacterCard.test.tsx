import { render, fireEvent, screen } from '@testing-library/react';
import { createGradientString, filterValidColors } from '@/src/utils/helpers';
import CharacterCard, { CharacterCardProps } from './CharacterCard';

describe('CharacterCard', () => {
  let props: CharacterCardProps;
  beforeEach(() => {
    props = {
      id: '1',
      name: 'Luke Skywalker',
      specieColors: ['green', 'yellow'],
      imageUrl: 'https://picsum.photos/200/300',
      onClick: jest.fn(),
    };
  });

  //Each card should include the character's name and a randomly sourced picture
  test('renders CharacterCard with correct props', () => {
    const { getByAltText, getByText } = render(<CharacterCard {...props} />);
    expect(getByAltText('Luke Skywalker image')).toBeInTheDocument();
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
  });

  //Color the cards based on the character's species
  test('applies the correct gradient background style based on character species', () => {
    const { container } = render(<CharacterCard {...props} />);
    const card = container.firstChild as HTMLElement;

    const validColors = filterValidColors(props.specieColors.join(','));
    const gradientStyle = createGradientString(validColors);

    expect(card).toHaveStyle(`background: ${gradientStyle}`);
  });

  //Implement a hover animation effect for the cards.
  test('applies hover effects', () => {
    const { container } = render(<CharacterCard {...props} />);
    const card = container.firstChild as HTMLElement;

    card.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

    expect(card).toHaveClass('hover:shadow-xl');
    expect(card).toHaveClass('hover:scale-95');
  });

  test('applies fallback background color if no valid colors are provided', () => {
    const propsWithNoColors = {
      ...props,
      specieColors: [],
    };

    const { container } = render(<CharacterCard {...propsWithNoColors} />);
    const card = container.firstChild as HTMLElement;

    expect(card).toHaveStyle('background: background-color: #ffffff');
  });

  // long card name should be truncated
  test('truncates long names', () => {
    const longNameProps = {
      ...props,
      name: 'A very long name that should be truncated', 
    };

    render(<CharacterCard {...longNameProps} />);

    const truncatedText = screen.getByTestId('card-name').textContent;
    const expectedText = 'A very long name tha...';

    expect(truncatedText).toBe(expectedText);
  });

  //Upon clicking a character card, open a modal displaying detailed information about the character

  test('calls onClick when the card is clicked', () => {
    const onClickMock = jest.fn();
    props.onClick = onClickMock;

    render(<CharacterCard {...props} />);

    const cardElement = screen.getByTestId('character-card');
    fireEvent.click(cardElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
