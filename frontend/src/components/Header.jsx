import styles from './Header.module.css';

function Header({ totalBudget }) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Vacation Flow Planner</div>
      <div className={styles.budgetSummary}>
        Total Budget: <span>${totalBudget.toLocaleString()}</span>
      </div>
    </header>
  );
}

export default Header;