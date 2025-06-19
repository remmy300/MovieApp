import { createTheme } from "@mui/material/styles";

const gray = {
  50: "#F9FAFB",
  100: "#F3F4F6",
  300: "#D1D5DB",
  400: "#9CA3AF",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: gray[900],
      paper: gray[800],
    },
    text: {
      primary: gray[50],
      secondary: gray[400],
    },
    primary: {
      main: "#3B82F6",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: gray[400],
          },
          "& label.Mui-focused": {
            color: gray[50],
          },
          "& .MuiInputBase-input": {
            color: gray[50],
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: gray[700],
            },
            "&:hover fieldset": {
              borderColor: gray[600],
            },
            "&.Mui-focused fieldset": {
              borderColor: gray[50],
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: gray[50],
        },
        icon: {
          color: gray[400],
        },
        outlined: {
          "& fieldset": {
            borderColor: gray[700],
          },
          "&:hover fieldset": {
            borderColor: gray[600],
          },
          "&.Mui-focused fieldset": {
            borderColor: gray[50],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.5rem",
        },
        contained: {
          backgroundColor: "#3B82F6",
          color: gray[50],
          "&:hover": {
            backgroundColor: "#2563EB",
          },
        },
        outlined: {
          borderColor: gray[600],
          color: gray[50],
          "&:hover": {
            borderColor: gray[400],
            backgroundColor: gray[800],
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: gray[100],
    },
    text: {
      primary: gray[900],
      secondary: gray[600],
    },
    primary: {
      main: "#3B82F6",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: gray[600],
          },
          "& label.Mui-focused": {
            color: gray[900],
          },
          "& .MuiInputBase-input": {
            color: gray[900],
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: gray[300],
            },
            "&:hover fieldset": {
              borderColor: gray[400],
            },
            "&.Mui-focused fieldset": {
              borderColor: gray[900],
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: gray[900],
        },
        icon: {
          color: gray[600],
        },
        outlined: {
          "& fieldset": {
            borderColor: gray[300],
          },
          "&:hover fieldset": {
            borderColor: gray[400],
          },
          "&.Mui-focused fieldset": {
            borderColor: gray[900],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.5rem",
        },
        contained: {
          backgroundColor: "#3B82F6",
          color: gray[50],
          "&:hover": {
            backgroundColor: "#2563EB",
          },
        },
        outlined: {
          borderColor: gray[400],
          color: gray[900],
          "&:hover": {
            borderColor: gray[600],
            backgroundColor: gray[100],
          },
        },
      },
    },
  },
});
