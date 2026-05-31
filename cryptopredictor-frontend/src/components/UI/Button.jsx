import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-crypto-dark';
  
  const variants = {
    primary: 'bg-gradient-to-r from-crypto-green to-emerald-500 hover:from-emerald-500 hover:to-crypto-green text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-crypto-blue to-blue-500 hover:from-blue-500 hover:to-crypto-blue text-white shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-crypto-red to-red-500 hover:from-red-500 hover:to-crypto-red text-white shadow-lg hover:shadow-xl',
    outline: 'border border-crypto-border bg-transparent text-gray-300 hover:border-crypto-green hover:text-white',
    ghost: 'bg-transparent text-gray-300 hover:bg-crypto-darker/50',
    success: 'bg-gradient-to-r from-crypto-green to-teal-500 hover:from-teal-500 hover:to-crypto-green text-white shadow-lg hover:shadow-xl',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-6 py-3 text-lg',
    xlarge: 'px-8 py-4 text-xl',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthStyle}
        ${disabledStyle}
        ${className}
        relative overflow-hidden group
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </>
      )}
    </button>
  );
};

export default Button;