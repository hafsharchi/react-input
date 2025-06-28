import { extractRawValue } from "./ExtractRawValue";
import { formatValue } from "./FormatValue";

// Type definition for the handleMask function arguments
// Describes all the parameters needed for mask handling logic
// inputValue: the value currently in the input
// event: the React change event
// guide: whether to show mask guide characters
// prevValue: the previous value before the change
// maskPattern: the array representing the mask
// maskTokens: the token definitions for mask characters
// placeholderChar: the character used for empty mask slots
// currentMaskedValue: the value currently displayed in the input
// updateMaskedValue: function to update the masked value state
// keepCharPositions: whether to keep character positions fixed
// updateValue: function to update the value state
// overwrite: whether to overwrite characters in the mask
type HandleMaskType = {
  inputValue: string;
  event: React.ChangeEvent<HTMLInputElement>;
  guide?: boolean;
  prevValue: string;
  maskPattern: string[];
  maskTokens: Record<string, RegExp>;
  placeholderChar: string;
  currentMaskedValue: string;
  updateMaskedValue: (value: string) => void;
  keepCharPositions?: boolean;
  updateValue: (value: string) => void;
  overwrite?: boolean;
};

// Main function to handle input masking logic
// Applies the mask, manages cursor position, and updates the input value
export const handleMask = ({
  inputValue,
  event,
  guide = false,
  prevValue,
  maskPattern,
  maskTokens,
  placeholderChar,
  currentMaskedValue,
  updateMaskedValue,
  keepCharPositions = false,
  updateValue,
  overwrite = false,
}: HandleMaskType) => {
  const inputElement = event.target;
  let cursorPosition = inputElement.selectionStart ?? 0;

  // If guide mode is enabled, handle both deletion and insertion with mask guidance
  if (guide) {
    // Handle deletion (backspace)
    if (inputValue.length < prevValue.length) {
      let backspaceCount = 0;
      // Move cursor back over non-token mask characters
      while (
        maskPattern[cursorPosition - 1] &&
        !maskTokens[maskPattern[cursorPosition - 1]]
      ) {
        backspaceCount++;
        cursorPosition--;
      }

      // Split input into parts around the cursor
      const parts = [
        inputValue.slice(0, cursorPosition + backspaceCount),
        inputValue.slice(cursorPosition + backspaceCount),
      ];

      // Calculate how many characters were deleted
      const diffCount = prevValue.length - inputValue.length;
      // Insert placeholder characters for deleted positions
      const withPlaceholder =
        parts[0] + placeholderChar.repeat(diffCount) + parts[1];

      if (keepCharPositions) {
        inputValue = withPlaceholder;
      } else {
        // Remove mask characters from the value
        inputValue = extractRawValue(withPlaceholder, maskPattern, maskTokens);
      }

      // Handle insertion (typing)
    } else if (inputValue.length > prevValue.length) {
      // If the new character doesn't match the mask token, handle accordingly
      if (
        !maskTokens[maskPattern[cursorPosition - 1]]?.test(
          inputValue.split("")[cursorPosition - 1]
        )
      ) {
        if (maskTokens[maskPattern[cursorPosition - 1]]) {
          // If the mask expects a token, revert to previous masked value and set cursor
          inputElement.value = currentMaskedValue;
          inputElement.setSelectionRange(
            cursorPosition - 1,
            cursorPosition - 1
          );
          return;
        } else {
          // Skip over non-token mask characters
          const selection = inputElement.selectionStart ?? 0;
          while (
            maskPattern[cursorPosition] &&
            !maskTokens[maskPattern[cursorPosition]]
          ) {
            cursorPosition++;
          }

          // If still not matching, revert and set cursor
          if (
            !maskTokens[maskPattern[cursorPosition]]?.test(
              inputValue.split("")[selection - 1]
            )
          ) {
            inputElement.value = currentMaskedValue;
            inputElement.setSelectionRange(cursorPosition, cursorPosition);
            return;
          } else {
            cursorPosition++;
          }
        }
      }

      // If the character at the cursor position is a placeholder character, enter overwrite mode
      if (inputValue[cursorPosition] == placeholderChar) {
        overwrite = true;
      }

      // Jump over non-token mask characters
      let jump = 0;
      while (
        maskPattern[cursorPosition] &&
        !maskTokens[maskPattern[cursorPosition]]
      ) {
        cursorPosition++;
        jump++;
      }

      if (overwrite) {
        // Overwrite mode: swap and remove characters as needed
        const selection = inputElement.selectionStart ?? 0;
        if (
          maskPattern[selection - 1] &&
          !maskTokens[maskPattern[selection - 1]]
        ) {
          const arr = inputValue.split("");
          [arr[selection - 1], arr[cursorPosition - jump]] = [
            arr[cursorPosition - jump],
            arr[selection - 1],
          ];
          inputValue = arr.join("");
          inputValue =
            inputValue.slice(0, selection - 1) + inputValue.slice(selection);
        } else {
          inputValue =
            inputValue.slice(0, selection) + inputValue.slice(selection + 1);
        }
      } else if (keepCharPositions) {
        // If keeping char positions, ensure the new char matches the mask
        let selection = inputElement.selectionStart ?? 0;
        while (!maskTokens[maskPattern[selection - 1]]) selection++;
        if (
          maskTokens[maskPattern[selection - 1]]?.test(
            inputValue.split("")[selection]
          )
        ) {
          inputElement.value = currentMaskedValue;
          inputElement.setSelectionRange(selection - 1, selection - 1);
          return;
        }
      }
    }
  } else {
    // Guide mode off: no need to handle deletion differently
    if (inputValue.length > prevValue.length) {
      // If the new character doesn't match the mask token, handle accordingly
      if (
        !maskTokens[maskPattern[cursorPosition - 1]]?.test(
          inputValue.split("")[cursorPosition - 1]
        )
      ) {
        if (maskTokens[maskPattern[cursorPosition - 1]]) {
          // If the mask expects a token, revert to previous masked value and set cursor
          inputElement.value = currentMaskedValue;
          inputElement.setSelectionRange(
            cursorPosition - 1,
            cursorPosition - 1
          );
          return;
        } else {
          // Skip over non-token mask characters
          const selection = inputElement.selectionStart ?? 0;
          while (
            maskPattern[cursorPosition] &&
            !maskTokens[maskPattern[cursorPosition]]
          ) {
            cursorPosition++;
          }

          // If still not matching, revert and set cursor
          if (
            !maskTokens[maskPattern[cursorPosition]]?.test(
              inputValue.split("")[selection - 1]
            )
          ) {
            inputElement.value = currentMaskedValue;
            inputElement.setSelectionRange(cursorPosition, cursorPosition);
            return;
          } else {
            cursorPosition++;
          }
        }
      }

      // Jump over non-token mask characters
      while (
        maskPattern[cursorPosition] &&
        !maskTokens[maskPattern[cursorPosition]]
      ) {
        cursorPosition++;
      }
    }
  }

  // Format the new value according to the mask and update state
  const newMaskedValue = formatValue(
    inputValue,
    maskPattern,
    maskTokens,
    guide
  );
  updateMaskedValue(newMaskedValue);

  // Update the input element and cursor position
  inputElement.value = newMaskedValue;
  inputElement.setSelectionRange(cursorPosition, cursorPosition);
  updateValue(newMaskedValue);
};
