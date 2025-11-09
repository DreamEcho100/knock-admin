import type { GetServerSideProps, NextPage } from 'next';

import KnockScreen from '~/components/screens/Knock';
import { Product } from '~/libs/shopify/types';
import { getProduct } from '~/libs/shopify';

export interface IKnockPluginPageProps {
	knockPlugin: Product; // ShopifyBuy.Product;
}

const KnockPluginPage: NextPage<IKnockPluginPageProps> = (props) => {
	return <KnockScreen {...props} />;
};

export default KnockPluginPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const knockPlugin = await getProduct({ handle: 'knock-plugin' });

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	return {
		props: {
			knockPlugin
		}
	};
};
