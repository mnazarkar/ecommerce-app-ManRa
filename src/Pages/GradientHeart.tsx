
export const GradientHeartFilled = () => {
  return (
    <div className="w-6 h-6">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" /> {/* violet-500 */}
            <stop offset="100%" stopColor="#d946ef" /> {/* fuchsia-500 */}
          </linearGradient>
        </defs>

        <path
          d="M12 21s-6.716-4.686-9.193-7.163C.64 11.67.64 8.33 2.807 6.163 4.974 3.996 8.314 3.996 10.48 6.163L12 7.683l1.52-1.52c2.166-2.167 5.506-2.167 7.673 0 2.167 2.167 2.167 5.507 0 7.674C18.716 16.314 12 21 12 21z"
          fill="url(#heartGradient)"
        />
      </svg>
    </div>
  );
};

export const GradientHeartOutline = () => {
  return (
    <div className="w-6 h-6">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        <path
          d="M12 21s-6.716-4.686-9.193-7.163C.64 11.67.64 8.33 2.807 6.163 4.974 3.996 8.314 3.996 10.48 6.163L12 7.683l1.52-1.52c2.166-2.167 5.506-2.167 7.673 0 2.167 2.167 2.167 5.507 0 7.674C18.716 16.314 12 21 12 21z"
          fill="none"
          stroke="url(#heartGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};