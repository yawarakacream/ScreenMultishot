export const isDevelopment = process.env.NODE_ENV !== "production";

export const isValidFileName = (name: string): boolean =>
  name.length > 0 &&
  name.charAt(0) !== "." &&
  !name.match(/[/\\?%*:|"<>]/g) &&
  !name.match(/^(con|prn|aux|nul|com\d|lpt\d)$/i);

export type EmptyObject = Record<string, never>;

export const replaceMultiply = (str: string, map: { [key: string]: any }): string => {
  console.log(new RegExp(Object.keys(map).join("|"), "gi"));
  return str.replace(new RegExp(Object.keys(map).join("|"), "gi"), (m) => {
    console.log(m);
    return map[m];
  });
};

const twoZeroPadding = (n: number) => (n < 10 ? `0${n}` : n);

const dateFormatterKeys = ["$year", "$month", "$day", "$hours", "$minutes", "$seconds"] as const;
const dateFormatterRegex = new RegExp(dateFormatterKeys.map((s) => "\\" + s).join("|"), "gi");

export const parseDateFormat = (str: string, date: Date): string => {
  const map = {
    $year: date.getFullYear(),
    $month: twoZeroPadding(date.getMonth() + 1),
    $day: twoZeroPadding(date.getDay()),
    $hours: twoZeroPadding(date.getHours()),
    $minutes: twoZeroPadding(date.getMinutes()),
    $seconds: twoZeroPadding(date.getSeconds()),
  } as { [key: string]: any };
  return str.replace(dateFormatterRegex, (m) => map[m]);
};
