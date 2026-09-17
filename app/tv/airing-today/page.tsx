import { redirect } from "next/navigation";

export default function AiringTodayPage() {
  redirect("/tv?category=air-today");
}
