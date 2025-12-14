import { TODO_FILTERS, FILTER_BUTTONS } from "../consts";
import { type FilterValue } from "../types";
import "../styles/components/Filters.scss";

interface Props {
  selectedFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function Filters({ selectedFilter, onFilterChange }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onFilterChange(e.currentTarget.getAttribute("href")!);
  };

  const filterClassName = (filter: FilterValue) => {
    let className = "filters__btn";
    if (filter === selectedFilter) {
      className += " filters__btn--active";
    }
    return className;
  };

  return (
    <ul className="filters">
      {Object.entries(FILTER_BUTTONS).map(([key, { literal, href }]) => (
        <li key={key}>
          <a
            href={href}
            className={filterClassName(key)}
            onClick={(e) => {
              e.preventDefault();
              onFilterChange(key);
            }}
          >
            {literal}
          </a>
        </li>
      ))}
    </ul>
  );
}
