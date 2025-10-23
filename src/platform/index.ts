export const platform = {
  name: "web" as const,
  isWeb: true,
  isNative: false,
};

export type PlatformName = typeof platform.name;
