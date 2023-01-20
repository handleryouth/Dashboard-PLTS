import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, MenuItemOptions } from "primereact/menuitem";
import { classNames } from "primereact/utils";
import { useSidebar } from "../context";

export interface GenerateSidebarChildrenTemplateProps {
  item: MenuItem;
  options: MenuItemOptions;
}

export default function GenerateSidebarChildrenTemplate({
  item,
  options,
}: GenerateSidebarChildrenTemplateProps) {
  const navigate = useNavigate();
  const { toggleDashboardInactive } = useSidebar();

  const handleRedirectPage = useCallback(
    (path: string) => {
      toggleDashboardInactive();
      navigate(path);
    },
    [toggleDashboardInactive, navigate]
  );

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={options.className}
      target={item.target}
      onClick={() => handleRedirectPage(item.url!)}
    >
      <span className={classNames(options.iconClassName)}></span>
      <span className={options.labelClassName}>{item.label}</span>
    </a>
  );
}
