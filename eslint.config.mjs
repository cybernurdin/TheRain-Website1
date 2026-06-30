import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  {
    ignores: ["settings.js", "content/legacy/**", "public/**"]
  },
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      "@next/next/no-page-custom-font": "off"
    }
  }
];

export default config;
