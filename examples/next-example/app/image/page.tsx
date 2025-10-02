export const dynamic = "force-dynamic";

const iconUrls = [
  // 🏠 Navigation & Core
  "/icons/home.svg",
  "/icons/home_filled.svg",
  "/icons/settings.svg",
  "/icons/dashboard.svg",
  "/icons/reorder.svg",
  "/icons/search.svg",
  "/icons/search_off.svg",

  // ⚡ Actions & Controls
  "/icons/add_task.svg",
  "/icons/delete.svg",
  "/icons/delete_forever.svg",
  "/icons/delete_outline.svg",
  "/icons/edit_off.svg",
  "/icons/done.svg",
  "/icons/done_all.svg",
  "/icons/done_outline.svg",
  "/icons/remove_done.svg",

  // 💖 Favorites & Social
  "/icons/favorite.svg",
  "/icons/favorite_border.svg",
  "/icons/thumb_up.svg",
  "/icons/thumb_down.svg",
  "/icons/thumb_up_off_alt.svg",
  "/icons/thumb_down_off_alt.svg",
  "/icons/thumbs_up_down.svg",
  "/icons/stars.svg",
  "/icons/star_rate.svg",
  "/icons/grade.svg",

  // 💬 Communication
  "/icons/feedback.svg",
  "/icons/question_answer.svg",
  "/icons/quickreply.svg",
  "/icons/comment_bank.svg",
  "/icons/announcement.svg",
  "/icons/contact_support.svg",
  "/icons/contact_page.svg",

  // ℹ️ Information & Help
  "/icons/info.svg",
  "/icons/info_outline.svg",
  "/icons/help.svg",
  "/icons/help_outline.svg",
  "/icons/help_center.svg",
  "/icons/support.svg",

  // 🔒 Security & Privacy
  "/icons/lock.svg",
  "/icons/lock_open.svg",
  "/icons/lock_outline.svg",
  "/icons/lock_clock.svg",
  "/icons/verified.svg",
  "/icons/verified_user.svg",
  "/icons/fingerprint.svg",
  "/icons/privacy_tip.svg",
  "/icons/admin_panel_settings.svg",

  // 🛍️ Shopping & Commerce
  "/icons/shopping_cart.svg",
  "/icons/shopping_basket.svg",
  "/icons/shopping_bag.svg",
  "/icons/add_shopping_cart.svg",
  "/icons/remove_shopping_cart.svg",
  "/icons/store.svg",
  "/icons/shop.svg",
  "/icons/shop_two.svg",
  "/icons/payment.svg",
  "/icons/credit_card.svg",
  "/icons/card_giftcard.svg",
  "/icons/card_membership.svg",
  "/icons/card_travel.svg",
  "/icons/redeem.svg",
  "/icons/loyalty.svg",

  // 💰 Financial
  "/icons/account_balance.svg",
  "/icons/account_balance_wallet.svg",
  "/icons/euro_symbol.svg",
  "/icons/receipt.svg",
  "/icons/toll.svg",

  // 📅 Calendar & Time
  "/icons/calendar_today.svg",
  "/icons/calendar_view_day.svg",
  "/icons/event.svg",
  "/icons/event_seat.svg",
  "/icons/today.svg",
  "/icons/date_range.svg",
  "/icons/schedule.svg",
  "/icons/schedule_send.svg",
  "/icons/query_builder.svg",
  "/icons/history.svg",
  "/icons/history_toggle_off.svg",
  "/icons/watch_later.svg",
  "/icons/hourglass_empty.svg",
  "/icons/hourglass_full.svg",
  "/icons/hourglass_disabled.svg",
  "/icons/alarm.svg",
  "/icons/alarm_add.svg",
  "/icons/alarm_on.svg",
  "/icons/alarm_off.svg",

  // 📄 Documents & Files
  "/icons/description.svg",
  "/icons/article.svg",
  "/icons/assignment.svg",
  "/icons/assignment_late.svg",
  "/icons/assignment_return.svg",
  "/icons/assignment_returned.svg",
  "/icons/assignment_turned_in.svg",
  "/icons/file_present.svg",
  "/icons/request_page.svg",
  "/icons/note_add.svg",
  "/icons/sticky_note_2.svg",
  "/icons/subject.svg",

  // 📚 Books & Reading
  "/icons/book.svg",
  "/icons/book_online.svg",
  "/icons/bookmarks.svg",
  "/icons/bookmark.svg",
  "/icons/bookmark_border.svg",
  "/icons/chrome_reader_mode.svg",

  // 📊 Analytics & Charts
  "/icons/analytics.svg",
  "/icons/assessment.svg",
  "/icons/timeline.svg",
  "/icons/trending_up.svg",
  "/icons/trending_down.svg",
  "/icons/trending_flat.svg",
  "/icons/leaderboard.svg",
  "/icons/donut_large.svg",
  "/icons/donut_small.svg",
  "/icons/addchart.svg",
];

export default function ImagePage() {
  return (
    <div className="flex flex-wrap gap-4 p-8">
      {new Array(200).fill(0).map((_, index) => {
        const src = iconUrls[Math.floor(Math.random() * iconUrls.length)];
        return <img key={index} src={src} alt="icon" width={24} height={24} />;
      })}
    </div>
  );
}
