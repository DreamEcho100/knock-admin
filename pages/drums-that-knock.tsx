import type { GetServerSideProps, NextPage } from 'next';

import DrumsThatKnock from '~/components/screens/DrumsThatKnock';
import { Product } from '~/libs/shopify/types';
import { getProduct, getProducts } from '~/libs/shopify';

export interface IDrumsThatKnockPageProps {
	products: Product[]; // ShopifyBuy.Product[];
	knockPlugin: Product; // ShopifyBuy.Product;
}

const DrumsThatKnockPage: NextPage<IDrumsThatKnockPageProps> = ({
	products,
	knockPlugin
}) => {
	return <DrumsThatKnock products={products} knockPlugin={knockPlugin} />;
};

export default DrumsThatKnockPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const products = await getProducts().then((products) => {
		const typesToExclude = ['Sound Editing Software'];

		return products.filter(
			(product) => !typesToExclude.includes(product.productType)
		);
	});

	const knockPlugin = await getProduct({ handle: 'knock-plugin' });

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	return {
		props: {
			products,
			knockPlugin,
			revalidate: 5 * 60
		}
	};
};
