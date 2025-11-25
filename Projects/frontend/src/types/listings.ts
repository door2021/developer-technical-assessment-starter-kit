import type { Land } from "./land";
import type { Project } from "./project";
import type { Property } from "./property";

export interface PopularListings {
  properties: Property[];
  projects: Project[];
  lands: Land[];
}
