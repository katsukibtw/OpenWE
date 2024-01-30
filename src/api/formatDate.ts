export default function formatDate(date: string): string {
  const newDate = new Date(date);

  const days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${
    days[newDate.getDay()]
  }`;
}
