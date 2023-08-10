'use client'
import React from 'react';
import { createStyles, Text, Container, rem, SimpleGrid, Title, } from '@mantine/core';
import Svg from "@/components/Svg";

interface OurPartners {
	data: {
		title: string,
		description: string,
		hide_this_block: string,
		logo_repeater: {
			image: string
		}[]
	},
}

const useStyles = createStyles( ( theme ) => ({
	ourPartners : {
		backgroundColor : theme.colors.grey,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		color      : theme.colors.blue8,
		fontSize   : theme.headings.sizes.h2.fontSize,
		lineHeight : theme.headings.sizes.h2.lineHeight,
		fontWeight : 700,
		maxWidth   : 648,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	description : {
		maxWidth : 648,
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	cards : {
		gap        : `calc(${ theme.spacing.lg } * 3)`,
		alignItems : "center",
		
		[theme.fn.smallerThan( 'md' )] : {
			gap : `calc(${ theme.spacing.md } * 2) calc(${ theme.spacing.md } * 3)`,
		},
	},
	
	card : {
		margin : 0
	},
	
	cardIcon : {
		svg : {
			width  : '100%',
			height : '100%'
		}
	}
}) );

export default function OurPartners( {
	data : {
		title,
		description,
		logo_repeater,
		hide_this_block
	}
}: OurPartners ) {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.ourPartners }>
			<Container size="xl">
				{ title && <Title order={ 2 } className={ classes.title } mb="md">{ title }</Title> }
				{ description && <Text className={ classes.description } mb="xl">{ description }</Text> }
				<SimpleGrid cols={ 6 } className={ classes.cards } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 2
					}
				] }>
					{
						logo_repeater?.map( ( feature, key: number ) => {
							return (
								<Svg className={ classes.cardIcon } key={ key } svg={ feature?.image }/>
							)
						} )
					}
				</SimpleGrid>
			</Container>
		</div>
	);
}