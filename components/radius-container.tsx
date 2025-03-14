"use client";

import { useState } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import RadiusSelector from "./radius-selector";
import { Add } from "@mui/icons-material";

interface RadiusLocation {
  id: number;
  location: string;
  coordinates: { lat: number; lng: number } | null;
  radius: number;
}

export default function RadiusContainer() {
  const [locations, setLocations] = useState<RadiusLocation[]>([
    { id: 1, location: "", coordinates: null, radius: 10000 },
  ]);

  const handleAddLocation = () => {
    const newId = Math.max(...locations.map((c) => c.id), 0) + 1;
    setLocations([
      ...locations,
      { id: newId, location: "", coordinates: null, radius: 10000 },
    ]);
  };

  const handleUpdateLocation = (updatedLocation: RadiusLocation) => {
    setLocations(
      locations.map((location) =>
        location.id === updatedLocation.id ? updatedLocation : location
      )
    );
  };

  const handleRemoveLocation = (id: number) => {
    if (locations.length > 1) {
      setLocations(locations.filter((location) => location.id !== id));
    }
  };

  const hasSelectedLocations = locations.some(
    (location) => location.coordinates !== null
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Radius Locations
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Search for locations and adjust the radius for each. You can add
        multiple locations as needed.
      </Typography>

      {locations.map((location) => (
        <RadiusSelector
          key={location.id}
          location={location}
          onUpdate={handleUpdateLocation}
          onRemove={handleRemoveLocation}
          showRemoveButton={locations.length > 1}
        />
      ))}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddLocation}
        sx={{ mt: 2, mb: 3 }}
        fullWidth
      >
        Add Another Location
      </Button>

      {hasSelectedLocations && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {locations.filter((c) => c.coordinates).length} location
          {locations.filter((c) => c.coordinates).length !== 1 ? "s" : ""}{" "}
          selected
        </Alert>
      )}
    </Box>
  );
}
