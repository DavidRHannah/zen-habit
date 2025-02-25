import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: '1rem',
        backgroundColor: '#fff',
        borderTop: '1px solid #eaeaea',
        textAlign: 'center',
        marginTop: '2rem'
      }}
    >
      <p>&copy; {new Date().getFullYear()} Zen Habit. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
