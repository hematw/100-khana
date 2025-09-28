import axiosIns from "@/src/axios";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../house-card";
import { PropertyForm } from "@/src/types";
import Link from "next/link";

type PropertyWithID = PropertyForm & Record<"_id", string>;

function MyHouses() {
  const {
    data: houses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-houses"],
    queryFn: async () => {
      const res = await axiosIns.get("/properties/my-houses");
      return res.data.properties;
    },
    staleTime: 1000 * 60 * 3,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  console.log(houses);

  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {houses.length > 0 ? (
        houses.map((house: PropertyWithID) => (
          <PropertyCard
            key={house._id}
            address={` ${typeof house.city === 'string' ? house.city : (house.city as any)?.name || ''}, ${typeof house.district === 'string' ? house.district : (house.district as any)?.name || ''}, ${house.road}, ${house.street}`}
            price={Number(house.price)}
            listingType={house.listingType.join(", ")}
            images={house.images as string[]}
          />
        ))
      ) : (
        <div className="py-6 col-span-4">
          <div className=" text-center space-y-4">
            <div>
              <img
                src="/no-houses.svg"
                alt="no houses"
                className="mx-auto max-w-72"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">No Houses Found</h3>
              <p className="text-gray-500">
                You have not listed any houses yet.
              </p>
              <Link href="/new-property" className="text-primary-400 underline hover:no-underline">
                List now.
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyHouses;
