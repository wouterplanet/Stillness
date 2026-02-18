import paper from 'paper';
import { SZ } from '../state.js';
import { sty, ringSegment, makePetal, makeDiamond, makeTeardrop } from './helpers.js';

export function genZodiac() {
  const cx = SZ / 2, cy = SZ / 2, R = Math.PI / 180;
  
  // Background
  sty(new paper.Path.Rectangle([0, 0], [SZ, SZ]));
  
  /* ── Outer decorative border representing the year cycle ── */
  // Outermost calendar ring with 12 segments
  const N = 12, da = 360 / N;
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 360, 385, i * da, (i + 1) * da);
  }
  
  // Decorative dots between zodiac sections
  for (let i = 0; i < N; i++) {
    const a = i * da * R;
    sty(new paper.Path.Circle([cx + 372 * Math.cos(a), cy + 372 * Math.sin(a)], 6));
  }
  
  /* ── Zodiac symbol ring (12 segments with symbolic representations) ── */
  // Main zodiac band
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 280, 360, i * da, (i + 1) * da);
  }
  
  // Zodiac symbol stylized representations using geometric forms
  // Each zodiac gets a unique symbolic pattern
  const zodiacSymbols = [
    // Aries (Ram) - diamond horns
    (ang) => { makeDiamond(cx, cy, 310, ang - 8, 12, 38); makeDiamond(cx, cy, 310, ang + 8, 12, 38); },
    // Taurus (Bull) - curved horns
    (ang) => { makePetal(cx, cy, 305, ang - 10, 10, 42); makePetal(cx, cy, 305, ang + 10, 10, 42); },
    // Gemini (Twins) - parallel lines
    (ang) => { 
      const a = ang * R;
      for (let j = 0; j < 2; j++) {
        const offset = (j - 0.5) * 15;
        sty(new paper.Path({
          segments: [
            [cx + (295 + offset) * Math.cos(a - 0.05), cy + (295 + offset) * Math.sin(a - 0.05)],
            [cx + (335 + offset) * Math.cos(a - 0.05), cy + (335 + offset) * Math.sin(a - 0.05)],
            [cx + (335 + offset) * Math.cos(a + 0.05), cy + (335 + offset) * Math.sin(a + 0.05)],
            [cx + (295 + offset) * Math.cos(a + 0.05), cy + (295 + offset) * Math.sin(a + 0.05)]
          ], closed: true
        }));
      }
    },
    // Cancer (Crab) - claws
    (ang) => { makeTeardrop(cx, cy, 300, ang - 9, 16, 45); makeTeardrop(cx, cy, 300, ang + 9, 16, 45); },
    // Leo (Lion) - mane petals
    (ang) => { 
      for (let j = -1; j <= 1; j++) {
        makePetal(cx, cy, 305, ang + j * 8, 8, 40);
      }
    },
    // Virgo (Maiden) - wheat stalk
    (ang) => {
      const a = ang * R;
      sty(new paper.Path({
        segments: [
          [cx + 300 * Math.cos(a - 0.02), cy + 300 * Math.sin(a - 0.02)],
          [cx + 340 * Math.cos(a - 0.02), cy + 340 * Math.sin(a - 0.02)],
          [cx + 340 * Math.cos(a + 0.02), cy + 340 * Math.sin(a + 0.02)],
          [cx + 300 * Math.cos(a + 0.02), cy + 300 * Math.sin(a + 0.02)]
        ], closed: true
      }));
      for (let j = 0; j < 3; j++) {
        const r = 310 + j * 12;
        sty(new paper.Path.Circle([cx + r * Math.cos(a), cy + r * Math.sin(a)], 4));
      }
    },
    // Libra (Scales) - balance beam
    (ang) => {
      const a = ang * R;
      sty(new paper.Path({
        segments: [
          [cx + 305 * Math.cos(a - 0.08), cy + 305 * Math.sin(a - 0.08)],
          [cx + 335 * Math.cos(a - 0.08), cy + 335 * Math.sin(a - 0.08)],
          [cx + 335 * Math.cos(a - 0.06), cy + 335 * Math.sin(a - 0.06)],
          [cx + 305 * Math.cos(a - 0.06), cy + 305 * Math.sin(a - 0.06)]
        ], closed: true
      }));
      sty(new paper.Path.Circle([cx + 310 * Math.cos(a - 0.07), cy + 310 * Math.sin(a - 0.07)], 8));
      sty(new paper.Path.Circle([cx + 330 * Math.cos(a - 0.07), cy + 330 * Math.sin(a - 0.07)], 8));
    },
    // Scorpio (Scorpion) - stinger
    (ang) => { makeTeardrop(cx, cy, 295, ang, 20, 50); sty(new paper.Path.Circle([cx + 325 * Math.cos(ang * R), cy + 325 * Math.sin(ang * R)], 6)); },
    // Sagittarius (Archer) - arrow
    (ang) => {
      const a = ang * R;
      sty(new paper.Path({
        segments: [
          [cx + 295 * Math.cos(a - 0.015), cy + 295 * Math.sin(a - 0.015)],
          [cx + 340 * Math.cos(a - 0.015), cy + 340 * Math.sin(a - 0.015)],
          [cx + 340 * Math.cos(a + 0.015), cy + 340 * Math.sin(a + 0.015)],
          [cx + 295 * Math.cos(a + 0.015), cy + 295 * Math.sin(a + 0.015)]
        ], closed: true
      }));
      makeDiamond(cx, cy, 335, ang, 8, 20);
    },
    // Capricorn (Goat) - horn spiral
    (ang) => {
      for (let j = 0; j < 3; j++) {
        const r = 300 + j * 14;
        const offset = j * 4;
        sty(new paper.Path.Circle([cx + r * Math.cos((ang + offset) * R), cy + r * Math.sin((ang + offset) * R)], 5));
      }
    },
    // Aquarius (Water Bearer) - waves
    (ang) => {
      const a = ang * R;
      for (let j = 0; j < 2; j++) {
        const r = 310 + j * 20;
        const pts = [];
        for (let k = 0; k < 5; k++) {
          const aa = a - 0.06 + k * 0.03;
          pts.push([cx + r * Math.cos(aa), cy + r * Math.sin(aa)]);
        }
        const wave = new paper.Path({ segments: pts, closed: false });
        wave.smooth({ type: 'catmull-rom', factor: 0.5 });
        const waveBand = new paper.Path({ segments: [...wave.segments.map(s => s.point)], closed: true });
        wave.remove();
        sty(waveBand);
      }
    },
    // Pisces (Fish) - two crescents
    (ang) => {
      const a = ang * R;
      for (let j = -1; j <= 1; j += 2) {
        sty(new paper.Path.Circle([cx + (315 + j * 12) * Math.cos(a), cy + (315 + j * 12) * Math.sin(a)], 10));
      }
    }
  ];
  
  // Apply zodiac symbols
  for (let i = 0; i < N; i++) {
    const ang = i * da + da / 2;
    zodiacSymbols[i](ang);
  }
  
  /* ── Seasonal rings representing quarters of the year ── */
  // Middle decorative ring with diamond patterns
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 220, 280, i * da, (i + 1) * da);
  }
  
  // Season markers (4 cardinal points with special emphasis)
  for (let i = 0; i < 4; i++) {
    const ang = i * 90;
    makePetal(cx, cy, 230, ang, 18, 42);
    sty(new paper.Path.Circle([cx + 250 * Math.cos(ang * R), cy + 250 * Math.sin(ang * R)], 8));
  }
  
  // Month decorative elements between seasons
  for (let i = 0; i < N; i++) {
    makeDiamond(cx, cy, 235, i * da + da / 2, 10, 32);
  }
  
  /* ── Inner celestial ring with stars and moons ── */
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 150, 220, i * da, (i + 1) * da);
  }
  
  // Alternating stars and crescents
  for (let i = 0; i < N; i++) {
    const ang = i * da + da / 2;
    const a = ang * R;
    if (i % 2 === 0) {
      // Star
      sty(new paper.Path.Star([cx + 185 * Math.cos(a), cy + 185 * Math.sin(a)], 5, 6, 14));
    } else {
      // Crescent moon
      const mx = cx + 185 * Math.cos(a), my = cy + 185 * Math.sin(a);
      sty(new paper.Path.Circle([mx, my], 10));
      sty(new paper.Path.Circle([mx + 5, my - 2], 8));
    }
  }
  
  // Decorative dots in inner celestial ring
  for (let i = 0; i < N * 2; i++) {
    const a = i * (da / 2) * R;
    sty(new paper.Path.Circle([cx + 165 * Math.cos(a), cy + 165 * Math.sin(a)], 4));
  }
  
  /* ── Center cosmic mandala ── */
  // Outer center ring
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 90, 150, i * da, (i + 1) * da);
  }
  
  // Radiating petals from center
  for (let i = 0; i < N; i++) {
    makePetal(cx, cy, 95, i * da, 12, 48);
  }
  
  // Middle center ring with teardrops
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 50, 90, i * da, (i + 1) * da);
  }
  
  for (let i = 0; i < N; i++) {
    makeTeardrop(cx, cy, 55, i * da + da / 2, 14, 30);
  }
  
  // Inner core with sun/star representation
  sty(new paper.Path.Circle([cx, cy], 50));
  sty(new paper.Path.Star([cx, cy], 8, 20, 40));
  
  // Central sun face
  sty(new paper.Path.Circle([cx, cy], 20));
  sty(new paper.Path.Circle([cx, cy], 8));
  
  // Sun rays from center
  for (let i = 0; i < 8; i++) {
    const ang = i * 45;
    makeDiamond(cx, cy, 25, ang, 4, 12);
  }
}
