import React from "react";

const InfoBlock = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-4 shadow-sm">
      {Icon && <Icon className="text-purple-600 text-xl" />}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default InfoBlock;
