import { GameConfig, DEFAULT_CONFIG } from './gameEngine';

/**
 * Parses a markdown string to extract game configuration.
 * 
 * Expected format:
 * ```
 * # Game Config
 * 
 * ## Player
 * - color: #C6FF00
 * - glowColor: rgba(198,255,0,0.35)
 * - radius: 12
 * 
 * ## Physics
 * - baseSpeed: 400
 * - gravity: 2500
 * - jumpVelocity: -850
 * - maxJumps: 2
 * 
 * ## Environment
 * - bgColor: #1A1A1A
 * - skylineColor: #252525
 * - groundLineColor: #2F2F2F
 * - obstacleColor: #8A8F98
 * - particleColor: rgba(255,255,255,0.15)
 * 
 * ## UI
 * - scoreLabel: SCORE
 * - bestLabel: BEST
 * ```
 */

const KEY_MAP: Record<string, keyof GameConfig> = {
  'color': 'playerColor',
  'playercolor': 'playerColor',
  'glowcolor': 'playerGlowColor',
  'playerglowcolor': 'playerGlowColor',
  'radius': 'playerRadius',
  'playerradius': 'playerRadius',
  'bgcolor': 'bgColor',
  'skylinecolor': 'skylineColor',
  'groundlinecolor': 'groundLineColor',
  'groundglowcolor': 'groundGlowColor',
  'obstaclecolor': 'obstacleColor',
  'particlecolor': 'particleColor',
  'trailcolor': 'trailColor',
  'basespeed': 'baseSpeed',
  'gravity': 'gravity',
  'jumpvelocity': 'jumpVelocity',
  'maxjumps': 'maxJumps',
  'ambientparticlecount': 'ambientParticleCount',
  'groundypercent': 'groundYPercent',
  'scorelabel': 'scoreLabel',
  'bestlabel': 'bestLabel',
};

const NUMERIC_KEYS: Set<keyof GameConfig> = new Set([
  'playerRadius', 'baseSpeed', 'gravity', 'jumpVelocity',
  'maxJumps', 'ambientParticleCount', 'groundYPercent',
]);

export function parseGameConfig(markdown: string): Partial<GameConfig> {
  const config: Partial<GameConfig> = {};
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^-\s+(\w+)\s*:\s*(.+)$/);
    if (!match) continue;

    const rawKey = match[1].toLowerCase().replace(/[_-]/g, '');
    const value = match[2].trim();
    const configKey = KEY_MAP[rawKey];

    if (!configKey) continue;

    if (NUMERIC_KEYS.has(configKey)) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        (config as any)[configKey] = num;
      }
    } else {
      (config as any)[configKey] = value;
    }
  }

  return config;
}

export function getDefaultConfigMarkdown(): string {
  return `# Game Config

## Player
- color: ${DEFAULT_CONFIG.playerColor}
- glowColor: ${DEFAULT_CONFIG.playerGlowColor}
- radius: ${DEFAULT_CONFIG.playerRadius}

## Physics
- baseSpeed: ${DEFAULT_CONFIG.baseSpeed}
- gravity: ${DEFAULT_CONFIG.gravity}
- jumpVelocity: ${DEFAULT_CONFIG.jumpVelocity}
- maxJumps: ${DEFAULT_CONFIG.maxJumps}

## Environment
- bgColor: ${DEFAULT_CONFIG.bgColor}
- skylineColor: ${DEFAULT_CONFIG.skylineColor}
- groundLineColor: ${DEFAULT_CONFIG.groundLineColor}
- obstacleColor: ${DEFAULT_CONFIG.obstacleColor}
- particleColor: ${DEFAULT_CONFIG.particleColor}
- trailColor: ${DEFAULT_CONFIG.trailColor}

## UI
- scoreLabel: ${DEFAULT_CONFIG.scoreLabel}
- bestLabel: ${DEFAULT_CONFIG.bestLabel}
`;
}
