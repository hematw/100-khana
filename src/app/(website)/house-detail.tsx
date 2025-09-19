import axiosIns from "@/axios";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { useQuery } from "@tanstack/react-query";
import {
  Bath,
  Building,
  Calendar,
  ChefHat,
  Eye,
  Forward,
  Heart,
  Lamp,
  LayoutGrid,
  MessageCircle,
  Phone,
  Ruler,
  Sofa,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import icons from "@/lib/icons";
import { IPropertyForm } from "@/types";
import MapComponent from "@/components/map";
import { Divider } from "@heroui/divider";
import { saveOrRemoveToWishlist } from "@/lib/utils";
import { addToast } from "@heroui/toast";
import PropertyCard from "@/components/house-card";
import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@heroui/modal";

type IPropertyWithOwnerAndSimilars = IPropertyForm & {
  owner: {
    firstName: string;
    lastName: string;
    profile: string;
    numberOfListedProperties: number;
  };
  similarProperties: IPropertyForm[];
};

function HouseDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["house", id],
    queryFn: async (): Promise<IPropertyWithOwnerAndSimilars> => {
      const res = await axiosIns.get(`/properties/${id}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 3,
  });

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      await axiosIns.put(`/properties/${id}/views`);
    }, 1000 * 60);
    return () => clearTimeout(timeoutID);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="mx-auto px-4 md:px-8 max-w-screen-2xl zp-6">
      <div className="relative gap-4 grid grid-cols-1 md:grid-cols-4 grid-rows-2 md:p-12 md:h-[580px]">
        <div className="md:col-span-2 row-span-2 min-w-full ">
          <img
            src={data?.images[0] as string}
            alt="Main"
            className="shadow-md border rounded-lg w-full h-full object-cover"
          />
        </div>

        {data?.images.slice(1, 5).map((src, index) => (
          <div key={index} className="hidden md:block min-w-full">
            <img
              src={src as string}
              alt={`Gallery ${index + 1}`}
              className="shadow-md border rounded-lg w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="right-2 bottom-2 absolute">
          <Button
            startContent={<LayoutGrid />}
            variant="faded"
            radius="sm"
            color="primary"
          >
            Show all photos
          </Button>
        </div>
      </div>
      <div>
        <div className="mt-10  py-4">
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant="flat"
              color="primary"
              size="sm"
              radius="sm"
              isIconOnly
              startContent={<Heart />}
              onPress={() => {
                saveOrRemoveToWishlist("bookmarks", data);
              }}
            />
            <Button
              variant="flat"
              color="primary"
              size="sm"
              radius="sm"
              isIconOnly
              startContent={<Forward />}
              onPress={() => {
                const shareUrl = window.location.href;
                if (navigator.share) {
                  navigator
                    .share({
                      title: `Property in ${data?.city.name} `,
                      text: `Check out this ${data?.listingType} property in ${data?.city.name}`,
                      url: shareUrl,
                    })
                    .catch((err) => console.log("Error sharing:", err));
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  addToast({
                    title: "Link copied to clipboard!",
                    color: "success",
                  });
                }
              }}
            />
          </div>
          <h3 className="font-bold text-2xl">{`${data?.city.name}, ${data?.district.name}, ${data?.road} road, street ${data?.street}`}</h3>
        </div>
        <div className="gap-10 grid md:grid-cols-2">
          <div className="">
            <div className="flex justify-around gap-2">
              <Card className="flex flex-1 justify-center items-center gap-2 p-4 border border-default-300">
                <p className="flex items-center gap-2 font-medium">
                  <Building />
                  <span>Floor</span>
                </p>
                <p className="text-default-500">{`${data?.floor} of ${data?.totalFloors}`}</p>
              </Card>
              <Card className="flex flex-1 justify-center items-center gap-2 p-4 border border-default-300">
                <p className="flex items-center gap-2 font-medium">
                  <Lamp />
                  <span>Bedrooms</span>
                </p>
                <p className="text-default-500">{`${data?.numOfBedRooms} rooms`}</p>
              </Card>
              <Card className="flex flex-1 justify-center items-center gap-2 p-4 border border-default-300">
                <p className="flex items-center gap-2 font-medium">
                  <Ruler />
                  <span>Area</span>
                </p>
                <p className="text-default-500">
                  {`${data?.area} `}m<sup>2</sup>
                </p>
              </Card>
            </div>
            <Card className="mt-2 p-2 border border-default-300">
              <CardBody className="flex flex-row items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {`${data?.price}`} AFN{" "}
                </span>
                <span className="text-default-500">
                  {`for ${data?.listingType}`}
                </span>
              </CardBody>
            </Card>
            <Card className="space-y-2 mt-2 p-4 text-sm  border border-default-300">
              <p className="flex flex-row items-center gap-2">
                <span>
                  <Sofa size={18} />
                </span>
                <span>{data?.numOfLivingRooms} Living rooms</span>
              </p>
              <p className="flex flex-row items-center gap-2">
                <span>
                  <ChefHat size={18} />
                </span>
                <span>{data?.numOfKitchens} Kitchens</span>
              </p>
              <p className="flex flex-row items-cente gap-2">
                <span>
                  <Bath size={18} />
                </span>
                <span>{data?.numOfBaths} Bathrooms</span>
              </p>
            </Card>
            <div className="mt-10">
              <h4 className="mb-4 font-semibold text-xl">Facilities</h4>
              <ul className="space-y-2 text-default-500">
                {data?.facilities.map((facility, index) => (
                  <li key={facility._id} className="flex items-center gap-2">
                    {icons[facility.icon]}:<span>{facility.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h4 className="mb-4 font-semibold text-xl">More Descriptions</h4>
              <ul className="space-y-2 text-default-500">
                {data?.description.map((desc, index) => (
                  <li key={index} className="flex gap-2 capitalize">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h4 className="mb-4 font-semibold text-xl">Location</h4>
              <div>
                <MapComponent coordinates={[+data?.lat, +data?.lng]} />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-10 h-5 text-xs">
              <p className="flex items-center gap-1">
                <Calendar size={16} /> Posted:{" "}
                {new Date(data?.createdAt).toDateString()}
              </p>
              <Divider orientation="vertical" />
              <p className="flex items-center gap-1">
                <Eye size={16} />
                {data?.views > 1000
                  ? `${(data?.views / 1000).toFixed(1)}k`
                  : data?.views}
                {"  "}
                Viewes
              </p>
              <Divider orientation="vertical" />
              <p className="flex items-center gap-1">
                <Heart size={16} />
                {data?.saved} times Saved
              </p>
            </div>
          </div>
          <div>
            <Card className="top-28 left-0 sticky flex flex-row gap-4 p-4 border border-default-300 md:max-w-72">
              <div>
                <Avatar
                  // size=""
                  className="w-16 h-16"
                  src={data.owner.profile}
                />
              </div>
              <div>
                <h4>{`${data?.owner.firstName} ${data?.owner.lastName}`}</h4>
                <div className="mb-2 text-default-500 text-sm">
                  <p>@{data?.owner.username}</p>
                  <p>{data.owner.numberOfListedProperties} listed properties</p>
                </div>
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  onPress={onOpen}
                >
                  Contact Info
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <Divider className="my-10" />
        <div className="overflow-auto">
          <h4 className="font-semibold text-2xl">Similar Properties</h4>
          <div className="justify-start items-stretch gap-4 md:gap-x-6 gap-y-10 overflow-auto flex flex-nowrap py-6">
            {data?.similarProperties.map((property) => (
              <Link to={`/properties/${property._id}`} key={property._id} className="w-64">
                <PropertyCard
                  key={property._id}
                  address={`${property.city.name}, ${property.district.name}, ${property.road}, ${property.street}`}
                  price={+property.price}
                  listingType={property.listingType.join(", ")}
                  images={property.images as string[]}
                  className="justify-between hover:shadow-xl border border-gray-300 dark:border-gray-600 min-h-full w-60 hover:scale-[1.02]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalBody className="flex justify-center items-center p-4">
              <ModalHeader className="flex-col gap-4">
              <img  className="w-40 h-40 rounded-full" src={data?.owner.profile} />
              <p className="font-semibold text-2xl">{`${data?.owner.firstName} ${data?.owner.lastName}`}</p>
              </ModalHeader>

              <ModalBody>
                <p className="flex items-center gap-2">
                  <Phone  size={18}/>
                  {data?.owner.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  {data?.owner.email}
                </p>
              </ModalBody>
              <ModalFooter>
              <Button onPress={onClose}>Close</Button>
              <Button onPress={onClose} color="primary" >Message</Button>
              </ModalFooter>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default HouseDetail;
