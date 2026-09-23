/**
 * Gold Dust Particle Effect (افکت ذرات طلایی معلق و پرواز به سمت سبد خرید)
 * 
 * Creates an ultra-smooth, hardware-accelerated stream of golden sparkles,
 * fairy dust, and glowing orbs that burst from the "Add to Cart" button
 * and arc across the screen straight into the cart button in the header.
 */

interface Point {
  x: number;
  y: number;
}

// Helper to get or create the singleton particle container
function getParticleContainer(): HTMLElement {
  let container = document.getElementById('gold-dust-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'gold-dust-container';
    container.setAttribute('aria-hidden', 'true');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '99999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
  }
  return container;
}

// 4-Point Star SVG for luxury gold sparkles
const GOLD_STAR_SVG = `
<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
  <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"/>
</svg>
`;

export interface PointLike {
  x?: number;
  y?: number;
  clientX?: number;
  clientY?: number;
}

/**
 * Triggers the Gold Dust flight animation from a source element or coordinate to the header cart icon.
 */
export function triggerGoldDust(
  source: HTMLElement | MouseEvent | PointLike,
  particleCount = 22
): void {
  if (typeof window === 'undefined') return;

  // 1. Determine Starting Coordinates (Center of the clicked button)
  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;

  if (source instanceof HTMLElement) {
    const rect = source.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
  } else if ('clientX' in source && 'clientY' in source) {
    startX = source.clientX;
    startY = source.clientY;
  } else if ('x' in source && 'y' in source) {
    startX = source.x;
    startY = source.y;
  }

  // 2. Determine Destination Coordinates (Center of Header Cart Button)
  const cartBtn = document.getElementById('header-cart-button');
  let targetX: number;
  let targetY: number;

  if (cartBtn) {
    const cartRect = cartBtn.getBoundingClientRect();
    targetX = cartRect.left + cartRect.width / 2;
    targetY = cartRect.top + cartRect.height / 2;
  } else {
    // Fallback: Top corner where cart is usually located in RTL layout
    targetX = Math.max(40, window.innerWidth * 0.12);
    targetY = 45;
  }

  const container = getParticleContainer();

  // Color palette of authentic luxury gold hues
  const goldColors = [
    '#FFF8DB', // Hot white-gold highlight
    '#FFE066', // Bright yellow gold
    '#F59E0B', // Warm amber gold
    '#D4AF37', // Classic metallic gold
    '#B8860B', // Dark antique gold
    '#E5C158', // Satin champagne gold
  ];

  let hasImpactTriggered = false;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const particleType = i % 4; // 0: star, 1: glowing orb, 2: diamond flake, 3: micro dust
    const baseColor = goldColors[i % goldColors.length];
    const size = particleType === 0 ? 12 + Math.random() * 8 : (particleType === 1 ? 7 + Math.random() * 6 : 4 + Math.random() * 5);

    particle.style.position = 'absolute';
    particle.style.left = '0px';
    particle.style.top = '0px';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.color = baseColor;
    particle.style.pointerEvents = 'none';
    particle.style.willChange = 'transform, opacity';

    if (particleType === 0) {
      // 4-Point Star
      particle.innerHTML = GOLD_STAR_SVG;
      particle.style.filter = `drop-shadow(0 0 6px ${baseColor}) drop-shadow(0 0 12px rgba(255,215,0,0.8))`;
    } else if (particleType === 1) {
      // Glowing Gold Orb
      particle.style.borderRadius = '50%';
      particle.style.background = `radial-gradient(circle, #FFFFFF 15%, ${baseColor} 60%, transparent 100%)`;
      particle.style.boxShadow = `0 0 8px ${baseColor}, 0 0 16px rgba(212,175,55,0.7)`;
    } else if (particleType === 2) {
      // Diamond Flake
      particle.style.borderRadius = '2px';
      particle.style.background = baseColor;
      particle.style.transform = 'rotate(45deg)';
      particle.style.boxShadow = `0 0 6px ${baseColor}`;
    } else {
      // Micro Dust Glitter
      particle.style.borderRadius = '50%';
      particle.style.background = '#FFF';
      particle.style.boxShadow = `0 0 5px #FFD700, 0 0 10px #D4AF37`;
    }

    container.appendChild(particle);

    // Initial random burst around source button
    const burstAngle = Math.random() * Math.PI * 2;
    const burstDist = 15 + Math.random() * 38;
    const burstX = startX + Math.cos(burstAngle) * burstDist;
    const burstY = startY + Math.sin(burstAngle) * burstDist;

    // Bezier curve control points:
    // Arcs gracefully upwards across the screen
    const midX = (burstX + targetX) / 2 + (Math.random() - 0.5) * 160;
    const arcHeight = 70 + Math.random() * 150;
    const midY = Math.min(burstY, targetY) - arcHeight;

    // Compute keyframe steps along quadratic curve
    const steps = 14;
    const keyframes: Keyframe[] = [];

    // Flight duration with slight random variance
    const duration = 750 + Math.random() * 220;
    const delay = i * 18; // Staggered stream effect

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      // Quadratic Bezier Formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      const curX = Math.pow(1 - t, 2) * burstX + 2 * (1 - t) * t * midX + Math.pow(t, 2) * targetX;
      const curY = Math.pow(1 - t, 2) * burstY + 2 * (1 - t) * t * midY + Math.pow(t, 2) * targetY;

      // Rotation & Shimmer
      const rot = t * (360 + (i % 2 === 0 ? 180 : -180));
      let scale = 1;
      let opacity = 1;

      if (t === 0) {
        scale = 0.2;
        opacity = 0.8;
      } else if (t < 0.2) {
        scale = 1.25;
        opacity = 1;
      } else if (t > 0.85) {
        scale = (1 - t) * 4; // shrinks into the cart opening
        opacity = (1 - t) * 4;
      } else {
        // Subtle shimmer oscillation
        scale = 0.9 + Math.sin(t * Math.PI * 4) * 0.25;
        opacity = 0.85 + Math.sin(t * Math.PI * 3) * 0.15;
      }

      keyframes.push({
        transform: `translate3d(${curX - size / 2}px, ${curY - size / 2}px, 0) rotate(${rot}deg) scale(${scale})`,
        opacity: Math.max(0, Math.min(1, opacity)),
      });
    }

    const anim = particle.animate(keyframes, {
      duration,
      delay,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    });

    anim.onfinish = () => {
      particle.remove();

      // Trigger cart impact pop when first wave arrives
      if (!hasImpactTriggered && i >= Math.floor(particleCount * 0.4)) {
        hasImpactTriggered = true;
        triggerCartImpact(cartBtn);
      }
    };
  }
}

/**
 * Triggers a golden ripple / bounce / sparkle burst on the header cart button
 */
function triggerCartImpact(cartBtn: HTMLElement | null): void {
  if (!cartBtn) return;

  // 1. Elastic Bounce on Cart Button
  cartBtn.animate(
    [
      { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(212,175,55,0)' },
      { transform: 'scale(1.22)', boxShadow: '0 0 24px 6px rgba(212,175,55,0.85)', borderColor: '#B8860B' },
      { transform: 'scale(0.92)', boxShadow: '0 0 16px 3px rgba(212,175,55,0.5)' },
      { transform: 'scale(1.08)', boxShadow: '0 0 8px 1px rgba(212,175,55,0.3)' },
      { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(212,175,55,0)' },
    ],
    {
      duration: 650,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
  );

  // 2. Mini Golden Starburst around Cart
  const rect = cartBtn.getBoundingClientRect();
  const cX = rect.left + rect.width / 2;
  const cY = rect.top + rect.height / 2;
  const container = getParticleContainer();

  const burstStars = 8;
  for (let j = 0; j < burstStars; j++) {
    const star = document.createElement('div');
    const size = 10 + Math.random() * 6;
    star.style.position = 'absolute';
    star.style.left = `${cX - size / 2}px`;
    star.style.top = `${cY - size / 2}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.color = j % 2 === 0 ? '#FFE57F' : '#D4AF37';
    star.style.pointerEvents = 'none';
    star.innerHTML = GOLD_STAR_SVG;
    star.style.filter = 'drop-shadow(0 0 6px #FFD700)';

    container.appendChild(star);

    const angle = (j / burstStars) * Math.PI * 2;
    const distance = 20 + Math.random() * 22;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    const starAnim = star.animate(
      [
        { transform: 'translate(0, 0) scale(0.2) rotate(0deg)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(1.1) rotate(90deg)`, opacity: 0.9 },
        { transform: `translate(${destX * 1.3}px, ${destY * 1.3}px) scale(0) rotate(180deg)`, opacity: 0 },
      ],
      {
        duration: 500 + Math.random() * 150,
        easing: 'ease-out',
        fill: 'forwards',
      }
    );

    starAnim.onfinish = () => star.remove();
  }
}
