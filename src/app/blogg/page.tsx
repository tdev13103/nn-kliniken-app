import React from 'react';
import { pageSettings } from '@/lib/pageSettings';
import PageBlocks from "@/components/PageBlocks";
import { postsSettings } from "@/lib/postsSettings";
import PostsBlock from "@/components/PostsBlock";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const data = await pageSettings( 'blogg' );
	const { seo }: any = data;
	
	return {
		title     : seo?.opengraphTitle,
		openGraph : {
			title       : seo?.opengraphTitle,
			description : seo?.opengraphDescription,
		},
	}
}

export default async function Page() {
	try {
		const pages = await pageSettings( 'blogg' );
		const posts = await postsSettings();
		const { blocks } = pages;
		const { seo }: any = pages;
		
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
				<PostsBlock posts={ posts }/>
			</>
		);
	}
	catch ( error ) {
		console.error( 'Error retrieving page settings:', error );
		return null;
	}
};
