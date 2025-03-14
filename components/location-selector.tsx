"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material"
import StateSelector from "./state-selector"
import RadiusContainer from "./radius-container"

type LocationType = "state" | "radius"

export default function LocationSelector() {
  const [locationType, setLocationType] = useState<LocationType>("state")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleLocationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationType(event.target.value as LocationType)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: "1000px",
        mx: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Location Type
        </Typography>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            row={!isMobile}
            value={locationType}
            onChange={handleLocationTypeChange}
            sx={{ justifyContent: "flex-start" }}
          >
            <FormControlLabel value="state" control={<Radio />} label="State" sx={{ mr: 6 }} />
            <FormControlLabel value="radius" control={<Radio />} label="Radius" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider />

      {locationType === "state" ? <StateSelector /> : <RadiusContainer />}
    </Paper>
  )
}

