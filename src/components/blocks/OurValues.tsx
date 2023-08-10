'use client'
import { createStyles, Title, Text, Card, SimpleGrid, Container, rem, } from '@mantine/core';
import Svg from "@/components/Svg";
import React from "react";

interface OurValuesProps {
	data: {
		hide_this_block: string,
		title: string
		our_values_repeater: OurValues[]
	},
}

interface OurValues {
	icon: string
	title: string
	content: string
}

const useStyles = createStyles( ( theme ) => ({
	ourValues : {
		backgroundColor : theme.colors.cyan,
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
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	cards : {
		margin : `calc(${ theme.spacing.md } * 2 ) 0 0`,
		gap    : `calc(${ theme.spacing.md } * 2 )`,
		
		[theme.fn.smallerThan( 'md' )] : {
			gap : `calc(${ theme.spacing.md } * 2 )`,
		},
	},
	
	card : {
		backgroundColor : 'transparent',
		color           : theme.colors.blue8,
	},
	
	cardTitle : {
		fontSize   : theme.headings.sizes.h3.fontSize,
		lineHeight : theme.headings.sizes.h3.lineHeight,
		fontWeight : 700,
		margin     : `${ theme.spacing.md } 0 calc(${ theme.spacing.md } / 2 )`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	item : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
}) );

export default function OurValues( {
	data : {
		title,
		hide_this_block,
		our_values_repeater
	}
}: OurValuesProps ) {
	const { classes } = useStyles();
	
	const features = our_values_repeater?.map( ( card, index: number ) => (
		<Card key={ index } className={ classes.card } padding={ 0 }>
			{ card?.icon && <Svg svg={ card?.icon }/> }
			{ card.title && <Text className={ classes.cardTitle }>{ card.title }</Text> }
			{ card?.content && <Text className={ classes.item }>{ card.content }</Text> }
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.ourValues }>
			<Container size="xl">
				{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
				<SimpleGrid cols={ 4 } className={ classes.cards } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 2
					},
					{
						maxWidth : 'sm',
						cols     : 1
					}
				] }>
					{ features }
				</SimpleGrid>
			</Container>
		</div>
	);
}