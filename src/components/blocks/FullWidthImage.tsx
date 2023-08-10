'use client'
import React from 'react';
import { Container, createStyles, Image, rem } from "@mantine/core";

interface FullWidthImage {
	data: {
		image: string,
		hide_this_block: string
	},
}

const useStyles = createStyles( ( theme ) => ({
	fullWidthImage : {
		backgroundColor : theme.colors.grey,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	image : {
		borderRadius : `calc(${ theme.radius.sm } * 3)`,
		overflow     : 'hidden',
		height       : rem( 364 ),
		
		'figure' : {
			height : '100%',
			
			'img' : {
				height : '100% !important'
			},
			
			'div' : {
				height : '100%'
			}
		},
		
		[theme.fn.smallerThan( 'xs' )] : {
			height : rem( 168 )
		},
	},
}) );

export default function FullWidthImage( {
	data : {
		image,
		hide_this_block
	}
}: FullWidthImage ) {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.fullWidthImage }>
			<Container size="xl">
				{ image && <Image className={ classes.image } src={ image } alt={ 'Full Image' }/> }
			</Container>
		</div>
	);
}