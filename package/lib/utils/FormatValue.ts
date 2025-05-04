export const formatValue = (
  rawValue: string,
  maskArray: string[],
  tokens: Record<string, RegExp>
): string => {
  if (!rawValue) return "";

  const valueChars = rawValue.split("");

  let maskedResult = "";
  let valueIndex = 0;

  for (let i = 0; i < maskArray.length; i++) {
    const maskChar = maskArray[i];
    const token = tokens[maskChar];
    if (token) {
      if (valueIndex < valueChars.length) {
        const char = valueChars[valueIndex];
        if (token.test(char) || char=="_") {
          console.log(maskedResult)
          maskedResult += char;
          valueIndex++;
        } else {
          valueIndex++;
          i--;
        }
      } else {
        maskedResult += "_";
      }
    } else {
      maskedResult += maskChar;
      if (
        valueIndex < valueChars.length &&
        valueChars[valueIndex] === maskChar
      ) {
        valueIndex++;
      }
    }
  }

  return maskedResult;
};
