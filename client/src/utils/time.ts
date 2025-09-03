export function toKSTTimeString(iso: string): string {
  const date = new Date(iso);
  const kstOffset = 9 * 60 * 60000;
  const kst = new Date(date.getTime() + kstOffset);

  return kst.toISOString().substring(11, 19); // HH:mm:ss
}