import { BRAND_NAME } from "@/data/site";

export function BrandName() {
  return (
    <span className="notranslate" translate="no">
      {BRAND_NAME}
    </span>
  );
}

export function brandText(value: string): React.ReactNode {
  if (!value.includes(BRAND_NAME)) return value;

  return value.split(BRAND_NAME).map((part, index, parts) => (
    <span key={index}>
      {part}
      {index < parts.length - 1 && <BrandName />}
    </span>
  ));
}
