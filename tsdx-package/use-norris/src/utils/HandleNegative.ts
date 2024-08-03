export const handleNegative = (value: string) => {
  let spittedValue = value.split("-");
  let minusCount = spittedValue.length - 1;
  if (minusCount == 2) {
    return spittedValue.join().replace(/,/g, "");
  } else if (minusCount == 1) {
    return "-" + spittedValue.join().replace(/,/g, "");
  }
  return value;
};
