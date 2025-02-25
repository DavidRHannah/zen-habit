"use client"
import React, { useState } from 'react';

const SubscriptionButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: 'user-id-placeholder' }) // Replace with actual user id
      });
      const { sessionId } = await res.json();
      window.location.href = sessionId
        ? `https://checkout.stripe.com/pay/${sessionId}`
        : '/subscription';
    } catch (err) {
      console.error('Subscription error:', err);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSubscribe} disabled={loading} style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
      {loading ? 'Processing...' : 'Subscribe Now'}
    </button>
  );
};

export default SubscriptionButton;
