import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        display: ["clamp(3rem,8vw,6rem)", { lineHeight: "1.1" }],
        "h1": ["clamp(2.25rem,5vw,3.75rem)", { lineHeight: "1.2" }],
        "h2": ["clamp(1.5rem,4vw,2.25rem)", { lineHeight: "1.25" }],
        "h3": ["clamp(1.25rem,2.5vw,1.5rem)", { lineHeight: "1.3" }],
      },
      colors: {
        "base-dark": "#0A2229",
        "base-light": "#F2F0ED",
        "base-light-subtle": "#FAF9F7",
        "secondary-light": "#E5E0DE",
        accent: "#CBA365",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Open Sans", "system-ui", "sans-serif"],
        /* serif/heading map to sans for single-font consistency */
        serif: ["var(--font-sans)", "Open Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-sans)", "Open Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

