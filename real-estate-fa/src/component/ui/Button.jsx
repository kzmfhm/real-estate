export const Button = ({ onClick, children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',

  };
  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className} cursor-pointer`} {...props}>
      {children}
    </button>
  );
};
