import paper from 'paper';
import { SZ } from '../state.js';
import { sty, ringSegment, makePetal, makeDiamond } from './helpers.js';

export function genSpace() {
  const R = Math.PI / 180;

  /* ── background ── */
  sty(new paper.Path.Rectangle([0, 0], [SZ, SZ]));

  /* ── spiral galaxy (center-left) ── */
  const gx = 220, gy = 280, gr = 90;
  // galaxy core
  sty(new paper.Path.Circle([gx, gy], gr * 0.18));
  sty(new paper.Path.Circle([gx, gy], gr * 0.35));
  sty(new paper.Path.Circle([gx, gy], gr * 0.55));
  
  // spiral arms - 4 major arms with subdivisions
  for (let arm = 0; arm < 4; arm++) {
    const baseAngle = arm * 90;
    for (let i = 0; i < 12; i++) {
      const t = i / 12;
      const angle = baseAngle + t * 180;
      const dist = gr * 0.55 + t * gr * 0.8;
      const width = 12 - t * 6;
      const cx = gx + dist * Math.cos(angle * R);
      const cy = gy + dist * Math.sin(angle * R);
      sty(new paper.Path.Ellipse({ 
        center: [cx, cy], 
        size: [width * 2.5, width] 
      }).rotate(angle + 15));
    }
  }
  
  // star clusters in galaxy
  for (let i = 0; i < 20; i++) {
    const a = (i * 73) * R;
    const d = gr * (0.4 + Math.random() * 0.5);
    const sx = gx + d * Math.cos(a);
    const sy = gy + d * Math.sin(a);
    sty(new paper.Path.Star([sx, sy], 4, 2, 4));
  }

  /* ── nebula cloud (upper-right) ── */
  const nx = 600, ny = 150, nr = 80;
  // organic cloud shapes with smooth curves
  for (let layer = 0; layer < 5; layer++) {
    const points = [];
    const numPoints = 8 + layer * 2;
    for (let i = 0; i < numPoints; i++) {
      const a = (i / numPoints) * 360 * R;
      const rad = nr * (0.5 + layer * 0.15) * (0.8 + Math.sin(i * 3) * 0.2);
      points.push([nx + rad * Math.cos(a), ny + rad * Math.sin(a)]);
    }
    const cloud = new paper.Path({ segments: points, closed: true });
    cloud.smooth({ type: 'catmull-rom', factor: 0.5 });
    sty(cloud);
  }
  
  // nebula internal structures
  for (let i = 0; i < 12; i++) {
    const a = (i * 30) * R;
    const d = nr * 0.4;
    const cx = nx + d * Math.cos(a);
    const cy = ny + d * Math.sin(a);
    sty(new paper.Path.Circle([cx, cy], 6 + (i % 3) * 2));
  }

  /* ── rocket ship (right side) ── */
  const rx = 650, ry = 500, rh = 100;
  // nose cone
  sty(new paper.Path({
    segments: [
      [rx, ry - rh * 0.5],
      [rx - 15, ry - rh * 0.3],
      [rx + 15, ry - rh * 0.3]
    ], closed: true
  }));
  // main body sections
  sty(new paper.Path.Rectangle([rx - 15, ry - rh * 0.3], [30, rh * 0.25]));
  sty(new paper.Path.Rectangle([rx - 15, ry - rh * 0.05], [30, rh * 0.25]));
  sty(new paper.Path.Rectangle([rx - 15, ry + rh * 0.2], [30, rh * 0.2]));
  // fins
  sty(new paper.Path({
    segments: [
      [rx - 15, ry + rh * 0.3],
      [rx - 35, ry + rh * 0.5],
      [rx - 15, ry + rh * 0.4]
    ], closed: true
  }));
  sty(new paper.Path({
    segments: [
      [rx + 15, ry + rh * 0.3],
      [rx + 35, ry + rh * 0.5],
      [rx + 15, ry + rh * 0.4]
    ], closed: true
  }));
  // windows
  sty(new paper.Path.Circle([rx, ry - rh * 0.18], 6));
  sty(new paper.Path.Circle([rx, ry + 5], 5));
  // exhaust flames
  for (let i = 0; i < 3; i++) {
    makeDiamond(rx + (i - 1) * 8, ry + rh * 0.4, 0, 90, 4, 18 + i * 4);
  }

  /* ── space station (upper-left) ── */
  const stx = 150, sty2 = 120;
  // central hub
  sty(new paper.Path.Circle([stx, sty2], 25));
  sty(new paper.Path.Circle([stx, sty2], 15));
  // modules at cardinal directions
  for (let i = 0; i < 4; i++) {
    const a = i * 90;
    const mx = stx + 40 * Math.cos(a * R);
    const my = sty2 + 40 * Math.sin(a * R);
    sty(new paper.Path.Rectangle([mx - 12, my - 10], [24, 20]));
    // connecting arms
    ringSegment(stx, sty2, 25, 40, a - 3, a + 3);
    // windows on modules
    for (let w = 0; w < 2; w++) {
      sty(new paper.Path.Circle([mx - 6 + w * 12, my], 3));
    }
  }
  // solar panels
  for (let i = 0; i < 2; i++) {
    const px = stx + (i === 0 ? -70 : 70);
    const py = sty2;
    // panel segments
    for (let s = 0; s < 6; s++) {
      sty(new paper.Path.Rectangle([px - 8, py - 18 + s * 6], [16, 5]));
    }
    // connecting arm
    sty(new paper.Path.Rectangle([stx + (i === 0 ? -40 : 25), py - 2], [i === 0 ? 30 : 30, 4]));
  }

  /* ── astronaut (lower-left) ── */
  const ax = 120, ay = 550;
  // helmet
  sty(new paper.Path.Circle([ax, ay - 35], 22));
  sty(new paper.Path.Circle([ax, ay - 35], 16)); // visor
  // body
  sty(new paper.Path.Rectangle([ax - 18, ay - 15], [36, 45]));
  // chest control panel
  sty(new paper.Path.Rectangle([ax - 12, ay - 8], [24, 16]));
  for (let i = 0; i < 6; i++) {
    sty(new paper.Path.Rectangle([ax - 10 + (i % 3) * 8, ay - 6 + Math.floor(i / 3) * 8], [6, 6]));
  }
  // arms
  sty(new paper.Path.Rectangle([ax - 28, ay - 12], [10, 30]));
  sty(new paper.Path.Rectangle([ax + 18, ay - 12], [10, 30]));
  // legs
  sty(new paper.Path.Rectangle([ax - 14, ay + 30], [12, 35]));
  sty(new paper.Path.Rectangle([ax + 2, ay + 30], [12, 35]));
  // boots
  sty(new paper.Path.Rectangle([ax - 14, ay + 65], [14, 10]));
  sty(new paper.Path.Rectangle([ax + 2, ay + 65], [14, 10]));
  // life support backpack
  sty(new paper.Path.Rectangle([ax - 16, ay - 10], [32, 28]));
  for (let i = 0; i < 4; i++) {
    sty(new paper.Path.Circle([ax - 10 + (i % 2) * 20, ay - 2 + Math.floor(i / 2) * 12], 4));
  }

  /* ── satellite (bottom-right) ── */
  const satx = 580, saty = 650;
  // main body
  sty(new paper.Path.Rectangle([satx - 20, saty - 15], [40, 30]));
  // antenna
  sty(new paper.Path.Rectangle([satx - 2, saty - 40], [4, 25]));
  sty(new paper.Path.Circle([satx, saty - 42], 5));
  // dish antenna
  const dish = new paper.Path.Ellipse({ center: [satx, saty - 15], size: [50, 20] });
  sty(dish);
  sty(new paper.Path.Circle([satx, saty - 15], 8));
  // solar panels
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 4; i++) {
      sty(new paper.Path.Rectangle([satx + side * (25 + i * 14), saty - 10], [12, 20]));
    }
  }
  // detail panels
  for (let i = 0; i < 4; i++) {
    sty(new paper.Path.Rectangle([satx - 16 + (i % 2) * 16, saty - 11 + Math.floor(i / 2) * 12], [12, 10]));
  }

  /* ── asteroid belt (diagonal across middle) ── */
  const asteroids = [
    [350, 200, 15], [410, 240, 22], [480, 190, 18], [520, 260, 16],
    [300, 340, 20], [370, 380, 14], [440, 360, 19], [510, 400, 17],
    [280, 460, 16], [340, 500, 21], [410, 480, 15], [475, 520, 18]
  ];
  
  asteroids.forEach(function(ast) {
    const [cx, cy, r] = ast;
    // irregular polygon for asteroid
    const points = [];
    const numSides = 6 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numSides; i++) {
      const a = (i / numSides) * 360 * R;
      const rad = r * (0.7 + Math.random() * 0.3);
      points.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
    }
    const rock = new paper.Path({ segments: points, closed: true });
    sty(rock);
    // craters
    for (let i = 0; i < 3; i++) {
      const ca = (i * 120) * R;
      const cd = r * 0.5;
      sty(new paper.Path.Circle([cx + cd * Math.cos(ca), cy + cd * Math.sin(ca)], r * 0.2));
    }
  });

  /* ── cosmic energy swirls (bottom-left corner) ── */
  for (let i = 0; i < 6; i++) {
    const sr = 25 + i * 12;
    ringSegment(80, 720, sr, sr + 8, 180 + i * 10, 360 - i * 8);
  }
  
  /* ── distant planets (smaller, scattered) ── */
  const planets = [
    [420, 80, 18, 2, true],   // ringed
    [720, 240, 22, 3, false],
    [180, 380, 16, 2, false],
    [700, 620, 20, 3, true],  // ringed
    [250, 680, 14, 2, false]
  ];
  
  planets.forEach(function(p) {
    const [px, py, pr, bands, hasRing] = p;
    // planet body
    sty(new paper.Path.Circle([px, py], pr));
    // surface bands
    for (let i = 1; i <= bands; i++) {
      const by = py - pr + (2 * pr / (bands + 1)) * i;
      const halfW = Math.sqrt(Math.max(0, pr * pr - (by - py) * (by - py)));
      const band = new paper.Path({
        segments: [
          [px - halfW, by - 2],
          [px + halfW, by - 2],
          [px + halfW, by + 2],
          [px - halfW, by + 2]
        ], closed: true
      });
      sty(band);
    }
    // ring system
    if (hasRing) {
      ringSegment(px, py, pr + 4, pr + 10, 160, 380);
      ringSegment(px, py, pr + 11, pr + 16, 165, 375);
    }
  });

  /* ── star field - varied sizes ── */
  const stars = [
    [60, 50, 3], [180, 40, 4], [320, 35, 3], [560, 70, 5], [740, 90, 4],
    [45, 180, 4], [290, 160, 3], [510, 140, 4], [680, 180, 3], [760, 220, 5],
    [30, 280, 3], [440, 300, 4], [630, 320, 3], [750, 360, 4],
    [70, 420, 5], [540, 440, 3], [740, 480, 4],
    [40, 560, 4], [280, 580, 3], [480, 600, 5], [680, 560, 3],
    [160, 680, 4], [400, 720, 3], [540, 740, 4], [720, 700, 5]
  ];
  
  stars.forEach(function(s) {
    sty(new paper.Path.Star([s[0], s[1]], 4, s[2] * 0.4, s[2]));
  });

  /* ── meteor shower (top-right diagonal) ── */
  for (let i = 0; i < 5; i++) {
    const mx = 450 + i * 60;
    const my = 50 + i * 30;
    // meteor head
    sty(new paper.Path.Circle([mx, my], 5));
    // trail
    sty(new paper.Path({
      segments: [
        [mx + 3, my - 3],
        [mx + 25, my - 22],
        [mx + 28, my - 18],
        [mx + 5, my + 1]
      ], closed: true
    }));
  }

  /* ── wormhole/portal (center-right edge) ── */
  const wx = 760, wy = 360;
  for (let i = 0; i < 8; i++) {
    const r1 = 15 + i * 8;
    const r2 = r1 + 6;
    ringSegment(wx, wy, r1, r2, 90, 270);
  }

  /* ── cosmic dust clouds (upper areas) ── */
  const dustClouds = [
    [240, 60, 12], [350, 90, 10], [500, 55, 11],
    [120, 240, 9], [550, 280, 10]
  ];
  
  dustClouds.forEach(function(dc) {
    const [cx, cy, r] = dc;
    for (let i = 0; i < 6; i++) {
      const a = (i * 60) * R;
      const d = r * 0.8;
      sty(new paper.Path.Circle([cx + d * Math.cos(a), cy + d * Math.sin(a)], 3 + (i % 3)));
    }
  });

  /* ── supernova burst (lower-right) ── */
  const snx = 720, sny = 580;
  sty(new paper.Path.Circle([snx, sny], 8));
  sty(new paper.Path.Circle([snx, sny], 4));
  for (let i = 0; i < 16; i++) {
    const angle = i * 22.5;
    const len = (i % 2 === 0) ? 35 : 25;
    makePetal(snx, sny, 8, angle, 3, len);
  }

  /* ── additional detail stars scattered throughout ── */
  const detailStars = [
    [115, 90, 2], [265, 120, 3], [395, 145, 2], [455, 95, 3],
    [95, 310, 2], [335, 270, 3], [565, 235, 2], [620, 410, 3],
    [215, 535, 2], [365, 455, 3], [505, 565, 2], [655, 675, 3],
    [305, 635, 2], [125, 605, 3], [455, 685, 2], [600, 730, 3]
  ];
  
  detailStars.forEach(function(ds) {
    sty(new paper.Path.Star([ds[0], ds[1]], 5, ds[2] * 0.35, ds[2]));
  });
}
