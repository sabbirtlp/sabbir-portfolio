import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PluginsClient from "./PluginsClient";

export const metadata: Metadata = createPageMetadata({
  title: "Open Source WordPress Plugins | Sabbir Hossain",
  description:
    "Explore and download custom, lightweight WordPress plugins developed by Sabbir Hossain for enhancing site speed, conversions, and functionality.",
  path: "/plugins",
  keywords: [
    "WordPress plugins",
    "custom WordPress plugins",
    "open source plugins",
    "download WordPress plugin",
    "WordPress developer plugins",
  ],
});

export default function PluginsPage() {
  return <PluginsClient />;
}
