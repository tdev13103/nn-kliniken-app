import { rem } from "@mantine/core";

export const defaultTheme = {
	fontFamily : 'var(--font-poppins)',
	components : {
		Container : {
			defaultProps : {
				sizes : {
					xs : 540,
					sm : 720,
					md : 904,
					lg : 1140,
					xl : 1360,
				},
			},
		},
		Button    : {
			defaultProps : {
				style : {
					fontWeight   : 400,
					height       : 48,
					lineHeight   : 1.5,
					borderRadius : '8px',
					fontSize     : '18px',
					padding      : `${ rem( 1 ) } ${ rem( 26 ) }`,
				}
			}
		}
	},
	colors     : {
		blue9 : '#111A37',
		blue8 : '#273872',
		blue7 : '#152C4F',
		blue6 : '#1B2855',
		blue5 : '#51A3EE',
		blue4 : '#0E4F8B',
		cyan  : '#8CEDE3',
		cyan9 : '#70C3BB',
		grey  : '#EAEFEE',
		gray5 : '#DEE2E6',
		gray4 : '#CED4DA',
		grey3 : '#888C9B',
		gray2 : '#394149',
		white : '#FFFFFF',
	},
	headings   : {
		sizes : {
			h1 : {
				fontSize   : rem( 52 ),
				lineHeight : 1.2,
			},
			h2 : {
				fontSize   : rem( 42 ),
				lineHeight : 1.3,
			},
			h3 : {
				fontSize   : rem( 22 ),
				lineHeight : 1.4,
			},
			h4 : {
				fontSize   : rem( 18 ),
				lineHeight : 1.45,
			},
			h5 : {
				fontSize   : rem( 16 ),
				lineHeight : 1.3,
			},
			h6 : {
				fontSize   : rem( 14 ),
				lineHeight : 1.3,
			}
		}
	},
}