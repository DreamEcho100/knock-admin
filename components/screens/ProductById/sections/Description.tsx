import Description from "~/components/shared/core/Description";
import { Product } from "~/libs/shopify/types";

const DescriptionSection = ({
  description,
}: {
  description: Product["description"];
}) => {
  return (
    <section className="bg-primary-1 section-p-v1">
      <Description>{description}</Description>
    </section>
  );
};

export default DescriptionSection;
