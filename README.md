# BusUndo

BusUndo is a student-focused campus bus timetable web app built with React, TypeScript, Vite, Tailwind CSS, and React Router. It presents bus timings in a clean, mobile-friendly interface and includes dedicated pages for the home overview, project details, and contact support.

## What It Does

The app helps students quickly check upcoming bus departures, browse a simplified timetable experience, and contact the developer or report issues through a Web3Forms-powered form.

## Features

- Live-style bus timing presentation on the home page
- Feature cards for countdowns, timetable access, updates, and saved routes
- About page describing the purpose of the project
- Contact page with support options, FAQ content, and a working submission form
- Responsive layout with shared header and footer navigation
- Route-based navigation using React Router

## Pages

- Home: landing page with hero, features, and app preview sections
- About: project overview and developer introduction
- Contact: support page with quick actions, contact info, FAQ, and Web3Forms submission

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- lucide-react icons

## Getting Started

### Prerequisites

- Node.js 18 or newer
- pnpm recommended for installation and scripts

### Install

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

Open the local Vite URL shown in the terminal.

### Build for Production

```bash
pnpm build
```

### Preview the Production Build

```bash
pnpm preview
```

## Environment Variables

The contact form uses Web3Forms. Add the following variable to your local `.env` file:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

You can copy the same variable name into `.env.example` for sharing the required setup with other contributors.

## Scripts

- `pnpm dev` - start the Vite development server
- `pnpm build` - type-check and build the app
- `pnpm lint` - run ESLint across the project
- `pnpm preview` - preview the production build locally

## Project Structure

```text
src/
	app/
		layouts/
			RootLayout.tsx
		router.tsx
	components/
		AppPreview.tsx
		Features.tsx
		Footer.tsx
		Header.tsx
		Hero.tsx
	data/
		bus-timetable-fixed.json
	pages/
		About.tsx
		Contact.tsx
		Home.tsx
		NotFound.tsx
```

## Notes

- The app uses a shared layout with a sticky header and footer.
- The contact form submits to Web3Forms and resets on success.
- The timetable JSON file is included in the repo for bus schedule data and future expansion.

## License

No license has been specified yet.

