'use client'
import {
	Text,
	Image,
	Group,
	SimpleGrid,
	createStyles,
	rem, Container, Title,
} from '@mantine/core';
import { useThemeContext } from "@/context/theme.context";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CustomButton from "@/components/Button";
import InputForms from "@/components/InputForms";
import { useForm } from "@mantine/form";

interface ContactUs {
	data: {
		desc: string
		image: string
		button_repeater: ButtonProps[]
		title: string
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
}

interface FormFields {
	type: string
	name?: string,
	className: string,
	label?: string,
	placeholder?: string,
}

const useStyles = createStyles( ( theme ) => {
	const BREAKPOINT = theme.fn.smallerThan( 'sm' );
	
	return {
		contactUs : {
			paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
			paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
			backgroundColor : theme.colors.grey,
			
			'&.home' : {
				backgroundColor : theme.colors.white,
				
				[theme.fn.smallerThan( 'md' )] : {
					backgroundColor : theme.colors.grey,
				},
			},
			
			[theme.fn.smallerThan( 'md' )] : {
				paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
				paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
			},
		},
		
		wrapper : {
			gap : `calc(${ theme.spacing.md } * 2)`,
		},
		
		form : {
			
			[theme.fn.largerThan( 'md' )] : {
				maxWidth : rem( 648 ),
			},
		},
		
		fields : {
			'.mantine-TextInput-label' : {
				color        : theme.colors.blue8,
				fontSize     : theme.fontSizes.lg,
				fontWeight   : 600,
				marginBottom : `calc(${ theme.spacing.sm } / 2)`,
			}
			
		},
		
		fieldInput : {
			marginBottom : `calc(${ theme.spacing.md } * 2)`,
			
			[theme.fn.smallerThan( 'md' )] : {
				marginBottom : `calc(${ theme.spacing.md })`,
			},
			
			'input' : {
				color           : theme.colors.blue8,
				fontSize        : theme.fontSizes.lg,
				padding         : `${ rem( 1 ) } ${ rem( 16 ) }`,
				borderRadius    : `calc(${ theme.radius.sm } * 2)`,
				height          : rem( 48 ),
				backgroundColor : 'transparent',
			}
		},
		
		fieldsGroup : {
			display : 'flex',
			
			[BREAKPOINT] : {
				flexDirection : 'column',
			},
		},
		
		contacts : {
			
			borderRadius : `calc(${ theme.radius.sm } * 3)`,
			overflow     : 'hidden',
			
			[theme.fn.largerThan( 'md' )] : {
				maxWidth : rem( 648 ),
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
			margin   : `${ theme.spacing.md } 0 calc(${ theme.spacing.md } * 2)`,
			color    : theme.colors.blue8,
			fontSize : theme.fontSizes.lg,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
				margin   : `calc(${ theme.spacing.md } / 2) 0 calc(${ theme.spacing.sm } * 2)`,
			},
		},
		
		groupFields : {
			gap : `0 calc(${ theme.spacing.md } * 2)`,
			
			[theme.fn.smallerThan( 'xs' )] : {
				gap : 0,
			},
		},
		
		image : {
			[theme.fn.smallerThan( 'md' )] : {
				height : rem( 378 ),
				
				'figure' : {
					height : '100%',
					
					'img' : {
						height         : '100% !important',
						objectPosition : 'top',
					},
					
					'div' : {
						height : '100%'
					}
				}
			},
			[theme.fn.smallerThan( 'xs' )] : {
				height : rem( 175 ),
			}
		},
	};
} );

export default function ContactUs( {
	data : {
		desc,
		image,
		title,
		button_repeater,
		hide_this_block
	}
}: ContactUs ) {
	const { classes } = useStyles();
	const { themeSettings : { formsSettings } } = useThemeContext();
	const inputs = [
		{
			type        : 'text',
			name        : 'name',
			className   : `${ classes.fieldInput }`,
			label       : 'Namn',
			placeholder : 'Tony Lip',
		},
		{
			type        : 'text',
			name        : 'email',
			className   : `${ classes.fieldInput }`,
			label       : 'E-postadress',
			placeholder : 'din@epostadress.se',
		},
		{
			type        : 'text',
			name        : 'message',
			className   : `${ classes.fieldInput }`,
			label       : 'Meddelande',
			placeholder : 'Ditt meddelande',
		},
	];
	
	const pathname = usePathname()
	
	const isHomePage = pathname === '/';
	const homePageClass = isHomePage ? 'home' : '';
	
	const [finalFormsFields, setFinalFormsFields] = useState<FormFields[]>( inputs );
	const currentFormFields = formsSettings?.filter( ( item ) => item?.formName === 'Contact form' )?.[0];
	
	
	useEffect( () => {
		setFinalFormsFields( () => {
			return inputs?.map( item => {
				return {
					...item,
					newName : (currentFormFields?.fields || [])?.filter(
						( subItem ) => subItem.name === item.name )[0]?.fieldId,
				};
			} );
		} );
	}, [] );
	
	const form = useForm( {
		initialValues : {
			name    : '',
			email   : '',
			message : '',
		},
		validate      : {
			name    : ( value ) => (/^[a-zA-Z0-9]{2,30}$/.test( value ) ? null
			                                                            : 'Name must be 2-30 characters long and may only contain letters and numbers'),
			email   : ( value ) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value ) ? null : 'Invalid email'),
			message : ( value ) => (value?.trim() !== '' ? null : 'Meddelande field is required'),
		},
	} );
	
	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		form.validate()
		const target = event?.target as HTMLFormElement;
		
		if ( form.isValid() ) {
			try {
				const formData = new FormData( target );
				const url = `${ process.env.NEXT_PUBLIC_WORDPRESS_API_URL }/wp-json/gf/v2/forms/${ currentFormFields?.formId }/submissions`;
				
				const response = await fetch( url, {
					method : 'POST',
					body   : formData
				} );
				
				if ( response.ok ) {
					const data = await response.json();
					console.log( 'Response', data );
					form.reset();
				}
				else {
					const errorData = await response.json();
					console.log( 'Error data:', errorData );
				}
			}
			catch ( error ) {
				console.log( 'Error occurred:', error );
			}
		}
	};
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.contactUs } ${ homePageClass }` }>
			<Container size={ 'xl' }>
				<SimpleGrid cols={ 2 } className={ classes.wrapper } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					{
						image &&
            <Group className={ classes.contacts }>
              <Image className={ classes.image } src={ image } alt={ 'Contact us' }/>
            </Group>
					}
					<form className={ classes.form } onSubmit={ handleSubmit }>
						{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
						{ desc && <Text className={ classes.description }>{ desc }</Text> }
						<div className={ classes.fields }>
							<SimpleGrid cols={ 2 } className={ classes.groupFields } breakpoints={ [
								{
									maxWidth : 'sm',
									cols     : 1
								}
							] }>
								{
									finalFormsFields?.map( ( input, index: number ) => {
										const isLastElement = index === finalFormsFields.length - 1;
										return (
											<div key={ index } style={ { gridColumn : isLastElement ? '1 / -1' : 'auto' } }>
												<InputForms data={ input } form={ form }/>
											</div>
										)
									} )
								}
							</SimpleGrid>
							<Group>
								{ button_repeater && <CustomButton isSubmitBtn={ true } button={ button_repeater }/> }
							</Group>
						</div>
					</form>
				</SimpleGrid>
			</Container>
		</div>
	);
}