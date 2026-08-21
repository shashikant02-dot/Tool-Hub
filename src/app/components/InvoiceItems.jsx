"use client";

import { TAX_OPTIONS, getItemTaxes } from "@/app/utils/calculateInvoice";

export default function InvoiceItems({ invoiceData, setInvoiceData }) {
  const { items } = invoiceData;

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          hsn: "",
          qty: 1,
          price: 0,
          taxes: [{ taxType: "CGST", taxRate: 9 }],
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };

    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const updateItemTax = (itemIndex, taxIndex, field, value) => {
    const updated = [...items];
    const item = { ...updated[itemIndex] };
    const taxes = [...getItemTaxes(item)];
    const currentTax = { ...taxes[taxIndex], [field]: value };

    if (field === "taxType") {
      if (value === "No Tax") {
        currentTax.taxRate = 0;
      } else {
        const option = TAX_OPTIONS.find((o) => o.value === value);
        if (option && (currentTax.taxRate === undefined || currentTax.taxRate === 0)) {
          currentTax.taxRate = option.defaultRate;
        }
      }
    }

    taxes[taxIndex] = currentTax;
    item.taxes = taxes;
    updated[itemIndex] = item;

    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const addTaxToItem = (itemIndex) => {
    const updated = [...items];
    const item = { ...updated[itemIndex] };
    const taxes = [...getItemTaxes(item)];

    const defaultNextType = taxes[0]?.taxType === "CGST" ? "SGST" : "CGST";
    const option = TAX_OPTIONS.find((o) => o.value === defaultNextType) || TAX_OPTIONS[0];

    taxes.push({
      taxType: option.value,
      taxRate: option.defaultRate,
    });

    item.taxes = taxes;
    updated[itemIndex] = item;

    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const removeTaxFromItem = (itemIndex, taxIndex) => {
    const updated = [...items];
    const item = { ...updated[itemIndex] };
    const taxes = getItemTaxes(item).filter((_, i) => i !== taxIndex);

    item.taxes = taxes.length > 0 ? taxes : [{ taxType: "No Tax", taxRate: 0 }];
    updated[itemIndex] = item;

    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const getLineAmounts = (item) => {
    const qty = Number(item.qty || 0);
    const price = Number(item.price || 0);
    const amount = qty * price;

    const taxes = getItemTaxes(item);
    const taxDetails = taxes.map((t) => {
      const rate = t.taxType === "No Tax" ? 0 : Number(t.taxRate || 0);
      const taxAmt = amount * (rate / 100);
      return {
        taxType: t.taxType,
        taxRate: rate,
        taxAmt,
      };
    });

    const taxAmount = taxDetails.reduce((sum, t) => sum + t.taxAmt, 0);
    const total = amount + taxAmount;
    return { amount, taxAmount, total, taxes, taxDetails };
  };

  const subtotal = items.reduce(
    (sum, item) => sum + getLineAmounts(item).amount,
    0
  );

  const totalTax = items.reduce(
    (sum, item) => sum + getLineAmounts(item).taxAmount,
    0
  );

  const taxBreakdown = items.reduce((acc, item) => {
    const qty = Number(item.qty || 0);
    const price = Number(item.price || 0);
    const amount = qty * price;
    const taxes = getItemTaxes(item);

    taxes.forEach((t) => {
      if (t.taxType && t.taxType !== "No Tax") {
        const rate = Number(t.taxRate || 0);
        const amt = amount * (rate / 100);
        if (amt > 0) {
          const key = `${t.taxType} (${rate}%)`;
          acc[key] = (acc[key] || 0) + amt;
        }
      }
    });

    return acc;
  }, {});

  const itemTaxBreakdown = items.map((item, idx) => {
    const { amount, taxAmount, taxDetails } = getLineAmounts(item);
    const name = item.description?.trim() || `Item ${idx + 1}`;
    return {
      name,
      amount,
      taxAmount,
      taxDetails: taxDetails.filter((t) => t.taxAmt > 0),
    };
  }).filter((item) => item.taxAmount > 0);

  const grandTotal = subtotal + totalTax;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Invoice Items
          </h2>
          <p className="text-sm text-gray-400">Add products or services</p>
        </div>

        <button
          onClick={addItem}
          type="button"
          className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-3 text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
        >
          + Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/[0.03]">
            <tr>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300">
                Description
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 w-28">
                HSN/SAC
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 w-20">
                Qty
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 w-28">
                Price
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 w-24">
                Amount
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 min-w-[240px]">
                Taxes (Type & Rate)
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 min-w-[130px]">
                Tax Amt
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-left font-semibold text-gray-300 w-28">
                Total
              </th>
              <th className="border-b border-white/10 px-4 py-4 text-center font-semibold text-gray-300 w-20">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const { amount, taxAmount, total, taxes, taxDetails } = getLineAmounts(item);

              return (
                <tr
                  key={index}
                  className="group border-b border-white/5 transition-colors duration-300 hover:bg-white/[0.04] align-top"
                >
                  <td className="px-4 py-4">
                    <input
                      className="w-full min-w-[160px] rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-4 py-4">
                    <input
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
                      placeholder="998314"
                      value={item.hsn || ""}
                      onChange={(e) => updateItem(index, "hsn", e.target.value)}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <input
                      type="number"
                      min={1}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 text-center outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06]"
                      value={item.qty}
                      onChange={(e) => updateItem(index, "qty", e.target.value)}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 text-center outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06]"
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", e.target.value)}
                    />
                  </td>

                  <td className="px-4 py-4 text-gray-300 whitespace-nowrap pt-6">
                    ₹{amount.toFixed(2)}
                  </td>

                  {/* Taxes Column (Multiple tax entries + Add Tax button) */}
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      {taxes.map((t, tIndex) => (
                        <div key={tIndex} className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <select
                              value={t.taxType ?? "CGST"}
                              onChange={(e) =>
                                updateItemTax(index, tIndex, "taxType", e.target.value)
                              }
                              className="w-full appearance-none rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 pr-8 outline-none transition-all cursor-pointer focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 bg-[#0a0a0a]"
                            >
                              {TAX_OPTIONS.map((opt) => (
                                <option key={opt.value} className="bg-[#0a0a0a]" value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative w-20">
                            <input
                              type="number"
                              min={0}
                              disabled={t.taxType === "No Tax"}
                              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-2 py-2 pr-5 text-center outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06] disabled:opacity-40"
                              value={t.taxType === "No Tax" ? 0 : t.taxRate ?? 0}
                              onChange={(e) =>
                                updateItemTax(index, tIndex, "taxRate", e.target.value)
                              }
                            />
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                              %
                            </span>
                          </div>

                          {taxes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTaxFromItem(index, tIndex)}
                              className="text-red-400 hover:text-red-300 text-xs px-1 font-bold transition-colors"
                              title="Remove Tax"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addTaxToItem(index)}
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 pt-1"
                      >
                        + Add Tax
                      </button>
                    </div>
                  </td>

                  {/* Tax Amt Cell — Displays total tax & itemized breakdown */}
                  <td className="px-4 py-4 whitespace-nowrap pt-5">
                    <div className="font-medium text-white">₹{taxAmount.toFixed(2)}</div>
                    {taxDetails.length > 0 && taxAmount > 0 && (
                      <div className="text-[11px] text-gray-400 space-y-0.5 mt-1">
                        {taxDetails.map((td, idx) => (
                          td.taxAmt > 0 && (
                            <div key={idx} className="flex gap-1.5">
                              <span className="text-gray-400">{td.taxType} ({td.taxRate}%):</span>
                              <span className="text-gray-300">₹{td.taxAmt.toFixed(2)}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4 font-semibold text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text whitespace-nowrap pt-6">
                    ₹{total.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 text-center pt-5">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-red-400 transition-all duration-300 hover:bg-red-500/15 hover:border-red-500/50 hover:-translate-y-0.5"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-8 p-5">
        <div className="group relative overflow-hidden w-full sm:w-88 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-sm transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative z-10 space-y-3">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-300">
              <span>Total Tax</span>
              <span>₹{totalTax.toFixed(2)}</span>
            </div>

            {/* Detailed Item-wise Tax Breakdown */}
            {itemTaxBreakdown.length > 0 && (
              <div className="space-y-2 pl-3 py-1 border-l-2 border-indigo-500/40 my-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                  Item-wise Tax Breakdown
                </div>
                {itemTaxBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-xs text-gray-300 font-medium">
                      <span className="truncate max-w-[150px]">• {item.name}</span>
                      <span>₹{item.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="pl-3 text-[11px] text-gray-400 space-y-0.5">
                      {item.taxDetails.map((td, tIdx) => (
                        <div key={tIdx} className="flex justify-between">
                          <span>{td.taxType} ({td.taxRate}%)</span>
                          <span>₹{td.taxAmt.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between text-lg text-white border-t border-white/10 pt-3">
              <span>Items Total</span>
              <span className="font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 -mt-1">
              Discount &amp; shipping added below, in the final Grand Total.
            </p>
          </div>

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
        </div>
      </div>
    </div>
  );
}