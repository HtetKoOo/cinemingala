import { redirect } from "next/navigation";

export default function OnAirTvPage() {
  redirect("/tv?category=on-air");
}
