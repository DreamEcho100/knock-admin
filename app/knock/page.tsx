import KnockScreen from "~/components/screens/Knock";
import { Product } from "~/libs/shopify/types";
import { getProduct } from "~/libs/shopify";
import { notFound } from "next/navigation";

export interface IKnockPluginPageProps {
  knockPlugin: Product;
}

export const revalidate = 10;

export default async function KnockPluginPage() {
  const knockPlugin = await getProduct({ handle: "knock-plugin" });

  if (!knockPlugin) {
    return notFound();
  }

  return <KnockScreen knockPlugin={knockPlugin} />;
}
