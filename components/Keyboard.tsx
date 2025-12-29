
import React from 'react';

interface KeyboardProps {
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onNoteOn, onNoteOff }) => {
  // 10 white keys range (C4 to E5)
  const whiteKeys = [
    { n: 'C4', l: 'C' }, { n: 'D4', l: 'D' }, { n: 'E4', l: 'E' },
    { n: 'F4', l: 'F' }, { n: 'G4', l: 'G' }, { n: 'A4', l: 'A' }, { n: 'B4', l: 'B' },
    { n: 'C5', l: 'C' }, { n: 'D5', l: 'D' }, { n: 'E5', l: 'E' }
  ];

  const blackKeys = [
    { n: 'C#4', pos: 0.5 }, { n: 'D#4', pos: 1.5 },
    { n: 'F#4', pos: 3.5 }, { n: 'G#4', pos: 4.5 }, { n: 'A#4', pos: 5.5 },
    { n: 'C#5', pos: 7.5 }, { n: 'D#5', pos: 8.5 }
  ];

  const handleInteraction = (note: string, active: boolean) => {
    if (active) onNoteOn(note);
    else onNoteOff(note);
  };

  return (
    <div className="flex flex-col gap-0.5 md:gap-1 w-full max-w-4xl mx-auto px-1 md:px-2 select-none touch-none mb-1">
      {/* Black Keys Row - Increased mobile height from h-10 to h-14 */}
      <div className="relative h-14 md:h-20 w-full mb-0.5">
        {blackKeys.map((key) => (
          <div
            key={key.n}
            className="absolute top-0 flex items-center justify-center p-0.5 md:p-1"
            style={{
              left: `${(key.pos / whiteKeys.length) * 100}%`,
              width: `${(1 / whiteKeys.length) * 100}%`,
              height: '100%'
            }}
          >
            {/* Square Base Slot */}
            <div className="w-full h-full bg-zinc-300/40 rounded-lg md:rounded-xl border border-zinc-400/20 flex items-center justify-center shadow-inner">
              <button
                onMouseDown={() => handleInteraction(key.n, true)}
                onMouseUp={() => handleInteraction(key.n, false)}
                onMouseLeave={() => handleInteraction(key.n, false)}
                onTouchStart={(e) => { e.preventDefault(); handleInteraction(key.n, true); }}
                onTouchEnd={(e) => { e.preventDefault(); handleInteraction(key.n, false); }}
                className="w-8 h-8 md:w-14 md:h-14 bg-zinc-800 rounded-full shadow-lg border-b-2 md:border-b-4 border-black active:translate-y-0.5 md:active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center"
              />
            </div>
          </div>
        ))}
      </div>

      {/* White Keys Row - Increased mobile height from h-24 to h-36 */}
      <div className="flex h-36 md:h-52 w-full gap-0.5 md:gap-1">
        {whiteKeys.map((key) => (
          <div key={key.n} className="flex-1 p-0.5 md:p-1">
            {/* Rectangular Base Slot */}
            <div className="w-full h-full bg-zinc-300/40 rounded-xl md:rounded-2xl border border-zinc-400/20 p-0.5 md:p-1 flex items-center justify-center shadow-inner">
              <button
                onMouseDown={() => handleInteraction(key.n, true)}
                onMouseUp={() => handleInteraction(key.n, false)}
                onMouseLeave={() => handleInteraction(key.n, false)}
                onTouchStart={(e) => { e.preventDefault(); handleInteraction(key.n, true); }}
                onTouchEnd={(e) => { e.preventDefault(); handleInteraction(key.n, false); }}
                className="w-full h-full bg-white rounded-full border-b-4 md:border-b-8 border-zinc-300 shadow-md flex items-end justify-center pb-3 md:pb-6 active:translate-y-0.5 md:active:translate-y-1 active:border-b-2 md:active:border-b-4 transition-all"
              >
                <span className="text-[8px] md:text-sm font-black text-zinc-300 font-mono tracking-tighter uppercase">
                  {key.l}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
