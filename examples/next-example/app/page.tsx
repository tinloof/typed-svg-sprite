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

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          🚀 <strong>EXTREME DEMO:</strong> Every single SVG icon manually
          imported! Demonstrating import-based SVG sprite generation with zero
          configuration. Each SVG returns its symbol ID for use with our sprite
          loader.
        </p>
      </header>

      <footer className="mt-16 text-center">
        <div className="bg-white rounded-lg p-6 shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            How it works
          </h2>
          <div className="text-left space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  src="/icons/home.svg"
                </code>{" "}
                - Use direct paths to SVG files
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p>
                Images are served directly from the public folder (e.g.,{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  "/icons/home.svg"
                </code>
                )
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p>
                Each SVG is loaded individually as an image{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  &lt;img&gt;
                </code>{" "}
                element
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              <p>
                <code className="bg-gray-100 px-2 py-1 rounded">
                  &lt;img src="/icons/home.svg" alt="Home" /&gt;
                </code>{" "}
                - Display SVGs as regular images
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
