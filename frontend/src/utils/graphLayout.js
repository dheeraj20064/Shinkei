// Graph layout algorithms for tree visualization

export const NW         = 220;
export const NH         = 70;
export const HGAP       = 40;
export const VGAP       = 72;
export const PAD        = 56;
export const LEVEL_DELAY = 550;

// ── Build forward graph (root → children) ──────────────────────────────────
export function buildForwardLayout(nodes, edges, rootId, maxSteps = Infinity) {
  const childMap = {};
  nodes.forEach(n => (childMap[n.id] = []));
  edges.forEach(e => {
    if (childMap[e.from] !== undefined) childMap[e.from].push(e.to);
  });

  const levels = {};
  const queue  = [rootId];
  levels[rootId] = 0;
  while (queue.length) {
    const cur = queue.shift();
    if (levels[cur] >= maxSteps) continue; // stop expanding beyond maxSteps
    (childMap[cur] || []).forEach(child => {
      if (levels[child] === undefined) {
        levels[child] = levels[cur] + 1;
        queue.push(child);
      }
    });
  }

  // Only include nodes that were reached within maxSteps
  const reachable = new Set(Object.keys(levels).map(Number));
  const filteredNodes = nodes.filter(n => reachable.has(n.id));
  const filteredEdges = edges.filter(e => reachable.has(e.from) && reachable.has(e.to));

  return { ...calcLayout(filteredNodes, levels), filteredNodes, filteredEdges };
}

// ── Build backward graph ──────────────────────────────────────────────────
export function buildBackwardLayout(nodes, edges, rootId, maxSteps = Infinity) {
  const childMap = {};
  nodes.forEach(n => (childMap[n.id] = []));
  edges.forEach(e => {
    if (childMap[e.from] !== undefined) childMap[e.from].push(e.to);
  });

  const levels = {};
  const queue  = [rootId];
  levels[rootId] = 0;
  while (queue.length) {
    const cur = queue.shift();
    if (levels[cur] >= maxSteps) continue; // stop expanding beyond maxSteps
    (childMap[cur] || []).forEach(child => {
      if (levels[child] === undefined) {
        levels[child] = levels[cur] + 1;
        queue.push(child);
      }
    });
  }

  // Only include nodes that were reached within maxSteps
  const reachable = new Set(Object.keys(levels).map(Number));
  const filteredNodes = nodes.filter(n => reachable.has(n.id));
  const filteredEdges = edges.filter(e => reachable.has(e.from) && reachable.has(e.to));

  const maxSoFar = Math.max(0, ...Object.values(levels));
  filteredNodes.forEach(n => {
    if (levels[n.id] === undefined) levels[n.id] = maxSoFar + 1;
  });
  return { ...calcLayout(filteredNodes, levels, true), filteredNodes, filteredEdges };
}

function calcLayout(nodes, levels, flipY = false) {
  const byDepth = {};
  Object.entries(levels).forEach(([id, d]) => {
    if (!byDepth[d]) byDepth[d] = [];
    byDepth[d].push(Number(id));
  });

  const maxDepth = Math.max(...Object.keys(byDepth).map(Number));
  const maxRowW  = Math.max(
    ...Object.values(byDepth).map(row => row.length * NW + (row.length - 1) * HGAP)
  );

  const totalH = (maxDepth + 1) * (NH + VGAP) - VGAP;

  const pos = {};
  for (let d = 0; d <= maxDepth; d++) {
    const row    = byDepth[d] || [];
    const rowW   = row.length * NW + (row.length - 1) * HGAP;
    const offset = (maxRowW - rowW) / 2;
    const yRow   = flipY ? totalH - d * (NH + VGAP) - NH : d * (NH + VGAP);
    row.forEach((id, i) => {
      pos[id] = { x: offset + i * (NW + HGAP), y: yRow };
    });
  }

  const svgW = maxRowW + PAD * 2;
  const svgH = totalH + PAD * 2 + 20;
  return { pos, levels, svgW, svgH };
}
