import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#fff', borderBottom: '1px solid #eaeaea' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Study Tool</h1>
        <div>
          <Link href="/"><span style={{ marginRight: '1rem' }}>Home</span></Link>
          <Link href="/dashboard"><span style={{ marginRight: '1rem' }}>Dashboard</span></Link>
          <Link href="/subscription"><span>Subscribe</span></Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
