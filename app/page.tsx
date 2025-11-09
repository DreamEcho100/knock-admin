import HomeScreen from "components/screens/Home";
import { getProducts } from "~/libs/shopify";
import { Product } from "~/libs/shopify/types";

export interface IHomePageProps {
  products: Product[];
  openPopUp: boolean;
}

async function HomePage() {
  const products = await getProducts().then((products) => {
    const typesToExclude = ["Sound Editing Software", "Tutorial"];

    return products.filter(
      (product) => !typesToExclude.includes(product.productType)
    );
  });

  return <HomeScreen products={products} openPopUp={false} />;
}

export default HomePage;
