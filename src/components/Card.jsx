// src/components/Card.jsx
export default function Card({ awareness, spirit, fitness, focus, symbol, shuffle, size = "normal"}) {
    const isSmall = size === "small"

    const svgImages = import.meta.glob('/src/assets/images/*.svg', { eager: true });
    const symbolSVG = svgImages[`/src/assets/images/${symbol}.svg`]?.default;

    const symbolColor = {
        crest: 'bg-[#a60e0e]',
        sun: 'bg-[#f3aa27]',
        mountain: 'bg-[#1a3163]',
    }

    return (
        <div
          className={`rounded-xl overflow-hidden shadow-lg border-2 border-gray-800 
            ${isSmall ? "w-24 h-40 text-xs" : "w-64 h-96 text-base"}`}
        >
          {/* Stats */}
          <div className={`${isSmall ? "grid-cols-2 grid-rows-2 h-2/3" : "grid-cols-2 grid-rows-2 h-3/4"} grid`}>
            <div className={`flex flex-col items-center justify-center bg-[#1c9248] text-[#fcfce9] font-bold ${isSmall ? "text-xl" : "text-6xl"}`}>
              {awareness >= 0 ? `+${awareness}` : awareness}
              <p className={`${isSmall ? "text-[0.4rem]" : "text-sm"}`}>AWARENESS</p>
            </div>
            <div className={`flex flex-col items-center justify-center bg-[#f3cf42] text-[#fcfce9] font-bold ${isSmall ? "text-xl" : "text-6xl"}`}>
              {spirit >= 0 ? `+${spirit}` : spirit}
              <p className={`${isSmall ? "text-[0.4rem]" : "text-sm"}`}>SPIRIT</p>
            </div>
            <div className={`flex flex-col items-center justify-center bg-[#d43636] text-[#fcfce9] font-bold ${isSmall ? "text-xl" : "text-6xl"}`}>
              {fitness >= 0 ? `+${fitness}` : fitness}
              <p className={`${isSmall ? "text-[0.4rem]" : "text-sm"}`}>FITNESS</p>
            </div>
            <div className={`flex flex-col items-center justify-center bg-[#426cc7] text-[#fcfce9] font-bold ${isSmall ? "text-xl" : "text-6xl"}`}>
              {focus >= 0 ? `+${focus}` : focus}
              <p className={`${isSmall ? "text-[0.4rem]" : "text-sm"}`}>FOCUS</p>
            </div>
          </div>
    
          {/* Footer */}
          <div className={`relative flex items-center justify-center ${symbolColor[symbol]} ${isSmall ? "h-1/3" : "h-1/4"}`}>
            {symbolSVG ? (
              <img src={symbolSVG} alt={symbol} className={`${isSmall ? "w-6 h-6" : "w-16 h-16"}`} />
            ) : (
              <span className={`${isSmall ? "text-yellow-100 text-xs" : "text-yellow-100 text-lg"}`}>No SVG</span>
            )}
    
            {shuffle && (
              <img
                src="/src/assets/images/shuffle.svg"
                alt="Shuffle"
                className={`${isSmall ? "w-4 h-4 right-1" : "w-12 h-12 right-[20px]"} absolute top-1/2 -translate-y-1/2`}
              />
            )}
          </div>
        </div>
      )
    }
    
