"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Habit {
  id: string;
  completed: boolean;
  points: number;
  date: string;
}

const GamificationPanel: React.FC = () => {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  const fetchGamificationData = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('completed, points, date')
      .order('date', { ascending: true });
    if (error) {
      console.error('Error fetching gamification data:', error);
      return;
    }
    const habits = data as Habit[];
    // Calculate total points from completed habits
    const points = habits.reduce((sum, habit) => habit.completed ? sum + habit.points : sum, 0);
    setTotalPoints(points);
    // Compute a simple streak (consecutive days with at least one completed habit)
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    // Assume habits are ordered oldest to newest; count backward from today
    const dates = Array.from(new Set(habits.filter(h => h.completed).map(h => h.date)));
    dates.sort();
    // A simple approach: if last date equals today, then streak = count of consecutive dates
    if (dates.length) {
      let currentDate = new Date(today);
      while (dates.includes(currentDate.toISOString().split('T')[0])) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }
    }
    setCurrentStreak(streak);
  };

  useEffect(() => {
    fetchGamificationData();
  }, []);

  return (
    <div style={{ padding: '1rem', background: '#e0f7fa', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Gamification</h2>
      <p><strong>Total Points:</strong> {totalPoints}</p>
      <p><strong>Current Streak:</strong> {currentStreak} day(s)</p>
    </div>
  );
};

export default GamificationPanel;
