'use client'

import { createStyles, Container, Title, Text, rem, Accordion, } from '@mantine/core';
import { usePathname } from "next/navigation";
import CustomButton from "@/components/Button";
import React from "react";

interface Faq {
	data: {
		faq_accordion_repeater: faqAccordion[]
		button_repeater: ButtonProps[]
		faq_desc: string,
		faq_title: string,
		hide_this_block: string
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

interface faqAccordion {
	item_text: string,
	item_title: string
}

const useStyles = createStyles( ( theme ) => ({
	faq : {
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		backgroundColor : theme.colors.grey,

		'&.home' : {
			backgroundColor : theme.colors.white,

			[theme.fn.smallerThan( 'md' )] : {
				backgroundColor : theme.colors.grey,
			},
		},
	},

	inner : {
		display        : 'flex',
		justifyContent : 'space-between',

		[theme.fn.smallerThan( 'md' )] : {
			flexDirection : 'column'
		},
	},

	content : {

		marginRight : theme.spacing.xl,

		[theme.fn.smallerThan( 'md' )] : {
			maxWidth    : '100%',
			marginRight : 0,
		},
		[theme.fn.largerThan( 'md' )]  : {
			maxWidth : rem( 478 ),
		},
		[theme.fn.largerThan( 'lg' )]  : {
			maxWidth : rem( 648 ),
		},
	},

	title : {
		color      : theme.colors.blue8,
		fontSize   : theme.headings.sizes.h1.fontSize,
		lineHeight : theme.headings.sizes.h1.lineHeight,
		fontWeight : 700,

		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},

	desc : {
		color        : theme.colors.blue8,
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.md } * 2)`,

		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},

	accordionText : {
		color      : theme.colors.blue8,
		fontSize   : theme.fontSizes.lg,
		lineHeight : 1.55,
	},
}) );

const Faq = ( {
	data : {
		faq_title,
		faq_desc,
		button_repeater,
		faq_accordion_repeater,
		hide_this_block
	}
}: Faq ) => {
	const {
		classes,
		theme
	} = useStyles();

	const pathname = usePathname()

	const isHomePage = pathname === '/';
	const homePageClass = isHomePage ? 'home' : '';

	if ( +hide_this_block ) {
		return null;
	}

	return (
		<div className={ `${ classes.faq } ${ homePageClass }` }>
			<Container size="xl">
				<div className={ classes.inner }>
					<div className={ classes.content }>
						{ faq_title && <Title order={ 2 } className={ classes.title }>{ faq_title }</Title> }
						{ faq_desc && <Text className={ classes.desc } mt="md">{ faq_desc }</Text> }
						{ button_repeater && <CustomButton button={ button_repeater }/> }
					</div>
					<Accordion transitionDuration={ 1000 } styles={ {
						item : {
							borderColor : theme.colors.blue8,

							[theme.fn.largerThan( 'md' )] : {
								maxWidth : rem( 648 ),
							},

							'.mantine-Accordion-control' : {
								padding : 0,
                            },

							'.mantine-Accordion-control:hover' : {
								backgroundColor : 'transparent',
							},

							'.mantine-Accordion-label' : {
								fontWeight : 600,
								padding    : `24px 0`
							},

							'&[data-active]' : {
								backgroundColor : 'transparent',
							},
						},

						chevron : {
							color           : `${ theme.colors.white }`,
							backgroundColor : `${ theme.colors.blue8 }`,
							width           : rem( 32 ),
							height          : rem( 32 ),
							borderRadius    : '50%'
						},
					} }>
						{
							faq_accordion_repeater?.map( ( item, key: number ) => {
								return (
									<Accordion.Item value={ `item-${ key }` } key={ key }>
										<Accordion.Control className={ classes.accordionText }>{ item?.item_title }</Accordion.Control>
										<Accordion.Panel className={ classes.accordionText }>{ item?.item_text }</Accordion.Panel>
									</Accordion.Item>
								)
							} )
						}
					</Accordion>
				</div>
			</Container>
		</div>
	);
}

export default Faq;
