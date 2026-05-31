import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  variant = 'default',
  hover = false,
  className = '',
  headerAction,
  ...props
}) => {
  const baseStyles = 'rounded-xl border transition-all duration-300';
  
  const variants = {
    default: 'bg-crypto-darker border-crypto-border',
    elevated: 'bg-crypto-darker border-crypto-border shadow-lg',
    glass: 'glass-effect backdrop-blur-lg',
    gradient: 'bg-gradient-to-br from-crypto-darker to-crypto-darker/80 border-crypto-border',
  };
  
  const hoverStyle = hover ? 'hover:scale-[1.02] hover:shadow-2xl hover:border-crypto-green/30' : '';
  
  return (
    <div 
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${hoverStyle}
        ${className}
      `}
      {...props}
    >
      {(title || headerAction) && (
        <div className="p-6 border-b border-crypto-border">
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-xl font-bold gradient-text">{title}</h3>}
              {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
            </div>
            {headerAction && (
              <div>{headerAction}</div>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-crypto-border ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-crypto-border ${className}`}>
    {children}
  </div>
);

export default Card;