export function buildCliCommandEntityKey(vendorId: string, category: string, command: string): string {
  return `cli:${vendorId}:${category}:${command}`;
}

export function buildGuideEntityKey(scope: string, vendorId: string, category: string, title: string): string {
  return `guide:${scope}:${vendorId}:${category}:${title}`;
}
