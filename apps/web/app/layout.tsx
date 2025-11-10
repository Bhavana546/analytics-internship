// apps/web/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Analytics Dashboard",
  description: "AI-driven document analytics platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
          <div>
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-blue-600">
                📊 Analytics
              </h1>
            </div>
            <nav className="flex flex-col mt-4 space-y-2">
              <Link
                href="/"
                className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/chat-with-data"
                className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Chat with Data 💬
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t text-center text-sm text-gray-500">
            © 2025 Analytics Internship
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
