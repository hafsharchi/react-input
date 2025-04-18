export function updateField(
  setValue: React.Dispatch<React.SetStateAction<Record<string, unknown>>>,
  name: string,
  newValue: string
): void {
  setValue((prev: Record<string, unknown>) => ({ ...prev, [name]: newValue }));
}
