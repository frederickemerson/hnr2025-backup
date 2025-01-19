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
        flash: "flash 1s infinite",
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
        flash: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
