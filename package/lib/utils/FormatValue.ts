export const formatValue = (
  rawValue: string,
  maskArray: string[],
  tokens: Record<string, RegExp>,
  guide?: boolean,
  placeholderChar: string = "_"
): string => {
  // if (!rawValue) return "";
  const valueChars = rawValue.split("");
  let maskedResult = "";
  let valueIndex = 0;
  for (
    let i = 0;
    i < maskArray.length && (guide || valueIndex < valueChars.length);
    i++
  ) {
    const maskChar = maskArray[i];
    const token = tokens[maskChar];

    if (token) {
      if (valueIndex < valueChars.length) {
        const char = valueChars[valueIndex];
        if (token.test(char) || char == placeholderChar) {
          maskedResult += char;
          valueIndex++;
        } else {
          valueIndex++;
          i--;
        }
      } else {
        maskedResult += placeholderChar;
        valueIndex++;
      }
    } else {
      maskedResult += maskChar;
      if (
        (valueIndex < valueChars.length &&
          valueChars[valueIndex] === maskChar) ||
        valueChars[valueIndex] == placeholderChar
      ) {
        valueIndex++;
      }
    }
  }
  return maskedResult;
};
