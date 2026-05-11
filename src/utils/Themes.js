// ─── Design System — Juan Rojas Portfolio 2026 ───
// Identity: Orange-dominant, cinematic, energetic, personal

export const darkTheme = {
  // Core backgrounds
  bg: "#090917",
  bgLight: "#1C1E27",
  bgGlass: "rgba(9, 9, 23, 0.80)",
  bgCard: "rgba(17, 17, 30, 0.90)",

  // ─── BRAND: ORANGE is the identity ───
  primary: "#FF7F00",           // Original orange — dominant accent
  primaryLight: "#FFA040",      // Lighter orange for text/hover
  primaryDark: "#CC6600",       // Deeper orange for depth
  primaryGlow: "rgba(255, 127, 0, 0.30)",
  primaryGlowStrong: "rgba(255, 127, 0, 0.50)",

  // Secondary — futuristic blue-violet as complement, NOT dominant
  secondary: "#854CE6",
  secondaryLight: "#A78BFA",
  secondaryGlow: "rgba(133, 76, 230, 0.20)",

  // Gradient tokens — orange-led
  gradientHero: "linear-gradient(135deg, #FF7F00 0%, #FF4500 50%, #CC3300 100%)",
  gradientOrange: "linear-gradient(225deg, #FF7F00 0%, #FF9A00 100%)",
  gradientWarm: "linear-gradient(135deg, #FF7F00 0%, #854CE6 100%)",
  gradientCard: "linear-gradient(135deg, rgba(255,127,0,0.06) 0%, rgba(133,76,230,0.03) 100%)",
  gradientText: "linear-gradient(90deg, #FF7F00 0%, #FFA040 50%, #FFD700 100%)",
  gradientBorder: "linear-gradient(135deg, rgba(255,127,0,0.5), rgba(133,76,230,0.3))",
  gradientAmbient: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,127,0,0.12), transparent)",

  // Text hierarchy
  text_primary: "#F2F3F4",
  text_secondary: "#b1b2b3",
  text_tertiary: "#6B7280",
  text_accent: "#FFA040",

  // Borders & surfaces
  border: "rgba(255, 255, 255, 0.08)",
  borderHover: "rgba(255, 127, 0, 0.45)",
  borderGlow: "rgba(255, 127, 0, 0.65)",

  // Shadows — orange-tinted
  shadowCard: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
  shadowOrange: "0 0 40px rgba(255,127,0,0.25), 0 0 80px rgba(255,127,0,0.08)",
  shadowHover: "0 8px 40px rgba(255,127,0,0.20), 0 0 0 1px rgba(255,127,0,0.15)",
  shadowGlow: "20px 20px 60px #1f2634, -20px -20px 60px #1f2634",

  // Utility
  white: "#FFFFFF",
  black: "#000000",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  // Cards
  card: "#171721",
  card_light: "#191924",
  soft2: "#6B7280",
};

export const lightTheme = {
  bg: "#FFFFFF",
  bgLight: "#f0f0f0",
  bgGlass: "rgba(255,255,255,0.85)",
  bgCard: "rgba(255,255,255,0.95)",
  primary: "#FF7F00",
  primaryLight: "#FF9A00",
  primaryDark: "#CC6600",
  primaryGlow: "rgba(255, 127, 0, 0.20)",
  primaryGlowStrong: "rgba(255, 127, 0, 0.35)",
  secondary: "#854CE6",
  secondaryLight: "#A78BFA",
  secondaryGlow: "rgba(133, 76, 230, 0.15)",
  gradientHero: "linear-gradient(135deg, #FF7F00 0%, #FF4500 100%)",
  gradientOrange: "linear-gradient(225deg, #FF7F00 0%, #FF9A00 100%)",
  gradientWarm: "linear-gradient(135deg, #FF7F00 0%, #854CE6 100%)",
  gradientCard: "linear-gradient(135deg, rgba(255,127,0,0.04) 0%, rgba(133,76,230,0.02) 100%)",
  gradientText: "linear-gradient(90deg, #FF7F00 0%, #FF9A00 100%)",
  gradientBorder: "linear-gradient(135deg, rgba(255,127,0,0.4), rgba(133,76,230,0.2))",
  gradientAmbient: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,127,0,0.08), transparent)",
  text_primary: "#111111",
  text_secondary: "#48494a",
  text_tertiary: "#9CA3AF",
  text_accent: "#FF7F00",
  border: "rgba(0, 0, 0, 0.08)",
  borderHover: "rgba(255, 127, 0, 0.35)",
  borderGlow: "rgba(255, 127, 0, 0.55)",
  shadowCard: "0 4px 24px rgba(0,0,0,0.08)",
  shadowOrange: "0 0 40px rgba(255,127,0,0.15)",
  shadowHover: "0 8px 40px rgba(255,127,0,0.15), 0 0 0 1px rgba(255,127,0,0.12)",
  shadowGlow: "0 4px 24px rgba(0,0,0,0.1)",
  white: "#FFFFFF",
  black: "#000000",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  card: "#FFFFFF",
  card_light: "#F8FAFC",
  soft2: "#9CA3AF",
};
