export const formatValue = (
  rawValue: string,
  maskArray: string[],
  tokens: Record<string, RegExp>
): string => {
  if (!rawValue) return "";

  const valueChars = rawValue.split("");
  // console.log(valueChars);
  let maskedResult = "";
  let valueIndex = 0;

  for (let i = 0; i < maskArray.length; i++) {
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
        if (token.test(char) || char == "_") {
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
        maskedResult += "_";
        valueIndex++;
      }
    } else {
      maskedResult += maskChar;
      if (
        valueIndex < valueChars.length &&
        valueChars[valueIndex] === maskChar || valueChars[valueIndex] == "_"
      ) {
        valueIndex++;
      }
      // console.log("D: " + maskedResult);
    }
  }
  return maskedResult;
};
