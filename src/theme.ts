import { alpha, createTheme } from '@mui/material/styles'

export function buildTheme(mode: 'light' | 'dark') {
  const isDark = mode === 'dark'
  const primaryMain = isDark ? '#7557d8' : '#4f3197'
  const primaryStrong = isDark ? '#c2aafa' : '#2a1b49'
  const peachMain = isDark ? '#fd975d' : '#f28745'
  const peachSoft = isDark ? '#ffddb0' : '#ffd1cb'
  const surfaceTint = isDark ? '#241d35' : '#fcf9f5'
  const surfaceSubtle = isDark ? '#171126' : '#f4efe8'
  const divider = isDark ? 'rgba(194, 170, 250, 0.16)' : 'rgba(79, 49, 151, 0.14)'
  const outlinedBorder = isDark ? 'rgba(194, 170, 250, 0.26)' : 'rgba(79, 49, 151, 0.18)'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        dark: primaryStrong,
        light: isDark ? '#d7c4fa' : '#9d84d7',
      },
      secondary: {
        main: peachMain,
        light: peachSoft,
      },
      background: {
        default: isDark ? '#120d1d' : '#f8f3ec',
        paper: isDark ? '#1c1630' : '#fcf9f5',
      },
      text: {
        primary: isDark ? '#f5f0ff' : '#2a1b49',
        secondary: isDark ? '#d0c4ef' : '#4d3e78',
      },
      divider,
      action: {
        hover: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(79, 49, 151, 0.06)',
        selected: isDark ? 'rgba(117, 87, 216, 0.18)' : 'rgba(79, 49, 151, 0.14)',
      },
    },
    shape: {
      borderRadius: 18,
    },
    typography: {
      fontFamily: [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif',
      ].join(','),
      h3: {
        fontWeight: 800,
        letterSpacing: -0.04,
      },
      h4: {
        fontWeight: 800,
        letterSpacing: -0.04,
      },
      h5: {
        fontWeight: 750,
        letterSpacing: -0.03,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 700,
        textTransform: 'none',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            colorScheme: mode,
          },
          body: {
            background: isDark
              ? `radial-gradient(circle at top, ${alpha('#8d76ed', 0.2)}, transparent 30%), radial-gradient(circle at 88% 4%, ${alpha('#fd975d', 0.16)}, transparent 24%), linear-gradient(180deg, #171028 0%, #100b1a 100%)`
              : `radial-gradient(circle at top, ${alpha('#9d84d7', 0.14)}, transparent 36%), radial-gradient(circle at 85% 0%, ${alpha('#fd975d', 0.1)}, transparent 24%), linear-gradient(180deg, #fdfaf6 0%, #f5efe7 100%)`,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 16,
          },
          containedPrimary: {
            background: isDark
              ? 'linear-gradient(180deg, #8d76ed 0%, #6741bf 100%)'
              : 'linear-gradient(180deg, #6741bf 0%, #4f3197 100%)',
            color: '#fff',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(180deg, #9b84f5 0%, #7557d8 100%)'
                : 'linear-gradient(180deg, #7557d8 0%, #5b36b4 100%)',
            },
          },
          textInherit: {
            color: 'text.primary',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 22,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: {
            borderColor: outlinedBorder,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            border: `1px solid ${outlinedBorder}`,
            backgroundColor: isDark ? '#1c1630' : '#fcf9f5',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 999,
          },
          outlined: {
            borderColor: outlinedBorder,
            backgroundColor: isDark ? alpha(surfaceTint, 0.84) : alpha('#ffffff', 0.86),
            color: isDark ? '#e8ddff' : '#4d3e78',
          },
          colorSecondary: {
            backgroundColor: isDark ? alpha(peachMain, 0.18) : alpha(peachMain, 0.14),
            color: isDark ? peachSoft : peachMain,
            borderColor: isDark ? alpha(peachSoft, 0.34) : alpha(peachMain, 0.24),
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundColor: isDark ? alpha(surfaceSubtle, 0.88) : alpha('#ffffff', 0.92),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: outlinedBorder,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(216, 196, 250, 0.34)' : 'rgba(79, 49, 151, 0.3)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderColor: primaryMain,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isDark ? '#d2c5f0' : '#5b4b87',
            '&.Mui-focused': {
              color: primaryMain,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? '#e8ddff' : '#5b4b87',
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            paddingInline: 14,
            borderColor: outlinedBorder,
            color: isDark ? '#eadfff' : '#5b4b87',
            backgroundColor: isDark ? alpha(surfaceSubtle, 0.75) : alpha('#ffffff', 0.8),
            '&.Mui-selected': {
              color: isDark ? '#fffaff' : '#351f5e',
              backgroundColor: isDark
                ? alpha('#7557d8', 0.24)
                : alpha('#9d84d7', 0.18),
            },
            '&.Mui-selected:hover': {
              backgroundColor: isDark
                ? alpha('#7557d8', 0.3)
                : alpha('#9d84d7', 0.24),
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: divider,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: 48,
            borderRadius: 14,
            marginInline: 6,
            paddingInline: 14,
            color: isDark ? '#f0e9ff' : '#2a1b49',
            '&:hover': {
              backgroundColor: isDark
                ? alpha('#9d84d7', 0.16)
                : alpha('#9d84d7', 0.1),
            },
            '&.Mui-selected': {
              backgroundColor: isDark
                ? alpha(peachMain, 0.18)
                : alpha(peachMain, 0.12),
              color: isDark ? '#fff4ea' : '#783914',
            },
            '&.Mui-selected:hover': {
              backgroundColor: isDark
                ? alpha(peachMain, 0.24)
                : alpha(peachMain, 0.18),
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            marginTop: 6,
            borderRadius: 24,
            overflow: 'hidden',
            border: `1px solid ${isDark ? 'rgba(194, 170, 250, 0.2)' : 'rgba(79, 49, 151, 0.12)'}`,
            backgroundColor: isDark ? '#20182f' : '#fffaf6',
            boxShadow: isDark
              ? '0 20px 40px rgba(5, 4, 8, 0.34)'
              : '0 20px 40px rgba(67, 52, 81, 0.16)',
          },
          list: {
            paddingTop: 6,
            paddingBottom: 6,
          },
        },
      },
    },
  })
}
