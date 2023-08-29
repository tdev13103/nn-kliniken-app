'use client'
import React from 'react';
import {
	createStyles,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	rem, Group, Button, Modal,
} from '@mantine/core';
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

interface PricesProps {
	data: {
		hide_this_block: string;
		prices_title: string;
		prices_desc: string;
		prices_repeater: PricesItems[];
		prices_modal_title: string;
		prices_modal_content: string;
		prices_modal_button_text: string;
	},
}

interface PricesItems {
	product_type_title: string
	product_repeater: ProductItems[]
}

interface ButtonProps {
	title: string,
	url: string
}

interface ProductItems {
	product_desc: string
	product_title: string
	read_more_btn: ButtonProps
	reserve_btn: ButtonProps
}

const useStyles = createStyles( ( theme ) => ({
	prices : {
		backgroundColor : theme.colors.grey,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		color        : theme.colors.blue8,
		fontSize     : theme.headings.sizes.h2.fontSize,
		lineHeight   : theme.headings.sizes.h2.lineHeight,
		fontWeight   : 700,
		marginBottom : theme.spacing.md,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	description : {
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		maxWidth : rem( 648 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	cards : {
		maxWidth : rem( 761 ),
		margin   : `calc(${ theme.spacing.xs } * 5 ) 0 0`,
		gap      : `calc(${ theme.spacing.xs } * 5 )`,
		
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
	
	childCard : {
		display         : 'flex',
		alignItems      : 'center',
		justifyContent  : 'space-between',
		backgroundColor : theme.colors.white,
		borderRadius    : `calc(${ theme.radius.sm } * 2)`,
		overflow        : 'hidden',
		border          : `${ rem( 1 ) } solid ${ theme.colors.grey3 }`,
	},
	
	cardTitle : {
		fontSize     : theme.headings.sizes.h3.fontSize,
		lineHeight   : theme.headings.sizes.h3.lineHeight,
		fontWeight   : 700,
		marginBottom : theme.spacing.md,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	productGroup : {
		display       : 'flex',
		alignItems    : 'flex-start',
		flexDirection : 'column',
		gap           : `calc(${ theme.spacing.md } / 2 )`
	},
	
	productTitle : {
		fontSize   : theme.fontSizes.lg,
		fontWeight : 700,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	productDesc : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	productReadMore : {
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		
		'&:hover' : {
			textDecoration : 'none'
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md
		},
	},
	
	productReserveBtn : {
		backgroundColor : 'transparent',
		border          : `${ rem( 1 ) } solid ${ theme.colors.blue9 }`,
		color           : theme.colors.blue9,
		
		'&:hover' : {
			backgroundColor : theme.colors.grey
		},
	},
	
	modalDescription : {
		fontSize   : theme.fontSizes.lg,
		lineHeight : 1.5,
		fontWeight : 400,
		color      : theme.colors.blue8,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md
		},
	},
	
	modalBtn : {
		backgroundColor : 'transparent',
		border          : `${ rem( 1 ) } solid ${ theme.colors.blue9 }`,
		color           : theme.colors.blue9,
		
		'&:hover' : {
			backgroundColor : theme.colors.grey
		},
	},
	
}) );
const Prices = ( {
	data : {
		hide_this_block,
		prices_title,
		prices_desc,
		prices_repeater,
		prices_modal_title,
		prices_modal_content,
		prices_modal_button_text,
	},
}: PricesProps ) => {
	const { classes } = useStyles();
	const [
		opened, {
			open,
			close
		}
	] = useDisclosure( false );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.prices }>
			<Container size="xl">
				{
					prices_title &&
          <Title order={ 2 } className={ classes.title }>
						{ prices_title }
          </Title>
				}
				{
					prices_desc &&
          <Text className={ classes.description }>
						{ prices_desc }
          </Text>
				}
				<SimpleGrid cols={ 1 } className={ classes.cards }>
					{
						prices_repeater?.map( ( card, index: number ) => (
							<Card key={ index } className={ classes.card } padding={ 0 }>
								{
									card?.product_type_title &&
                  <Text className={ classes.cardTitle }>
										{ card.product_type_title }
                  </Text>
								}
								<SimpleGrid cols={ 1 } className={ classes.childCards }>
									{
										card?.product_repeater?.map( ( product, key: number ) => (
											<Card.Section className={ classes.childCard } p={ 'md' } key={ key }>
												<Group className={ classes.productGroup }>
													{
														product?.product_title &&
                            <Text className={ classes.productTitle }>
															{ product?.product_title }
                            </Text>
													}
													<Group>
														{
															product?.product_desc &&
                              <Text className={ classes.productDesc }>
																{ product?.product_desc }
                              </Text>
														}
														{
															product?.read_more_btn?.url &&
                              <Link className={ classes.productReadMore }
                                    href={ product?.read_more_btn?.url }>{ product?.read_more_btn?.title }</Link>
														}
													</Group>
												</Group>
												{
													product?.reserve_btn?.title &&
                          <Group>
                            <Button onClick={ open }
                                    className={ classes.productReserveBtn }>{ product?.reserve_btn?.title }</Button>
                          </Group>
												}
											</Card.Section>
										) )
									}
								</SimpleGrid>
							</Card>
						) )
					}
				</SimpleGrid>
			</Container>
			<Modal opened={ opened } onClose={ close } title={ prices_modal_title } centered
			       styles={ ( theme ) => ({
				       title : {
					       fontSize   : theme.headings.sizes.h4.fontSize,
					       lineHeight : theme.headings.sizes.h4.lineHeight,
					       fontWeight : 700,
					       color      : theme.colors.blue8,
					       
					       [theme.fn.smallerThan( 'sm' )] : {
						       fontSize : theme.fontSizes.md,
					       },
				       },
				       close : {
					       color : theme.colors.blue8,
					       'svg' : {
						       width  : '24px !important',
						       height : '24px !important',
					       }
				       }
			       }) }>
				{
					prices_modal_content &&
          <Text className={ classes.modalDescription }>
						{ prices_modal_content }
          </Text>
				}
				<Button className={ classes.modalBtn } onClick={ close } mt="md">{ prices_modal_button_text }</Button>
			</Modal>
		</div>
	);
};

export default Prices;