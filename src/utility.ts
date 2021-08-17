export const isValidFileName = (name: string) =>
  name.length > 0 &&
  name.charAt(0) !== "." &&
  !name.match(/[/\\?%*:|"<>]/g) &&
  !name.match(/^(con|prn|aux|nul|com\d|lpt\d)$/i);

export type EmptyObject = Record<string, never>;
