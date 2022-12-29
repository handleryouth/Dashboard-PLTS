import { useNavigate } from "react-router-dom";
import { SidebarChildrenProps } from "types";

export default function SidebarChildren({
  headerTitle,
  linkPath,
}: SidebarChildrenProps) {
  const navigate = useNavigate();
  return (
    <div className="my-8">
      <h3 className="text-gray-500 font-bold mb-4">{headerTitle}</h3>
      <ul>
        {linkPath.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            className="text-xl font-semibold my-4"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
