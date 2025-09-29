import { Icon } from "./components/Icon";

// Import SVG files directly - each returns its symbol ID
import homeIcon from "../public/icons/home.svg";
import settingsIcon from "../public/icons/settings.svg";
import favoriteIcon from "../public/icons/favorite.svg";

const demoIcons = [
  { id: homeIcon, name: "Home", color: "text-blue-500" },
  { id: settingsIcon, name: "Settings", color: "text-gray-600" },
  { id: favoriteIcon, name: "Favorite", color: "text-pink-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SVG Sprite Webpack Loader
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Next.js example demonstrating import-based SVG sprite generation
            with zero configuration. Each SVG is imported directly and returns
            its symbol ID.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {demoIcons.map(({ id, name, color }) => (
            <div
              key={id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center text-center"
            >
              <Icon id={id} size={32} className={`${color} mb-3`} />
              <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {id}
              </code>
            </div>
          ))}
        </div>

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
                    import homeIcon from './home.svg'
                  </code>{" "}
                  - Import SVG files directly
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p>
                  Each import returns a unique symbol ID (e.g.,{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    "public-icons-home"
                  </code>
                  )
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p>
                  All imported SVGs are automatically combined into{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    /sprite.svg
                  </code>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <p>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    &lt;Icon id={homeIcon} /&gt;
                  </code>{" "}
                  - Use the Icon component with auto-detection
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
