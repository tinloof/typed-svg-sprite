import "material-symbols";
import "./icons.css";

// 115 Material Symbols icons organized by category
const materialIcons = [
  // 🏠 Navigation & Core
  "home",
  "settings",
  "dashboard",
  "reorder",
  "search",
  "search_off",
  "menu",

  // ⚡ Actions & Controls
  "add_task",
  "delete",
  "delete_forever",
  "delete_outline",
  "edit_off",
  "done",
  "done_all",
  "done_outline",
  "remove_done",

  // 💖 Favorites & Social
  "favorite",
  "thumb_up",
  "thumb_down",
  "thumbs_up_down",
  "star",
  "star_rate",
  "grade",

  // 💬 Communication
  "feedback",
  "question_answer",
  "quickreply",
  "comment_bank",
  "announcement",
  "contact_support",
  "contact_page",

  // ℹ️ Information & Help
  "info",
  "help",
  "help_outline",
  "help_center",
  "support",

  // 🔒 Security & Privacy
  "lock",
  "lock_open",
  "lock_clock",
  "verified",
  "verified_user",
  "fingerprint",
  "privacy_tip",
  "admin_panel_settings",

  // 🛍️ Shopping & Commerce
  "shopping_cart",
  "shopping_basket",
  "shopping_bag",
  "add_shopping_cart",
  "remove_shopping_cart",
  "store",
  "shop",
  "shop_two",
  "payment",
  "credit_card",
  "card_giftcard",
  "card_membership",
  "card_travel",
  "redeem",
  "loyalty",

  // 💰 Financial
  "account_balance",
  "account_balance_wallet",
  "euro_symbol",
  "receipt",
  "toll",

  // 📅 Calendar & Time
  "calendar_today",
  "calendar_view_day",
  "event",
  "event_seat",
  "today",
  "date_range",
  "schedule",
  "schedule_send",
  "query_builder",
  "history",
  "history_toggle_off",
  "watch_later",
  "hourglass_empty",
  "hourglass_full",
  "hourglass_disabled",
  "alarm",
  "alarm_add",
  "alarm_on",
  "alarm_off",

  // 📄 Documents & Files
  "description",
  "article",
  "assignment",
  "assignment_late",
  "assignment_return",
  "assignment_returned",
  "assignment_turned_in",
  "file_present",
  "request_page",
  "note_add",
  "sticky_note_2",
  "subject",

  // 📚 Books & Reading
  "book",
  "book_online",
  "bookmarks",
  "bookmark",
  "chrome_reader_mode",

  // 📊 Analytics & Charts
  "analytics",
  "assessment",
  "timeline",
  "trending_up",
  "trending_down",
  "trending_flat",
  "leaderboard",
  "donut_large",
  "donut_small",
  "addchart",
];

export default function FontPage() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap gap-4 p-8">
        {new Array(200).fill(0).map((_, index) => {
          const randomIcon =
            materialIcons[Math.floor(Math.random() * materialIcons.length)];
          return (
            <span
              key={`${randomIcon}-${Math.random()}-${index}`}
              className="material-symbols-outlined text-4xl flex items-center justify-center"
            >
              {randomIcon}
            </span>
          );
        })}
      </div>

      {/* Pros and Cons Section */}
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">
          🔤 Ligature-Based Icon Fonts
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-green-50 rounded">
            <h3 className="font-semibold text-green-800 mb-2">✓ Pros</h3>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Readable markup</strong> - Human-readable icon names
                instead of unicode
              </li>
              <li>
                • <strong>CSS styleable</strong> - Font-size, color via CSS
                properties
              </li>
              <li>
                • <strong>Single HTTP request</strong> - One font file for all
                icons
              </li>
              <li>
                • <strong>Scalable</strong> - Vector quality at any size
              </li>
              <li>
                • <strong>Browser caching</strong> - Font cached across pages
              </li>
              <li>
                • <strong>Accessibility fallback</strong> - Text renders if font
                fails
              </li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 rounded">
            <h3 className="font-semibold text-red-800 mb-2">✗ Cons</h3>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Not tree-shakeable</strong> - Entire font downloads,
                unused icons included
              </li>
              <li>
                • <strong>Monochrome only</strong> - Limited to single color
                fills
              </li>
              <li>
                • <strong>FOIT/FOUT issues</strong> - Flash of
                invisible/unstyled text during load
              </li>
              <li>
                • <strong>Ligature limitations</strong> - Requires font-feature
                settings support
              </li>
              <li>
                • <strong>No individual control</strong> - Can't modify specific
                icon paths
              </li>
              <li>
                • <strong>Large bundle size</strong> - Hundreds of KB for
                complete sets
              </li>
              <li>
                • <strong>Accessibility concerns</strong> - Screen readers may
                announce text
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded text-sm">
          <strong>Best for:</strong> Apps using many icons (50+) across multiple
          pages where the one-time font download is amortized. Ligatures provide
          clean markup, but the all-or-nothing bundle makes them less efficient
          than inline SVG or sprites for apps using few icons. Modern SVG
          approaches offer better optimization and flexibility.
        </div>
      </div>
    </div>
  );
}
