type Accessory = {
  id: string;
  type: string;
  name: string;
};

type Photo = {
  id: string;
  photo: string;
};

type Rent = {
  period: string;
  price: number;
};

export type CarDTO = {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: string[];
};
