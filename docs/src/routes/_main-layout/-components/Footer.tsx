type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="h-16 border-t border-subtext/10 mt-5 text-subtext">
      <div className="w-3/4 mx-auto py-6  opacity-60">
        Built by <span className="underline text-white/50">Hosein Afsharchi</span>. Source code is avalible in <span className="underline text-white/50">github</span>
      </div>
    </div>
  );
}
