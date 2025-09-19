import { Bath, GlassWater, Tv, WavesLadder } from "lucide-react";
import { JSX } from "react";

type IconType = {
  [key: string]: JSX.Element;
};

const icons: IconType = {
  GlassWater: <GlassWater  size={18}/>,
  Bath: <Bath size={18} />,
  WavesLadder: <WavesLadder size={18} />,
  Tv: <Tv size={18} />,
};

export default icons;
