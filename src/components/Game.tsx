import { useRef, useEffect, useState, useCallback } from "react";
import { GameEngine, GameState, DEFAULT_CONFIG } from "@/lib/gameEngine";
import { parseGameConfig, getDefaultConfigMarkdown } from "@/lib/gameConfigParser";

interface GameProps {
  configMarkdown?: string;
}

const Game = ({ configMarkdown }: GameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [showCms, setShowCms] = useState(false);
  const [cmsText, setCmsText] = useState(configMarkdown || getDefaultConfigMarkdown());

  const parsedConfig = configMarkdown ? parseGameConfig(configMarkdown) : {};

  // Init engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const config = parseGameConfig(cmsText);

    const engine = new GameEngine({
      canvas: canvasRef.current,
      onScoreUpdate: setScore,
      onStateChange: setGameState,
      onBestScore: setBestScore,
      config,
    });
    engineRef.current = engine;

    return () => engine.destroy();
  }, []);

  // Update config when CMS text changes
  useEffect(() => {
    if (!engineRef.current) return;
    const config = parseGameConfig(cmsText);
    engineRef.current.updateConfig(config);
  }, [cmsText]);

  const handleJump = useCallback(() => {
    engineRef.current?.jump();
  }, []);

  const handleRestart = useCallback(() => {
    engineRef.current?.start();
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'gameover') handleRestart();
        else handleJump();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, handleJump, handleRestart]);

  const pad = (n: number) => String(n).padStart(5, '0');

  const cfg = { ...DEFAULT_CONFIG, ...parseGameConfig(cmsText) };

  return (
    <div className="w-full mt-16 mb-8">
      {/* CMS Toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-primary uppercase tracking-widest">// Game</span>
        <button
          onClick={() => setShowCms(!showCms)}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border border-border px-3 py-1 hover:border-primary"
        >
          {showCms ? 'Hide Config' : 'Edit Config'}
        </button>
      </div>

      {/* CMS Editor */}
      {showCms && (
        <div className="mb-4 border border-border bg-card p-4">
          <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
            Game Configuration (Markdown)
          </label>
          <textarea
            value={cmsText}
            onChange={(e) => setCmsText(e.target.value)}
            className="w-full h-64 bg-background text-foreground font-mono text-xs p-3 border border-border resize-y focus:outline-none focus:border-primary transition-colors"
            spellCheck={false}
          />
          <p className="font-mono text-xs text-muted-foreground mt-2">
            Edit values above to change game behavior in real-time. Changes apply instantly.
          </p>
        </div>
      )}

      {/* Game Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[300px] sm:h-[400px] cursor-pointer select-none"
        style={{ touchAction: 'none' }}
        onMouseDown={gameState === 'gameover' ? undefined : handleJump}
        onTouchStart={gameState === 'gameover' ? undefined : (e) => { e.preventDefault(); handleJump(); }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Idle overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full animate-pulse border"
              style={{
                color: cfg.playerColor,
                backgroundColor: `${cfg.bgColor}cc`,
                borderColor: `${cfg.playerColor}4d`,
                backdropFilter: 'blur(8px)',
              }}
            >
              Click / Space to Jump
            </div>
          </div>
        )}

        {/* Game over overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleRestart}
              className="font-mono text-sm uppercase tracking-widest px-8 py-3 bg-transparent border transition-all duration-200"
              style={{
                color: cfg.playerColor,
                borderColor: cfg.playerColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${cfg.playerColor}1a`;
                e.currentTarget.style.boxShadow = `0 0 20px ${cfg.playerGlowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Restart
            </button>
          </div>
        )}
      </div>

      {/* Score bar */}
      <div className="flex justify-end gap-8 mt-3">
        <div className="text-right">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
            {cfg.scoreLabel}
          </span>
          <span className="font-mono text-xl text-foreground">{pad(score)}</span>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
            {cfg.bestLabel}
          </span>
          <span
            className="font-mono text-xl"
            style={{ color: cfg.playerColor, filter: 'drop-shadow(0 0 6px rgba(198,255,0,0.4))' }}
          >
            {pad(bestScore)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Game;
