import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Kabul coordinates

const createIcon = (iconUrl: string) =>
  new L.Icon({ iconUrl, iconSize: [24, 24] });

// Icons for different places
const icons = {
  hospital: createIcon("/icons/hospital.png"),
  clinic: createIcon("/icons/hospital.png"),
  school: createIcon("/icons/school.png"),
  pharmacy: createIcon("/icons/pharmacy.png"),
  place_of_worship: createIcon("/icons/mosque.png"),
  atm: createIcon("/icons/atm.png"),
  bank: createIcon("/icons/bank.png"),
  supermarket: createIcon("/icons/shopping.png"),
  restaurant: createIcon("/icons/restaurant.png"),
  house: createIcon("/icons/house.png"),
  police: createIcon("/icons/police.png"),
  park: createIcon("/icons/park.png"),
  store: createIcon("/icons/store.png"),
  cafe: createIcon("/icons/cafe.png"),
};

type TPlace = {
  type: "node" | "way" | "relation";
  id: number;
  lat: number;
  lon: number;
  tags: {
    amenity?: string;
    name?: string;
    [key: string]: string | undefined; // Allow additional optional tags
  };
};

const MapComponent = ({
  coordinates: [lat, lon],
}: {
  coordinates: number[];
}) => {
  const [places, setPlaces] = useState<TPlace[]>([]);

  useEffect(() => {
    // Fetch nearby places from Overpass API
    const fetchPlaces = async () => {
      const query = `
        [out:json];
        (
            node["amenity"="hospital"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="school"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["railway"="subway_entrance"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="bank"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="atm"](${lat - 0.02}, ${lon - 0.02},${lat + 0.02}, ${
        lon + 0.02
      });
            node["amenity"="place_of_worship"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="restaurant"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="cafe"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="fast_food"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["shop"="supermarket"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["shop"="mall"](${lat - 0.02}, ${lon - 0.02},${lat + 0.02}, ${
        lon + 0.02
      });
            node["shop"="grocery"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="school"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="college"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="university"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="hospital"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="clinic"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
            node["amenity"="pharmacy"](${lat - 0.02}, ${lon - 0.02},${
        lat + 0.02
      }, ${lon + 0.02});
        );
        out;
      `;

      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlaces(data.elements); // Store places in state
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [lat, lon]);

  return (
    <MapContainer
      className="-z-10"
      center={[lat, lon] as [number, number]}
      zoom={13}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon] as [number, number]} icon={icons.house || icons.store}>
        <Popup>House</Popup>
      </Marker>
      {/* Display Nearby Places */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place?.lat, place?.lon] as [number, number]}
          icon={icons[place.tags.amenity as keyof typeof icons] || icons.house}
        >
          <Popup>
            <span className="capitalize">
              📍 {place.tags.name || `${place.tags.amenity}`}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
