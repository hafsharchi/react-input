export const extractRawValue = (
  maskedValue: string,
  maskArray: string[],
  tokens: Record<string, RegExp>
): string => {
  if (!maskedValue) return "";

  let rawValue = "";
  const valueChars = maskedValue.split("");

  for (let i = 0; i < valueChars.length; i++) {
    const char = valueChars[i];
    // if (char !== placeholderChar) {
    let isLiteral = false;
    for (const key in tokens) {
      if (maskArray[i] === key) {
        isLiteral = false;
        break;
      }
      isLiteral = true;
    }
    if (!isLiteral) {
      rawValue += char;
    }
    // }
  }

  return rawValue;
};
