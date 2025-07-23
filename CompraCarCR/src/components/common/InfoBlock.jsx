import React from "react";

const InfoBlock = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 border-b py-2">
    {Icon && <Icon className="text-gray-600 w-5 h-5" />} {/* ← Aquí se usa */}
    <span className="font-medium">{label}:</span>
    <span className="ml-auto">{value || "No disponible"}</span>
  </div>
);

export default InfoBlock;