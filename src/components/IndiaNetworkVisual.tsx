import React, { useEffect, useRef, useState } from 'react';
import IndiaMap from '@svg-maps/india';

interface IndiaNetworkVisualProps {
  className?: string;
}

interface StateNode {
  id: string;
  name: string;
  x: number;
  y: number;
  isHub?: boolean;
  radius: number;
  appearTime: number; // millisecond in the cycle when this dot appears
}

interface ConnectionLine {
  from: string;
  to: string;
  isPrimaryFromHub?: boolean;
  startTime: number; // when the line starts drawing from -> to
  duration: number; // line drawing duration in ms
}

interface PhotonParticle {
  fromNode: StateNode;
  toNode: StateNode;
  connStartTime: number;
  connDuration: number;
  offset: number;
  speed: number;
}

export const IndiaNetworkVisual: React.FC<IndiaNetworkVisualProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animTime, setAnimTime] = useState<number>(0);

  // Exact coordinates matching the 612 x 696 SVG coordinate space of IndiaMap
  // Centered on each state geometry, with UP Hub set to Western UP / Hathras manufacturing center
  const nodes: StateNode[] = [
    // 0: Origin Central Factory Hub: Uttar Pradesh (Hathras / West UP)
    { id: 'up', name: 'Uttar Pradesh', x: 232, y: 238, isHub: true, radius: 7, appearTime: 150 },

    // Initial Neighboring & Core Regional States
    { id: 'dl', name: 'Delhi', x: 186, y: 210, radius: 4.5, appearTime: 500 },
    { id: 'hr', name: 'Haryana', x: 164, y: 195, radius: 4.5, appearTime: 650 },
    { id: 'ut', name: 'Uttarakhand', x: 232, y: 175, radius: 4.5, appearTime: 750 },
    { id: 'rj', name: 'Rajasthan', x: 119, y: 257, radius: 5, appearTime: 900 },
    { id: 'mp', name: 'Madhya Pradesh', x: 214, y: 319, radius: 5.5, appearTime: 1050 },
    { id: 'br', name: 'Bihar', x: 369, y: 275, radius: 5, appearTime: 1200 },
    { id: 'mh', name: 'Maharashtra', x: 180, y: 435, radius: 5.5, appearTime: 1400 },
    { id: 'tg', name: 'Telangana', x: 237, y: 457, radius: 5, appearTime: 1550 },
    { id: 'wb', name: 'West Bengal', x: 412, y: 310, radius: 5, appearTime: 1700 },

    // Secondary & Distant States across India
    { id: 'pb', name: 'Punjab', x: 151, y: 152, radius: 4.5, appearTime: 1850 },
    { id: 'hp', name: 'Himachal Pradesh', x: 191, y: 133, radius: 4.5, appearTime: 2000 },
    { id: 'jk', name: 'Jammu and Kashmir', x: 173, y: 61, radius: 5, appearTime: 2150 },
    { id: 'gj', name: 'Gujarat', x: 66, y: 355, radius: 5.5, appearTime: 2300 },
    { id: 'jh', name: 'Jharkhand', x: 366, y: 327, radius: 4.5, appearTime: 2450 },
    { id: 'ct', name: 'Chhattisgarh', x: 296, y: 388, radius: 5, appearTime: 2600 },
    { id: 'or', name: 'Odisha', x: 340, y: 405, radius: 5, appearTime: 2750 },
    { id: 'ap', name: 'Andhra Pradesh', x: 263, y: 500, radius: 5, appearTime: 2900 },
    { id: 'ka', name: 'Karnataka', x: 171, y: 519, radius: 5.5, appearTime: 3050 },
    { id: 'ga', name: 'Goa', x: 122, y: 512, radius: 4, appearTime: 3200 },
    { id: 'tn', name: 'Tamil Nadu', x: 211, y: 609, radius: 5.5, appearTime: 3350 },
    { id: 'kl', name: 'Kerala', x: 166, y: 615, radius: 5, appearTime: 3500 },
    { id: 'sk', name: 'Sikkim', x: 425, y: 235, radius: 4, appearTime: 3650 },
    { id: 'as', name: 'Assam', x: 516, y: 271, radius: 5, appearTime: 3800 },
    { id: 'ml', name: 'Meghalaya', x: 484, y: 283, radius: 4, appearTime: 3950 },
    { id: 'ar', name: 'Arunachal Pradesh', x: 550, y: 224, radius: 4.5, appearTime: 4100 },
    { id: 'nl', name: 'Nagaland', x: 546, y: 270, radius: 4, appearTime: 4250 },
    { id: 'mn', name: 'Manipur', x: 537, y: 301, radius: 4, appearTime: 4350 },
    { id: 'mz', name: 'Mizoram', x: 516, y: 337, radius: 4, appearTime: 4450 },
    { id: 'tr', name: 'Tripura', x: 493, y: 325, radius: 4, appearTime: 4550 },
  ];

  const nodeMap = new Map<string, StateNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Connection sequences:
  // Step A: Lines originate from UP to primary state nodes
  // Step B: Secondary lines branch from those states to cover all Indian states
  const connections: ConnectionLine[] = [
    // 1. Direct Lines Radiating from UP Factory Hub
    { from: 'up', to: 'dl', isPrimaryFromHub: true, startTime: 1200, duration: 600 },
    { from: 'up', to: 'hr', isPrimaryFromHub: true, startTime: 1300, duration: 600 },
    { from: 'up', to: 'ut', isPrimaryFromHub: true, startTime: 1350, duration: 600 },
    { from: 'up', to: 'rj', isPrimaryFromHub: true, startTime: 1450, duration: 700 },
    { from: 'up', to: 'mp', isPrimaryFromHub: true, startTime: 1550, duration: 750 },
    { from: 'up', to: 'br', isPrimaryFromHub: true, startTime: 1650, duration: 750 },
    { from: 'up', to: 'wb', isPrimaryFromHub: true, startTime: 1800, duration: 850 },
    { from: 'up', to: 'mh', isPrimaryFromHub: true, startTime: 1900, duration: 850 },
    { from: 'up', to: 'tg', isPrimaryFromHub: true, startTime: 2000, duration: 900 },

    // 2. Northern Expansion
    { from: 'hr', to: 'pb', startTime: 2300, duration: 550 },
    { from: 'pb', to: 'hp', startTime: 2500, duration: 550 },
    { from: 'hp', to: 'jk', startTime: 2700, duration: 650 },

    // 3. Western Expansion
    { from: 'rj', to: 'gj', startTime: 2500, duration: 650 },
    { from: 'gj', to: 'mh', startTime: 2800, duration: 600 },
    { from: 'mh', to: 'ga', startTime: 3400, duration: 550 },

    // 4. Central & Eastern Expansion
    { from: 'br', to: 'jh', startTime: 2700, duration: 550 },
    { from: 'jh', to: 'ct', startTime: 2900, duration: 600 },
    { from: 'ct', to: 'or', startTime: 3100, duration: 600 },
    { from: 'wb', to: 'or', startTime: 3200, duration: 600 },

    // 5. Southern Expansion
    { from: 'tg', to: 'ap', startTime: 3150, duration: 600 },
    { from: 'mh', to: 'ka', startTime: 3300, duration: 650 },
    { from: 'ka', to: 'ap', startTime: 3500, duration: 600 },
    { from: 'ka', to: 'tn', startTime: 3650, duration: 650 },
    { from: 'ka', to: 'kl', startTime: 3750, duration: 650 },
    { from: 'tn', to: 'kl', startTime: 3900, duration: 550 },

    // 6. North-Eastern Expansion
    { from: 'wb', to: 'sk', startTime: 3800, duration: 550 },
    { from: 'wb', to: 'as', startTime: 4000, duration: 700 },
    { from: 'as', to: 'ml', startTime: 4200, duration: 500 },
    { from: 'as', to: 'ar', startTime: 4350, duration: 600 },
    { from: 'as', to: 'nl', startTime: 4500, duration: 500 },
    { from: 'nl', to: 'mn', startTime: 4650, duration: 450 },
    { from: 'mn', to: 'mz', startTime: 4800, duration: 450 },
    { from: 'mz', to: 'tr', startTime: 4950, duration: 450 },
  ];

  // Photons moving across active connection lines
  const photonsRef = useRef<PhotonParticle[]>([]);

  useEffect(() => {
    const list: PhotonParticle[] = [];
    connections.forEach((conn) => {
      const fromN = nodeMap.get(conn.from);
      const toN = nodeMap.get(conn.to);
      if (fromN && toN) {
        list.push({
          fromNode: fromN,
          toNode: toN,
          connStartTime: conn.startTime,
          connDuration: conn.duration,
          offset: Math.random(),
          speed: 0.003 + Math.random() * 0.003,
        });
      }
    });
    photonsRef.current = list;
  }, []);

  // Total animation cycle duration before looping
  const CYCLE_DURATION = 9000; // 9 seconds

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) % CYCLE_DURATION;
      setAnimTime(elapsed);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const upHubNode = nodes[0];

  // Signature Palette: Deep Oxblood & Soft Charcoal landmass with Champagne Beige / Warm Ivory boundaries
  const mapFill = '#292321';
  const mapStroke = '#F3E7DA';
  const mapStrokeWidth = '0.75';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 612 696"
        className="w-full h-full max-h-[580px] object-contain drop-shadow-xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="india-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="16"
              floodColor="rgba(41, 35, 33, 0.28)"
            />
          </filter>

          <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="grad-up-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E7DA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D8BFA8" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="grad-interstate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D8BFA8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B8B8B3" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <g id="india-accurate-state-regions" filter="url(#india-shadow)">
          {IndiaMap.locations.map((loc) => {
            const isUP = loc.id === 'up';
            const stateFill = isUP ? '#5B1018' : mapFill;

            return (
              <path
                key={loc.id}
                d={loc.path}
                fill={stateFill}
                stroke={mapStroke}
                strokeWidth={mapStrokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            );
          })}
        </g>

        <g id="up-concentric-shockwaves">
          {[0, 1, 2, 3].map((ringIdx) => {
            const waveProgress = ((animTime / 3000) + ringIdx * 0.25) % 1;
            const waveRadius = 12 + waveProgress * 150;
            const waveAlpha = Math.max(0, (1 - waveProgress) * 0.65);

            return (
              <circle
                key={`shockwave-${ringIdx}`}
                cx={upHubNode.x}
                cy={upHubNode.y}
                r={waveRadius}
                fill="none"
                stroke="#5B1018"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                opacity={waveAlpha}
              />
            );
          })}
        </g>

        <g id="network-connection-lines">
          {connections.map((conn, idx) => {
            const from = nodeMap.get(conn.from);
            const to = nodeMap.get(conn.to);
            if (!from || !to) return null;

            const timeSinceStart = animTime - conn.startTime;
            if (timeSinceStart <= 0) return null;

            const progress = Math.min(1, Math.max(0, timeSinceStart / conn.duration));

            const curX = from.x + (to.x - from.x) * progress;
            const curY = from.y + (to.y - from.y) * progress;

            const isHubLine = conn.isPrimaryFromHub;

            return (
              <g key={`conn-${conn.from}-${conn.to}-${idx}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={curX}
                  y2={curY}
                  stroke={isHubLine ? 'url(#grad-up-primary)' : 'url(#grad-interstate)'}
                  strokeWidth={isHubLine ? 2.2 : 1.4}
                  strokeLinecap="round"
                  filter={isHubLine ? 'url(#laser-glow)' : undefined}
                />

                {progress > 0 && progress < 1 && (
                  <circle
                    cx={curX}
                    cy={curY}
                    r={3}
                    fill="#F3E7DA"
                    filter="url(#gold-glow)"
                  />
                )}
              </g>
            );
          })}
        </g>

        <g id="traveling-photons">
          {photonsRef.current.map((p, idx) => {
            const totalConnTime = p.connStartTime + p.connDuration;
            if (animTime < totalConnTime) return null;

            const photonProgress = ((animTime * p.speed + p.offset * 100) % 100) / 100;
            const px = p.fromNode.x + (p.toNode.x - p.fromNode.x) * photonProgress;
            const py = p.fromNode.y + (p.toNode.y - p.fromNode.y) * photonProgress;

            return (
              <g key={`photon-${idx}`}>
                <circle
                  cx={px}
                  cy={py}
                  r={2.4}
                  fill="#F3E7DA"
                  filter="url(#gold-glow)"
                />
              </g>
            );
          })}
        </g>

        <g id="state-nodes">
          {nodes.map((node) => {
            const timeSinceAppear = animTime - node.appearTime;
            if (timeSinceAppear <= 0) return null;

            const scale = Math.min(1, Math.max(0, timeSinceAppear / 250));
            const pulse = (Math.sin(animTime * 0.005 + node.x * 0.1) + 1) / 2;

            if (node.isHub) {
              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y}) scale(${scale})`}>
                  <circle
                    r={node.radius + 8 + pulse * 6}
                    fill="none"
                    stroke="#D8BFA8"
                    strokeWidth="1.5"
                    opacity={0.75 - pulse * 0.4}
                  />
                  <circle
                    r={node.radius + 3}
                    fill="#5B1018"
                    opacity={0.45}
                    filter="url(#gold-glow)"
                  />
                  <circle
                    r={node.radius}
                    fill="#5B1018"
                    stroke="#F3E7DA"
                    strokeWidth="1.8"
                    filter="url(#gold-glow)"
                  />
                  <circle r={2.5} fill="#F3E7DA" />
                </g>
              );
            }

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y}) scale(${scale})`}>
                <circle
                  r={node.radius + 2 + pulse * 2}
                  fill="#D8BFA8"
                  opacity={0.28}
                />
                <circle
                  r={node.radius}
                  fill="#B8B8B3"
                  stroke="#F3E7DA"
                  strokeWidth="1.2"
                  filter="url(#laser-glow)"
                />
                <circle r={1.5} fill="#5B1018" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
