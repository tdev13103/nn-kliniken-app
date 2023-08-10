'use client'

import React from "react";
import { usePathname } from "next/navigation";
import {
	createStyles,
	Container,
	Title,
	Group,
	Text,
	List,
	Image,
	rem,
} from "@mantine/core";
import { determineContactType } from "@/helpers";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";

interface HomeHeroProps {
	data: {
		button_repeater: ButtonProps[]
		desc: string
		title: string,
		image: string,
		hide_this_block: string,
		is_there_a_main_banner: string,
		items_repeater: Items[]
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

interface Items {
	item_text: string,
	item_icon: string,
	item_icon_color: string,
	item_is_link: string
}

const useStyles = createStyles( ( theme ) => ({
	hero : {
		marginBottom    : 0,
		backgroundColor : theme.colors.grey,
		
		'&.home.main' : {
			backgroundColor                : theme.colors.blue8,
			marginBottom                   : `calc(${ theme.spacing.lg } * 5)`,
			[theme.fn.smallerThan( 'md' )] : {
				marginBottom : 0,
			},
		},
		'&.main'      : {
			backgroundColor : theme.colors.cyan,
		},
		'&.home'      : {
			backgroundColor : theme.colors.white,
			
			[theme.fn.smallerThan( 'md' )] : {
				backgroundColor : theme.colors.grey,
			},
		},
	},
	
	inner : {
		display        : 'flex',
		justifyContent : 'space-between',
		position       : 'relative',
		paddingTop     : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom  : `calc(${ theme.spacing.lg } * 5)`,
		
		'.home &' : {
			paddingTop : `calc(${ theme.spacing.md } * 2)`,
		},
		'.main &' : {
			paddingTop : `calc(${ theme.spacing.md } * 2)`,
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			flexDirection : 'column-reverse',
			paddingTop    : `calc(${ theme.spacing.lg } * 3)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 5)`,
			
			'.main & ' : {
				paddingTop : 0,
			},
		},
	},
	
	content : {
		maxWidth    : rem( 648 ),
		width       : '100%',
		marginRight : theme.spacing.xl,
		
		[theme.fn.smallerThan( 'lg' )] : {
			maxWidth : rem( 570 ),
		},
		[theme.fn.smallerThan( 'xs' )] : {
			maxWidth    : '100%',
			marginRight : 0,
		},
	},
	
	title : {
		color      : theme.colors.blue8,
		fontSize   : theme.headings.sizes.h2.fontSize,
		lineHeight : theme.headings.sizes.h2.lineHeight,
		fontWeight : 700,
		
		[theme.fn.smallerThan( 'xs' )] : {
			fontSize : rem( 22 ),
		},
		
		'.home.main &' : {
			color : theme.colors.white,
		},
		'.main &'      : {
			fontSize   : theme.headings.sizes.h1.fontSize,
			lineHeight : theme.headings.sizes.h1.lineHeight,
			
			[theme.fn.smallerThan( 'xs' )] : {
				fontSize : rem( 42 ),
			},
		}
	},
	
	desc : {
		color    : theme.colors.blue8,
		fontSize : theme.fontSizes.lg,
		
		'a'            : {
			color : theme.colors.blue8,
		},
		'.home.main &' : {
			color : theme.colors.white,
			
			[theme.fn.smallerThan( 'xs' )] : {
				fontSize : theme.fontSizes.md,
			},
		}
	},
	
	itemText : {
		color      : theme.colors.blue8,
		fontSize   : theme.fontSizes.lg,
		lineHeight : 1.5,
		fontWeight : 400,
		marginLeft : theme.spacing.md,
		
		[theme.fn.smallerThan( 'xs' )] : {
			fontSize : theme.fontSizes.md,
		},
		
		'.home.main &' : {
			color : theme.colors.white,
		},
	},
	
	image : {
		'figure' : {
			position     : 'relative',
			overflow     : 'hidden',
			borderRadius : `calc(${ theme.radius.sm } * 3)`,
			
			'&::after' : {
				position        : 'absolute',
				content         : '""',
				display         : 'block',
				left            : rem( 0 ),
				top             : rem( 0 ),
				width           : '100%',
				height          : '100%',
				backgroundColor : theme.colors.blue8,
				opacity         : '0.23000000417232513',
			},
			
			[theme.fn.smallerThan( 'md' )] : {
				height       : rem( 408 ),
				marginBottom : theme.spacing.md,
			},
			
			[theme.fn.smallerThan( 'xs' )] : {
				height : rem( 182 ),
			},
			
			'img' : {
				height : '100% !important'
			},
			
			'div' : {
				height : '100%'
			}
		},
		
		'.home.main & figure' : {
			position : 'absolute',
			height   : rem( 685 ),
			width    : '-webkit-fill-available',
			
			[theme.fn.smallerThan( 'md' )] : {
				position : 'relative',
				height   : rem( 408 ),
			},
			[theme.fn.smallerThan( 'xs' )] : {
				height : rem( 182 ),
			},
		},
	},
	
	listItem : {
		listStyleType : 'none',
		
		'span' : {
			display    : 'flex',
			alignItems : "center"
		}
		
	},
	
	itemIcon : {
		width  : rem( 32 ),
		height : rem( 32 ),
		
		svg : {
			width  : rem( 32 ),
			height : rem( 32 ),
		},
		
		path : {
			stroke : 'inherit'
		}
	}
}) );

const HomeHero: React.FC<HomeHeroProps> = ( {
	data : {
		title,
		desc,
		button_repeater,
		items_repeater,
		image,
		hide_this_block,
		is_there_a_main_banner
	}
} ) => {
	const { classes } = useStyles();
	const pathname = usePathname()
	
	const isHomePage = pathname === '/';
	const isMainBanner = +is_there_a_main_banner ? 'main' : '';
	const homePageClass = isHomePage ? 'home' : '';
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.hero } ${ homePageClass } ${ isMainBanner }` }>
			<Container size="xl">
				<div className={ classes.inner }>
					<div className={ classes.content }>
						{ title && <Title order={ +is_there_a_main_banner ? 1 : 2 } className={ classes.title }>{ title }</Title> }
						{ desc && <Text className={ classes.desc } mt="md" dangerouslySetInnerHTML={ { __html : desc } }/> }
						<Group spacing={ 'md' } mt={ 32 }>
							{ button_repeater && <CustomButton button={ button_repeater }/> }
						</Group>
						<List
							mt={ 32 }
							spacing="lg"
						>
							{
								items_repeater?.map( ( item, key ) => {
									return (
										<List.Item className={ classes.listItem } key={ key }>
											{ item?.item_icon &&
                        <Svg className={ `${ classes.itemIcon }` } style={ { stroke : item?.item_icon_color, } }
                             svg={ item?.item_icon }/> }
											{
												+item?.item_is_link ? <a className={ classes.itemText } target={ '_blank' }
												                         href={ determineContactType( item.item_text ) }>{ item.item_text }</a>
												                    : <Text className={ classes.itemText }>{ item.item_text }</Text>
											}
										</List.Item>
									)
								} )
							}
						</List>
					</div>
					{ image && <Image src={ image } alt={ 'Banner Image' } className={ `${ classes.image }` }/> }
				</div>
			</Container>
		</div>
	);
}

export default HomeHero;