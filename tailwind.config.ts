import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        cmd: {
          move: "hsl(var(--cmd-move))",
          "move-foreground": "hsl(var(--cmd-move-foreground))",
          turn: "hsl(var(--cmd-turn))",
          "turn-foreground": "hsl(var(--cmd-turn-foreground))",
          util: "hsl(var(--cmd-util))",
          "util-foreground": "hsl(var(--cmd-util-foreground))",
          danger: "hsl(var(--cmd-danger))",
          "danger-foreground": "hsl(var(--cmd-danger-foreground))",
          go: "hsl(var(--cmd-go))",
          "go-foreground": "hsl(var(--cmd-go-foreground))",
        },
        board: {
          "letters-a": "hsl(var(--letters-a))",
          "letters-b": "hsl(var(--letters-b))",
          "letters-fg": "hsl(var(--letters-fg))",
          "space-bg": "hsl(var(--space-bg))",
          "space-cell": "hsl(var(--space-cell))",
          "space-star": "hsl(var(--space-star))",
          "space-planet-a": "hsl(var(--space-planet-a))",
          "space-planet-b": "hsl(var(--space-planet-b))",
          "treasure-water-1": "hsl(var(--treasure-water-1))",
          "treasure-water-2": "hsl(var(--treasure-water-2))",
          "treasure-sand": "hsl(var(--treasure-sand))",
          "treasure-sand-fg": "hsl(var(--treasure-sand-fg))",
          "track-grass": "hsl(var(--track-grass))",
          "track-road": "hsl(var(--track-road))",
          "track-road-fg": "hsl(var(--track-road-fg))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
       keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
         "bee-bump": {
           "0%": { transform: "translateX(0)" },
           "20%": { transform: "translateX(-6px)" },
           "50%": { transform: "translateX(6px)" },
           "80%": { transform: "translateX(-3px)" },
           "100%": { transform: "translateX(0)" },
         },
         "bee-float": {
           "0%": { transform: "translateY(0)" },
           "50%": { transform: "translateY(-3px)" },
           "100%": { transform: "translateY(0)" },
         },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
         "bee-bump": "bee-bump 260ms ease-out",
         "bee-float": "bee-float 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
