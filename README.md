# CARBONX - Rebuild

This is a clean reconstruction of the CARBONX web platform based on the Next.js App Router.

## Project Architecture
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: Leaflet (via react-leaflet)

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup Environment Variables:
   Copy `.env.example` to `.env.local` and configure as needed.
   ```bash
   cp .env.example .env.local
   ```

3. Run the Development Server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing & Building

- Run TypeScript type checking:
  ```bash
  npx tsc --noEmit
  ```

- Run ESLint:
  ```bash
  npm run lint
  ```

- Create a Production Build:
  ```bash
  npm run build
  npm start
  ```
