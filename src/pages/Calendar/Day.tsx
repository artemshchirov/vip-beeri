import React from 'react';

interface DayProps {
  children?: React.ReactNode;
  className?: string;
}

const Day = ({ children, className }: DayProps) => {
  return <div className={className}>{children}</div>;
};

export default Day;
