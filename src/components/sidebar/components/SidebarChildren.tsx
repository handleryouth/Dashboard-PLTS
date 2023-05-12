import { PanelMenu } from "primereact/panelmenu";
import { SidebarChildrenProps } from "types";

export default function SidebarChildren({ groupLinks }: SidebarChildrenProps) {
  return (
    <div className="my-8">
      {groupLinks && (
        <PanelMenu className="prose prose-a:no-underline " model={groupLinks} />
      )}
    </div>
  );
}
