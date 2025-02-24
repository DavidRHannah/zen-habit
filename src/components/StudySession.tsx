"use client"
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const StudySession: React.FC = () => {
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startSession = () => {
    const start = new Date();
    setStartTime(start);
    setSessionActive(true);
    const id = setInterval(() => {
      setElapsed(Math.floor((new Date().getTime() - start.getTime()) / 1000));
    }, 1000);
    setIntervalId(id);
  };

  const endSession = async () => {
    if (intervalId) clearInterval(intervalId);
    setSessionActive(false);
    const endTime = new Date();
    const pointsEarned = Math.floor(elapsed / 60); // Earn 1 point per minute
    const { error } = await supabase.from('study_sessions').insert([
      {
        user_id: 'user-id-placeholder', // Replace with actual user id
        start_time: startTime?.toISOString(),
        end_time: endTime.toISOString(),
        points_earned: pointsEarned
      }
    ]);
    if (error) {
      console.error('Error saving study session:', error);
    }
    setStartTime(null);
    setElapsed(0);
  };

  return (
    <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Study Session</h2>
      {sessionActive ? (
        <div>
          <p>Session Active: {elapsed} seconds</p>
          <button onClick={endSession}>End Session</button>
        </div>
      ) : (
        <button onClick={startSession}>Start Session</button>
      )}
    </div>
  );
};

export default StudySession;
