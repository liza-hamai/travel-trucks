import type { Metadata } from "next";
import { getCamperById } from "@/lib/api";
import CamperDetailsClient from "./CamperDetailsClient";

interface PageProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await getCamperById(camperId);
    return {
      title: camper.name,
      description: camper.description,
    };
  } catch {
    return { title: "Camper details" };
  }
}

export default function CamperDetailsPage() {
  return <CamperDetailsClient />;
}