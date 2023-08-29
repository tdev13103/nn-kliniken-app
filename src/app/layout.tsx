import React from "react";
import RootStyleRegistry from './emotion';
import { ThemeContextProvider } from "@/context/theme.context";
import { themeSettings } from "@/lib/themeSettings";
import { HeaderAction } from "@/components/Header";
import { menuSettings } from "@/lib/menuSettings";
import { FooterAction } from "@/components/Footer";
import { Poppins } from 'next/font/google'

export const revalidate = 5;

// If loading a variable font, you don't need to specify the font weight
const poppins = Poppins( {
	subsets  : ['latin'],
	style    : ['normal'],
	weight   : ['400', '600', '700'],
	variable : '--font-poppins',
	display  : 'swap',
} )

export default async function RootLayout( { children }: { children: React.ReactNode } ) {
	
	const menuProps = await menuSettings();
	const theme = await themeSettings();
	return (
		<html lang="en-US" className={ poppins.className }>
		<head></head>
		<body>
		<ThemeContextProvider value={ theme }>
			<RootStyleRegistry>
				<HeaderAction links={ menuProps['header-menu'] }/>
				{ children }
				<FooterAction links={ menuProps['footer-menu'] }/>
			</RootStyleRegistry>
		</ThemeContextProvider>
		</body>
		</html>
	);
}
