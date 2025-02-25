"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import HabitItem from '../HabitItem/HabitItem';

interface Habit {
  id: string;
  user_id: string;
  date: string;
  task: string;
  completed: boolean;
  points: number;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const fetchHabits = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      console.error('Error fetching habits:', error);
    } else {
      setHabits(data as Habit[]);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async () => {
    if (!newTask) return;
    const { error } = await supabase.from('habits').insert([
      {
        user_id: 'user-id-placeholder', // Replace with actual user id from auth
        date: new Date().toISOString().split('T')[0],
        task: newTask,
        completed: false,
        points: 10  // Award 10 points per habit added
      }
    ]);
    if (error) {
      console.error('Error adding habit:', error);
    } else {
      setNewTask('');
      fetchHabits();
    }
  };

  const toggleHabit = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('habits')
      .update({ completed: !currentStatus })
      .eq('id', id);
    if (error) {
      console.error('Error updating habit:', error);
    } else {
      fetchHabits();
    }
  };

  return (
    <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Habit Tracker</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter new habit"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            id={habit.id}
            task={habit.task}
            completed={habit.completed}
            toggleHabit={toggleHabit}
          />
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
