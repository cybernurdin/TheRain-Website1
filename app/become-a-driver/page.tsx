import { redirect } from "next/navigation";

export const dynamic = "force-static";

// Driver section lives within the homepage in the original design
export default function BecomeDriverPage() {
  redirect("/#driver");
}
