const p2e = (s: any) =>
  s.replace(/[۰-۹]/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const a2e = (s: any) =>
  s.replace(/[٠-٩]/g, (d: any) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

export const toEnglishNubmer = ({
  ref,
}: {
  ref: React.RefObject<HTMLInputElement>;
}) => {
  if (ref.current) {
    var value = ref.current.value;
    value = p2e(value);
    value = a2e(value);
    ref.current.value = value;
  }
};
