'use client'

import React from 'react';
import { Button, createStyles, rem } from '@mantine/core';
import Link from "next/link";

interface CustomButtonProps {
	button: ButtonProps[]
	isSubmitBtn?: boolean,
	className?: string
}

interface ButtonProps {
	button: {
		title: string
		url: string
	}
	variant: string
	color: string
}

const useStyles = createStyles( ( theme ) => ({
		control : {
			fontWeight   : 400,
			height       : rem( 48 ),
			lineHeight   : 1.5,
			fontSize     : theme.fontSizes.lg,
			padding      : `${ rem( 1 ) } ${ rem( 26 ) }`,
			borderRadius : `calc(${ theme.radius.sm } * 2)`,
			
			'&.filled.blue' : {
				color           : theme.colors.white,
				backgroundColor : theme.colors.blue8,
				
				'&:hover' : {
					backgroundColor : theme.colors.blue9,
				},
				
				'&.home' : {
					color           : theme.colors.blue9,
					backgroundColor : theme.colors.cyan,
					
					'&:hover' : {
						backgroundColor : theme.colors.cyan9,
					},
				},
			},
			
			'&.outlined.blue' : {
				backgroundColor : 'transparent',
				border          : `${ rem( 1 ) } solid ${ theme.colors.blue9 }`,
				color           : theme.colors.blue9,
				
				'&:hover' : {
					backgroundColor : theme.colors.grey
				},
			},
			
			'&.light.blue' : {
				color           : theme.colors.blue9,
				backgroundColor : theme.colors.cyan,
				
				'&:hover' : {
					backgroundColor : theme.colors.cyan9,
				},
			},
			
			'&.subtle.grey' : {
				color           : theme.colors.white,
				backgroundColor : 'transparent',
				
				'&:hover' : {
					backgroundColor : theme.colors.grey,
				},
			},
			
			[theme.fn.smallerThan( 'sm' )] : {
				width : '100%',
			},
		},
	})
)

const CustomButton = ( {
	button,
	isSubmitBtn = false,
	className = '',
}: CustomButtonProps ) => {
	const { classes } = useStyles();
	return (
		<>
			{
				button?.map( ( btn, index ) => {
					return (
						isSubmitBtn
						? <Button key={ index } type="submit"
						          className={ `${ classes.control } ${ btn?.variant } ${ btn.color } ${ className }` }
						>
							{ btn?.button?.title }
						</Button>
						: <Button key={ index } component={ Link } href={ btn?.button?.url }
						          className={ `${ classes.control } ${ btn?.variant } ${ btn.color } ${ className }` }
						>
							{ btn?.button?.title }
						</Button>
					)
				} )
			}
		</>
	);
};

export default CustomButton;