"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import MainHeader from "./components/MainHeader";
import {
  getGetAccessTokenFromCookie,
  useGetUserData,
  useGetUserDataFromStore,
} from "~/utils/core/hooks";
import MainFooter from "./components/MainFooter";
import MarketingPopUp from "../../shared/common/marketingPopup/marketing";
import { useQuery } from "@tanstack/react-query";
import { getPopup, getUpSellingPopup } from "~/utils/core/API";
import Button from "~/components/shared/core/Button";
import UpSellingPopup from "~/components/shared/common/UpSellingPopup/UpSellingPopup";
import { generalStore } from "~/libs/stores/general";
import { useStore } from "zustand";
import { getProducts } from "~/libs/shopify";

export const commonClasses = "leading-relaxed text-primary-2 mx-auto";

const DefaultLayout = ({
  children,
}: // openBanner,
// setBanner
{
  children: ReactNode;
  // openBanner: boolean;
  // setBanner: Dispatch<SetStateAction<boolean>>;
}) => {
  const [openPopUp, setOpenPop] = useState(false);
  const [openBanner, setBanner] = useState(true);
  const { user } = useGetUserDataFromStore();

  const popup = useQuery(["get-popup"], () => getPopup(), {
    refetchInterval: 3000,
  });

  const upselling = useQuery(["get-upselling-popup"], getUpSellingPopup, {
    refetchInterval: 3000,
  });

  const isUpsellingOpen = useStore(
    generalStore,
    (state) => state.isVisible.upsellingPopup
  );


  const products = useQuery(["all-products"], () => getProducts(), {
    refetchOnWindowFocus: true,
  });

  const accessToken = getGetAccessTokenFromCookie();

  useGetUserData({
    enabled: !!accessToken,
    accessToken: accessToken,
  });


  return (
    <>
      <MainHeader openBanner={openBanner} setBanner={setBanner} />
      {popup.data ? <MarketingPopUp popup={popup.data} /> : ""}
      {isUpsellingOpen && upselling.data && products.data ? (
        <UpSellingPopup
          upselling={upselling.data.upselling}
          upsellingSettings={upselling.data.upsellingSettings[0]}
          products={products.data}
          isOpen={isUpsellingOpen}
        />
      ) : (
        ""
      )}

      <main
        className={`${commonClasses} relative bg-primary-2 ${
          openBanner ? "mt-[100px]" : "mt-[25px]"
        }  w-full flex flex-col`}
      >
        {user.data ? (
          <div className="fixed flex flex-col items-left z-50  w-[400px] gap-5   bottom-2 left-10 ">
            <Button
              onClick={() =>
                generalStore.getState().setIsVisible("marketingPopup", true)
              }
            >
              {" "}
              Edit popup{" "}
            </Button>
            <Button
              onClick={() =>
                generalStore.getState().setIsVisible("upsellingPopup", true)
              }
            >
              Edit upselling popup
            </Button>
          </div>
        ) : (
          ""
        )}
        {children}
      </main>
      <MainFooter />
    </>
  );
};

export default DefaultLayout;
