import GardenView from '../../components/GardenView';
import HabitTracker from '../../components/HabitTracker';
import GamificationPanel from 'components/GamificationPanel';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <GamificationPanel />
      <GardenView />
      <HabitTracker />
    </div>
  );
}
