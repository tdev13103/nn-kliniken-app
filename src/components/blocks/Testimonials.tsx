'use client'
import { createStyles, Title, Text, Card, SimpleGrid, Container, Center, Group, Box, } from '@mantine/core';
import Stars from "@/components/Icons/Stars";
import CustomButton from "@/components/Button";
import React from "react";

interface Testimonials {
	data: {
		button_repeater: ButtonProps[]
		description: string
		title: string,
		hide_this_block: string,
		testimonials_repeater: Testimonial[]
	}
}

interface ButtonProps {
	button: {
		title: string
		url: string
	}
	variant: string
	color: string
	icon: string
	icon_color: string
}

interface Testimonial {
	author: string
	opinion: string
	stars_amount: string
}

const useStyles = createStyles( ( theme ) => ({
	testimonials : {
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
		fontSize   : theme.headings.sizes.h3.fontSize,
		lineHeight : theme.headings.sizes.h3.lineHeight,
		fontWeight : 700,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.lg,
		},
		[theme.fn.largerThan( 'sm' )]  : {
			textAlign : 'center'
		},
	},
	
	description : {
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
		[theme.fn.largerThan( 'sm' )]  : {
			textAlign : 'center'
		},
	},
	
	cards : {
		margin : `calc(${ theme.spacing.md } * 2 ) 0`,
		gap    : `calc(${ theme.spacing.md } * 2 )`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			margin : `calc(${ theme.spacing.md }) 0`,
			gap    : `calc(${ theme.spacing.md } * 2 )`,
		},
	},
	
	card : {
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'flex-start'
	},
	
	cardDescription : {
		color : theme.colors.blue8,
	},
	
	cardAuthor : {
		color      : theme.colors.blue8,
		fontWeight : 600,
	},
	
	cardStarsWrap : {
		marginTop : 'auto',
	},
}) );

export default function Testimonials( {
	data : {
		button_repeater,
		description,
		title,
		testimonials_repeater,
		hide_this_block
	}
}: Testimonials ) {
	const { classes } = useStyles();
	
	const cards = testimonials_repeater?.map( ( card, key: number ) => (
		<Card className={ classes.card } key={ key } radius="md" padding="xl">
			{ card?.opinion && <Text className={ classes.cardDescription } fz="lg"> { card.opinion } </Text> }
			<Box className={ classes.cardStarsWrap }>
				{ card.author && <Text className={ classes.cardAuthor } mt="md" mb={ "md" }> { card.author }</Text> }
				<Group spacing={ 0 }>
					{ Array.from( { length : +card.stars_amount }, ( _, index ) => (<Stars key={ index }/>) ) }
				</Group>
			</Box>
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.testimonials }>
			<Container size="xl">
				{ title && <Title order={ 3 } className={ classes.title }>{ title }</Title> }
				{ description && <Text className={ classes.description } mt="md">{ description }</Text> }
				<SimpleGrid cols={ 3 } className={ classes.cards } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					{ cards }
				</SimpleGrid>
				{ button_repeater && <Center><CustomButton button={ button_repeater }/></Center> }
			</Container>
		</div>
	);
}