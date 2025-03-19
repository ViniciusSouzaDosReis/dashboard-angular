import PrimeUI from "tailwindcss-primeui";

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    "bg-[--chart-1]",
    "bg-[--chart-2]",
    "bg-[--chart-3]",
    "bg-[--chart-4]",
    "bg-[--chart-5]",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#27272a"
      }
    },
  },
  plugins: [PrimeUI],
};
