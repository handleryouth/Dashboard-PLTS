import { Link } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import { SidebarChildrenProps } from "types";

export default function SidebarChildren({
  headerTitle,
  groupLinks,
  individualLinks,
}: SidebarChildrenProps) {
  return (
    <div className="my-8">
      {groupLinks && (
        <PanelMenu className="prose prose-a:no-underline " model={groupLinks} />
      )}

      {individualLinks && (
        <Link
          className=" w-full block hover:bg-slate-200 p-4 rounded-md font-semibold no-underline text-base"
          to={individualLinks.path}
        >
          {individualLinks.name}
        </Link>
      )}
    </div>
  );
}
