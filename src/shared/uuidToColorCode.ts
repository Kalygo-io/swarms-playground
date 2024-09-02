export function uuidToColor(uuid: string) {
  // Extract the first three pairs of characters (6 characters total)
  const r = parseInt(uuid.slice(0, 2), 16);
  const g = parseInt(uuid.slice(2, 4), 16);
  const b = parseInt(uuid.slice(4, 6), 16);
  
  // Convert to a hex color code
  const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  
  return color;
}

export function stringToColor(str: string) {
  // Calculate the hash code of the string
  let hashCode = 0;
  for (let i = 0; i < str.length; i++) {
    hashCode = str.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }
  
  // Convert the hash code to a hex color code
  const color = `#${((hashCode & 0x00FFFFFF) | 0x1000000).toString(16).slice(1)}`;
  
  return color;
}