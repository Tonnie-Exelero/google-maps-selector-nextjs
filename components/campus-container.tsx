"use client"

import { useState } from "react"
import { Box, Button, Typography, Alert } from "@mui/material"
import CampusSelector from "./campus-selector"
import { Add } from "@mui/icons-material"

interface Campus {
  id: number
  location: string
  coordinates: { lat: number; lng: number } | null
  radius: number
}

export default function CampusContainer() {
  const [campuses, setCampuses] = useState<Campus[]>([{ id: 1, location: "", coordinates: null, radius: 5000 }])

  const handleAddCampus = () => {
    const newId = Math.max(...campuses.map((c) => c.id), 0) + 1
    setCampuses([...campuses, { id: newId, location: "", coordinates: null, radius: 1000 }])
  }

  const handleUpdateCampus = (updatedCampus: Campus) => {
    setCampuses(campuses.map((campus) => (campus.id === updatedCampus.id ? updatedCampus : campus)))
  }

  const handleRemoveCampus = (id: number) => {
    if (campuses.length > 1) {
      setCampuses(campuses.filter((campus) => campus.id !== id))
    }
  }

  const hasSelectedLocations = campuses.some((campus) => campus.coordinates !== null)

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Campus Locations
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Search for campus locations and adjust the radius for each. You can add multiple campuses as needed.
      </Typography>

      {campuses.map((campus) => (
        <CampusSelector
          key={campus.id}
          campus={campus}
          onUpdate={handleUpdateCampus}
          onRemove={handleRemoveCampus}
          showRemoveButton={campuses.length > 1}
        />
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={handleAddCampus} sx={{ mt: 2, mb: 3 }} fullWidth>
        Add Another Campus
      </Button>

      {hasSelectedLocations && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {campuses.filter((c) => c.coordinates).length} location(s) selected
        </Alert>
      )}
    </Box>
  )
}

