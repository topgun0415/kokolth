"use client";

import { Error } from "@/components/organisms/Error";
import Footer from "@/components/organisms/Footer";

export default function GlobalErrorPage() {
  return (
    <html>
      <body>
        <Error status={"500"} />
        <Footer />
      </body>
    </html>
  );
} 