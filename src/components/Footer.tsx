import "../styles/components/Footer.scss";

interface Props {
  completedCount: number;
  totalCount: number;
  onRemoveAllCompleted: () => void;
}

export default function Footer({
  completedCount,
  totalCount,
  onRemoveAllCompleted,
}: Props) {
  return (
    <footer className="footer">
      <button
        className="footer__btn"
        disabled={completedCount === 0}
        onClick={onRemoveAllCompleted}
      >
        Remove all completed
      </button>

      <p>
        {completedCount} of {totalCount} completed
      </p>
    </footer>
  );
}
