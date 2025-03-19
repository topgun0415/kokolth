import React from 'react';

interface AccessCardLineProps {
  width?: string;
  height?: string;
  className?: string;
}

const AccessCardLine: React.FC<AccessCardLineProps> = ({
  width = 'w-full',
  height = 'h-[1px]',
  className = '',
}) => {
  return <div className={`${width} ${height} bg-[#808285] ${className}`} />;
};

export default AccessCardLine;
