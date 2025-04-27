export const calendarOnKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  defaultValue: string,
  firstValue: string,
  minValue: number,
  maxValue: number,
  moveNext: boolean = true,
  movePrevious: boolean = true
) => {
  if (e.target instanceof HTMLInputElement)
    e.target.setSelectionRange(defaultValue.length, defaultValue.length);

  if (e.key === "Delete" || e.key === "Backspace") {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      e.target.value = defaultValue;
    }
  } else if (e.key === "ArrowRight" && moveNext) {
    e.preventDefault();
    const nextInput = (e.target as HTMLElement).nextElementSibling
      ?.nextElementSibling as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  } else if (e.key === "ArrowLeft" && movePrevious) {
    e.preventDefault();
    const prevInput = (e.target as HTMLElement).previousElementSibling
      ?.previousElementSibling as HTMLInputElement;
    if (prevInput) {
      prevInput.focus();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      if (e.target.value === defaultValue) {
        e.target.value = firstValue.padStart(defaultValue.length, "0");
      } else {
        const currentValue = parseInt(e.target.value);
        if (!isNaN(currentValue)) {
          let nextValue = currentValue;
          if (nextValue >= maxValue) nextValue = minValue;
          else nextValue++;
          e.target.value = String(nextValue).padStart(defaultValue.length, "0");
        }
      }
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (e.target instanceof HTMLInputElement) {
      if (e.target.value === defaultValue) {
        e.target.value = firstValue.padStart(defaultValue.length, "0");
      } else {
        const currentValue = parseInt(e.target.value);
        if (!isNaN(currentValue)) {
          let nextValue = currentValue;
          if (nextValue <= minValue) nextValue = maxValue;
          else nextValue--;

          e.target.value = String(nextValue).padStart(defaultValue.length, "0");
        }
      }
    }
  }
};
