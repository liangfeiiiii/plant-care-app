import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, PlusCircle, BookOpen, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'var(--color-surface)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px 0',
    paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
    boxShadow: '0 -4px 12px rgba(45, 42, 38, 0.04)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    zIndex: 100,
  };

  const navItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
    transition: 'color 0.2s',
  });

  const textStyle: React.CSSProperties = {
    fontSize: '12px',
    marginTop: '6px',
    fontWeight: 600,
  };

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={({ isActive }) => navItemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <Leaf size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={textStyle}>花园</span>
          </>
        )}
      </NavLink>
      <NavLink to="/add" style={({ isActive }) => navItemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <PlusCircle size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={textStyle}>添加</span>
          </>
        )}
      </NavLink>
      <NavLink to="/encyclopedia" style={({ isActive }) => navItemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <BookOpen size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={textStyle}>百科</span>
          </>
        )}
      </NavLink>
      <NavLink to="/eden" style={({ isActive }) => navItemStyle(isActive)}>
        {({ isActive }) => (
          <>
            <Sparkles size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={textStyle}>伊甸园</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};
