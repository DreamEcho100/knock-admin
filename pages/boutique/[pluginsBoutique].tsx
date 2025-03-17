import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import KnockScreen from '~/components/screens/knock-pluginboutique';
import { getProduct, getProducts } from '~/libs/shopify';
import { Product } from '~/libs/shopify/types';

export interface IKnockPluginBoutiqueProps {
	knockPluginBoutique: Product; // ShopifyBuy.Product;
}

const KnockPluginBoutique: NextPage<IKnockPluginBoutiqueProps> = (props) => {
	return <KnockScreen {...props} />;
};

export default KnockPluginBoutique;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const productId = params?.pluginsBoutique;
	if (typeof productId !== 'string')
		throw new Error('productId must be a string');

	// !!!
	// Handle errors
	const knockPluginBoutique = await getProduct({ handle: productId });

	if (!knockPluginBoutique)
		return {
			notFound: true
		};

	return {
		props: {
			knockPluginBoutique
		}
	};
};

export const getStaticPaths: GetStaticPaths<{
	pluginsBoutique: string;
}> = async (context) => {
	const paths = await getProducts().then((products) => {
		const paths = [];

		const typesToExclude = ['Sound Editing Software'];

		for (const product of products) {
			if (!typesToExclude.includes(product.productType)) {
				paths.push({ params: { pluginsBoutique: product.handle } });
			}
		}

		return paths;
	});

	return {
		paths,
		fallback: 'blocking'
	};
};
