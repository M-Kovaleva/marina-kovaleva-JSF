# Modo — Online Gift Shop

Exclusive Gifts Shop - front-end e-commerce interface a client-side website for an online store selling exclusive gifts. 

Live demo: [marina-kovaleva-jsf.vercel.app](https://marina-kovaleva-jsf.vercel.app/)

## About the project

A responsive e-commerce frontend built as a course project at Noroff, using React, TypeScript, React Router, and Bootstrap.
The project fetches products from the Noroff Online Shop API and lets users browse, search, view product details, manage a cart, and complete a mock checkout. All product data comes from the [Noroff Online Shop API](https://docs.noroff.dev/docs/v2/basic/online-shop).

## Features

- Product catalog fetched from a live API
- Live search / filtering by product title
- Product details page with description, tags, rating, and reviews
- Shopping cart with adjustable quantities and item removal
- Cart persisted in `localStorage`, shared across the app via React Context
- Toast notifications for cart actions (add / remove)
- Checkout flow ending in a confirmation page
- Contact page with validated form (name, subject, email, message)
- Loading and error states for all API requests
- Fully responsive layout (desktop, tablet, mobile)
- Accessible markup (labelled controls, `alt` text, ARIA attributes)

## Built with

- [React](https://react.dev/) — component-based UI
- [TypeScript](https://www.typescriptlang.org/) — static typing
- [Vite](https://vite.dev/) — build tool and dev server
- [React Router](https://reactrouter.com/) — client-side routing
- [Bootstrap 5](https://getbootstrap.com/) — layout and styling
- React Context — shared shopping cart state
- ESLint + Prettier — code quality and formatting

## Pages

| Page              | Route            |
| ----------------- | ---------------- |
| Home / Catalog    | `/`              |
| Product details   | `/product/:id`   |
| Cart              | `/cart`          |
| Checkout success  | `/success`       |
| Contact           | `/contact`       |

## Project structure

src/
├── components/ — reusable UI components (ProductCard, FormField, CtaButton, ...)
├── context/ — CartContext / CartProvider (global cart state)
├── hooks/ — custom hooks (useCart, useFetch)
├── pages/ — one component per route
├── services/ — API calls (productService)
└── types/ — shared TypeScript types

## Getting started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

git clone <https://github.com/M-Kovaleva/marina-kovaleva-JSF>

2. Navigate to the project directory:

cd marina-kovaleva-JSF

3. Install dependencies:

npm install

4. Start the development server:

npm run dev

5. Open the local address shown in the terminal (usually `http://localhost:5173`).

### Other scripts

npm run build # production build
npm run lint # check code with ESLint
npm run format # format code with Prettier

## API

This project uses the public [Noroff Online Shop API](https://docs.noroff.dev/docs/v2/basic/online-shop):

- `GET /online-shop` — list of products
- `GET /online-shop/<id>` — single product by id

No API key or authentication is required.

## Contact

Marina Kovaleva — owlet.savvina@gmail.com