import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

// Localized routes redirect to the base route.
// Language preference is controlled by the EN/FR toggle built into every page.
export default async function LocalizedPage({ params }: Props) {
  const { slug } = await params;
  const path = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  redirect(path);
}
