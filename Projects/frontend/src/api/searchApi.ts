import { api } from "./axios";
import type { SearchQuery, SearchResponse } from "../types/search";

export const searchApi = {
  async search(query: SearchQuery): Promise<SearchResponse> {
    const res = await api.get<SearchResponse>("/search", {
      params: { keyword: query.keyword },
    });
    return res.data;
  },
};
