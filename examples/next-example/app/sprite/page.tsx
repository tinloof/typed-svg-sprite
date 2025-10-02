export const dynamic = "force-dynamic";

import { Icon } from "../../components/Icon";

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

// COMPREHENSIVE ICON SHOWCASE - ALL IMPORTED MANUALLY! 🔥
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
    <div className="flex flex-wrap gap-4 p-8">
      {new Array(200).fill(0).map((_, index) => (
        <Icon
          href={iconHrefs[Math.floor(Math.random() * iconHrefs.length)]}
          key={index}
        />
      ))}
    </div>
  );
}
