"use client";

import { useQuery } from "@tanstack/react-query";
import { getDTKPageData } from "~/utils/core/API";
import {
  ArtistsSection,
  DigitalProductsSection,
  HeroSection,
  KnockProductShowcaseSection,
} from "./sections";
import type { Product } from "~/libs/shopify/types";

export interface IDrumsThatKnockPageProps {
  products: Product[];
  knockPlugin: Product;
}

const DrumsThatKnock = ({
  products,
  knockPlugin,
}: IDrumsThatKnockPageProps) => {
  const { data } = useQuery(["dtk-page"], () => getDTKPageData(), {
    onSuccess(data) {
      return data;
    },
    refetchInterval: 3000,
  });

  return (
    <>
      <HeroSection data={data ? data.main_section : ""} />
      <DigitalProductsSection products={products} />
      {data ? <ArtistsSection data={data} /> : ""}
      {data ? (
        <KnockProductShowcaseSection data={data} knockPlugin={knockPlugin} />
      ) : (
        ""
      )}
    </>
  );
};

export default DrumsThatKnock;
