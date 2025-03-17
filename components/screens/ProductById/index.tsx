import type { IProductByIdPageProps } from '~/pages/products/[productHandle]';

import {
	DescriptionSection,
	FeaturesAndFilesIncludedSection,
	HeroSection,
	VideoSection
} from './sections';

const ProductByIdScreen = ({ product }: IProductByIdPageProps) => {
	return (
		<>
			<HeroSection product={product} />
			{/* <DescriptionSection description={product.description} /> */}
			{/* <FeaturesAndFilesIncludedSection
			features={product.features}
			filesIncluded={product.filesIncluded}
		/>
		<VideoSection video={product.video} /> */}
		</>
	);
};

export default ProductByIdScreen;
