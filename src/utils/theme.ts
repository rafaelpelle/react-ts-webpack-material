import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const customTheme = require('./customTheme.json')

export const appTheme = createMuiTheme({
	palette: {
		primary: {
			main: customTheme.colors.primaryColor,
		},
		secondary: {
			main: customTheme.colors.secondaryColor,
		},
	},
	typography: {
		useNextVariants: true,
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
		MuiDrawer: {
			paperAnchorTop: {
				marginTop: customTheme.sizes.pageHeaderHeight,
			},
		},
	},
})

