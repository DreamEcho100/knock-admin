import KnockClipperScreen from '~/components/screens/KnockClipper';
import type { GetServerSideProps, NextPage } from 'next';
import { Product } from '~/libs/shopify/types';
import { getProduct } from '~/libs/shopify';

export interface IKnockClipperPageProps {
	knockClipperPlugin: Product;
}

const KnockClipperPage: NextPage<IKnockClipperPageProps> = (props) => {
	return <KnockClipperScreen {...props} />;
};

export default KnockClipperPage;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const knockClipperPlugin = await getProduct({ handle: 'knock-clipper' });

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	);

	return {
		props: {
			knockClipperPlugin
		}
	};
};
