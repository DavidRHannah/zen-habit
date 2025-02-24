import HabitTracker from '../../components/HabitTracker';
import StudySession from '../../components/StudySession';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <StudySession />
      <HabitTracker />
    </div>
  );
}
