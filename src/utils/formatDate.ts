export function formatDate(date: Date, format: string) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  let formattedDate;

  switch (format) {
    case "DD/MM/YYYY":
      formattedDate = `${day}/${month}/${year}`;
      break;
    case "YYYY-MM-DD":
      formattedDate = `${year}-${month}-${day}`;
      break;
    case "MM/DD/YYYY":
      formattedDate = `${month}/${day}/${year}`;
      break;
    case "YYYY/MM/DD HH:mm:ss":
      formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      break;
    default:
      formattedDate = `${day}/${month}/${year}`; // Default format
      break;
  }

  return formattedDate;
}
