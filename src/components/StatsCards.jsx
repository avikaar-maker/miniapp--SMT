import { ListTodo, Clock, Loader, CheckCircle2, TrendingUp } from 'lucide-react';

function StatsCards({ stats, loading }) {
  if (loading) {
    return (
      <div className="stats-grid">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="stat-card stat-card--skeleton" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: 'Total Tasks', value: stats?.totalTasks ?? 0, icon: ListTodo, color: 'blue' },
    { label: 'Pending', value: stats?.pendingTasks ?? 0, icon: Clock, color: 'amber' },
    { label: 'In Progress', value: stats?.inProgressTasks ?? 0, icon: Loader, color: 'purple' },
    { label: 'Completed', value: stats?.completedTasks ?? 0, icon: CheckCircle2, color: 'green' },
    { label: 'Completion Rate', value: `${stats?.completionRate ?? 0}%`, icon: TrendingUp, color: 'teal' },
  ];

  return (
    <div className="stats-grid">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className={`stat-card stat-card--${color}`}>
          <div className="stat-card__icon">
            <Icon size={22} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{value}</span>
            <span className="stat-card__label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
