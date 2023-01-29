// isDarkMode checks browser is dark mode.
export const isDarkMode = () =>
  window?.matchMedia &&
  window?.matchMedia('(prefers-color-scheme: dark)').matches;
