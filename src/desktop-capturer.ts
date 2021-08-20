import { screen, systemPreferences } from "electron";
import screenshot from "screenshot-desktop";
import sharp from "sharp";

export const hasCapturePermission = () => systemPreferences.getMediaAccessStatus("screen") === "granted";

export const captureDesktopAsBytes = async () => await screenshot({ format: "png" });

let beforePath: string | null = null;
let i = 0;

export const captureDesktop = async (
  path: string,
  { x, y, width, height }: { x: number; y: number; width: number; height: number }
) => {
  const { scaleFactor } = screen.getPrimaryDisplay();
  const bytes = await captureDesktopAsBytes();
  let output = path + ".png";
  if (path === beforePath) {
    const j = ++i;
    output = `${path} (${j}).png`;
  } else {
    beforePath = path;
    i = 0;
  }

  sharp(bytes)
    .extract({
      left: x * scaleFactor,
      top: y * scaleFactor,
      width: width * scaleFactor,
      height: height * scaleFactor,
    })
    .toFile(output);
};
