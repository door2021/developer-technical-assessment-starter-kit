import { api } from "./axios";
import type { Property } from "../types/property";

export const propertyApi = {
  async getProperty(id: number): Promise<Property> {
    const res = await api.get<Property>(`/property/${id}`);
    return res.data;
  },
};
