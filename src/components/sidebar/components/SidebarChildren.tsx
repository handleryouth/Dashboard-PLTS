import { PanelMenu } from "primereact/panelmenu";
import { SidebarChildrenProps } from "types";

export default function SidebarChildren({ groupLinks }: SidebarChildrenProps) {
  return (
    <div className="my-8">
      <PanelMenu className="prose prose-a:no-underline " model={groupLinks} />
    </div>
  );
}
