'use client'

import React from 'react';
import {
	createStyles,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	rem,
} from '@mantine/core';

interface TextArticlesProps {
	data: {
		hide_this_block: string,
		title: string
		article_repeater: TextArticles[]
	},
}

interface TextArticles {
	title: string
	left_content: string
	right_content: string
}

const useStyles = createStyles( ( theme ) => ({
	textArticles : {
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
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	cards : {
		margin : `calc(${ theme.spacing.md } * 2 ) 0 0`,
		gap    : `calc(${ theme.spacing.xs } * 5 )`,
		
		[theme.fn.smallerThan( 'md' )] : {
			gap : `calc(${ theme.spacing.md } * 2 )`,
		},
	},
	
	childCards : {
		gap : theme.spacing.md,
	},
	
	card : {
		backgroundColor : 'transparent',
		color           : theme.colors.blue8,
	},
	
	cardTitle : {
		fontSize     : theme.headings.sizes.h4.fontSize,
		lineHeight   : theme.headings.sizes.h4.lineHeight,
		fontWeight   : 700,
		marginBottom : theme.spacing.md,
		
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

export default function TextArticles( {
	data : {
		title,
		hide_this_block,
		article_repeater
	}
}: TextArticlesProps ) {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.textArticles }>
			<Container size="xl">
				{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
				<SimpleGrid cols={ 1 } className={ classes.cards }>
					{
						article_repeater?.map( ( card, index: number ) => (
							<Card key={ index } className={ classes.card } padding={ 0 }>
								{ card?.title && <Text className={ classes.cardTitle }>{ card.title }</Text> }
								<SimpleGrid cols={ 2 } className={ classes.childCards } breakpoints={ [
									{
										maxWidth : 'md',
										cols     : 1
									},
								] }>
									{ card.left_content && <Text className={ classes.item }>{ card.left_content }</Text> }
									{ card.right_content && <Text className={ classes.item }> { card.right_content } </Text> }
								</SimpleGrid>
							</Card>
						) )
					}
				</SimpleGrid>
			</Container>
		</div>
	);
}