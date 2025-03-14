import { Container, Typography, Box } from "@mui/material"
import LocationSelector from "@/components/location-selector"

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
          Location Selector
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select between Australian states or radius-based locations
        </Typography>
      </Box>
      <LocationSelector />
    </Container>
  )
}

