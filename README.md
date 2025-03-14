# State/Radius Selector Application

A responsive single-page React TypeScript application that allows users to select between Australian states or radius-based locations. The application provides an intuitive interface for selecting locations and visualizing location areas on a map.

![State/Campus Selector](/screenshot.png)

## Features

- Toggle between State and Radius-based location selection modes
- Select from a dropdown of Australian states
- Search for locations using Google Maps Places API
- Display selected locations on an interactive map
- Adjust the radius around each location with a slider
- Visualize the radius on the map
- Add multiple radius-based locations
- Fully responsive design for all device sizes
- Material UI components for a modern, clean interface

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Material UI
- Google Maps JavaScript API
- Google Places API
- @react-google-maps/api

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or higher
- npm or yarn or pnpm
- A Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/state-campus-selector.git
cd state-campus-selector
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Add environment variables:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

5. Build the application:

```bash
npm run build
# or
yarn build
# or
pnpm run build
```

6. Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```
