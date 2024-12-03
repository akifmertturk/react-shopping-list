import { useNavigate } from "@remix-run/react";
import { IProduct } from "../models/Product";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatPrice } from "../utils/format";

interface IProductProps {
  product: IProduct;
}

const Product = ({ product }: IProductProps) => {
  const navigate = useNavigate();
  const formattedPrice = formatPrice(product.price);

  const handleClick = () => {
    navigate(`/${product.code}`);
  };

  return (
    <Card
      className="pt-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
      shadow="sm"
      radius="lg"
      isPressable
      onClick={handleClick}
    >
      <CardBody className="flex items-center overflow-visible p-0">
        <Image
          src={product.imageUrl}
          shadow="sm"
          radius="lg"
          height={200}
          className="object-cover h-[140px]"
          alt={product.name}
        />
      </CardBody>
      <CardFooter className="text-small justify-between flex flex-col">
        <b>{product.name}</b>
        <span className="text-default-500">
          {formattedPrice} ₺
        </span>
      </CardFooter>
    </Card>
  );
}

export default Product;