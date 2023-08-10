'use client'
import { createStyles, Title, Text, Card, SimpleGrid, Container, rem, List, } from '@mantine/core';
import Check from "@/components/Icons/Check";
import Svg from "@/components/Svg";
import React from "react";
import CustomButton from "@/components/Button";

interface OurProcess {
	data: {
		hide_this_block: string,
		title: string
		button_repeater: ButtonProps[]
		desc: string,
		are_items_numbered: string,
		process_repeater: Process[]
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

interface Process {
	process_icon: string
	process_title: string
	icon_color: string
	item_repeater: {
		item_text: string
	}[]
}

const useStyles = createStyles( ( theme ) => ({
	ourProcess : {
		backgroundColor : theme.colors.cyan,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		counterReset    : 'section',
		
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
	
	description : {
		maxWidth : 875,
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	cards : {
		margin : `calc(${ theme.spacing.md } * 2 ) 0`,
		gap    : `calc(${ theme.spacing.md } * 2 )`,
	},
	
	card : {
		backgroundColor : 'transparent',
		color           : theme.colors.blue8,
	},
	
	cardTitle : {
		color      : theme.colors.blue8,
		fontSize   : theme.headings.sizes.h4.fontSize,
		lineHeight : theme.headings.sizes.h4.lineHeight,
		fontWeight : 700,
		margin     : `calc(${ theme.spacing.sm } * 2 ) 0`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
			margin   : `calc(${ theme.spacing.md } / 2 ) 0 ${ theme.spacing.md }`,
		},
	},
	
	iconWrap : {
		margin : 0,
		
		'&.numbered' : {
			counterIncrement : 'section',
			'&::after'       : {
				position        : 'absolute',
				content         : 'counter(section)',
				display         : 'flex',
				alignItems      : 'center',
				justifyContent  : 'center',
				left            : rem( 0 ),
				top             : rem( 0 ),
				width           : rem( 27 ),
				height          : rem( 27 ),
				color           : theme.colors.blue8,
				fontSize        : theme.fontSizes.lg,
				borderRadius    : '50%',
				backgroundColor : theme.colors.grey
			}
		}
	},
	
	item : {
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		
		'&:not(&:first-of-type)' : {
			marginTop : `calc(${ theme.spacing.sm } * 2 )`
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
			
			'&:not(&:first-of-type)' : {
				marginTop : theme.spacing.md
			},
		},
	},
	
	cardIcon : {
		path : {
			stroke : 'inherit'
		}
	}
}) );

export default function OurProcess( {
	data : {
		title,
		button_repeater,
		desc,
		process_repeater,
		are_items_numbered,
		hide_this_block
	}
}: OurProcess ) {
	const { classes } = useStyles();
	
	const features = process_repeater?.map( ( card, index: number ) => (
		<Card key={ index } radius="md" className={ classes.card } padding={ 0 }>
			{
				card?.process_icon &&
        <figure className={ `${ classes.iconWrap } ${ +are_items_numbered ? 'numbered' : '' }` }>
					{ card?.process_icon &&
            <Svg className={ classes.cardIcon } style={ { stroke : card?.icon_color, } }
                 svg={ card?.process_icon }/> }
        </figure>
			}
			{ card?.process_title && <Text className={ classes.cardTitle }>{ card.process_title }</Text> }
			<List icon={ <Check/> }>
				{
					card?.item_repeater?.map( ( item, key: number ) => {
						return (
							<List.Item className={ classes.item } key={ key }>
								{ item?.item_text }
							</List.Item>
						)
					} )
				}
			</List>
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.ourProcess }>
			<Container size="xl">
				{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
				{ desc && <Text className={ classes.description } mt="md">{ desc }</Text> }
				<SimpleGrid cols={ process_repeater.length <= 3 ? 3 : 2 } className={ classes.cards } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					{ features }
				</SimpleGrid>
				{ button_repeater && <CustomButton button={ button_repeater }/> }
			</Container>
		</div>
	);
}