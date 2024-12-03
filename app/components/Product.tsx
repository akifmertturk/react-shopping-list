import { useNavigate } from "@remix-run/react";
import { IProduct } from "../models/Product";
import { Card, CardBody, Image } from "@nextui-org/react";
import { formatPrice } from "../utils/format";
import { Rating } from "@mui/material";

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
      className="pl-8 py-4 w-full mx-auto"
      shadow="sm"
      radius="lg"
      isPressable
      onClick={handleClick}
    >
      <CardBody className="grid grid-cols-4 items-center p-0">
        <div className="col-span-3 grid grid-cols-4 gap-4 px-4">
          <Image
            src={product.imageUrl}
            shadow="sm"
            radius="lg"
            className="object-cover w-auto h-full"
            alt={product.name}
          />
          <div className="grid grid-row-2 col-span-2 text-small items-center">
            <div className="flex flex-col gap-y-1">
              <span className="">{product.name}</span>
              <Rating sx={{ fontSize: 14 }} name="rating" size="small" defaultValue={product.dropRatio} readOnly />
            </div>
            <span className="text-default-500">
              {formattedPrice} ₺
            </span>
          </div>
        </div>
        <div className="flex mr-4 self-start justify-end items-center">
          <span className="text-xs text-default-500">{product.followCount}+ takip</span>
        </div>
      </CardBody>
    </Card>
  );
}

export default Product;