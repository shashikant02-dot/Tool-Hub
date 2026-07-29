"use client";

export default function InvoiceItems({ invoiceData, setInvoiceData }) {
  const { items } = invoiceData;

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          qty: 1,
          price: 0,
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
    updated[index][field] = value;

    setInvoiceData((prev) => ({
      ...prev,
      items: updated,
    }));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
    0,
  );

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
          className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-3 text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
        >
          + Add Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/[0.03]">
            <tr>
              <th className="border-b border-white/10 px-6 py-4 text-left font-semibold text-gray-300">
                Description
              </th>

              <th className="border-b border-white/10 px-6 py-4 text-left font-semibold text-gray-300 w-28">
                Qty
              </th>

              <th className="border-b border-white/10 px-6 py-4 text-left font-semibold text-gray-300 w-36">
                Price
              </th>

              <th className="border-b border-white/10 px-6 py-4 text-left font-semibold text-gray-300 w-36">
                Total
              </th>

              <th className="border-b border-white/10 px-6 py-4 text-center font-semibold text-gray-300 w-24">
  Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const total = Number(item.qty || 0) * Number(item.price || 0);

              return (
                <tr
                  key={index}
                  className="group border-b border-white/5 transition-colors duration-300 hover:bg-white/[0.04]"
                >
                  <td className="px-6 py-4">
                    <input
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
                      placeholder="Item Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min={1}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 text-center outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06]"
                      value={item.qty}
                      onChange={(e) => updateItem(index, "qty", e.target.value)}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 text-center outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 focus:bg-white/[0.06]"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(index, "price", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text">
                    ₹{total.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeItem(index)}
                     className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2 text-red-400 transition-all duration-300 hover:bg-red-500/15 hover:border-red-500/50 hover:-translate-y-0.5"
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
        <div className="group relative overflow-hidden w-80 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-sm transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

          <div className="relative z-10 flex justify-between text-lg text-white">
            <span>Subtotal</span>

            <span className="font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
        </div>
      </div>
    </div>
  );
}