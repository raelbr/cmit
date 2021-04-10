const LANG_FORMAT = "en-US";

const dateBaseFormat = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const hourBaseFormat = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const formatDateWithHours = (date) => {
  return new Date(date).toLocaleDateString(LANG_FORMAT, {
    ...dateBaseFormat,
    ...hourBaseFormat,
  });
};

const formatDate = (date) => {
  return new Date().toLocaleDateString(LANG_FORMAT, dateBaseFormat);
};

module.exports = {
  formatDate,
  formatDateWithHours,
};
