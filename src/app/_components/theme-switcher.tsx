"use client";

import styles from "./switch.module.css";
import { useEffect, useState } from "react";
import { STORAGE_KEY } from "@/lib/theme-script";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "system" | "dark" | "light";

const modes: ColorSchemePreference[] = ["system", "dark", "light"];

let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () =>
      ((typeof localStorage !== "undefined" &&
        localStorage.getItem(STORAGE_KEY)) ??
        "system") as ColorSchemePreference,
  );

  useEffect(() => {
    // store global functions to local variables to avoid any interference
    updateDOM = window.updateDOM;
    /** Sync the tabs */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    updateDOM();
  }, [mode]);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      className={styles.switch}
      onClick={handleModeSwitch}
    />
  );
};

/**
 * This component which applies classes and transitions.
 * Note: The blocking script is now in layout.tsx head to prevent hydration errors.
 */
export const ThemeSwitcher = () => {
  return <Switch />;
};
