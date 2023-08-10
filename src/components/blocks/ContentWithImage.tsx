'use client'

import React from "react";
import {
	createStyles,
	Container,
	Title,
	Group,
	Text,
	Image,
	rem,
} from "@mantine/core";
import CustomButton from "@/components/Button";

interface HomeHeroProps {
	data: {
		button_repeater: ButtonProps[]
		content: string
		title: string,
		sub_title: string,
		image: string,
		hide_this_block: string,
		is_content_right_side: string,
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

const useStyles = createStyles( ( theme ) => ({
	contentWithImage : {
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		backgroundColor : theme.colors.grey,
		color           : theme.colors.blue8,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	inner : {
		display        : 'flex',
		justifyContent : 'space-between',
		position       : 'relative',
		
		'.reverse &' : {
			flexDirection : 'row-reverse',
			
			[theme.fn.smallerThan( 'md' )] : {
				flexDirection : 'column-reverse',
			},
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			flexDirection : 'column-reverse',
		},
	},
	
	content : {
		maxWidth    : rem( 648 ),
		width       : '100%',
		marginRight : theme.spacing.xl,
		
		'.reverse &' : {
			marginLeft  : theme.spacing.xl,
			marginRight : 0,
			
			[theme.fn.smallerThan( 'md' )] : {
				marginLeft : 0,
			},
		},
		
		[theme.fn.smallerThan( 'lg' )] : {
			maxWidth : rem( 570 ),
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			maxWidth    : '100%',
			marginRight : 0,
		},
	},
	
	title : {
		
		[theme.fn.smallerThan( 'xs' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	subTitle : {
		[theme.fn.smallerThan( 'xs' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	desc : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'xs' )] : {
			fontSize : theme.fontSizes.md,
		},
		
		'a' : {
			color : theme.colors.blue8,
		},
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
	},
}) );

const ContentWithImage: React.FC<HomeHeroProps> = ( {
	data : {
		title,
		sub_title,
		button_repeater,
		content,
		image,
		hide_this_block,
		is_content_right_side
	}
} ) => {
	const { classes } = useStyles();
	
	const isReverse = +is_content_right_side ? 'reverse' : '';
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.contentWithImage }  ${ isReverse }` }>
			<Container size="xl">
				<div className={ classes.inner }>
					<div className={ classes.content }>
						{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
						{ sub_title && <Title order={ 4 } className={ classes.subTitle } mt="md">{ sub_title }</Title> }
						{ content && <Text className={ classes.desc } mt="md" dangerouslySetInnerHTML={ { __html : content } }/> }
						<Group mt={ 32 }>
							{ button_repeater && <CustomButton button={ button_repeater }/> }
						</Group>
					</div>
					{ image && <Image src={ image } alt={ 'Banner Image' } className={ `${ classes.image }` }/> }
				</div>
			</Container>
		</div>
	);
}

export default ContentWithImage;