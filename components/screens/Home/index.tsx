"use client";

import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "~/utils/core/API";
import { useEffect, useState } from "react";
import {
  AboutSection,
  HeroSection,
  OneProductShowCaseSection,
  LatestSamplesSection,
} from "./sections";
import type { Product } from "~/libs/shopify/types";

const HomeScreen = ({
  products,
  openPopUp,
}: {
  products: Product[];
  openPopUp: boolean;
}) => {
  const homePageData = useQuery({
    queryKey: ["home-page-data"],
    queryFn: () => getHomePageData(),
    onSuccess(data) {
      return data;
    },
    refetchInterval: 3000,
  });

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <HeroSection windowWidth={windowWidth} openPopUp={openPopUp} />
      <OneProductShowCaseSection
        data={homePageData.data && homePageData.data.secondSection}
      />
      <AboutSection
        data={homePageData.data && homePageData.data.thirdSection}
      />
      <LatestSamplesSection
        products={products}
        data={homePageData.data && homePageData.data.forthSection}
      />
    </>
  );
};

export default HomeScreen;
