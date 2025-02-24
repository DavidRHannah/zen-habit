import React from 'react';

interface HabitItemProps {
  id: string;
  task: string;
  completed: boolean;
  toggleHabit: (id: string, currentStatus: boolean) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ id, task, completed, toggleHabit }) => {
  return (
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleHabit(id, completed)}
        style={{ marginRight: '0.5rem' }}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{task}</span>
    </li>
  );
};

export default HabitItem;
