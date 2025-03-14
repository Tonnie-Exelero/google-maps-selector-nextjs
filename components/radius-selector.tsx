"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  TextField,
  Slider,
  Typography,
  IconButton,
  Paper,
  InputAdornment,
  useTheme,
  CircularProgress,
  Tooltip,
  Grid,
  Fade,
} from "@mui/material";
import {
  Delete,
  LocationOn,
  Search,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface RadiusLocation {
  id: number;
  location: string;
  coordinates: { lat: number; lng: number } | null;
  radius: number;
}

interface RadiusSelectorProps {
  location: RadiusLocation;
  onUpdate: (location: RadiusLocation) => void;
  onRemove: (id: number) => void;
  showRemoveButton: boolean;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

declare global {
  interface Window {
    google: any;
  }
}

const getZoomForRadius = (radius: number): number => {
  if (radius >= 200000) return 7;
  if (radius >= 100000) return 8;
  if (radius >= 50000) return 9;
  if (radius >= 25000) return 10;
  if (radius >= 10000) return 11;
  return 12;
};

const formatRadius = (radius: number): string => {
  return (radius / 1000).toFixed(1) + " km";
};

export default function RadiusSelector({
  location,
  onUpdate,
  onRemove,
  showRemoveButton,
}: RadiusSelectorProps) {
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mapZoom, setMapZoom] = useState(11);
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Create or update circle when map is loaded or location changes
  const updateCircle = useCallback(() => {
    if (!mapRef.current || !location.coordinates) return;

    if (!circleRef.current) {
      // Create new circle if it doesn't exist
      circleRef.current = new window.google.maps.Circle({
        map: mapRef.current,
        center: location.coordinates,
        radius: location.radius,
        fillColor: theme.palette.primary.main,
        fillOpacity: 0.2,
        strokeColor: theme.palette.primary.main,
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
    } else {
      // Update existing circle
      circleRef.current.setCenter(location.coordinates);
      circleRef.current.setRadius(location.radius);
    }
  }, [location.coordinates, location.radius, theme.palette.primary.main]);

  // Update zoom level and circle when radius changes
  useEffect(() => {
    if (location.coordinates) {
      setMapZoom(getZoomForRadius(location.radius));
      updateCircle();
    }
  }, [location.radius, location.coordinates, updateCircle]);

  // Cleanup circle on unmount
  useEffect(() => {
    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, []);

  // Map load callback
  const onMapLoad = useCallback(
    (map: any) => {
      mapRef.current = map;
      updateCircle();
    },
    [updateCircle]
  );

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
              ...location,
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
  }, [isLoaded, location, onUpdate]);

  const handleRadiusChange = (_event: Event, newValue: number | number[]) => {
    onUpdate({
      ...location,
      radius: newValue as number,
    });
  };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: theme.shape.borderRadius,
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || mapZoom) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || mapZoom) - 1);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        position: "relative",
        backgroundColor: "background.paper",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
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
          Location {location.id}
        </Typography>
        {showRemoveButton && (
          <Tooltip title="Remove this location">
            <IconButton
              size="small"
              color="error"
              onClick={() => onRemove(location.id)}
              aria-label="Remove location"
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
            value={location.location}
            onChange={(e) =>
              onUpdate({ ...location, location: e.target.value })
            }
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isSearching ? <CircularProgress size={20} /> : <Search />}
                </InputAdornment>
              ),
            }}
            placeholder="Enter a location"
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
            <Typography id={`radius-slider-${location.id}`} gutterBottom>
              Radius: {formatRadius(location.radius)}
            </Typography>
            <Slider
              value={location.radius}
              onChange={handleRadiusChange}
              aria-labelledby={`radius-slider-${location.id}`}
              min={10000}
              max={250000}
              step={5000}
              marks={[
                { value: 10000, label: "10km" },
                { value: 50000, label: "50km" },
                { value: 150000, label: "150km" },
                { value: 250000, label: "250km" },
              ]}
              disabled={!location.coordinates}
              sx={{
                "& .MuiSlider-thumb": {
                  transition: "left 0.2s ease",
                },
                "& .MuiSlider-track": {
                  transition: "width 0.2s ease",
                },
              }}
            />
          </Box>

          {location.coordinates && (
            <Fade in={!!location.coordinates}>
              <Typography variant="body2" color="text.secondary">
                Selected coordinates: {location.coordinates.lat.toFixed(6)},{" "}
                {location.coordinates.lng.toFixed(6)}
              </Typography>
            </Fade>
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
                !isLoaded || !location.coordinates
                  ? `1px dashed ${theme.palette.divider}`
                  : "none",
              borderRadius: theme.shape.borderRadius,
              position: "relative",
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

            {isLoaded && !loadError && !location.coordinates && (
              <Box sx={{ textAlign: "center", p: 3 }}>
                <LocationOn
                  sx={{ fontSize: 40, color: "text.secondary", mb: 2 }}
                />
                <Typography>
                  Search for a location to display the map
                </Typography>
              </Box>
            )}

            {isLoaded && !loadError && location.coordinates && (
              <>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location.coordinates}
                  zoom={mapZoom}
                  onLoad={onMapLoad}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                    zoomControl: false,
                  }}
                >
                  <Marker position={location.coordinates} />
                </GoogleMap>
                <Box
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    zIndex: 10,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: "4px",
                    boxShadow: 1,
                    p: 0.5,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={handleZoomIn}
                    aria-label="Zoom in"
                  >
                    <ZoomIn />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleZoomOut}
                    aria-label="Zoom out"
                  >
                    <ZoomOut />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
