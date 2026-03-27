function Header({ totalBudget }) {
  return (
    <header>
      <div className="header-title">Vacation Flow Planner</div>
      <div className="budget-summary">
        Total Budget: <span>${totalBudget.toLocaleString()}</span>
      </div>
    </header>
  );
}

export default Header;