'use client'

import { createStyles, Text, Container, ActionIcon, Group, rem, Image } from '@mantine/core';
import { useThemeContext } from "@/context/theme.context";
import Link from "next/link";
import { modifyLinks } from "@/helpers";

interface FooterLink {
	link: string;
	label: string;
	links?: FooterLink[];
}

interface FooterActionProps {
	links?: FooterLink[];
}

const useStyles = createStyles( ( theme ) => ({
	footer : {
		paddingTop      : `calc(${ theme.spacing.xl } * 4)`,
		paddingBottom   : `calc(${ theme.spacing.xl } * 2)`,
		backgroundColor : theme.colors.blue8,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop : `calc(${ theme.spacing.xl } * 2)`,
		},
	},
	
	logo : {
		maxWidth : rem( 200 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			maxWidth       : '100%',
			width          : "100%",
			display        : 'flex',
			alignItems     : 'center',
			justifyContent : 'space-between',
			marginBottom   : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	description : {
		marginTop : theme.spacing.xl,
		color     : theme.colors.grey,
		maxWidth  : rem( 150 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			marginTop : theme.spacing.xs,
			textAlign : 'center',
		},
	},
	
	inner : {
		display        : 'flex',
		justifyContent : 'space-between',
		
		[theme.fn.smallerThan( 'sm' )] : {
			flexDirection : 'column',
			alignItems    : 'center',
		},
	},
	
	groups : {
		display  : 'flex',
		flexWrap : 'wrap',
		
		[theme.fn.smallerThan( 'sm' )] : {},
	},
	
	wrapper : {
		width : rem( 195 ),
	},
	
	link : {
		display        : 'block',
		color          : theme.colors.grey,
		fontSize       : theme.fontSizes.md,
		textDecoration : 'none',
		marginBottom   : theme.spacing.xs,
		
		'&:last-of-type' : {
			marginBottom : 0
		},
		'&:hover'        : {
			textDecoration : 'underline',
		},
	},
	
	title : {
		fontSize     : theme.fontSizes.lg,
		fontWeight   : 600,
		lineHeight   : 1.55,
		marginBottom : theme.spacing.md,
		color        : theme.colors.grey
	},
	
	afterFooter : {
		display        : 'flex',
		justifyContent : 'space-between',
		alignItems     : 'center',
		marginTop      : `calc(${ theme.spacing.lg } * 2)`,
		paddingTop     : theme.spacing.xl,
		borderTop      : `${ rem( 1 ) } solid ${ theme.colors.grey }`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			flexDirection : 'column',
		},
	},
	
	footerCopyright : {
		color : theme.colors.grey,
	},
	
	social : {
		[theme.fn.smallerThan( 'sm' )] : {
			marginTop : theme.spacing.xs,
		},
	},
	
	privacyLink : {
		color          : theme.colors.grey,
		textDecoration : 'none',
		
		'&:hover' : {
			textDecoration : 'underline'
		}
	}
}) );

export function FooterAction( { links }: FooterActionProps ) {
	const { themeSettings } = useThemeContext();
	const {
		footerAddress,
		footerCopyright,
		footerLabelMenu1,
		footerLabelMenu2,
		footerLabelMenu3,
		footerLogo : {
			title     : footerLogoTitle,
			sourceUrl : footerLogoUrl,
		},
		footerSocials,
		privacyLink
	} = themeSettings;
	const titles = [footerLabelMenu1, footerLabelMenu2, footerLabelMenu3];
	
	const updatedData = links?.map( ( item, index ) => ({
		...item,
		title : titles[index] || ''
	}) );
	const { classes } = useStyles();
	const groups = updatedData?.map( ( group, key: number ) => {
		const links = group?.links?.map( ( link, index: number ) => (
			<Link key={ index } className={ classes.link } href={ modifyLinks( link?.link ) }>
				{ link?.label }
			</Link>
		) );
		
		return (
			<div className={ classes.wrapper } key={ key }>
				<Text className={ classes.title }>{ group?.title }</Text>
				{ links }
			</div>
		);
	} );
	
	return (
		<footer className={ classes.footer }>
			<Container className={ classes.inner } size="xl">
				<div className={ classes.logo }>
					{
						footerLogoUrl &&
            <Image src={ footerLogoUrl } alt={ footerLogoTitle } width={ 168 }
                   height={ 50 }/>
					}
					{
						footerAddress &&
            <Text className={ classes.description }
                  dangerouslySetInnerHTML={ { __html : footerAddress } }/>
					}
				</div>
				<div className={ classes.groups }>{ groups }</div>
			</Container>
			<Container className={ classes.afterFooter } size="xl">
				<Group spacing={ 32 }>
					{
						footerCopyright &&
            <Text className={ classes.footerCopyright }>
							{ footerCopyright }
            </Text>
					}
					{ privacyLink &&
            <Link className={ classes.privacyLink } href={ privacyLink?.slug }>{ privacyLink?.title }</Link> }
				</Group>
				<Group spacing={ 0 } className={ classes.social } position="right" noWrap>
					{
						footerSocials?.map( ( social, key: number ) => {
							return (
								<ActionIcon key={ key } size="lg">
									<Link target={ '_blank' } href={ social?.socialLink }>
										<Image width={ 24 } height={ 24 } src={ social?.socialIcon?.sourceUrl }
										       alt={ social?.socialIcon?.title }/>
									</Link>
								</ActionIcon>
							)
						} )
					}
				</Group>
			</Container>
		</footer>
	);
}