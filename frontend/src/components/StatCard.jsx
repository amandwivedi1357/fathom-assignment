import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    marine: 'bg-marine-medium',
  };

  const bgColor = colorClasses[color] || colorClasses.marine;

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center">
        <div className={`mr-4 rounded-full ${bgColor} p-3 text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;