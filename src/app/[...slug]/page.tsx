import React from 'react';
import { pageSettings } from '@/lib/pageSettings';
import PageBlocks from "@/components/PageBlocks";
import { Metadata } from "next";

export async function generateMetadata( { params }: { params: { slug: string } } ): Promise<Metadata> {
	const data = await pageSettings( params?.slug );
	const { seo }: any = data;
	
	return {
		title     : seo?.opengraphTitle,
		openGraph : {
			title       : seo?.opengraphTitle,
			description : seo?.opengraphDescription,
		},
	}
}

const Page = async ( { params }: { params: { slug: string[] | string } } ) => {
	const { slug } = params;
	try {
		const data = await pageSettings( slug );
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
