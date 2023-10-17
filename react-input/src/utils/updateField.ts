export default function updateField(
  setValue: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  name: string,
  newValue: string
): void {
  setValue((prev: any) => ({ ...prev, [name]: newValue }));
}
