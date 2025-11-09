import type { NextPage, GetServerSideProps } from 'next';

import HomeScreen from 'components/screens/Home';
import { getProducts } from '~/libs/shopify';
import { Product } from '~/libs/shopify/types';
export interface IHomePageProps {
	products: Product[]; // ShopifyBuy.Product[];
	openPopUp: boolean;
}

const HomePage: NextPage<IHomePageProps> = (props) => {
	return <HomeScreen {...props} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
	const products = await getProducts().then((products) => {
		const typesToExclude = ['Sound Editing Software', 'Tutorial'];

		return products.filter(
			(product) => !typesToExclude.includes(product.productType)
		);
	});

	return {
		props: {
			products,
			revalidate: 5 * 60
		}
	};
};
