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
  Chip,
  OutlinedInput,
  type Theme,
  useTheme,
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, selectedNames: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

export default function StateSelector() {
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const theme = useTheme()

  const handleStateChange = (event: SelectChangeEvent<typeof selectedStates>) => {
    const {
      target: { value },
    } = event
    setSelectedStates(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    )
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Select Australian States
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="state-select-label">States</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select"
          multiple
          value={selectedStates}
          onChange={handleStateChange}
          input={<OutlinedInput id="select-multiple-chip" label="States" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={australianStates.find((state) => state.value === value)?.label}
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {australianStates.map((state) => (
            <MenuItem key={state.value} value={state.value} style={getStyles(state.value, selectedStates, theme)}>
              {state.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedStates.length > 0 && (
        <Alert severity="success" sx={{ mt: 3 }}>
          You selected: {selectedStates.length} state{selectedStates.length !== 1 ? "s" : ""}
        </Alert>
      )}
    </Box>
  )
}

