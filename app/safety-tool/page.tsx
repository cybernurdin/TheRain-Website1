import { redirect } from "next/navigation";

export const dynamic = "force-static";

// Safety tool section lives within the homepage in the original design
export default function SafetyToolPage() {
  redirect("/#safety");
}
