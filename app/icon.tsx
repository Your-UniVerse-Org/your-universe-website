import { ImageResponse } from "next/og";
import {
  BRAND_MARK_BG,
  BRAND_MARK_COLOR,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon PNG fallback — matches public/favicon.svg and loading screen mark */
export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <svg viewBox={BRAND_MARK_VIEWBOX} width="24" height="24">
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
