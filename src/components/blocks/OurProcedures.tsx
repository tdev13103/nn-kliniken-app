'use client'
import { createStyles, Title, Text, Card, SimpleGrid, Container, rem, } from '@mantine/core';
import Link from "next/link";
import React from "react";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";

interface OurProcedures {
	data: {
		hide_this_block: string,
		title: string
		button_repeater: ButtonProps[]
		card_repeater: Card[],
	},
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

interface Card {
	card_icon: string,
	card_icon_color: string
	card_title: string,
	card_text: string,
	card_link: {
		url: string,
		title: string
	}
	
}

const useStyles = createStyles( ( theme ) => ({
	ourProcedures : {
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
		
		[theme.fn.smallerThan( 'md' )] : {
			marginBottom : `calc(${ theme.spacing.md })`,
		},
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	description : {
		maxWidth : 600,
		margin   : 'auto',
	},
	
	cards : {
		[theme.fn.smallerThan( 'md' )] : {
			marginBottom : `calc(${ theme.spacing.md } * 2)`
		},
	},
	
	card : {
		display         : 'flex',
		flexDirection   : 'column',
		alignItems      : 'flex-start',
		backgroundColor : theme.colors.white,
		color           : theme.colors.blue8,
		marginBottom    : `calc(${ theme.spacing.md } * 2)`,
		marginTop       : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.largerThan( 'xs' )] : {
			padding : `calc(${ theme.spacing.sm } * 2)`,
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			margin : 0,
		},
		
		[theme.fn.largerThan( 'md' )] : {
			'&:hover' : {
				backgroundColor : theme.colors.blue8,
				color           : theme.colors.white,
				
				'.cardIcon' : {
					path : {
						stroke : theme.colors.white
					}
				},
				
				'.cardBtn' : {
					color : theme.colors.white,
					
					'&::after' : {
						backgroundColor : theme.colors.white,
					}
				},
			}
		},
	},
	
	cardTitle : {
		fontSize   : theme.headings.sizes.h3.fontSize,
		lineHeight : theme.headings.sizes.h3.lineHeight,
		fontWeight : 700,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.lg
		},
	},
	
	cardDesc : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md
		},
	},
	
	cardBtn : {
		display        : 'inline-block',
		marginTop      : 'auto',
		color          : theme.colors.blue8,
		fontSize       : theme.fontSizes.lg,
		textDecoration : 'none',
		paddingBottom  : `calc(${ theme.spacing.xs } / 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md
		},
		
		'&::after' : {
			content         : '""',
			display         : 'block',
			width           : '100%',
			height          : rem( 1 ),
			backgroundColor : theme.colors.blue8,
		}
	},
	
	cardIcon : {
		path : {
			stroke : "inherit"
		}
	},
}) );

const OurProcedures: React.FC<OurProcedures> = ( {
	data : {
		hide_this_block,
		title,
		button_repeater,
		card_repeater
	}
} ) => {
	const { classes } = useStyles();
	
	const cards = card_repeater?.map( ( card, key: number ) => (
		<Card key={ key } radius="md" className={ classes.card }>
			{ card?.card_icon &&
        <Svg className={ `${ classes.cardIcon } cardIcon` } style={ { stroke : card?.card_icon_color, } }
             svg={ card?.card_icon }/> }
			{ card?.card_title && <Text className={ classes.cardTitle } mt="md">{ card.card_title }</Text> }
			{ card?.card_text && <Text className={ classes.cardDesc } mt="md" mb={ "md" }>{ card.card_text }</Text> }
			{
				card?.card_link?.url &&
        <Link className={ `${ classes.cardBtn } cardBtn` } href={ card?.card_link?.url }>
					{ card?.card_link?.title }
        </Link>
			}
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.ourProcedures }>
			<Container size="xl">
				{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
				<SimpleGrid className={ classes.cards } cols={ 3 } spacing="xl" breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					{ cards }
				</SimpleGrid>
				{ button_repeater && <CustomButton button={ button_repeater }/> }
			</Container>
		</div>
	);
}

export default OurProcedures;