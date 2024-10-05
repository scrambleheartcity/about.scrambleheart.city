import { useEffect, useState } from 'react';

// todo might use?
// https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f

export enum ThemeSetting {
  Unset = 'unset',
  Light = 'light',
  Dark = 'dark',
}
export type Theme = ThemeSetting.Light | ThemeSetting.Dark;

function getLocalTheme(): ThemeSetting {
  const stored = localStorage.getItem('theme');
  return (
    {
      [ThemeSetting.Light]: ThemeSetting.Light,
      [ThemeSetting.Dark]: ThemeSetting.Dark,
    }[stored ?? ''] ?? ThemeSetting.Unset
  );
}
function setLocalTheme(theme: ThemeSetting): void {
  return localStorage.setItem('theme', theme);
}
function getSystemTheme(): ThemeSetting {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeSetting.Dark
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeSetting.Light
    : ThemeSetting.Unset;
}
function loadTheme(): Theme {
  const local = getLocalTheme();
  const system = getSystemTheme();
  return local !== ThemeSetting.Unset
    ? local
    : system !== ThemeSetting.Unset
    ? system
    : ThemeSetting.Light;
}

export function useTheme() {
  const [currTheme, setCurrTheme] = useState(loadTheme());

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', currTheme);
  }, [currTheme]);

  function toggleTheme() {
    setLocalTheme(
      currTheme === ThemeSetting.Light ? ThemeSetting.Dark : ThemeSetting.Light,
    );
    setCurrTheme(loadTheme());
  }

  return {
    theme: currTheme,
    toggleTheme,
  };
}
