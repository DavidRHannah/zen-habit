"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Habit {
  id: string;
  completed: boolean;
  points: number;
  date: string;
}

const GardenView: React.FC = () => {
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const fetchPoints = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('completed, points');
    if (error) {
      console.error('Error fetching points:', error);
      return;
    }
    const habits = data as Habit[];
    const points = habits.reduce((sum, habit) => habit.completed ? sum + habit.points : sum, 0);
    setTotalPoints(points);
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  // Define thresholds (in points) for growth stages.
  const TREE_THRESHOLD = 100; // Points required for one full tree
  const fullTrees = Math.floor(totalPoints / TREE_THRESHOLD);
  const remainder = totalPoints % TREE_THRESHOLD;
  
  // Determine the growth stage of the next tree:
  // If remainder < 50 points: seed, between 50 and 99: sapling, else full tree.
  let nextTreeState = '';
  if (remainder === 0 && totalPoints > 0) {
    nextTreeState = 'full';
  } else if (remainder < 50) {
    nextTreeState = 'seed';
  } else {
    nextTreeState = 'sapling';
  }

  // Represent stages using emojis
  const treeEmoji = '🌳';      // Full tree
  const saplingEmoji = '🌿';   // Sapling
  const seedEmoji = '🌱';      // Seed

  return (
    <div style={{ padding: '1rem', background: '#dcedc8', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>
      <h2>Your Garden</h2>
      <p>Total Points: {totalPoints}</p>
      <div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {Array.from({ length: fullTrees }).map((_, idx) => (
          <span key={idx}>{treeEmoji}</span>
        ))}
        {totalPoints > 0 && remainder > 0 && (
          <span>
            {nextTreeState === 'seed'
              ? seedEmoji
              : nextTreeState === 'sapling'
              ? saplingEmoji
              : treeEmoji}
          </span>
        )}
      </div>
    </div>
  );
};

export default GardenView;
