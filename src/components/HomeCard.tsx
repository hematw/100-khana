import { HomeCardProps } from "@/types";


const HomeCard = ({
  className = "",
  image,
  title,
  description,
}: HomeCardProps) => {
  return (
    <div
      className={`flex gap-6 h-36 w-full p-2 rounded-md shadow-lg my-4 border-2 ${className}`}
    >
      <img
        src={image}
        alt="sample home photo"
        className="w-32 h-32 object-cover"
      />
      <div className="">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="w-full ">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
