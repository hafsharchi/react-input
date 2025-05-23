export const formatValue = (
  rawValue: string,
  maskArray: string[],
  tokens: Record<string, RegExp>,
  guide?: boolean,
  placeholderChar: string = "_"
): string => {
  // if (!rawValue) return "";
  const valueChars = rawValue.split("");
  // console.log(valueChars);
  let maskedResult = "";
  let valueIndex = 0;
  for (
    let i = 0;
    i < maskArray.length && (guide || valueIndex < valueChars.length);
    i++
  ) {
    // console.log("__________________");
    const maskChar = maskArray[i];
    const token = tokens[maskChar];
    // console.log(
    //   "maskChar: " +
    //     maskChar +
    //     " | token: " +
    //     token +
    //     " | char: " +
    //     valueChars[valueIndex] +
    //     " | index: " +
    //     valueIndex
    // );
    if (token) {
      if (valueIndex < valueChars.length) {
        const char = valueChars[valueIndex];
        if (token.test(char) || char == placeholderChar) {
          // TODO
          // A
          maskedResult += char;
          valueIndex++;
          // console.log("A: " + maskedResult);
        } else {
          valueIndex++;
          i--;
          // console.log("B: " + maskedResult);
        }
      } else {
        // console.log("C: " + maskedResult);
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
      // console.log("D: " + maskedResult);
    }
  }
  return maskedResult;
};
