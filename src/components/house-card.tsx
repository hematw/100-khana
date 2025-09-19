import { Card } from "@heroui/card";
import Carousel from "./Carousel";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { PropertyCardProps } from "@/types";

const PropertyCard: React.FC<PropertyCardProps> = ({
  address,
  price,
  listingType,
  // rating,
  images,
  className,
  onAddWishlist,
}) => {
  return (
    <Card
      className={`flex items-center justify-center flex-col w-full rounded-lg max-w-96 p-2 ${className}`}
    >
      <div className="relative">
        <Carousel images={images} />
        <div className="">
          <div className="top-2 left-0 absolute flex justify-between px-2 w-full">
            <Chip
              className={`shadow-lg px-2 py-1 rounded-3xl font-semibold text-xs ${
                listingType.toLowerCase().includes("sale")
                  ? "bg-yellow-400"
                  : listingType.toLowerCase().includes("rental")
                  ? " bg-emerald-400"
                  : "bg-sky-400"
              }`}
            >
              {listingType}
            </Chip>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={onAddWishlist}
            >
              <img src="/icons/heart.svg" alt="" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center text-sm">
            <span className="w-5 h-5">
              <img src="/icons/star.svg" alt="" />
            </span>
            <span>{3.6}</span>
          </div>
        </div>
        <p className="text-sm">{address}</p>
        <p className="text-sm">
          <span className="font-semibold">{price} </span>
          <span className="text-gray-600">AFN</span>
        </p>
      </div>
    </Card>
  );
};

export default PropertyCard;
