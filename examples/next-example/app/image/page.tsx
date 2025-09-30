const iconCategories = [
  {
    name: "🏠 Navigation & Core",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icons: [
      { id: "/icons/home.svg", name: "Home" },
      { id: "/icons/home_filled.svg", name: "Home Filled" },
      { id: "/icons/settings.svg", name: "Settings" },
      { id: "/icons/dashboard.svg", name: "Dashboard" },
      { id: "/icons/reorder.svg", name: "Menu" },
      { id: "/icons/search.svg", name: "Search" },
      { id: "/icons/search_off.svg", name: "Search Off" },
    ],
  },
  {
    name: "⚡ Actions & Controls",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icons: [
      { id: "/icons/add_task.svg", name: "Add Task" },
      { id: "/icons/delete.svg", name: "Delete" },
      { id: "/icons/delete_forever.svg", name: "Delete Forever" },
      { id: "/icons/delete_outline.svg", name: "Delete Outline" },
      { id: "/icons/edit_off.svg", name: "Edit Off" },
      { id: "/icons/done.svg", name: "Done" },
      { id: "/icons/done_all.svg", name: "Done All" },
      { id: "/icons/done_outline.svg", name: "Done Outline" },
      { id: "/icons/remove_done.svg", name: "Remove Done" },
    ],
  },
  {
    name: "💖 Favorites & Social",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    icons: [
      { id: "/icons/favorite.svg", name: "Favorite" },
      { id: "/icons/favorite_border.svg", name: "Favorite Border" },
      { id: "/icons/thumb_up.svg", name: "Thumb Up" },
      { id: "/icons/thumb_down.svg", name: "Thumb Down" },
      { id: "/icons/thumb_up_off_alt.svg", name: "Thumb Up Off" },
      { id: "/icons/thumb_down_off_alt.svg", name: "Thumb Down Off" },
      { id: "/icons/thumbs_up_down.svg", name: "Thumbs Up Down" },
      { id: "/icons/stars.svg", name: "Stars" },
      { id: "/icons/star_rate.svg", name: "Star Rate" },
      { id: "/icons/grade.svg", name: "Grade" },
    ],
  },
  {
    name: "💬 Communication",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icons: [
      { id: "/icons/feedback.svg", name: "Feedback" },
      { id: "/icons/question_answer.svg", name: "Question Answer" },
      { id: "/icons/quickreply.svg", name: "Quick Reply" },
      { id: "/icons/comment_bank.svg", name: "Comment Bank" },
      { id: "/icons/announcement.svg", name: "Announcement" },
      { id: "/icons/contact_support.svg", name: "Contact Support" },
      { id: "/icons/contact_page.svg", name: "Contact Page" },
    ],
  },
  {
    name: "ℹ️ Information & Help",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icons: [
      { id: "/icons/info.svg", name: "Info" },
      { id: "/icons/info_outline.svg", name: "Info Outline" },
      { id: "/icons/help.svg", name: "Help" },
      { id: "/icons/help_outline.svg", name: "Help Outline" },
      { id: "/icons/help_center.svg", name: "Help Center" },
      { id: "/icons/support.svg", name: "Support" },
    ],
  },
  {
    name: "🔒 Security & Privacy",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icons: [
      { id: "/icons/lock.svg", name: "Lock" },
      { id: "/icons/lock_open.svg", name: "Lock Open" },
      { id: "/icons/lock_outline.svg", name: "Lock Outline" },
      { id: "/icons/lock_clock.svg", name: "Lock Clock" },
      { id: "/icons/verified.svg", name: "Verified" },
      { id: "/icons/verified_user.svg", name: "Verified User" },
      { id: "/icons/fingerprint.svg", name: "Fingerprint" },
      { id: "/icons/privacy_tip.svg", name: "Privacy Tip" },
      { id: "/icons/admin_panel_settings.svg", name: "Security" },
    ],
  },
  {
    name: "🛍️ Shopping & Commerce",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    icons: [
      { id: "/icons/shopping_cart.svg", name: "Shopping Cart" },
      { id: "/icons/shopping_basket.svg", name: "Shopping Basket" },
      { id: "/icons/shopping_bag.svg", name: "Shopping Bag" },
      { id: "/icons/add_shopping_cart.svg", name: "Add Shopping Cart" },
      { id: "/icons/remove_shopping_cart.svg", name: "Remove Shopping Cart" },
      { id: "/icons/store.svg", name: "Store" },
      { id: "/icons/shop.svg", name: "Shop" },
      { id: "/icons/shop_two.svg", name: "Shop Two" },
      { id: "/icons/payment.svg", name: "Payment" },
      { id: "/icons/credit_card.svg", name: "Credit Card" },
      { id: "/icons/card_giftcard.svg", name: "Gift Card" },
      { id: "/icons/card_membership.svg", name: "Membership Card" },
      { id: "/icons/card_travel.svg", name: "Travel Card" },
      { id: "/icons/redeem.svg", name: "Redeem" },
      { id: "/icons/loyalty.svg", name: "Loyalty" },
    ],
  },
  {
    name: "💰 Financial",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icons: [
      { id: "/icons/account_balance.svg", name: "Account Balance" },
      {
        id: "/icons/account_balance_wallet.svg",
        name: "Account Balance Wallet",
      },
      { id: "/icons/euro_symbol.svg", name: "Euro Symbol" },
      { id: "/icons/receipt.svg", name: "Receipt" },
      { id: "/icons/toll.svg", name: "Toll" },
    ],
  },
  {
    name: "📅 Calendar & Time",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    icons: [
      { id: "/icons/calendar_today.svg", name: "Calendar Today" },
      { id: "/icons/calendar_view_day.svg", name: "Calendar View Day" },
      { id: "/icons/event.svg", name: "Event" },
      { id: "/icons/event_seat.svg", name: "Event Seat" },
      { id: "/icons/today.svg", name: "Today" },
      { id: "/icons/date_range.svg", name: "Date Range" },
      { id: "/icons/schedule.svg", name: "Schedule" },
      { id: "/icons/schedule_send.svg", name: "Schedule Send" },
      { id: "/icons/query_builder.svg", name: "Query Builder" },
      { id: "/icons/history.svg", name: "History" },
      { id: "/icons/history_toggle_off.svg", name: "History Toggle Off" },
      { id: "/icons/watch_later.svg", name: "Watch Later" },
      { id: "/icons/hourglass_empty.svg", name: "Hourglass Empty" },
      { id: "/icons/hourglass_full.svg", name: "Hourglass Full" },
      { id: "/icons/hourglass_disabled.svg", name: "Hourglass Disabled" },
      { id: "/icons/alarm.svg", name: "Alarm" },
      { id: "/icons/alarm_add.svg", name: "Alarm Add" },
      { id: "/icons/alarm_on.svg", name: "Alarm On" },
      { id: "/icons/alarm_off.svg", name: "Alarm Off" },
    ],
  },
  {
    name: "📄 Documents & Files",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    icons: [
      { id: "/icons/description.svg", name: "Description" },
      { id: "/icons/article.svg", name: "Article" },
      { id: "/icons/assignment.svg", name: "Assignment" },
      { id: "/icons/assignment_late.svg", name: "Assignment Late" },
      { id: "/icons/assignment_return.svg", name: "Assignment Return" },
      { id: "/icons/assignment_returned.svg", name: "Assignment Returned" },
      { id: "/icons/assignment_turned_in.svg", name: "Assignment Turned In" },
      { id: "/icons/file_present.svg", name: "File Present" },
      { id: "/icons/request_page.svg", name: "Request Page" },
      { id: "/icons/note_add.svg", name: "Note Add" },
      { id: "/icons/sticky_note_2.svg", name: "Sticky Note 2" },
      { id: "/icons/subject.svg", name: "Subject" },
    ],
  },
  {
    name: "📚 Books & Reading",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icons: [
      { id: "/icons/book.svg", name: "Book" },
      { id: "/icons/book_online.svg", name: "Book Online" },
      { id: "/icons/bookmarks.svg", name: "Bookmarks" },
      { id: "/icons/bookmark.svg", name: "Bookmark" },
      { id: "/icons/bookmark_border.svg", name: "Bookmark Border" },
      { id: "/icons/chrome_reader_mode.svg", name: "Chrome Reader Mode" },
    ],
  },
  {
    name: "📊 Analytics & Charts",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    icons: [
      { id: "/icons/analytics.svg", name: "Analytics" },
      { id: "/icons/assessment.svg", name: "Assessment" },
      { id: "/icons/timeline.svg", name: "Timeline" },
      { id: "/icons/trending_up.svg", name: "Trending Up" },
      { id: "/icons/trending_down.svg", name: "Trending Down" },
      { id: "/icons/trending_flat.svg", name: "Trending Flat" },
      { id: "/icons/leaderboard.svg", name: "Leaderboard" },
      { id: "/icons/donut_large.svg", name: "Donut Large" },
      { id: "/icons/donut_small.svg", name: "Donut Small" },
      { id: "/icons/addchart.svg", name: "Add Chart" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {iconCategories.map((category) => (
          <div
            key={category.name}
            className={`p-8 rounded-xl ${category.bgColor} border-2 ${category.borderColor}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className={`text-2xl font-bold ${category.color}`}>
                {category.name}
              </h2>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {category.icons.length} icons
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
              {category.icons.map(({ id, name }) => (
                <div
                  key={id}
                  className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center border hover:border-gray-300"
                >
                  <img
                    src={id}
                    alt={name}
                    width={28}
                    height={28}
                    className={`${category.color} mb-2 group-hover:scale-110 transition-transform duration-200`}
                  />
                  <h3 className="text-xs font-medium text-gray-800 mb-1 leading-tight">
                    {name}
                  </h3>
                  <code className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-center break-all">
                    {id.split("#")[1] || id}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
