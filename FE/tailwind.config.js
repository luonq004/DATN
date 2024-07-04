/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "1408px": "1408px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        light: {
          50: "#f1f9fa",
          100: "#dceef1",
          200: "#bddfe4",
          300: "#90c7d0",
          400: "#64abb9",
          500: "#408a9a",
          600: "#387282",
          700: "#325d6c",
          800: "#304f5a",
          900: "#2c434d",
          950: "#192b33",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        status: {
          DEFAULT: "hsl(var(--status))",
          foreground: "hsl(var(--status-foreground))",
        },
        // xám trắng
        border1: {
          DEFAULT: "hsl(var(--border1))",
          foreground: "hsl(var(--border1-foreground))",
        },
        //xám đen
        border2: {
          DEFAULT: "hsl(var(--border2))",
          foreground: "hsl(var(--border2-foreground))",
        },
        //bg đen trắng
        background1: {
          DEFAULT: "hsl(var(--foreground))",
          foreground: "hsl(var(--background))",
        },
        //bg xám đen
        background2: {
          DEFAULT: "hsl(var(--background2))",
          foreground: "hsl(var(--foreground2))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // require('flowbite/plugin'),
  ],
};
