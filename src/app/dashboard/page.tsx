import GardenView from '../../components/GardenView/GardenView';
import HabitTracker from '../../components/HabitTracker/HabitTracker';
import GamificationPanel from '../../components/GamificationPanel/GamificationPanel';

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
