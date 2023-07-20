export interface PropertyImg {
  name: string;
  url: string;
}

export enum PropertyTypeValues {
  APARTMENT = "apartment",
  VILLA = "villa",
  FORMHOUSE = "formhouse",
  CONDOS = "condos",
  STUDIO = "studio",
}

export interface Property {
  _id: string;
  title: string;
  type: PropertyTypeValues;
  price: number;
  location: string;
  photo: string;
}
