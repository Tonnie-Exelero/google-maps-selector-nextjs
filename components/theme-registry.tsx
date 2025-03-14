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
          main: "#3949ab", // Indigo
          light: "#6f74dd",
          dark: "#00227b",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#00897b", // Teal
          light: "#4ebaaa",
          dark: "#005b4f",
          contrastText: "#ffffff",
        },
        background: {
          default: "#f5f7fa",
          paper: "#ffffff",
        },
        text: {
          primary: "#1e293b",
          secondary: "#64748b",
        },
        divider: "rgba(0, 0, 0, 0.08)",
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
          fontSize: "1.25rem",
        },
        subtitle1: {
          fontWeight: 600,
          fontSize: "1.1rem",
        },
        button: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 10,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: "8px 16px",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              },
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
            track: {
              height: 8,
              borderRadius: 4,
            },
            rail: {
              height: 8,
              borderRadius: 4,
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
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              fontWeight: 500,
            },
          },
        },
        MuiAlert: {
          styleOverrides: {
            root: {
              borderRadius: 8,
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

