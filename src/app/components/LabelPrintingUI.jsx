"use client";

import { useState, useEffect, useRef } from "react";
import { useFreeUsage } from "../context/FreeUsageContext";

const TOOL_NAME = "label-printing";

const SHEET_PRESETS = {
  "Avery 5160 (30/sheet)": { columns: 3, rows: 10, labelWidth: 66.7, labelHeight: 25.4, gap: 2 },
  "Avery 5163 (10/sheet)": { columns: 2, rows: 5, labelWidth: 101.6, labelHeight: 50.8, gap: 3 },
  "2 x 4 inch (8/sheet)": { columns: 2, rows: 4, labelWidth: 101.6, labelHeight: 63.5, gap: 3 },
  "Custom": null,
};

export default function LabelPrintingUI() {
  const { checkLimit, increaseUsage, setShowPopup } = useFreeUsage();

  const [presetName, setPresetName] = useState("Avery 5160 (30/sheet)");
  const [sheet, setSheet] = useState(SHEET_PRESETS["Avery 5160 (30/sheet)"]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    barcodeValue: "",
    qty: 1,
  });

  const [items, setItems] = useState([]);
  const [barcodeUrls, setBarcodeUrls] = useState({});
  const cacheRef = useRef({});

  // Generate barcode images (client-side, CODE128) whenever items change
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { default: JsBarcode } = await import("jsbarcode");
      const updates = {};

      items.forEach((item) => {
        const val = item.barcodeValue || item.name || " ";
        if (!cacheRef.current[val]) {
          try {
            const canvas = document.createElement("canvas");
            JsBarcode(canvas, val, {
              format: "CODE128",
              displayValue: false,
              margin: 0,
              height: 50,
            });
            cacheRef.current[val] = canvas.toDataURL("image/png");
          } catch (err) {
            console.error("Barcode generation failed for:", val, err);
          }
        }
        updates[val] = cacheRef.current[val];
      });

      if (!cancelled) setBarcodeUrls({ ...updates });
    })();

    return () => {
      cancelled = true;
    };
  }, [items]);

  const handlePresetChange = (name) => {
    setPresetName(name);
    if (SHEET_PRESETS[name]) setSheet(SHEET_PRESETS[name]);
  };

  const updateSheetField = (field, value) => {
    setSheet((prev) => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const addItem = () => {
    if (!form.name.trim()) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name: form.name.trim(),
        price: form.price.trim(),
        description: form.description.trim(),
        barcodeValue: form.barcodeValue.trim() || form.name.trim(),
        qty: Math.max(1, Number(form.qty) || 1),
      },
    ]);

    setForm({ name: "", price: "", description: "", barcodeValue: "", qty: 1 });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Number(qty) || 1) } : i))
    );
  };

  const clearAll = () => setItems([]);

  // Expand items into a flat list of individual labels (respecting qty)
  const flatLabels = items.flatMap((item) =>
    Array.from({ length: item.qty }, (_, idx) => ({ ...item, key: `${item.id}-${idx}` }))
  );

  const perPage = sheet ? sheet.columns * sheet.rows : 1;
  const pages = [];
  for (let i = 0; i < flatLabels.length; i += perPage) {
    pages.push(flatLabels.slice(i, i + perPage));
  }

  const handlePrint = () => {
    if (flatLabels.length === 0) return;

    if (checkLimit(TOOL_NAME)) {
      setShowPopup(true);
      return;
    }
    increaseUsage(TOOL_NAME);

    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-10 text-left">

      {/* ================= ADD LABEL FORM ================= */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 shadow-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)] no-print">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <h2 className="relative z-10 text-2xl font-bold text-white mb-6">Add a label</h2>

        <div className="relative z-10 grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Product name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-2.5 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Price</label>
            <input
              type="text"
              placeholder="₹499"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-2.5 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <input
              type="text"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-2.5 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">
              Barcode value <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="Defaults to name"
              value={form.barcodeValue}
              onChange={(e) => setForm({ ...form, barcodeValue: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-2.5 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06] placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Quantity</label>
            <input
              type="number"
              min={1}
              value={form.qty}
              onChange={(e) => setForm({ ...form, qty: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-4 py-2.5 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/[0.06]"
            />
          </div>
        </div>

        <button
          onClick={addItem}
          className="relative z-10 mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
        >
          + Add Label
        </button>

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
      </div>

      {/* ================= SHEET SETTINGS ================= */}
      <div className="group relative overflow-hidden mt-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 shadow-xl transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_60px_rgba(99,102,241,.25)] no-print">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <h2 className="relative z-10 text-2xl font-bold text-white mb-5">Sheet layout</h2>

        <div className="relative z-10 flex flex-wrap gap-2 mb-5">
          {Object.keys(SHEET_PRESETS).map((name) => (
            <button
              key={name}
              onClick={() => handlePresetChange(name)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                presetName === name
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-transparent text-white shadow-lg"
                  : "bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.08] hover:border-indigo-500/30"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {sheet && (
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ["Columns", "columns"],
              ["Rows", "rows"],
              ["Label width (mm)", "labelWidth"],
              ["Label height (mm)", "labelHeight"],
            ].map(([label, field]) => (
              <div key={field} className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">{label}</label>
                <input
                  type="number"
                  value={sheet[field]}
                  onChange={(e) => updateSheetField(field, e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-2 outline-none transition-all focus:border-indigo-500/60"
                />
              </div>
            ))}
          </div>
        )}

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />
      </div>

      {/* ================= ITEMS LIST ================= */}
      {items.length > 0 && (
        <div className="mt-6 no-print">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-medium">
              {items.length} item{items.length > 1 ? "s" : ""} · {flatLabels.length} labels total
            </span>
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 transition-all duration-500 hover:border-indigo-500/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.price && `${item.price} · `}
                    {item.description || "No description"}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    className="w-20 rounded-lg border border-white/10 bg-white/[0.03] text-white px-3 py-1.5 text-center outline-none focus:border-indigo-500/60"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-1.5 text-red-400 text-sm transition-all duration-300 hover:bg-red-500/15 hover:border-red-500/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= PRINT BUTTON ================= */}
      {flatLabels.length > 0 && (
        <div className="mt-6 flex justify-center no-print">
          <button
            onClick={handlePrint}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(99,102,241,.35)]"
          >
            🖨️ Print Labels ({flatLabels.length})
          </button>
        </div>
      )}

      {/* ================= PRINT PREVIEW / PRINT AREA ================= */}
      {sheet && pages.length > 0 && (
        <div className="mt-10 print-area">
          {pages.map((pageLabels, pageIndex) => (
            <div
              key={pageIndex}
              className="sheet-page mx-auto mb-8 bg-white rounded-xl shadow-2xl p-4"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${sheet.columns}, ${sheet.labelWidth}mm)`,
                gridTemplateRows: `repeat(${sheet.rows}, ${sheet.labelHeight}mm)`,
                gap: `${sheet.gap}mm`,
                width: "fit-content",
              }}
            >
              {pageLabels.map((label) => {
                const barcodeSrc = barcodeUrls[label.barcodeValue || label.name];
                return (
                  <div
                    key={label.key}
                    className="label-cell flex flex-col items-center justify-center border border-dashed border-gray-300 overflow-hidden px-2 text-center"
                  >
                    <p className="text-[11px] font-bold text-black truncate w-full">
                      {label.name}
                    </p>
                    {label.price && (
                      <p className="text-[10px] font-semibold text-black">{label.price}</p>
                    )}
                    {barcodeSrc && (
                      <img src={barcodeSrc} alt={label.barcodeValue} className="h-6 my-0.5" />
                    )}
                    <p className="text-[8px] text-black truncate w-full">
                      {label.barcodeValue}
                    </p>
                    {label.description && (
                      <p className="text-[7px] text-gray-600 truncate w-full">
                        {label.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ================= PRINT CSS ================= */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
          }
          .no-print {
            display: none !important;
          }
          .sheet-page {
            box-shadow: none !important;
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
}