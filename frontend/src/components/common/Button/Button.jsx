import clsx from 'clsx';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses = 'font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary hover:bg-orange-500 text-white',
    secondary: 'bg-secondary hover:bg-gray-700 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      type={type}
      className={clsx(baseClasses, variants[variant], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
