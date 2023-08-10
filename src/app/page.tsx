import React from 'react';
import { pageSettings } from '@/lib/pageSettings';
import PageBlocks from "@/components/PageBlocks";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const data = await pageSettings( 'home' );
	const { seo }: any = data;
	
	return {
		title     : seo?.opengraphTitle,
		openGraph : {
			title       : seo?.opengraphTitle,
			description : seo?.opengraphDescription,
		},
	}
}

const Page = async () => {
	try {
		const data = await pageSettings( 'home' );
		const { blocks } = data;
		const { seo }: any = data;
		
		return (
			<>
				{
					seo?.schema?.raw &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={ { __html : JSON.stringify( seo?.schema?.raw ) } }
          />
				}
				<PageBlocks blocks={ blocks }/>
			</>
		);
	}
	catch ( error ) {
		console.error( 'Error retrieving page settings:', error );
		return null;
	}
};

export default Page;
