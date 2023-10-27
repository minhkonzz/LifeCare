const timestamp = 1635545820000; // Ví dụ về timestamp

const date = new Date(timestamp);
const options = {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(date);
console.log(formattedDateTime);