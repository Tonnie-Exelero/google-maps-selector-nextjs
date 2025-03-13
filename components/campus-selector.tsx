"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Slider,
  Typography,
  IconButton,
  Paper,
  InputAdornment,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Tooltip,
  Grid,
} from "@mui/material";
import { Delete, LocationOn, Search } from "@mui/icons-material";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
} from "@react-google-maps/api";

interface Campus {
  id: number;
  location: string;
  coordinates: { lat: number; lng: number } | null;
  radius: number;
}

interface CampusSelectorProps {
  campus: Campus;
  onUpdate: (campus: Campus) => void;
  onRemove: (id: number) => void;
  showRemoveButton: boolean;
}

// This would normally come from environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Declare the google variable
declare global {
  interface Window {
    google: any;
  }
}

export default function CampusSelector({
  campus,
  onUpdate,
  onRemove,
  showRemoveButton,
}: CampusSelectorProps) {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      try {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            fields: ["geometry", "formatted_address"],
          }
        );

        autocompleteInstance.addListener("place_changed", () => {
          setIsSearching(true);
          const place = autocompleteInstance.getPlace();

          if (place.geometry?.location) {
            const newCoordinates = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            onUpdate({
              ...campus,
              location: place.formatted_address || "",
              coordinates: newCoordinates,
            });
          }
          setIsSearching(false);
        });

        setAutocomplete(autocompleteInstance);
      } catch (error) {
        console.error("Error initializing Google Places Autocomplete:", error);
      }
    }

    return () => {
      if (autocomplete) {
        try {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        } catch (error) {
          console.error(
            "Error cleaning up Google Maps event listeners:",
            error
          );
        }
      }
    };
  }, [isLoaded, campus, onUpdate]);

  const handleRadiusChange = (_event: Event, newValue: number | number[]) => {
    onUpdate({
      ...campus,
      radius: newValue as number,
    });
  };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: theme.shape.borderRadius,
  };

  const defaultCenter = {
    lat: -25.2744, // Default to Australia
    lng: 133.7751,
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        position: "relative",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          Campus {campus.id}
        </Typography>
        {showRemoveButton && (
          <Tooltip title="Remove this campus">
            <IconButton
              size="small"
              color="error"
              onClick={() => onRemove(campus.id)}
              aria-label="Remove campus"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            inputRef={inputRef}
            label="Search for a location"
            variant="outlined"
            fullWidth
            value={campus.location}
            onChange={(e) => onUpdate({ ...campus, location: e.target.value })}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isSearching ? <CircularProgress size={20} /> : <Search />}
                </InputAdornment>
              ),
            }}
            placeholder="Enter a campus location"
            disabled={!isLoaded}
            helperText={
              !isLoaded
                ? "Loading Google Maps..."
                : loadError
                ? "Error loading Google Maps"
                : ""
            }
            error={!!loadError}
          />

          <Box sx={{ mb: 2 }}>
            <Typography id={`radius-slider-${campus.id}`} gutterBottom>
              Radius: {campus.radius} meters
            </Typography>
            <Slider
              value={campus.radius}
              onChange={handleRadiusChange}
              aria-labelledby={`radius-slider-${campus.id}`}
              min={5000}
              max={100000}
              step={5000}
              marks={[
                { value: 5000, label: "5km" },
                { value: 50000, label: "50km" },
                { value: 100000, label: "100km" },
              ]}
              disabled={!campus.coordinates}
            />
          </Box>

          {campus.coordinates && (
            <Typography variant="body2" color="text.secondary">
              Selected coordinates: {campus.coordinates.lat.toFixed(6)},{" "}
              {campus.coordinates.lng.toFixed(6)}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              border:
                !isLoaded || !campus.coordinates
                  ? `1px dashed ${theme.palette.divider}`
                  : "none",
              borderRadius: theme.shape.borderRadius,
            }}
          >
            {!isLoaded && (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress size={40} sx={{ mb: 2 }} />
                <Typography>Loading Google Maps...</Typography>
              </Box>
            )}

            {isLoaded && loadError && (
              <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography color="error">
                  Error loading Google Maps. Please check your API key.
                </Typography>
              </Box>
            )}

            {isLoaded && !loadError && !campus.coordinates && (
              <Box sx={{ textAlign: "center", p: 3 }}>
                <LocationOn
                  sx={{ fontSize: 40, color: "text.secondary", mb: 2 }}
                />
                <Typography>
                  Search for a location to display the map
                </Typography>
              </Box>
            )}

            {isLoaded && !loadError && campus.coordinates && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={campus.coordinates}
                zoom={14}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: true,
                }}
              >
                <Marker position={campus.coordinates} />
                <Circle
                  center={campus.coordinates}
                  radius={campus.radius}
                  options={{
                    fillColor: theme.palette.primary.main,
                    fillOpacity: 0.2,
                    strokeColor: theme.palette.primary.main,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              </GoogleMap>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
