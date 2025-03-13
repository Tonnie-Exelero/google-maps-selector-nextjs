"use client"

import { useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Box,
  Typography,
  Alert,
} from "@mui/material"

const australianStates = [
  { value: "nsw", label: "New South Wales" },
  { value: "vic", label: "Victoria" },
  { value: "qld", label: "Queensland" },
  { value: "wa", label: "Western Australia" },
  { value: "sa", label: "South Australia" },
  { value: "tas", label: "Tasmania" },
  { value: "act", label: "Australian Capital Territory" },
  { value: "nt", label: "Northern Territory" },
]

export default function StateSelector() {
  const [state, setState] = useState("")

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value)
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Select an Australian State
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="state-select-label">State</InputLabel>
        <Select labelId="state-select-label" id="state-select" value={state} label="State" onChange={handleStateChange}>
          {australianStates.map((state) => (
            <MenuItem key={state.value} value={state.value}>
              {state.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {state && (
        <Alert severity="success" sx={{ mt: 3 }}>
          You selected: {australianStates.find((s) => s.value === state)?.label}
        </Alert>
      )}
    </Box>
  )
}

