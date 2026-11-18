import { Car, Coffee, PawPrint, Wifi } from "lucide-react";

export const amenities = [
  { key: "wifi", label: "Free Wifi", icon: Wifi },
  { key: "parking", label: "Free parking", icon: Car },
  { key: "breakfast", label: "Breakfast", icon: Coffee },
  { key: "pets", label: "Pets allowed", icon: PawPrint },
] as const;
