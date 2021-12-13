type FuelType = "gasoline_motor" | "electric_motor" | "hybrid_motor";

export type AccessoryType =
  | FuelType
  | "speed"
  | "acceleration"
  | "turning_diameter"
  | "exchange"
  | "seats";

type Accessory = {
  id: string;
  type: AccessoryType;
  name: string;
};

type Photo = {
  id: string;
  photo: string;
};

type Rent = {
  period: string;
  price: number;
  formattedPrice?: string;
};

export type CarDTO = {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent;
  fuel_type: FuelType;
  thumbnail: string;
  accessories: Accessory[];
  photos: string[];
};
