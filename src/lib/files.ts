import { access } from "node:fs/promises";
import path from "node:path";

/** True when a file exists under /public for the given public URL path. */
export async function publicFileExists(publicPath: string): Promise<boolean> {
  const relative = publicPath.replace(/^\//, "");
  try {
    await access(path.join(process.cwd(), "public", relative));
    return true;
  } catch {
    return false;
  }
}
