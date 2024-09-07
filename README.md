# Star Wars Character App

A Star Wars Character App using SWAPI
(The Star Wars API) built with **NEXT JS**, **TypeScript**, **Tailwind CSS**, and **JEST**.

## Features

- Gradient Colored Cards: The character cards' background colors are based on the character's species properties such as hair color, skin color, and eye color.

Example of the gradient generation logic:

```bash
export const createGradientString = (colors: string[]): string => {
  if (colors.length === 0) {
    // Fallback color if no valid colors are found
    return 'background-color: #ffffff';
  }

  if (colors.length === 1) {
    // Single color fallback
    return `background-color: ${colors[0]}`;
  }

  // Convert color names to valid CSS color values
  const gradientColors = colors.join(', ');

  return `linear-gradient(to right, ${gradientColors})`;
};
```

- Character List
- Character Detail Modal
- Linear Loading Indigator
- Pagination
- Coding standards and best practices:   kiss, dry, tda, soc, yagni
- Memoization

## Test Coverage

```bash
-----------------------------------|---------|----------|---------|---------|-------------------
File                               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------------|---------|----------|---------|---------|-------------------
All files                          |   98.34 |    95.77 |    82.6 |   98.34 |
 app                               |   94.79 |      100 |      20 |   94.79 |
  page.tsx                         |   94.79 |      100 |      20 |   94.79 | 30-31,34-36
 components/CharacterCard          |     100 |      100 |     100 |     100 |
  CharacterCard.tsx                |     100 |      100 |     100 |     100 |
 components/CharacterModal         |   97.05 |       90 |     100 |   97.05 |
  CharacterModal.tsx               |   97.05 |       90 |     100 |   97.05 | 51-52,117-118
 components/InfoItem               |     100 |      100 |     100 |     100 |
  InfoItem.tsx                     |     100 |      100 |     100 |     100 |
 components/LinearLoadingIndicator |     100 |      100 |     100 |     100 |
  LinearLoadingIndicator.tsx       |     100 |      100 |     100 |     100 |
 components/Pagination             |     100 |      100 |     100 |     100 |
  Pagination.tsx                   |     100 |      100 |     100 |     100 |
 components/PaginationInput        |     100 |      100 |     100 |     100 |
  PaginationInput.tsx              |     100 |      100 |     100 |     100 |
 components/Saperator              |     100 |      100 |     100 |     100 |
  Saperator.tsx                    |     100 |      100 |     100 |     100 |
 components/SkeletonCard           |     100 |      100 |     100 |     100 |
  SkeletonCard.tsx                 |     100 |      100 |     100 |     100 |
 hooks                             |   94.87 |       75 |     100 |   94.87 |
  useCharacters.tsx                |   94.87 |       75 |     100 |   94.87 | 20-21
 utils                             |     100 |      100 |     100 |     100 |
  helpers.tsx                      |     100 |      100 |     100 |     100 |
  valid-css-colors.ts              |     100 |      100 |     100 |     100 |
-----------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 6 passed, 6 total
Tests:       38 passed, 38 total
Snapshots:   0 total
Time:        8.426 s
```

## Project Setup

### Installation

Clone the repository:

```bash
git clone https://github.com/hamza7malik/star-wars-character-app.git
cd star-wars-character-app
```

Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

### Deployment

The application is deployed on Vercel. Visit https://star-wars-characters-directory.vercel.app/

### Contributing

Feel free to open issues or submit pull requests.

### License

This project is licensed under the MIT License.
