export function formatPrice(amountEgp: number): string {
  return `EGP ${amountEgp.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
