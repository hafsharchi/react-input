export const handleNegative = (value: string) => {
  const spittedValue = value.split("-");
  const minusCount = spittedValue.length - 1;
  if (minusCount == 2) {
    return spittedValue.join().replaceAll(/,/g, "");
  } else if (minusCount == 1) {
    return "-" + spittedValue.join().replaceAll(/,/g, "");
  }
  return value;
};
