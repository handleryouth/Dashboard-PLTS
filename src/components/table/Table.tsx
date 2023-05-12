import { useMemo, Fragment } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { TableComponentProps } from "types";

export default function Table<T extends Object>({
  data,
  columns,
  renderItem,
  onClickRowItem,
  keyItem,
  excludeOnClickRowItem,
  loading,
}: TableComponentProps<T>) {
  const entries = useMemo(() => Object.entries(columns), [columns]);

  const handleRenderHeader = useMemo(
    () => (
      <thead className="bg-gray-200 ">
        <tr className="text-lg ">
          {entries.map(([key, value]) => (
            <th className="table-padding  align-middle" key={key}>
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
              <tr className="text-base  hover:bg-slate-200">
                {entries.map(([key]) => {
                  const checkExclude =
                    excludeOnClickRowItem &&
                    (excludeOnClickRowItem[key as unknown as keyof T] ?? true);

                  return (
                    <td
                      className={`py-3 table-padding 
                      align-middle  ${
                        checkExclude ? "cursor-pointer" : "cursor-default"
                      }`}
                      key={key}
                      onClick={() =>
                        checkExclude && onClickRowItem && onClickRowItem(item)
                      }
                    >
                      {renderItem(item)[key as keyof T] ?? "-"}
                    </td>
                  );
                })}
              </tr>
            </Fragment>
          ))}
        </tbody>
      ),
    [data, entries, excludeOnClickRowItem, keyItem, onClickRowItem, renderItem]
  );

  return (
    <div className="overflow-x-scroll w-full">
      {loading ? (
        <ProgressSpinner className="w-14 h-14" />
      ) : (
        <table className="min-w-[960px] prose rounded-md overflow-hidden table-fixed">
          {handleRenderHeader}
          {handleRenderItem}
        </table>
      )}
    </div>
  );
}
