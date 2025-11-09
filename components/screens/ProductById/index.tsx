"use client";

import { Product } from "~/libs/shopify/types";
import {
  DescriptionSection,
  FeaturesAndFilesIncludedSection,
  HeroSection,
  VideoSection,
} from "./sections";

const ProductByIdScreen = ({ product }: { product: Product }) => {
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
