import React from 'react';

interface EllipseProps {
  className: string;
}

const Ellipse: React.FC<EllipseProps> = ({ className }) => {
  return <div className={className}></div>;
};

export default Ellipse;

