export const calculateInvoice = (invoiceData) => {
  const items = invoiceData?.items || [];

  const safeItems = items.map((item) => {
    const qty = Number(item.qty || 0);
    const price = Number(item.price || 0);

    return {
      ...item,
      qty,
      price,
      total: qty * price,
    };
  });

  const subtotal = safeItems.reduce((acc, item) => acc + item.total, 0);

  const discount = Number(invoiceData?.invoice?.discount || 0);
  const taxPercent = Number(invoiceData?.invoice?.tax || 0);

  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;

  const taxAmount = (afterDiscount * taxPercent) / 100;

  const grandTotal = afterDiscount + taxAmount;

  return {
    ...invoiceData,
    items: safeItems,
    invoice: {
      ...invoiceData.invoice,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
    },
  };
};