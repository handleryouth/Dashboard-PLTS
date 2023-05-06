import { MenuItem, MenuItemOptions } from "primereact/menuitem";
import { classNames } from "primereact/utils";

export interface PositionDropdownItemsTemplateProps {
  item: MenuItem;
  options: MenuItemOptions;
  onClickItem: (item: MenuItemOptions) => void;
  iconClassName?: string;
}

export default function PositionDropdownItemsTemplate({
  item,
  options,
  onClickItem,
  iconClassName,
}: PositionDropdownItemsTemplateProps) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={options.className}
      target={item.target}
      onClick={() => onClickItem(options)}
    >
      <span
        className={classNames(
          options.iconClassName,
          iconClassName ?? "pi pi-pencil"
        )}
      ></span>
      <span className={options.labelClassName}>{item.label}</span>
    </a>
  );
}
