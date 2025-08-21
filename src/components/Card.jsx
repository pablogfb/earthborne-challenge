// src/components/Card.jsx
export default function Card({
    awareness,
    spirit,
    fitness,
    focus,
    symbol,
    shuffle,
    size = "normal",
  }) {
    const svgImages = import.meta.glob("/src/assets/images/*.svg", { eager: true });
    const symbolSVG = svgImages[`/src/assets/images/${symbol}.svg`]?.default;
  
    const symbolColor = {
      crest: "bg-[#a60e0e]",
      sun: "bg-[#f3aa27]",
      mountain: "bg-[#1a3163]",
    };
  
    // estilos por tamaño
    const variants = {
      normal: {
        container: "w-64 h-96 text-base",
        grid: "grid-cols-2 grid-rows-2 h-3/4",
        statValue: "text-6xl",
        statLabel: "text-sm",
        symbol: "w-16 h-16",
        shuffle: "w-12 h-12 right-[20px]",
        footer: "h-1/4",
      },
      small: {
        container: "w-24 h-40 text-xs",
        grid: "grid-cols-2 grid-rows-2 h-2/3",
        statValue: "text-xl",
        statLabel: "text-[0.4rem]",
        symbol: "w-6 h-6",
        shuffle: "w-4 h-4 right-1",
        footer: "h-1/3",
      },
    };
  
    const s = variants[size];
  
    const renderStat = (value, label, bg) => (
      <div
        className={`flex flex-col items-center justify-center ${bg} text-[#fcfce9] font-bold ${s.statValue}`}
      >
        {value >= 0 ? `+${value}` : value}
        <p className={s.statLabel}>{label}</p>
      </div>
    );
  
    return (
      <div
        className={`rounded-xl overflow-hidden shadow-lg border-2 border-gray-800 ${s.container}`}
      >
        <div className={`grid ${s.grid}`}>
          {renderStat(awareness, "AWARENESS", "bg-[#1c9248]")}
          {renderStat(spirit, "SPIRIT", "bg-[#f3cf42]")}
          {renderStat(fitness, "FITNESS", "bg-[#d43636]")}
          {renderStat(focus, "FOCUS", "bg-[#426cc7]")}
        </div>
  
        <div
          className={`relative flex items-center justify-center ${symbolColor[symbol]} ${s.footer}`}
        >
          {symbolSVG ? (
            <img src={symbolSVG} alt={symbol} className={s.symbol} />
          ) : (
            <span className="text-yellow-100 text-xs">No SVG</span>
          )}
  
          {shuffle && (
            <img
              src="/src/assets/images/shuffle.svg"
              alt="Shuffle"
              className={`${s.shuffle} absolute top-1/2 -translate-y-1/2`}
            />
          )}
        </div>
      </div>
    );
  }
  
