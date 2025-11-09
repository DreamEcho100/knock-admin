import type {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	NextPage
} from 'next';

import ProductByIdScreen from '~/components/screens/ProductById';
import { Product } from '~/libs/shopify/types';
import { getProduct, getProducts } from '~/libs/shopify';
import axios from 'axios';
import { ICustomProduct } from '~/types';

export interface IProductByIdPageProps {
	product: Product;
}

const ProductByIdPage: NextPage<IProductByIdPageProps> = ({ product }) => {
	return <ProductByIdScreen product={product} />;
};

const pages_redirects_map: Record<string, any> = {
	'knock-plugin': '/knock',
	'knock-clipper': '/knock-clipper'
};

export default ProductByIdPage;

export const getOneCustomProductByHandle = async (handle: string) => {
	const product = await getProduct({ handle });

	if (!product) {
		throw new Error('Product not found');
	}

	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK-product?productHandle=${product.handle}`
	);

	const newFieldsApi = response.data.DTKproduct;

	newFieldsApi && delete newFieldsApi.id;

	const newProductObject = {
		...product,
		...newFieldsApi,
		originalDescription: product.description
	} as ICustomProduct | null;

	return newProductObject;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const productHandle = params?.productHandle;
	if (typeof productHandle !== 'string')
		throw new Error('productHandle must be a string');

	// !!!
	// Handle errors
	const knockPluginBoutique = await getOneCustomProductByHandle(productHandle);

	if (
		!knockPluginBoutique ||
		typeof pages_redirects_map[productHandle] === 'string'
	)
		return {
			notFound: true
		};

	return {
		props: {
			product: knockPluginBoutique
		}
	};
};

export const getStaticPaths: GetStaticPaths<{
	productHandle: string;
}> = async (context) => {
	const paths = await getProducts().then((products) => {
		const paths = [];
		// products
		// 	.filter(
		// 		(item) =>
		// 			!pages_redirects_map[item.handle] ||
		// 			item.handle.search('boutique') === -1
		// 	)
		// 	.map((product) => ({
		// 		params: { productHandle: product.handle }
		// 	}))

		for (const product of products) {
			if (
				!pages_redirects_map[product.handle] &&
				product.handle.search('boutique') === -1
			) {
				paths.push({
					params: { productHandle: product.handle }
				});
			}
		}

		return paths;
	});

	return {
		paths: paths,
		fallback: 'blocking'
	};
};
