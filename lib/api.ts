import axios from "axios";
import type { CampersResponse, CamperFilters } from "@/types/camper";

export const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export const PER_PAGE = 4;

export async function getCampers(
  page: number,
  filters: CamperFilters = {}
): Promise<CampersResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage: PER_PAGE,
  };

  if (filters.location) params.location = filters.location;
  if (filters.form) params.form = filters.form;
  if (filters.engine) params.engine = filters.engine;
  if (filters.transmission) params.transmission = filters.transmission;

  const { data } = await api.get<CampersResponse>("/campers", { params });
  return data;
}