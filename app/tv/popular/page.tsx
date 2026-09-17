import { redirect } from "next/navigation";

export default function PopularTvPage() {
  redirect("/tv?category=popular");
}
