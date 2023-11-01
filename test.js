// const toDateTimeV1 = (timestamp) => {
//   const d = new Date(timestamp)
//   return new Intl.DateTimeFormat('en-US', {
//      month: 'short',
//      day: 'numeric',
//      hour: 'numeric',
//      minute: 'numeric',
//      hour12: true
//   }).format(d)
// }
const dateTimeString = "Oct 28, 02:35 PM";

// Tạo một đối tượng Intl.DateTimeFormat với định dạng chuẩn
const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

// Phân tích chuỗi ngày tháng và giờ
const { value } = dateTimeFormat.formatToParts(new Date(dateTimeString));

// Tạo đối tượng Date từ chuỗi đã phân tích
const parsedDate = new Date(value);

// Lấy timestamp
const timestamp = parsedDate.getTime();

console.log("Timestamp:", timestamp);