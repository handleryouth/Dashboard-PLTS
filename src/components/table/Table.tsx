import { useMemo, Fragment } from "react";
import { TableComponentProps } from "types";

export default function Table<T extends Object>({
  data,
  columns,
  renderItem,
  onClickRowItem,
  keyItem,
}: TableComponentProps<T>) {
  const entries = useMemo(() => Object.entries(columns), [columns]);

  const handleRenderHeader = useMemo(
    () => (
      <thead className="bg-gray-200 align-middle ">
        <tr className="text-lg ">
          {entries.map(([key, value]) => (
            <th className="p-2 " key={key}>
              {value}
            </th>
          ))}
        </tr>
      </thead>
    ),
    [entries]
  );

  const handleRenderItem = useMemo(
    () =>
      !data?.length ? (
        <tbody>
          <tr className="">
            <td className="text-center align-middle" colSpan={12}>
              <h3>No data</h3>
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {data?.map((item, index) => (
            <Fragment key={keyItem ? keyItem(item) : index}>
              <tr className="text-base">
                {entries.map(([key]) => (
                  <td
                    className="py-3 align-middle"
                    key={key}
                    onClick={() => onClickRowItem && onClickRowItem(item)}
                  >
                    {renderItem(item)[key as keyof T] ?? "-"}
                  </td>
                ))}
              </tr>
            </Fragment>
          ))}
        </tbody>
      ),
    [data, entries, keyItem, onClickRowItem, renderItem]
  );

  return (
    <table>
      {handleRenderHeader}
      {handleRenderItem}
    </table>
  );
}
