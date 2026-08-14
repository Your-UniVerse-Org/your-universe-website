import { ImageResponse } from "next/og";
import {
  BRAND_MARK_BG,
  BRAND_MARK_COLOR,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — static brand mark, Next.js App Router file convention */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_MARK_BG,
          borderRadius: 32,
        }}
      >
        <svg viewBox={BRAND_MARK_VIEWBOX} width="128" height="128">
          <path
            d={BRAND_MARK_PATH}
            fill={BRAND_MARK_COLOR}
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
