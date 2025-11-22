import "./globals.css";
import { MotionDiv } from "./motion-wrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <MotionDiv>{children}</MotionDiv>
      </body>
    </html>
  );
}
