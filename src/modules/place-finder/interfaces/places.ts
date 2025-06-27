export interface Places {
  fsq_place_id: string;
  latitude: number;
  longitude: number;
  categories: {
    name: string;
    short_name: string;
  };
  location: {
    country: string;
    formatted_address: string;
  };
  name: string;
  rating?: number | string;
  tel: string;
  website: string;
}

export interface FindPlaceParams {
  action: string;
  parameters: {
    query: string;
    near: string;
    min_price: number;
    max_price: number;
    open_now: boolean;
  };
}
