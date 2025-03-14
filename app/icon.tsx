import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 4.79 5 10 7 12 2-2 7-7.21 7-12 0-3.87-3.13-7-7-7z"
          fill="#E63946"
        />
        <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
      </svg>
    ),
    { ...size }
  );
}
