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
      <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Invoice Items
          </h2>

          <p className="text-sm text-slate-500">Add products or services</p>
        </div>

        <button
          onClick={addItem}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-slate-200 px-6 py-4 text-left font-semibold text-slate-700">
                Description
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700 w-28">
                Qty
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700 w-36">
                Price
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-700 w-36">
                Total
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-700 w-24">
  Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const total = Number(item.qty || 0) * Number(item.price || 0);

              return (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 outline-none"
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
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center focus:border-blue-500 outline-none"
                      value={item.qty}
                      onChange={(e) => updateItem(index, "qty", e.target.value)}
                    />
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min={0}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center outline-none focus:border-blue-500"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(index, "price", e.target.value)
                      }
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-700">
                    ₹{total.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeItem(index)}
                     className="rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50 transition"
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
        <div className="w-80 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>

            <span className="font-bold">₹{subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
