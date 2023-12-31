'use client'

import {
	createStyles,
	Menu,
	Center,
	Header,
	Container,
	Group,
	Burger,
	Image,
	rem, Box,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useThemeContext } from "@/context/theme.context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { modifyLinks } from "@/helpers";
import CustomButton from "@/components/Button";

interface HeaderLink {
	link: string;
	label: string;
	links?: HeaderLink[];
}

interface HeaderActionProps {
	links?: HeaderLink[];
}

const useStyles = createStyles( ( theme ) => ({
	header : {
		position        : 'sticky',
		zIndex          : 299,
		backgroundColor : theme.colors.cyan,
		padding         : `${ theme.spacing.xl } 0`,
		border          : 'none',
		
		'&.home' : {
			backgroundColor : theme.colors.blue8,
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			padding : `calc(${ theme.spacing.md } * 2) 0`,
			border  : 'none',
		},
	},
	
	headerMobile : {
		
		[theme.fn.smallerThan( 'md' )] : {
			width          : '100%',
			justifyContent : 'space-between',
		},
	},
	
	inner : {
		display        : 'flex',
		justifyContent : 'space-between',
		alignItems     : 'center',
	},
	
	logo : {
		
		[theme.fn.smallerThan( 'md' )] : {
			
			'figure' : {
				width  : rem( 168 ),
				height : rem( 50 )
			}
			
		},
	},
	
	links : {
		
		[theme.fn.smallerThan( 'md' )] : {
			display : 'none',
		},
	},
	
	burger : {
		position : 'relative',
		zIndex   : 1000,
		
		[theme.fn.largerThan( 'md' )] : {
			display : 'none',
		},
	},
	
	link : {
		display        : 'block',
		lineHeight     : 1.5,
		padding        : `${ rem( 8 ) } ${ rem( 12 ) }`,
		borderRadius   : theme.radius.sm,
		textDecoration : 'none',
		color          : theme.colors.blue8,
		fontSize       : theme.headings.sizes.h3.fontSize,
		fontWeight     : 400,
		
		'.home &' : {
			color : theme.colors.white,
		},
		
		'&.active' : {
			backgroundColor : theme.colors.grey,
			color           : theme.colors.blue9,
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			color : theme.colors.white,
		},
		
		[theme.fn.largerThan( 'md' )] : {
			fontSize : theme.fontSizes.md,
			padding  : `${ rem( 4 ) } ${ rem( 6 ) }`,
			
			'&:hover' : {
				backgroundColor : theme.colors.grey,
				color           : theme.colors.blue9,
			},
		},
	},
	
	childLink : {
		textDecoration : 'none',
		color          : theme.colors.blue9,
	},
	
	linkLabel : {
		marginRight : rem( 5 ),
		fontSize    : theme.headings.sizes.h3.fontSize,
		
		[theme.fn.largerThan( 'md' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	menuContainer : {
		position        : 'fixed',
		top             : 0,
		left            : 0,
		width           : '100%',
		height          : '100%',
		backgroundColor : theme.colors.blue8,
		zIndex          : 999,
		display         : 'flex',
		flexDirection   : 'column',
		paddingTop      : rem( 150 )
	},
	
	mobileLinks : {
		display       : 'flex',
		flexDirection : 'column',
	},
	
	mobileLinksChild : {
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'flex-start',
		
		a : {
			fontSize    : theme.fontSizes.lg,
			paddingLeft : theme.spacing.xl,
		}
	},
	
	itemWithChildWrap : {
		position : 'relative',
	},
	
	itemIcon : {
		position : 'absolute',
		right    : rem( -20 ),
		
		'&.open' : {
			transform : 'rotate(-180deg)'
		}
	},
	
}) );

export function HeaderAction( { links }: HeaderActionProps ) {
	const {
		classes,
		theme
	} = useStyles();
	const {
		themeSettings : {
			headerLogo,
			headerLogoHomePage,
			buttonRepeater
		}
	} = useThemeContext();
	
	const [isOpen, setIsOpen] = useState( false );
	const [isMenuOpen, setIsMenuOpen] = useState( false );
	const [openItems, setOpenItems] = useState<string[]>( [] );
	const pathname = usePathname()
	
	const isHomePage = pathname === '/';
	const logo = isHomePage ? headerLogoHomePage : headerLogo;
	const isMobile = useMediaQuery( '(max-width: 820px)' );
	
	
	const handleLinkClick = ( link: string ) => {
		setOpenItems( ( prevOpenItems ) =>
			prevOpenItems.includes( link ) ? prevOpenItems?.filter( ( item ) => item !== link ) : [...prevOpenItems, link]
		);
	};
	const handleBurgerClick = () => {
		setIsOpen( !isOpen );
		setIsMenuOpen( !isMenuOpen );
		setOpenItems( [] );
	};
	
	useEffect( () => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
	}, [isMenuOpen] );
	
	const renderMobileLinks = ( links: HeaderLink[] ) => {
		return links.map( ( link, index: number ) => {
			const hasChildren = link?.links && link?.links.length > 0;
			const isOpen = openItems.includes( link?.link );
			
			if ( hasChildren ) {
				return (
					<Box key={ index }>
						<Group className={ classes.itemWithChildWrap }>
							{
								link?.link &&
                <Link href={ link.link } className={ classes.link } onClick={ () => handleBurgerClick() }>
                  <span className={ classes.linkLabel }>{ link.label }</span>
                </Link>
							}
							<IconChevronDown className={ `${ classes.itemIcon } ${ isOpen ? 'open' : '' }` } color={ 'white' }
							                 size={ rem( 24 ) } stroke={ 2 }
							                 onClick={ () => handleLinkClick( link.link ) }/>
						</Group>
						{ isOpen &&
              <Group className={ classes.mobileLinksChild }>{ renderMobileLinks( link?.links || [] ) }</Group> }
					</Box>
				);
			}
			
			return (
				<Link key={ index } href={ link?.link } onClick={ () => handleBurgerClick() } className={ classes.link }>
					{ link?.label }
				</Link>
			);
		} );
	};
	
	const items = links?.map( ( link, index: number ) => {
		const modifyLink = modifyLinks( link?.link );
		const isActive = pathname.startsWith( modifyLink )
		const menuItems = link?.links?.map( ( item, key: number ) => {
			return (
				<Menu.Item key={ key } className={ classes.link }>
					<Link href={ modifyLinks( item?.link ) } className={ classes.childLink }>
						{ item.label }
					</Link>
				</Menu.Item>
			)
		} );
		
		if ( menuItems ) {
			return (
				<Menu key={ index } trigger={ `hover` }
				      transitionProps={ { exitDuration : 0 } } withinPortal>
					<Menu.Target>
						<Link href={ modifyLink } className={ `${ classes.link } ${ isActive ? 'active' : '' }` }>
							<Center>
								<span className={ classes.linkLabel }>{ link?.label }</span>
								<IconChevronDown size={ rem( 12 ) } stroke={ 1.5 }/>
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown>{ menuItems }</Menu.Dropdown>
				</Menu>
			);
		}
		
		return (
			<Link key={ index } href={ modifyLink } className={ `${ classes.link } ${ isActive ? 'active' : '' } ` }>
				{ link?.label }
			</Link>
		);
	} );
	
	return (
		<Header className={ `${ classes.header } ${ isHomePage ? 'home' : '' }` } height={ 'auto' }
		        sx={ { borderBottom : 0 } }>
			<Container className={ classes.inner } size="xl">
				<Group className={ classes.headerMobile }>
					{
						logo?.sourceUrl &&
            <Link href={ '/' }>
              <Image className={ classes.logo } src={ logo?.sourceUrl } alt={ logo?.title }/>
            </Link>
					}
					{ isMobile && (
						<>
							<Burger color={ `${ (isHomePage || isOpen) ? 'white' : `${ theme.colors.blue8 }` }` } opened={ isOpen }
							        onClick={ handleBurgerClick }
							        className={ classes.burger } size="sm"/>
							{ isMenuOpen && (
								<div className={ classes.menuContainer }>
									<Group className={ classes.mobileLinks }>{ renderMobileLinks( links || [] ) }</Group>
								</div>
							) }
						</>
					) }
				</Group>
				{ !isMobile && (
					<Group className={ classes.links }>
						{ items }
						{ buttonRepeater && <CustomButton className={ isHomePage ? 'home' : '' } button={ buttonRepeater }/> }
					</Group>
				) }
			</Container>
		</Header>
	);
}