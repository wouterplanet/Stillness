import paper from 'paper';
import { SZ } from '../state.js';
import { sty, ringSegment, makePetal, makeDiamond, makeTeardrop } from './helpers.js';

export function genSpace() {
  const R = Math.PI / 180;
  const cx = SZ / 2, cy = SZ / 2; // Center point for mandala symmetry
  const N = 12; // 12-fold symmetry like traditional mandalas
  const da = 360 / N;

  /* ── background ── */
  sty(new paper.Path.Rectangle([0, 0], [SZ, SZ]));
  
  /* ── Outer ring: Large border (radius 370-390) ── */
  sty(new paper.Path.Circle([cx, cy], 390));
  for (let i = 0; i < N * 2; i++) {
    ringSegment(cx, cy, 355, 388, i * da / 2, (i + 1) * da / 2);
  }
  
  /* ── Ring 6: Rocket ships pointing outward (radius 290-355) ── */
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 290, 355, i * da, (i + 1) * da);
  }
  
  for (let i = 0; i < N; i++) {
    const angle = i * da;
    const r = 295;
    const rocketDist = r;
    const rx = cx + rocketDist * Math.cos(angle * R);
    const ry = cy + rocketDist * Math.sin(angle * R);
    
    // Rocket body (pointing radially outward)
    const rlen = 45;
    const rw = 10;
    makeTeardrop(cx, cy, r, angle, rw, rlen);
    
    // Rocket fins
    const finR = r + rlen * 0.8;
    const finX = cx + finR * Math.cos(angle * R);
    const finY = cy + finR * Math.sin(angle * R);
    const perpAngle = angle + 90;
    const finSize = 8;
    
    for (let side = -1; side <= 1; side += 2) {
      const fang = angle + side * 25;
      makeDiamond(cx, cy, finR - 10, fang, 4, 12);
    }
    
    // Windows
    sty(new paper.Path.Circle([cx + (r + 15) * Math.cos(angle * R), cy + (r + 15) * Math.sin(angle * R)], 3));
  }
  
  // Small stars between rockets
  for (let i = 0; i < N; i++) {
    const angle = (i * da + da / 2);
    const sr = 320;
    sty(new paper.Path.Star([cx + sr * Math.cos(angle * R), cy + sr * Math.sin(angle * R)], 5, 3, 7));
  }
  
  /* ── Ring 5: Orbiting planets with rings (radius 220-290) ── */
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 220, 290, i * da, (i + 1) * da);
  }
  
  for (let i = 0; i < N; i++) {
    const angle = i * da + da / 2;
    const pr = 255;
    const planetRad = 22;
    const px = cx + pr * Math.cos(angle * R);
    const py = cy + pr * Math.sin(angle * R);
    
    // Planet body
    sty(new paper.Path.Circle([px, py], planetRad));
    
    // Surface bands
    for (let b = 1; b <= 2; b++) {
      const by = py - planetRad + (2 * planetRad / 3) * b;
      const halfW = Math.sqrt(Math.max(0, planetRad * planetRad - (by - py) * (by - py)));
      sty(new paper.Path({
        segments: [
          [px - halfW, by - 1.5],
          [px + halfW, by - 1.5],
          [px + halfW, by + 1.5],
          [px - halfW, by + 1.5]
        ], closed: true
      }));
    }
    
    // Rings around alternating planets, moons on others
    if (i % 2 === 0) {
      ringSegment(px, py, planetRad + 3, planetRad + 8, 160, 380);
    } else {
      // Add crescent moon orbiting the planet
      const MOON_DISTANCE = planetRad + 16; // distance from planet center
      const MOON_LOCAL_ANGLE = 45; // degrees (will be converted to radians with R)
      const MOON_RADIUS = 8;
      
      // Position moon at local angle relative to planet
      const mx = px + MOON_DISTANCE * Math.cos(MOON_LOCAL_ANGLE * R);
      const my = py + MOON_DISTANCE * Math.sin(MOON_LOCAL_ANGLE * R);
      
      // Crescent moon: overlapping circles create the crescent shape
      const MOON_SHADOW_OFFSET_X = 4;
      const MOON_SHADOW_OFFSET_Y = -2;
      const MOON_SHADOW_SIZE_RATIO = 0.7;
      
      // Full moon disc
      sty(new paper.Path.Circle([mx, my], MOON_RADIUS));
      // Shadow disc overlaps to create crescent effect
      sty(new paper.Path.Circle([mx + MOON_SHADOW_OFFSET_X, my + MOON_SHADOW_OFFSET_Y], MOON_RADIUS * MOON_SHADOW_SIZE_RATIO));
    }
  }
  
  /* ── Ring 4: Satellite array (radius 150-220) ── */
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 150, 220, i * da, (i + 1) * da);
  }
  
  for (let i = 0; i < N; i++) {
    const angle = i * da;
    const satr = 185;
    const satx = cx + satr * Math.cos(angle * R);
    const saty = cy + satr * Math.sin(angle * R);
    
    // Satellite body
    sty(new paper.Path.Rectangle([satx - 8, saty - 6], [16, 12]));
    
    // Solar panels radiating outward
    for (let side = -1; side <= 1; side += 2) {
      const panelAngle = angle + side * 35;
      for (let p = 0; p < 3; p++) {
        const pdist = satr + 10 + p * 8;
        const panel = new paper.Path.Rectangle([
          cx + pdist * Math.cos(panelAngle * R) - 3,
          cy + pdist * Math.sin(panelAngle * R) - 4,
          6, 8
        ]);
        panel.rotate(angle, [satx, saty]);
        sty(panel);
      }
    }
    
    // Antenna
    sty(new paper.Path.Circle([satx, saty], 3));
  }
  
  /* ── Ring 3: Spiral galaxy petals (radius 90-150) ── */
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 90, 150, i * da, (i + 1) * da);
  }
  
  for (let i = 0; i < N; i++) {
    const angle = i * da + da / 2;
    makePetal(cx, cy, 95, angle, 18, 50);
  }
  
  // Spiral arms emanating from petals
  for (let i = 0; i < N; i++) {
    const baseAngle = i * da + da / 2;
    for (let j = 0; j < 4; j++) {
      const spiralAngle = baseAngle + j * 8;
      const spiralR = 100 + j * 10;
      const spiralX = cx + spiralR * Math.cos(spiralAngle * R);
      const spiralY = cy + spiralR * Math.sin(spiralAngle * R);
      sty(new paper.Path.Ellipse({
        center: [spiralX, spiralY],
        size: [8 - j, 4 - j * 0.5]
      }).rotate(spiralAngle));
    }
  }
  
  /* ── Ring 2: Astronaut ring (radius 50-90) ── */
  for (let i = 0; i < N; i++) {
    ringSegment(cx, cy, 50, 90, i * da, (i + 1) * da);
  }
  
  for (let i = 0; i < N; i++) {
    const angle = i * da;
    const astr = 70;
    const astx = cx + astr * Math.cos(angle * R);
    const asty = cy + astr * Math.sin(angle * R);
    
    // Helmet
    sty(new paper.Path.Circle([astx, asty], 8));
    sty(new paper.Path.Circle([astx, asty], 5));
    
    // Body segments pointing radially
    const bodyR = astr - 8;
    const bodyX = cx + bodyR * Math.cos(angle * R);
    const bodyY = cy + bodyR * Math.sin(angle * R);
    
    const body = new paper.Path.Rectangle([bodyX - 5, bodyY - 6], [10, 12]);
    body.rotate(angle, [cx, cy]);
    sty(body);
  }
  
  /* ── Center: Sun/star burst (radius 0-50) ── */
  sty(new paper.Path.Circle([cx, cy], 50));
  sty(new paper.Path.Circle([cx, cy], 35));
  sty(new paper.Path.Circle([cx, cy], 20));
  sty(new paper.Path.Circle([cx, cy], 8));
  
  // Central sun rays
  for (let i = 0; i < N * 2; i++) {
    const rayAngle = i * da / 2;
    const rayLen = (i % 2 === 0) ? 25 : 18;
    makeTeardrop(cx, cy, 8, rayAngle, 4, rayLen);
  }
  
  // Corona ring segments
  for (let i = 0; i < N * 2; i++) {
    ringSegment(cx, cy, 20, 35, i * da / 2 + 1, (i + 1) * da / 2 - 1);
  }
  
  /* ── Scattered stars in background ── */
  const starRings = [100, 140, 190, 240, 300, 340];
  starRings.forEach(function(sr) {
    const numStars = Math.floor(sr / 20);
    for (let i = 0; i < numStars; i++) {
      const starAngle = (i / numStars) * 360 + (sr * 7) % 30;
      const starDist = sr + (Math.sin(i * 13) * 10);
      const starSize = 2 + (i % 3);
      sty(new paper.Path.Star([
        cx + starDist * Math.cos(starAngle * R),
        cy + starDist * Math.sin(starAngle * R)
      ], 4, starSize * 0.4, starSize));
    }
  });
}
