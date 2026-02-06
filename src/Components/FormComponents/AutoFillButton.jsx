import React from 'react';
import { Zap } from 'lucide-react';

const AutoFillButton = ({ onFill, demoData }) => {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onFill(demoData)}
      className="mb-6 flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-all text-sm font-medium"
      title="Fill form with demo data (Dev only)"
    >
      <Zap className="w-4 h-4" />
      Quick Auto-Fill
    </button>
  );
};

export default AutoFillButton;
