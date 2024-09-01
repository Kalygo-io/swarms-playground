export function uuidToColor(uuid: string) {
  // Extract the first three pairs of characters (6 characters total)
  const r = parseInt(uuid.slice(0, 2), 16);
  const g = parseInt(uuid.slice(2, 4), 16);
  const b = parseInt(uuid.slice(4, 6), 16);
  
  // Convert to a hex color code
  const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  
  return color;
}