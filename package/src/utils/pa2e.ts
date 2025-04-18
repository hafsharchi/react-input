const p2e = (s: string) =>
  s.replace(/[۰-۹]/g, (d: string) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
const a2e = (s: string) =>
  s.replace(/[٠-٩]/g, (d: string) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

export const toEnglishNubmer = ({
  ref,
}: {
  ref: React.RefObject<HTMLInputElement>;
}) => {
  if (ref.current) {
    let value = ref.current.value;
    value = p2e(value);
    value = a2e(value);
    ref.current.value = value;
  }
};
