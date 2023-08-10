'use client'

import { createStyles, Container, Title, Text, Button, Group, rem } from '@mantine/core';
import NotFoundIcon from "@/components/Icons/404";
import Link from "next/link";

const useStyles = createStyles( ( theme ) => ({
	root : {
		paddingTop    : rem( 80 ),
		paddingBottom : rem( 80 ),
	},
	
	inner : {
		position : 'relative',
	},
	
	image : {
		...theme.fn.cover(),
		opacity : 0.75,
	},
	
	content : {
		paddingTop : rem( 220 ),
		position   : 'relative',
		zIndex     : 1,
		
		[theme.fn.smallerThan( 'sm' )] : {
			paddingTop : rem( 120 ),
		},
	},
	
	title : {
		fontFamily : `Greycliff CF, ${ theme.fontFamily }`,
		textAlign  : 'center',
		fontWeight : 900,
		fontSize   : rem( 38 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 ),
		},
	},
	
	description : {
		maxWidth     : rem( 540 ),
		margin       : 'auto',
		marginTop    : theme.spacing.xl,
		marginBottom : `calc(${ theme.spacing.xl } * 1.5)`,
	},
	
	btn : {
		color           : theme.colors.white,
		backgroundColor : theme.colors.blue8,
		
		'&:hover' : {
			color           : theme.colors.blue8,
			backgroundColor : "transparent",
			border          : `${ rem( 1 ) } solid ${ theme.colors.blue8 }`,
		},
	},
}) );

export default function NotFoundPage() {
	const { classes } = useStyles();
	
	return (
		<Container className={ classes.root }>
			<div className={ classes.inner }>
				<NotFoundIcon className={ classes.image }/>
				<div className={ classes.content }>
					<Title className={ classes.title }>Nothing to see here</Title>
					<Text color="dimmed" size="lg" align="center" className={ classes.description }>
						Page you are trying to open does not exist. You may have mistyped the address, or the
						page has been moved to another URL. If you think this is an error contact support.
					</Text>
					<Group position="center">
						<Button href="/" component={ Link } className={ classes.btn } size="md">Take me back to home page</Button>
					</Group>
				</div>
			</div>
		</Container>
	);
}