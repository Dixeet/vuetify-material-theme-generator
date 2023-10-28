import {
  argbFromHex,
  hexFromArgb,
  CorePalette,
  Scheme,
  customColor,
} from '@material/material-color-utilities';
import { useToCapitalize } from '~/composables/helpers.js';

export function useMaterialTheme(colorsTheme, options) {
  const { surfaceDifferentBackground } = {
    surfaceDifferentBackground: true,
    ...options,
  };

  const materialTheme = themeFromColors(colorsTheme);

  if (surfaceDifferentBackground) {
    materialTheme.schemes.dark.props.surface =
      materialTheme.palettes.neutral.tone(15);
    materialTheme.schemes.dark.props.onSurface =
      materialTheme.palettes.neutral.tone(86);
    materialTheme.schemes.light.props.surface =
      materialTheme.palettes.neutral.tone(96);
    materialTheme.schemes.light.props.onSurface =
      materialTheme.palettes.neutral.tone(12);
  }

  materialTheme.schemes.dark.props.surfaceBright =
    materialTheme.palettes.neutralVariant.tone(40);
  materialTheme.schemes.dark.props.onSurfaceBright =
    materialTheme.palettes.neutralVariant.tone(75);
  materialTheme.schemes.light.props.surfaceBright =
    materialTheme.palettes.neutralVariant.tone(85);
  materialTheme.schemes.light.props.onSurfaceBright =
    materialTheme.palettes.neutralVariant.tone(32);

  materialTheme.schemes.dark.props.primaryDarken1 =
    materialTheme.palettes.primary.tone(70);
  materialTheme.schemes.dark.props.secondaryDarken1 =
    materialTheme.palettes.secondary.tone(70);

  materialTheme.schemes.light.props.primaryDarken1 =
    materialTheme.palettes.primary.tone(30);
  materialTheme.schemes.light.props.secondaryDarken1 =
    materialTheme.palettes.secondary.tone(30);

  const themeColors = {};
  for (const [schemeName, scheme] of Object.entries(materialTheme.schemes)) {
    const schemeBuild = {};
    for (const [propName, prop] of Object.entries(scheme.props)) {
      schemeBuild[propName] = hexFromArgb(prop);
    }
    themeColors[schemeName] = schemeBuild;
  }
  const palettesColors = {};
  for (const [colorName, palette] of Object.entries(materialTheme.palettes)) {
    palettesColors[colorName] = hexFromArgb(palette.keyColor.argb);
  }
  return {
    themeColors,
    palettesColors,
    source: hexFromArgb(materialTheme.source),
  };
}

function themeFromColors(colorsTheme) {
  const mainColors = [
    'primary',
    'secondary',
    'tertiary',
    'neutral',
    'neutralVariant',
    'error',
  ];

  const source = argbFromHex(colorsTheme.primary.color);

  const colors = {
    primary: source,
  };

  for (const color of mainColors) {
    if (
      colorsTheme[color]?.color &&
      colorsTheme[color]?.modeSelected === 'custom'
    ) {
      colors[color] = argbFromHex(colorsTheme[color].color);
    }
  }
  const palette = CorePalette.fromColors(colors);
  const materialTheme = {
    source,
    schemes: {
      light: Scheme.lightFromCorePalette(palette),
      dark: Scheme.darkFromCorePalette(palette),
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error,
    },
  };

  for (const color in colorsTheme) {
    if (
      (colorsTheme[color]?.modeSelected === 'custom' &&
        !mainColors.includes(color)) ||
      colorsTheme[color]?.modeSelected === 'blend'
    ) {
      const custom = customColor(source, {
        value: argbFromHex(colorsTheme[color].color),
        blend: colorsTheme[color].modeSelected === 'blend',
      });
      const customPalette = CorePalette.of(custom.value);
      const colorCapitalized = useToCapitalize(color);
      materialTheme.schemes.light.props[color] = custom.light.color;
      materialTheme.schemes.light.props[`${color}Container`] =
        custom.light.colorContainer;
      materialTheme.schemes.light.props[`on${colorCapitalized}`] =
        custom.light.onColor;
      materialTheme.schemes.light.props[`on${colorCapitalized}Container`] =
        custom.light.onColorContainer;
      materialTheme.schemes.dark.props[color] = custom.dark.color;
      materialTheme.schemes.dark.props[`${color}Container`] =
        custom.dark.colorContainer;
      materialTheme.schemes.dark.props[`on${colorCapitalized}`] =
        custom.dark.onColor;
      materialTheme.schemes.dark.props[`on${colorCapitalized}Container`] =
        custom.dark.onColorContainer;
      materialTheme.palettes[color] = customPalette.a1;
    }
  }

  return materialTheme;
}
