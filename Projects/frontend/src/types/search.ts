import type { Property } from "./property";

export interface SearchQuery {
  keyword: string;
}

export interface SearchResponse {
  results: Property[];
}
