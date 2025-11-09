import { notFound } from "next/navigation";
import KnockScreen from "~/components/screens/knock-pluginboutique";
import { getProduct, getProducts } from "~/libs/shopify";
import { Product } from "~/libs/shopify/types";

export interface IKnockPluginBoutiqueProps {
  knockPluginBoutique: Product;
}

export async function generateStaticParams() {
  const products = await getProducts();
  const typesToExclude = ["Sound Editing Software"];

  return products
    .filter((product) => !typesToExclude.includes(product.productType))
    .map((product) => ({
      pluginsBoutique: product.handle,
    }));
}

export default async function KnockPluginBoutique({
  params,
}: {
  params: { pluginsBoutique: string };
}) {
  const knockPluginBoutique = await getProduct({
    handle: params.pluginsBoutique,
  });

  if (!knockPluginBoutique) {
    notFound();
  }

  return <KnockScreen knockPluginBoutique={knockPluginBoutique} />;
}
