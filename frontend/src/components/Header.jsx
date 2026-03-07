function Header({ totalBudget }) {
  return (
    <header>
      <h1>Vacation Flow Planner</h1>
      <div className="budget-summary">
        Total Budget: <span>${totalBudget.toLocaleString()}</span>
      </div>
    </header>
  );
}

export default Header;