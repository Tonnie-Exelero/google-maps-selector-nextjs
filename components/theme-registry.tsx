"use client"

import { useState, type ReactNode } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

interface ThemeRegistryProps {
  children: ReactNode
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [theme] = useState(() =>
    createTheme({
      palette: {
        mode: "light",
        primary: {
          main: "#2563eb", // Blue
        },
        secondary: {
          main: "#10b981", // Green
        },
        background: {
          default: "#f8fafc",
          paper: "#ffffff",
        },
        text: {
          primary: "#1e293b",
          secondary: "#64748b",
        },
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontWeight: 700,
        },
        h2: {
          fontWeight: 700,
        },
        h3: {
          fontWeight: 600,
        },
        h4: {
          fontWeight: 600,
        },
        h5: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 600,
        },
        subtitle1: {
          fontWeight: 600,
        },
        button: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: "8px 16px",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
            },
          },
        },
        MuiSlider: {
          styleOverrides: {
            root: {
              height: 8,
            },
            thumb: {
              height: 20,
              width: 20,
            },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: {
              margin: "24px 0",
            },
          },
        },
      },
    }),
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

