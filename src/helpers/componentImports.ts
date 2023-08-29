import dynamic from "next/dynamic";

export const componentImports: Record<string, any> = {
	ContactUs           : dynamic( () => import('@/components/blocks/ContactUs') ),
	ContentWithImage    : dynamic( () => import('@/components/blocks/ContentWithImage') ),
	CustomClassic       : dynamic( () => import('@/components/blocks/CustomClassic') ),
	Faq                 : dynamic( () => import('@/components/blocks/Faq') ),
	FullWidthImage      : dynamic( () => import('@/components/blocks/FullWidthImage') ),
	HomeHero            : dynamic( () => import('@/components/blocks/HomeHero') ),
	OurPartners         : dynamic( () => import('@/components/blocks/OurPartners') ),
	OurProcedures       : dynamic( () => import('@/components/blocks/OurProcedures') ),
	OurValues           : dynamic( () => import('@/components/blocks/OurValues') ),
	OurProcess          : dynamic( () => import('@/components/blocks/OurProcess') ),
	Prices              : dynamic( () => import('@/components/blocks/Prices') ),
	Testimonials        : dynamic( () => import('@/components/blocks/Testimonials') ),
	TextArticles        : dynamic( () => import('@/components/blocks/TextArticles') ),
	CustomWysiwygEditor : dynamic( () => import('@/components/blocks/CustomWysiwygEditor') ),
};