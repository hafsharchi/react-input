type Props = {
  columns: string[];
  data: string[][];
};

export default function Table({ columns, data }: Props) {
  return (
    <div className="my-6 w-full overflow-y-auto rounded-lg border dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
      <table className="w-full">
        <thead className="border-b  last:border-b-0">
          <tr className="border-b last:border-b-0">
            {columns.map((c) => (
              <th className="text-balance text-foreground/30 border-r px-6 py-1 text-left font-mono text-sm dark:bg-zinc-900 font-thin tracking-tight last:border-r-0">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr className="border-b last:border-b-0">
              {row.map((c) => (
                <td className="border-r px-6 py-3 text-sm last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
