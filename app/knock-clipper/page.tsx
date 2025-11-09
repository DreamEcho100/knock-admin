import KnockClipperScreen from "~/components/screens/KnockClipper";
import { Product } from "~/libs/shopify/types";
import { getProduct } from "~/libs/shopify";
import { notFound } from "next/navigation";

export const revalidate = 10;

async function getKnockClipperProduct() {
  const knockClipperPlugin = await getProduct({ handle: "knock-clipper" });
  return knockClipperPlugin;
}

export default async function KnockClipperPage() {
  const knockClipperPlugin = await getKnockClipperProduct();

  if (!knockClipperPlugin) {
    return notFound();
  }

  return <KnockClipperScreen knockClipperPlugin={knockClipperPlugin} />;
}
