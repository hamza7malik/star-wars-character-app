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
