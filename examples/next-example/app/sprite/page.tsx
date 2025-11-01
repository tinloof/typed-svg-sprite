export const dynamic = "force-dynamic";

import { PreloadSprite } from "@/components/PreloadSprite";
import { Icon } from "@/generated/Icon";

import {
  HOME,
  HOME_FILLED,
  SETTINGS,
  DASHBOARD,
  REORDER,
  SEARCH,
  SEARCH_OFF,
} from "@/generated/icons";

// Actions & Controls
import {
  ADD_TASK,
  DELETE,
  DELETE_FOREVER,
  DELETE_OUTLINE,
  EDIT_OFF,
  DONE,
  DONE_ALL,
  DONE_OUTLINE,
  REMOVE_DONE,
} from "@/generated/icons";

// Favorites & Social
import {
  FAVORITE,
  FAVORITE_BORDER,
  THUMB_UP,
  THUMB_DOWN,
  THUMB_UP_OFF_ALT,
  THUMB_DOWN_OFF_ALT,
  THUMBS_UP_DOWN,
  STARS,
  STAR_RATE,
  GRADE,
} from "@/generated/icons";

// Communication
import {
  FEEDBACK,
  QUESTION_ANSWER,
  QUICKREPLY,
  COMMENT_BANK,
  ANNOUNCEMENT,
  CONTACT_SUPPORT,
  CONTACT_PAGE,
} from "@/generated/icons";

// Information & Help
import {
  INFO,
  INFO_OUTLINE,
  HELP,
  HELP_OUTLINE,
  HELP_CENTER,
  SUPPORT,
} from "@/generated/icons";

// Security & Privacy
import {
  LOCK,
  LOCK_OPEN,
  LOCK_OUTLINE,
  LOCK_CLOCK,
  VERIFIED,
  VERIFIED_USER,
  FINGERPRINT,
  PRIVACY_TIP,
  ADMIN_PANEL_SETTINGS,
} from "@/generated/icons";

// Shopping & Commerce
import {
  SHOPPING_CART,
  SHOPPING_BASKET,
  SHOPPING_BAG,
  ADD_SHOPPING_CART,
  REMOVE_SHOPPING_CART,
  STORE,
  SHOP,
  SHOP_TWO,
  PAYMENT,
  CREDIT_CARD,
  CARD_GIFTCARD,
  CARD_MEMBERSHIP,
  CARD_TRAVEL,
  REDEEM,
  LOYALTY,
} from "@/generated/icons";

// Financial
import {
  ACCOUNT_BALANCE,
  ACCOUNT_BALANCE_WALLET,
  EURO_SYMBOL,
  RECEIPT,
  TOLL,
} from "@/generated/icons";

// Calendar & Time
import {
  CALENDAR_TODAY,
  CALENDAR_VIEW_DAY,
  EVENT,
  EVENT_SEAT,
  TODAY,
  DATE_RANGE,
  SCHEDULE,
  SCHEDULE_SEND,
  QUERY_BUILDER,
  HISTORY,
  HISTORY_TOGGLE_OFF,
  WATCH_LATER,
  HOURGLASS_EMPTY,
  HOURGLASS_FULL,
  HOURGLASS_DISABLED,
  ALARM,
  ALARM_ADD,
  ALARM_ON,
  ALARM_OFF,
} from "@/generated/icons";

// Documents & Files
import {
  DESCRIPTION,
  ARTICLE,
  ASSIGNMENT,
  ASSIGNMENT_LATE,
  ASSIGNMENT_RETURN,
  ASSIGNMENT_RETURNED,
  ASSIGNMENT_TURNED_IN,
  FILE_PRESENT,
  REQUEST_PAGE,
  NOTE_ADD,
  STICKY_NOTE_2,
  SUBJECT,
} from "@/generated/icons";

// Books & Reading
import {
  BOOK,
  BOOK_ONLINE,
  BOOKMARKS,
  BOOKMARK,
  BOOKMARK_BORDER,
  CHROME_READER_MODE,
} from "@/generated/icons";

// Analytics & Charts
import {
  ANALYTICS,
  ASSESSMENT,
  TIMELINE,
  TRENDING_UP,
  TRENDING_DOWN,
  TRENDING_FLAT,
  LEADERBOARD,
  DONUT_LARGE,
  DONUT_SMALL,
  ADDCHART,
} from "@/generated/icons";

const iconHrefs = [
  // 🏠 Navigation & Core
  HOME,
  HOME_FILLED,
  SETTINGS,
  DASHBOARD,
  REORDER,
  SEARCH,
  SEARCH_OFF,

  // ⚡ Actions & Controls
  ADD_TASK,
  DELETE,
  DELETE_FOREVER,
  DELETE_OUTLINE,
  EDIT_OFF,
  DONE,
  DONE_ALL,
  DONE_OUTLINE,
  REMOVE_DONE,

  // 💖 Favorites & Social
  FAVORITE,
  FAVORITE_BORDER,
  THUMB_UP,
  THUMB_DOWN,
  THUMB_UP_OFF_ALT,
  THUMB_DOWN_OFF_ALT,
  THUMBS_UP_DOWN,
  STARS,
  STAR_RATE,
  GRADE,

  // 💬 Communication
  FEEDBACK,
  QUESTION_ANSWER,
  QUICKREPLY,
  COMMENT_BANK,
  ANNOUNCEMENT,
  CONTACT_SUPPORT,
  CONTACT_PAGE,

  // ℹ️ Information & Help
  INFO,
  INFO_OUTLINE,
  HELP,
  HELP_OUTLINE,
  HELP_CENTER,
  SUPPORT,

  // 🔒 Security & Privacy
  LOCK,
  LOCK_OPEN,
  LOCK_OUTLINE,
  LOCK_CLOCK,
  VERIFIED,
  VERIFIED_USER,
  FINGERPRINT,
  PRIVACY_TIP,
  ADMIN_PANEL_SETTINGS,

  // 🛍️ Shopping & Commerce
  SHOPPING_CART,
  SHOPPING_BASKET,
  SHOPPING_BAG,
  ADD_SHOPPING_CART,
  REMOVE_SHOPPING_CART,
  STORE,
  SHOP,
  SHOP_TWO,
  PAYMENT,
  CREDIT_CARD,
  CARD_GIFTCARD,
  CARD_MEMBERSHIP,
  CARD_TRAVEL,
  REDEEM,
  LOYALTY,

  // 💰 Financial
  ACCOUNT_BALANCE,
  ACCOUNT_BALANCE_WALLET,
  EURO_SYMBOL,
  RECEIPT,
  TOLL,

  // 📅 Calendar & Time
  CALENDAR_TODAY,
  CALENDAR_VIEW_DAY,
  EVENT,
  EVENT_SEAT,
  TODAY,
  DATE_RANGE,
  SCHEDULE,
  SCHEDULE_SEND,
  QUERY_BUILDER,
  HISTORY,
  HISTORY_TOGGLE_OFF,
  WATCH_LATER,
  HOURGLASS_EMPTY,
  HOURGLASS_FULL,
  HOURGLASS_DISABLED,
  ALARM,
  ALARM_ADD,
  ALARM_ON,
  ALARM_OFF,

  // 📄 Documents & Files
  DESCRIPTION,
  ARTICLE,
  ASSIGNMENT,
  ASSIGNMENT_LATE,
  ASSIGNMENT_RETURN,
  ASSIGNMENT_RETURNED,
  ASSIGNMENT_TURNED_IN,
  FILE_PRESENT,
  REQUEST_PAGE,
  NOTE_ADD,
  STICKY_NOTE_2,
  SUBJECT,

  // 📚 Books & Reading
  BOOK,
  BOOK_ONLINE,
  BOOKMARKS,
  BOOKMARK,
  BOOKMARK_BORDER,
  CHROME_READER_MODE,

  // 📊 Analytics & Charts
  ANALYTICS,
  ASSESSMENT,
  TIMELINE,
  TRENDING_UP,
  TRENDING_DOWN,
  TRENDING_FLAT,
  LEADERBOARD,
  DONUT_LARGE,
  DONUT_SMALL,
  ADDCHART,
];

export default function Sprite() {
  return (
    <>
      <PreloadSprite />
      <div className="min-h-screen">
        <div className="flex flex-wrap gap-4 p-8">
          {new Array(200).fill(0).map((_, index) => {
            const randomHref =
              iconHrefs[Math.floor(Math.random() * iconHrefs.length)];
            return (
              <Icon
                href={randomHref}
                key={`${randomHref}-${Math.random()}-${index}`}
              />
            );
          })}
        </div>

        {/* Pros and Cons Section */}
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">🎯 SVG Sprite Approach</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-green-50 rounded">
              <h3 className="font-semibold text-green-800 mb-2">✓ Pros</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Single HTTP request</strong> - One cached file for
                  all icons
                </li>
                <li>
                  • <strong>Minimal DOM</strong> - Tiny &lt;svg&gt;&lt;use&gt;
                  references
                </li>
                <li>
                  • <strong>Excellent compression</strong> - ~25-30KB compressed
                </li>
                <li>
                  • <strong>Fast navigation</strong> - Icons cached across pages
                </li>
                <li>
                  • <strong>CSS styling</strong> - Easy to customize colors
                </li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 rounded">
              <h3 className="font-semibold text-red-800 mb-2">✗ Cons</h3>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Unused icons included</strong> - All 115 icons in
                  bundle
                </li>
                <li>
                  • <strong>Not tree-shakeable</strong> - Can't auto-remove
                  unused
                </li>
                <li>
                  • <strong>Initial load overhead</strong> - Downloads all
                  upfront
                </li>
                <li>
                  • <strong>Build step required</strong> - Sprite generation
                  needed
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded text-sm">
            <strong>Best for:</strong> Apps with 20+ icons across multiple
            pages. The sprite (115 icons) is only 56KB uncompressed (~18-25KB
            compressed). Once cached, navigation is instant with zero additional
            downloads.
          </div>
        </div>
      </div>
    </>
  );
}
