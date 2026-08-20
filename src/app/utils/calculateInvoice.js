export const TAX_OPTIONS = [
  { label: "CGST", value: "CGST", defaultRate: 9 },
  { label: "SGST", value: "SGST", defaultRate: 9 },
  { label: "IGST", value: "IGST", defaultRate: 18 },
  { label: "UGST", value: "UGST", defaultRate: 9 },
  { label: "Others", value: "Others", defaultRate: 18 },
  { label: "No Tax", value: "No Tax", defaultRate: 0 },
];

export const getItemTaxRate = (item) => {
  if (!item) return 0;
  if (typeof item === "string") {
    if (item === "No Tax") return 0;
    const match = TAX_OPTIONS.find((t) => t.value === item);
    return match ? match.defaultRate : 0;
  }
  if (item.taxType === "No Tax") return 0;
  if (item.taxRate !== undefined && item.taxRate !== null && item.taxRate !== "") {
    return Number(item.taxRate || 0);
  }
  const match = TAX_OPTIONS.find((t) => t.value === item.taxType);
  return match ? match.defaultRate : 0;
};

export const getItemTaxes = (item) => {
  if (Array.isArray(item.taxes) && item.taxes.length > 0) {
    return item.taxes.map((t) => ({
      taxType: t.taxType || "CGST",
      taxRate: t.taxType === "No Tax" ? 0 : Number(t.taxRate ?? 0),
    }));
  }

  // Fallback for legacy single tax items
  const isNoTax = item.taxType === "No Tax";
  const taxRate = isNoTax
    ? 0
    : item.taxRate !== undefined && item.taxRate !== ""
    ? Number(item.taxRate)
    : getItemTaxRate(item.taxType);

  return [
    {
      taxType: item.taxType || TAX_OPTIONS[0].value,
      taxRate,
    },
  ];
};

export const calculateInvoice = (invoiceData) => {
  const items = invoiceData?.items || [];

  const safeItems = items.map((item) => {
    const qty = Number(item.qty || 0);
    const price = Number(item.price || 0);
    const baseTotal = qty * price;

    const taxes = getItemTaxes(item);
    const itemTaxAmount = taxes.reduce((sum, t) => {
      const rate = t.taxType === "No Tax" ? 0 : Number(t.taxRate || 0);
      return sum + baseTotal * (rate / 100);
    }, 0);

    const total = baseTotal + itemTaxAmount;

    return {
      ...item,
      hsn: item.hsn || "",
      qty,
      price,
      taxes,
      baseTotal,
      itemTaxAmount,
      total,
    };
  });

  const subtotal = safeItems.reduce((acc, item) => acc + item.baseTotal, 0);
  const itemTaxTotal = safeItems.reduce((acc, item) => acc + item.itemTaxAmount, 0);

  const discount = Number(invoiceData?.discount || invoiceData?.invoice?.discount || 0);
  const globalTaxPercent = Number(invoiceData?.tax || invoiceData?.invoice?.tax || 0);
  const globalTaxAmount = (subtotal * globalTaxPercent) / 100;
  const taxAmount = itemTaxTotal + globalTaxAmount;

  const shipping = Number(invoiceData?.shipping || invoiceData?.invoice?.shipping || 0);

  const grandTotal = subtotal + taxAmount + shipping - discount;

  const taxBreakdown = safeItems.reduce((acc, item) => {
    item.taxes.forEach((t) => {
      if (t.taxType && t.taxType !== "No Tax") {
        const rate = Number(t.taxRate || 0);
        const amt = item.baseTotal * (rate / 100);
        if (amt > 0) {
          const key = `${t.taxType} (${rate}%)`;
          acc[key] = (acc[key] || 0) + amt;
        }
      }
    });
    return acc;
  }, {});

  return {
    ...invoiceData,
    items: safeItems,
    subtotal,
    taxAmount,
    taxBreakdown,
    discountAmount: discount,
    shippingAmount: shipping,
    grandTotal,
    invoice: {
      ...invoiceData.invoice,
      subtotal,
      discountAmount: discount,
      taxAmount,
      taxBreakdown,
      grandTotal,
    },
  };
};