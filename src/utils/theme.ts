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
		useNextVariants: true,
		// fontFamily: [
		// 	'Montserrat',
		// 	'"Helvetica Neue"',
		// 	'sans-serif',
		// 	'"Apple Color Emoji"',
		// 	'"Segoe UI Emoji"',
		// 	'"Segoe UI Symbol"',
		// ].join(','),
	},
	overrides: {
		// MuiDrawer: {
		// 	paperAnchorTop: {
		// 		marginTop: customTheme.sizes.pageHeaderHeight,
		// 	},
		// },
	},
})

