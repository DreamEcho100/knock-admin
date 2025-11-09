"use client";
import type { PropsWithChildren } from "react";

import { Suspense } from "react";
import ReactQueryProvider from "./ReactQuery";
import DefaultLayout from "../Default";
import dynamic from "next/dynamic";
// import ExternalGlobalScripts from '../shared/core/ExternalGlobalScripts';
// import { ToastContainer } from 'react-toastify';

const DynamicTopProgressBar = dynamic(
  () => import("~/components/shared/common/TopProgressBar"),
  { ssr: false }
);

// const DynamicTopProgressBar = dynamic(
// 	() => import('~/app/_components/shared/common/TopProgressBar'),
// 	{ ssr: false },
// );

export default function Providers(props: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <DefaultLayout>
        {props.children}
        <Suspense fallback={null}>
          <DynamicTopProgressBar />
          {/* <ExternalGlobalScripts /> */}
        </Suspense>
      </DefaultLayout>
    </ReactQueryProvider>
  );
}
