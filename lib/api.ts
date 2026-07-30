import axios from "axios";
import type { CampersResponse } from "@/types/camper";

export const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export const PER_PAGE = 4;

export async function getCampers(page: number): Promise<CampersResponse> {
  const { data } = await api.get<CampersResponse>("/campers", {
    params: {
      page,
      perPage: PER_PAGE,
    },
  });
  return data;
}