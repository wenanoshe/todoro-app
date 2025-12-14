import "../styles/components/Header.scss";
import Filters from "./Filters";
import { type FilterValue } from "../types";

interface Props {
  selectedFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export default function Header({ selectedFilter, onFilterChange }: Props) {
  return (
    <header className="header">
      <h1 className="header__title">Todoro App</h1>
      <div className="header__filters">
        <Filters
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
        />
      </div>
    </header>
  );
}
