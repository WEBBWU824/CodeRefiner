import React from 'react';

export const Button = ({ children, onClick, disabled }: { children: React.ReactNode, onClick: () => void, disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
  >
    {children}
  </button>
);

export const Select = ({ label, value, onChange, options }: { label: string, value: string, onChange: (val: string) => void, options: { label: string, value: string }[] }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-neutral-600">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-neutral-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-neutral-200"
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

export const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-sm font-medium text-neutral-600">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-colors ${checked ? 'bg-black' : 'bg-neutral-200'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  </div>
);
