import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">SVG Icon Demo</h1>
        <p className="text-gray-600 mb-8">
          Compare three approaches to using SVG icons
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            href="/sprite"
          >
            🎯 Sprite
          </Link>
          <Link
            className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            href="/inline"
          >
            📝 Inline
          </Link>
          <Link
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            href="/image"
          >
            🖼️ Image
          </Link>
          <Link
            className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
            href="/font"
          >
            🔤 Font
          </Link>
        </div>
      </div>
    </div>
  );
}
