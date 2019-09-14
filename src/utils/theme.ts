import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export const appTheme = createMuiTheme({
	palette: {
		// primary: {
		// 	main: '#000000',
		// },
		// secondary: {
		// 	main: '#ffffff',
		// },
	},
	typography: {
		fontFamily: [
			'Montserrat',
			'"Helvetica Neue"',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	overrides: {
		MuiAppBar: {
			positionFixed: {
				// The MuiDrawer has zIndex 1300.
				zIndex: 1301,
				position: 'sticky',
			},
		},
		MuiCircularProgress: {
			root: {
				display: 'block',
			},
		},
		MuiSnackbarContent: {
			message: {
				fontWeight: 'bold',
			},
		},
		MuiTooltip: {
			tooltip: {
				fontSize: '0.8em',
				padding: '1em',
			},
		},
	},
})
