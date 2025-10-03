import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Sprite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <header className="text-center mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          <h1 className="text-5xl font-extrabold mb-2">
            🔥 EPIC ICON SHOWCASE 🔥
          </h1>
          <h2 className="text-2xl font-bold">SVG Sprite Webpack Loader</h2>
        </div>

        <div className="flex justify-center items-center gap-6 mb-6">
          <Link
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            href="/sprite"
          >
            🎯 Sprite
          </Link>
          <Link
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            href="/image"
          >
            🖼️ Image
          </Link>
          <Link
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            href="/inline"
          >
            📝 Inline
          </Link>
        </div>
      </header>
    </div>
  );
}
