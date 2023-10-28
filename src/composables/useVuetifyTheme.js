import { useToCapitalize } from '~/composables/helpers.js';

export const vuetifyMainColors = [
  'primary',
  'on-primary',
  'primary-container',
  'on-primary-container',
  'primary-darken-1',
  'secondary',
  'on-secondary',
  'secondary-container',
  'on-secondary-container',
  'secondary-darken-1',
  'tertiary',
  'on-tertiary',
  'tertiary-container',
  'on-tertiary-container',
  'background',
  'on-background',
  'surface',
  'on-surface',
  'surface-variant',
  'on-surface-variant',
  'surface-bright',
  'on-surface-bright',
  'error',
  'on-error',
  'error-container',
  'on-error-container',
  'success',
  'on-success',
  'success-container',
  'on-success-container',
  'warn',
  'on-warn',
  'warn-container',
  'on-warn-container',
  'info',
  'on-info',
  'info-container',
  'on-info-container',
];

export function useVuetifyTheme(materialTheme, customColors = []) {
  const theme = {
    themes: {
      dark: {
        dark: true,
        colors: {},
      },
      light: {
        dark: false,
        colors: {},
      },
    },
  };
  for (const color of vuetifyMainColors) {
    const colorAttribut = color
      .split('-')
      .map((c, index) => {
        if (index) {
          return useToCapitalize(c);
        } else {
          return c;
        }
      })
      .join('');
    theme.themes.dark.colors[color] =
      materialTheme.themeColors.dark[colorAttribut];
    theme.themes.light.colors[color] =
      materialTheme.themeColors.light[colorAttribut];
  }

  for (const color of customColors) {
    const capitalizeColor = useToCapitalize(color);
    theme.themes.dark.colors[color] = materialTheme.themeColors.dark[color];
    theme.themes.dark.colors[`on-${color}`] =
      materialTheme.themeColors.dark[`on${capitalizeColor}`];
    theme.themes.dark.colors[`${color}-container`] =
      materialTheme.themeColors.dark[`${color}Container`];
    theme.themes.dark.colors[`on-${color}-container`] =
      materialTheme.themeColors.dark[`on${capitalizeColor}Container`];
    theme.themes.light.colors[color] = materialTheme.themeColors.light[color];
    theme.themes.light.colors[`on-${color}`] =
      materialTheme.themeColors.light[`on${capitalizeColor}`];
    theme.themes.light.colors[`${color}-container`] =
      materialTheme.themeColors.light[`${color}Container`];
    theme.themes.light.colors[`on-${color}-container`] =
      materialTheme.themeColors.light[`on${capitalizeColor}Container`];
  }
  return theme;
}
