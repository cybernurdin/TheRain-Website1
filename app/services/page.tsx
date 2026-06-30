import { redirect } from "next/navigation";

export const dynamic = "force-static";

// Services section lives within the homepage in the original design
export default function ServicesPage() {
  redirect("/#services");
}
