import DrumsThatKnock from "~/components/screens/DrumsThatKnock";
import { getProduct, getProducts } from "~/libs/shopify";
import { notFound } from "next/navigation";

export const revalidate = 300; // 5 minutes

async function getData() {
  const products = await getProducts().then((products) => {
    const typesToExclude = ["Sound Editing Software"];

    return products.filter(
      (product) => !typesToExclude.includes(product.productType)
    );
  });

  const knockPlugin = await getProduct({ handle: "knock-plugin" });

  return {
    products,
    knockPlugin,
  };
}

export default async function DrumsThatKnockPage() {
  const { products, knockPlugin } = await getData();

  if (!knockPlugin) {
    return notFound();
  }

  return <DrumsThatKnock products={products} knockPlugin={knockPlugin} />;
}
