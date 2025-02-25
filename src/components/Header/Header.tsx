"use client";

import React from 'react';
import Image from 'next/image';
import { useTheme } from '../../app/context/ThemeContext';

import plantIcon from '/public/plant-icon.svg';
import moonIcon from '/public/moon-icon.svg';
import sunIcon from '/public/sun-icon.png';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Left icon (plant) */}
        <button className="button home-button">
          <Image
            src={plantIcon}
            alt="Plant icon"
            className="plant-icon"
          />
        </button>

        {/* Center text */}
        <h1 className="header-title">Zen Habit</h1>

        {/* Right icon (theme toggle) */}
        <button className="button theme-toggle-button" onClick={toggleTheme}>
          {isDark ? (
            <Image
              src={sunIcon}
              alt="Toggle Theme to Light"
              className="toggle-icon toggle-icon-light"
            />
          ) : (
            <Image
              src={moonIcon}
              alt="Toggle Theme to Dark"
              className="toggle-icon toggle-icon-dark"
            />
          )
        }
        </button>
      </div>
    </header>
  );
}
