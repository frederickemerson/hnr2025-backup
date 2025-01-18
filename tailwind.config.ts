import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        ClockFont: ["ClockFont", ...fontFamily.sans],
      },
      animation: {
        roll: "roll 0.5s ease-in-out",
      },
      keyframes: {
        roll: {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
