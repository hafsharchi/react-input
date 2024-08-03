type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export const removeFromStateArrayByValue = <T>(setState: SetValue<T[]>, value: T): void => {
  setState((prevArray: T[]) => prevArray.filter((item: T) => item !== value));
};

export const addToStateArrayByValue = <T>(setState: SetValue<T[]>, value: T): void => {
  setState((prevArray: T[]) => {
    if (!prevArray.includes(value)) {
      return [...prevArray, value];
    }
    return prevArray;
  });
};
