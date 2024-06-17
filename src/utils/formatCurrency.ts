export function formatCurrency(amount: any) {
  if (typeof amount !== "number") {
    amount = parseInt(amount, 10);
  }
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
