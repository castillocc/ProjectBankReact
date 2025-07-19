import React from "react";

export default function Stepper({ steps = [], currentStep = 1 }) {
  return (
    <div className="flex justify-between items-center mb-6 px-2 relative">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        return (
          <div key={label} className="flex-1 flex flex-col items-center relative">
            {/* Línea a la derecha, menos invasiva */}
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-px bg-gray-200 z-0"></div>
            )}

            {/* Círculo del paso */}
            <div
              className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${isCompleted
                  ? "bg-indigo-600 text-white"
                  : isActive
                    ? "border-2 border-indigo-600 text-indigo-600"
                    : "border border-gray-300 text-gray-400"
                }`}
            >
              {isCompleted ? "✓" : stepNum}
            </div>

            {/* Etiqueta */}
            <span className={`text-xs mt-1 text-center ${isActive ? "text-indigo-600 font-medium" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
