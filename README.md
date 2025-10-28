# Contact Demo Application

A modern contact management application built with React and Material-UI.

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (version 16 or higher)
- npm (usually comes with Node.js) or Yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/OliverHuX/contact-demo.git
cd contact-demo
```

2. Install dependencies:

Using npm:
```bash
npm install
```

Using Yarn:
```bash
yarn
```

## Development

To run the application in development mode:

Using npm:
```bash
npm run dev
```

Using Yarn:
```bash
yarn dev
```

This will start the development server. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload automatically when you make changes to the code.

## Building for Production

To create a production build:

Using npm:
```bash
npm run build
```

Using Yarn:
```bash
yarn build
```

This will create a `dist` folder with the optimized production build.

To preview the production build locally:

Using npm:
```bash
npm run preview
```

Using Yarn:
```bash
yarn preview
```

## Project Structure

```
src/
  ├── assets/         # Static assets
  ├── components/     # React components
  │   ├── ContactCard.jsx
  │   └── DetailsDialog.jsx
  ├── App.jsx         # Default React App component
  ├── ContactsApp.jsx # Main contacts application
  └── main.jsx        # Application entry point
```

## Technologies Used

- React 19
- Vite
- Material-UI (MUI)

## Scripts

Using npm:
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

Using Yarn:
- `yarn dev` - Start development server
- `yarn build` - Create production build
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint for code quality
