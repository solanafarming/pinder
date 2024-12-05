function getFormattedDate() {
  const date = new Date();

  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate(); // Get day as a number (1-31)
  const year = date.getFullYear();

  const suffixes = ["st", "nd", "rd", "th"];
  let suffix;
  const remainder = day % 10;
  if (day > 3 && day < 21) {
    suffix = suffixes[3];
  } else if (remainder === 3) {
    suffix = suffixes[2];
  } else if (remainder === 2) {
    suffix = suffixes[1];
  } else {
    suffix = suffixes[0];
  }

  const formattedDate = `${month} ${day}${suffix}, ${year}`;

  return formattedDate;
}

export default getFormattedDate;
