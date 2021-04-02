export const dateInputFormat = (value) => {
  const date = new Date(value);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  const fmtDate = `${yy}-${mm}-${dd}`;
  return fmtDate;
};

export const selectorDataFormat = (items) => {
  const fmtItems = items.map((item) => ({ value: item.id, label: item.name }));
  return fmtItems;
};

export default dateInputFormat;
