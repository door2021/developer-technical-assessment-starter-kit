import { api } from "./axios";
import type { PopularListings } from "../types/listings";

export const listingApi = {
  async getPopular(): Promise<PopularListings> {
    const res = await api.get<PopularListings>("/listings/popular");
    return res.data;
  },
};
