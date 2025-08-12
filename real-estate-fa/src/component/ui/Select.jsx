
export const Select = ({ children, ...props }) => (
    <select {...props} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
     focus:border-blue-500 transition bg-white">
        {children}
    </select>
);