import { notFound } from "next/navigation";
import ProductByIdScreen from "~/components/screens/ProductById";
import { Product } from "~/libs/shopify/types";
import { getProduct, getProducts } from "~/libs/shopify";
import axios from "axios";
import { ICustomProduct } from "~/types";

export interface IProductByIdPageProps {
  product: Product;
}

const pages_redirects_map: Record<string, any> = {
  "knock-plugin": "/knock",
  "knock-clipper": "/knock-clipper",
};

export const getOneCustomProductByHandle = async (handle: string) => {
  const product = await getProduct({ handle });

  if (!product) {
    throw new Error("Product not found");
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_KNOCK_URL_API}/ui/get-DTK-product?productHandle=${product.handle}`
  );

  const newFieldsApi = response.data.DTKproduct;

  newFieldsApi && delete newFieldsApi.id;

  const newProductObject = {
    ...product,
    ...newFieldsApi,
    originalDescription: product.description,
  } as Promise<Product | null>; // ICustomProduct | null;

  return newProductObject;
};

export async function generateStaticParams() {
  const products = await getProducts();
  const paths = [];

  for (const product of products) {
    if (
      !pages_redirects_map[product.handle] &&
      product.handle.search("boutique") === -1
    ) {
      paths.push({
        productHandle: product.handle,
      });
    }
  }

  return paths;
}

export default async function ProductByIdPage({
  params,
}: {
  params: { productHandle: string };
}) {
  const knockPluginBoutique = await getOneCustomProductByHandle(
    params.productHandle
  );

  if (
    !knockPluginBoutique ||
    typeof pages_redirects_map[params.productHandle] === "string"
  ) {
    notFound();
  }

  return <ProductByIdScreen product={knockPluginBoutique} />;
}
