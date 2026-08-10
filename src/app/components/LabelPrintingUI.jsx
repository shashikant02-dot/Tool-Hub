"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";

const EMPTY_FORM = {
  businessName: "",
  businessAddress: "",
  gstin: "",

  orderId: "",
  orderDate: "",
  courierName: "",
  awbNo: "",
  trackingId: "",
  shipMode: "SURFACE",

  paymentMode: "Prepaid",
  codAmount: "",

  customerName: "",
  customerPhone: "",
  customerAddress: "",
  customerCity: "",
  customerState: "",
  customerPincode: "",

  routingCode: "",
};

export default function LabelPrintingUI() {
  const [form, setForm] = useState(EMPTY_FORM);

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState(1);

  const [labelQuantity, setLabelQuantity] = useState(1);
  const [labels, setLabels] = useState([]);

  const barcodeCache = useRef({});
  const [barcodeImages, setBarcodeImages] = useState({});

  /* =====================================================
     FORM
  ===================================================== */

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =====================================================
     ADD ITEM
  ===================================================== */

  const addItem = () => {
    const name = itemName.trim();

    if (!name) {
      alert("Please enter product name.");
      return;
    }

    const quantity = Math.max(1, Number(itemQty) || 1);

    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        qty: quantity,
      },
    ]);

    setItemName("");
    setItemQty(1);
  };

  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* =====================================================
     UPDATE ITEM QTY
  ===================================================== */

  const updateItemQty = (id, qty) => {
    const value = Math.max(1, Number(qty) || 1);

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: value,
            }
          : item
      )
    );
  };

  /* =====================================================
     TOTAL QTY
  ===================================================== */

  const getTotalQty = (productItems = []) => {
    return productItems.reduce(
      (total, item) => total + Number(item.qty || 0),
      0
    );
  };

  /* =====================================================
     GENERATE LABELS
     
     IMPORTANT:
     labelQuantity = EXACT NUMBER OF LABELS
  ===================================================== */

  const addLabel = () => {
    if (!form.businessName.trim()) {
      alert("Please enter Business Name.");
      return;
    }

    if (!form.businessAddress.trim()) {
      alert("Please enter Business Address.");
      return;
    }

    if (!form.orderId.trim()) {
      alert("Please enter Order ID.");
      return;
    }

    if (!form.customerName.trim()) {
      alert("Please enter Customer Name.");
      return;
    }

    if (!form.customerAddress.trim()) {
      alert("Please enter Customer Address.");
      return;
    }

    if (!form.customerPincode.trim()) {
      alert("Please enter Customer Pincode.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const quantity = Math.max(
      1,
      Math.min(1000, Number(labelQuantity) || 1)
    );

    const tracking =
      form.trackingId.trim() ||
      form.awbNo.trim() ||
      form.orderId.trim();

    /*
      IMPORTANT:
      Generate ONE fixed print date here.
      DO NOT use new Date() directly inside JSX.
    */

    const printDate = new Date().toLocaleString("en-IN");

    const newLabels = Array.from(
      { length: quantity },
      (_, index) => ({
        id: crypto.randomUUID(),

        /*
          Internal label number.
          This is useful for debugging and guarantees
          every generated label is unique.
        */
        labelNumber: index + 1,

        businessName: form.businessName,
        businessAddress: form.businessAddress,
        gstin: form.gstin,

        orderId: form.orderId,
        orderDate: form.orderDate,

        courierName: form.courierName,
        awbNo: form.awbNo,

        trackingId: tracking,

        shipMode: form.shipMode,

        paymentMode: form.paymentMode,
        codAmount: form.codAmount,

        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerAddress: form.customerAddress,
        customerCity: form.customerCity,
        customerState: form.customerState,
        customerPincode: form.customerPincode,

        routingCode: form.routingCode,

        printDate,

        items: items.map((item) => ({
          id: crypto.randomUUID(),
          name: item.name,
          qty: item.qty,
        })),
      })
    );

    /*
      EXACTLY quantity labels are appended.
      
      Example:
      Existing = 0
      quantity = 25
      Result = 25

      Existing = 25
      quantity = 50
      Result = 75
    */

    setLabels((prev) => [...prev, ...newLabels]);
  };

  /* =====================================================
     DELETE LABEL
  ===================================================== */

  const deleteLabel = (id) => {
    setLabels((prev) =>
      prev.filter((label) => label.id !== id)
    );
  };

  /* =====================================================
     CLEAR ALL
  ===================================================== */

  const clearLabels = () => {
    if (labels.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all generated labels?"
    );

    if (!confirmed) return;

    setLabels([]);
    barcodeCache.current = {};
    setBarcodeImages({});
  };

  /* =====================================================
     BARCODE VALUES
  ===================================================== */

  const barcodeValues = useMemo(() => {
    const values = new Set();

    labels.forEach((label) => {
      if (label.orderId) {
        values.add(label.orderId);
      }

      if (label.trackingId) {
        values.add(label.trackingId);
      }
    });

    return Array.from(values);
  }, [labels]);

  /* =====================================================
     GENERATE BARCODES
  ===================================================== */

  useEffect(() => {
    if (barcodeValues.length === 0) {
      return;
    }

    const generated = {};

    barcodeValues.forEach((value) => {
      if (!value) return;

      if (barcodeCache.current[value]) {
        generated[value] = barcodeCache.current[value];
        return;
      }

      try {
        const canvas = document.createElement("canvas");

        JsBarcode(canvas, String(value), {
          format: "CODE128",
          displayValue: false,
          margin: 0,
          height: 45,
          width: 2,
        });

        const image = canvas.toDataURL("image/png");

        barcodeCache.current[value] = image;
        generated[value] = image;
      } catch (error) {
        console.error(
          "Barcode generation failed:",
          error
        );
      }
    });

    setBarcodeImages((prev) => ({
      ...prev,
      ...generated,
    }));
  }, [barcodeValues]);

  /* =====================================================
     PRINT
  ===================================================== */

  const printLabels = () => {
    if (labels.length === 0) {
      alert("Please generate at least one label.");
      return;
    }

    window.print();
  };

  /* =====================================================
     RESET FORM
  ===================================================== */

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
    });

    setItems([]);
    setItemName("");
    setItemQty(1);
    setLabelQuantity(1);
  };

  /* =====================================================
     A4 PAGES
     
     EXACTLY 4 LABELS PER A4.
     
     25 labels:
     Page 1 = 4
     Page 2 = 4
     Page 3 = 4
     Page 4 = 4
     Page 5 = 4
     Page 6 = 4
     Page 7 = 1

     TOTAL = 25
  ===================================================== */

  const pages = useMemo(() => {
    const result = [];

    for (let i = 0; i < labels.length; i += 4) {
      result.push(labels.slice(i, i + 4));
    }

    return result;
  }, [labels]);

  /* =====================================================
     SCREEN
  ===================================================== */

  return (
    <>
      {/* =================================================
          SCREEN UI
      ================================================= */}

      <div className="label-screen mx-auto w-full max-w-6xl px-4 py-8 text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Business Shipping Label
          </h1>

          <p className="mt-2 text-slate-400">
            Create professional shipping labels for
            your business orders.
          </p>
        </div>

        {/* =================================================
            BUSINESS DETAILS
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Business Details
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Seller information printed on the label.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Business Name *"
              placeholder="Karwaan India Foundation"
              value={form.businessName}
              onChange={(value) =>
                updateForm("businessName", value)
              }
            />

            <Input
              label="GSTIN"
              placeholder="07AAICK4071E1ZN"
              value={form.gstin}
              onChange={(value) =>
                updateForm("gstin", value)
              }
            />

            <div className="md:col-span-2">
              <Input
                label="Business Address *"
                placeholder="Complete business / seller address"
                value={form.businessAddress}
                onChange={(value) =>
                  updateForm(
                    "businessAddress",
                    value
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* =================================================
            ORDER
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Order & Courier Details
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Order ID *"
              placeholder="OD332021013257515100"
              value={form.orderId}
              onChange={(value) =>
                updateForm("orderId", value)
              }
            />

            <Input
              label="Order Date"
              type="date"
              value={form.orderDate}
              onChange={(value) =>
                updateForm("orderDate", value)
              }
            />

            <Input
              label="Courier Name"
              placeholder="E-Kart Logistics"
              value={form.courierName}
              onChange={(value) =>
                updateForm(
                  "courierName",
                  value
                )
              }
            />

            <Input
              label="AWB Number"
              placeholder="FMPC3955993362"
              value={form.awbNo}
              onChange={(value) =>
                updateForm("awbNo", value)
              }
            />

            <Input
              label="Tracking ID"
              placeholder="FMPC3955993362"
              value={form.trackingId}
              onChange={(value) =>
                updateForm(
                  "trackingId",
                  value
                )
              }
            />

            <Input
              label="Routing Code"
              placeholder="AS/DBH/MRN"
              value={form.routingCode}
              onChange={(value) =>
                updateForm(
                  "routingCode",
                  value
                )
              }
            />
          </div>

          {/* SHIPPING MODE */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Shipping Mode
            </label>

            <div className="flex flex-wrap gap-3">
              {["SURFACE", "EXPRESS"].map(
                (mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() =>
                      updateForm(
                        "shipMode",
                        mode
                      )
                    }
                    className={`rounded-lg border px-5 py-2.5 text-sm font-semibold ${
                      form.shipMode === mode
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    {mode}
                  </button>
                )
              )}
            </div>
          </div>

          {/* PAYMENT */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Payment Mode
            </label>

            <div className="flex flex-wrap gap-3">
              {["Prepaid", "COD"].map(
                (mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() =>
                      updateForm(
                        "paymentMode",
                        mode
                      )
                    }
                    className={`rounded-lg border px-5 py-2.5 text-sm font-semibold ${
                      form.paymentMode === mode
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    {mode}
                  </button>
                )
              )}
            </div>
          </div>

          {form.paymentMode === "COD" && (
            <div className="mt-5 max-w-sm">
              <Input
                label="COD Amount"
                placeholder="229.00"
                value={form.codAmount}
                onChange={(value) =>
                  updateForm(
                    "codAmount",
                    value
                  )
                }
              />
            </div>
          )}
        </section>

        {/* =================================================
            CUSTOMER
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Customer / Shipping Address
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Customer Name *"
              placeholder="Meghna Roy"
              value={form.customerName}
              onChange={(value) =>
                updateForm(
                  "customerName",
                  value
                )
              }
            />

            <Input
              label="Phone"
              placeholder="9876543210"
              value={form.customerPhone}
              onChange={(value) =>
                updateForm(
                  "customerPhone",
                  value
                )
              }
            />

            <div className="md:col-span-2">
              <Input
                label="Customer Address *"
                placeholder="Sunil Lodge, Thana Road Saha Para"
                value={form.customerAddress}
                onChange={(value) =>
                  updateForm(
                    "customerAddress",
                    value
                  )
                }
              />
            </div>

            <Input
              label="City"
              placeholder="Itahar"
              value={form.customerCity}
              onChange={(value) =>
                updateForm(
                  "customerCity",
                  value
                )
              }
            />

            <Input
              label="State"
              placeholder="West Bengal"
              value={form.customerState}
              onChange={(value) =>
                updateForm(
                  "customerState",
                  value
                )
              }
            />

            <Input
              label="Pincode *"
              placeholder="733128"
              value={form.customerPincode}
              onChange={(value) =>
                updateForm(
                  "customerPincode",
                  value
                )
              }
            />
          </div>
        </section>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Products
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-4">
              <label className="mb-2 block text-sm text-slate-300">
                Product Name
              </label>

              <input
                value={itemName}
                onChange={(e) =>
                  setItemName(e.target.value)
                }
                placeholder="Blue Yoga Mat 6mm"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                value={itemQty}
                onChange={(e) =>
                  setItemQty(e.target.value)
                }
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
            </div>

            <button
              type="button"
              onClick={addItem}
              className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold"
            >
              + Add Item
            </button>
          </div>

          {items.length > 0 && (
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      Product
                    </th>

                    <th className="px-4 py-3 text-center">
                      Qty
                    </th>

                    <th className="px-4 py-3 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-white/10"
                    >
                      <td className="px-4 py-3">
                        {item.name}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            updateItemQty(
                              item.id,
                              e.target.value
                            )
                          }
                          className="w-20 rounded border border-white/10 bg-black/20 px-2 py-1 text-center"
                        />
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="text-red-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* =================================================
            LABEL QUANTITY
        ================================================= */}

        <section className="mb-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.05] p-6">
          <h2 className="text-xl font-semibold">
            Number of Labels
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Select exactly how many cards you want
            to generate.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setLabelQuantity((prev) =>
                  Math.max(1, prev - 1)
                )
              }
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl"
            >
              −
            </button>

            <input
              type="number"
              min="1"
              max="1000"
              value={labelQuantity}
              onChange={(e) => {
                const raw = e.target.value;

                if (raw === "") {
                  setLabelQuantity("");
                  return;
                }

                let value = Number(raw);

                if (value < 1) value = 1;
                if (value > 1000) value = 1000;

                setLabelQuantity(value);
              }}
              onBlur={() => {
                if (
                  !labelQuantity ||
                  Number(labelQuantity) < 1
                ) {
                  setLabelQuantity(1);
                }
              }}
              className="h-12 w-28 rounded-xl border border-white/10 bg-black/30 text-center text-lg font-bold text-white outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setLabelQuantity((prev) =>
                  Math.min(
                    1000,
                    Number(prev || 0) + 1
                  )
                )
              }
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl"
            >
              +
            </button>

            <span className="text-sm text-slate-400">
              {Number(labelQuantity) || 0}{" "}
              {Number(labelQuantity) === 1
                ? "card"
                : "cards"}{" "}
              will be generated
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {[1, 2, 4, 10, 25, 50, 100].map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() =>
                    setLabelQuantity(number)
                  }
                  className={`rounded-lg border px-4 py-2 text-sm ${
                    Number(labelQuantity) === number
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-white/10 bg-white/5 text-slate-300"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </section>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addLabel}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-bold"
          >
            + Generate{" "}
            {Number(labelQuantity) || 0} Label
            {Number(labelQuantity) > 1
              ? "s"
              : ""}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold"
          >
            Reset Form
          </button>

          {labels.length > 0 && (
            <>
              <button
                type="button"
                onClick={printLabels}
                className="rounded-xl bg-emerald-600 px-8 py-3 font-bold"
              >
                🖨 Print {labels.length} Label
                {labels.length > 1
                  ? "s"
                  : ""}
              </button>

              <button
                type="button"
                onClick={clearLabels}
                className="rounded-xl border border-red-500/30 px-6 py-3 text-red-400"
              >
                Clear All
              </button>
            </>
          )}
        </div>

        {/* =================================================
            GENERATED INFO
        ================================================= */}

        {labels.length > 0 && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-400">
                  Generated Labels
                </p>

                <p className="text-2xl font-bold">
                  {labels.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  A4 Pages
                </p>

                <p className="text-2xl font-bold">
                  {Math.ceil(labels.length / 4)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Labels Per Page
                </p>

                <p className="text-2xl font-bold">
                  4
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          PRINT AREA
          
          IMPORTANT:
          This is the ONLY area printed.
      ================================================= */}

      <div className="label-print-area">
        {pages.map((pageLabels, pageIndex) => {
          const isLastPage =
            pageIndex === pages.length - 1;

          return (
            <div
              className={`print-sheet ${
                isLastPage
                  ? "last-print-sheet"
                  : ""
              }`}
              key={`page-${pageIndex}`}
            >
              {pageLabels.map((label) => (
                <div
                  className="print-card"
                  key={label.id}
                >
                  <ShippingLabel
                    label={label}
                    barcodeImages={barcodeImages}
                    getTotalQty={getTotalQty}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* =================================================
          NORMAL STYLE TAG
          
          NOT styled-jsx.
          
          This removes the jsx-xxxx hydration
          class mismatch problem.
      ================================================= */}

      <style>{`
        * {
          box-sizing: border-box;
        }

        .label-print-area {
          display: none;
        }

        /* =================================================
           PRINT
        ================================================= */

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html,
          body {
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;

            margin: 0 !important;
            padding: 0 !important;

            background: #ffffff !important;
          }

          body {
            overflow: visible !important;
          }

          /*
            HIDE NORMAL WEBSITE
          */

          body * {
            visibility: hidden !important;
          }

          /*
            SHOW PRINT AREA ONLY
          */

          .label-print-area,
          .label-print-area * {
            visibility: visible !important;
          }

          .label-screen {
            display: none !important;
          }

          /*
            PRINT AREA
          */

          .label-print-area {
            display: block !important;

            width: 210mm !important;

            margin: 0 !important;
            padding: 0 !important;

            background: #ffffff !important;
          }

          /*
            EXACT A4 SHEET

            210mm × 297mm
          */

          .print-sheet {
            width: 210mm !important;
            height: 297mm !important;

            min-width: 210mm !important;
            max-width: 210mm !important;

            min-height: 297mm !important;
            max-height: 297mm !important;

            margin: 0 !important;
            padding: 4mm !important;

            display: grid !important;

            grid-template-columns:
              99mm 99mm !important;

            grid-template-rows:
              143mm 143mm !important;

            gap: 4mm !important;

            background: #ffffff !important;

            overflow: hidden !important;

            page-break-after: always !important;
            break-after: page !important;

            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /*
            VERY IMPORTANT:
            LAST PAGE MUST NOT CREATE AN EXTRA PAGE
          */

          .print-sheet.last-print-sheet {
            page-break-after: auto !important;
            break-after: auto !important;
          }

          /*
            EACH CARD

            99mm × 143mm
          */

          .print-card {
            width: 99mm !important;
            height: 143mm !important;

            min-width: 99mm !important;
            max-width: 99mm !important;

            min-height: 143mm !important;
            max-height: 143mm !important;

            margin: 0 !important;
            padding: 0 !important;

            overflow: hidden !important;

            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /*
            LABEL
          */

          .shipping-label {
            width: 99mm !important;
            height: 143mm !important;

            min-width: 99mm !important;
            max-width: 99mm !important;

            min-height: 143mm !important;
            max-height: 143mm !important;

            margin: 0 !important;
            padding: 0 !important;

            border: 1px solid #111111 !important;

            background: #ffffff !important;
            color: #000000 !important;

            overflow: hidden !important;

            box-sizing: border-box !important;

            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /*
            INTERNAL LABEL
          */

          .label-header {
            height: 15mm !important;
            min-height: 15mm !important;
          }

          .label-main {
            height: 43mm !important;
            min-height: 43mm !important;
          }

          .courier-column {
            height: 43mm !important;
            min-height: 43mm !important;
          }

          .address-area {
            height: 43mm !important;
            min-height: 43mm !important;
          }

          .payment-row {
            height: 8mm !important;
            min-height: 8mm !important;
          }

          .seller-section {
            min-height: 16mm !important;
          }

          .tracking-section {
            height: 17mm !important;
            min-height: 17mm !important;
          }

          .qr-wrapper {
            width: 24mm !important;
            height: 24mm !important;
          }

          .qr-wrapper svg {
            width: 24mm !important;
            height: 24mm !important;
          }

          .vertical-barcode {
            width: 11mm !important;
            height: 30mm !important;
          }

          .tracking-barcode {
            width: 70mm !important;
            height: 10mm !important;
          }

          .label-footer {
            position: absolute !important;

            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
          }
        }

        /* =================================================
           LABEL
        ================================================= */

        .shipping-label {
          position: relative;

          width: 99mm;
          height: 143mm;

          border: 1px solid #111;

          background: #fff;
          color: #000;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          overflow: hidden;

          box-sizing: border-box;
        }

        /* =================================================
           HEADER
        ================================================= */

        .label-header {
          width: 100%;
          height: 15mm;

          display: grid;

          grid-template-columns:
            25mm 1fr 25mm;

          border-bottom: 1px solid #111;
        }

        .header-cell {
          border-right: 1px solid #111;

          padding: 1.5mm 2mm;

          overflow: hidden;
        }

        .header-cell:last-child {
          border-right: 0;
        }

        .header-title {
          font-size: 9px;
          font-weight: 700;

          margin-bottom: 2px;
        }

        .header-value {
          font-size: 8px;
          font-weight: 600;

          word-break: break-all;
        }

        .ship-mode {
          text-align: center;

          font-size: 9px;
          font-weight: 800;

          padding-top: 1mm;
        }

        .ship-mode span {
          display: block;

          font-size: 7px;

          margin-top: 1mm;

          text-decoration: underline;
        }

        /* =================================================
           MAIN
        ================================================= */

        .label-main {
          width: 100%;
          height: 43mm;

          display: grid;

          grid-template-columns:
            32mm 1fr;

          border-bottom: 1px solid #111;
        }

        /* =================================================
           COURIER
        ================================================= */

        .courier-column {
          position: relative;

          width: 32mm;
          height: 43mm;

          border-right: 1px solid #111;

          padding: 2mm;

          display: flex;
          flex-direction: column;
          align-items: center;

          overflow: hidden;
        }

        .ordered-text {
          align-self: flex-start;

          font-size: 6.5px;

          margin-bottom: 1mm;
        }

        .business-logo {
          max-width: 27mm;

          text-align: center;

          font-size: 12px;
          font-weight: 900;

          line-height: 1.05;

          word-break: break-word;

          margin-bottom: 2mm;
        }

        .business-logo span {
          display: block;

          font-size: 6px;
          font-weight: 600;

          letter-spacing: 0.5px;

          margin-top: 1mm;
        }

        .vertical-barcode {
          width: 11mm;
          height: 30mm;

          object-fit: fill;

          transform: rotate(90deg);

          margin-top: 4mm;
        }

        .awb-vertical {
          position: absolute;

          right: 1mm;
          top: 12mm;

          writing-mode: vertical-rl;

          font-size: 7px;

          font-weight: 700;
        }

        .courier-footer {
          position: absolute;

          bottom: 2mm;

          left: 2mm;
          right: 2mm;

          font-size: 6px;

          text-align: center;

          font-weight: 700;
        }

        /* =================================================
           ADDRESS
        ================================================= */

        .address-area {
          position: relative;

          height: 43mm;

          padding: 2.5mm;

          overflow: hidden;
        }

        .address-heading {
          font-size: 8px;

          font-weight: 700;

          margin-bottom: 1mm;
        }

        .customer-name {
          font-size: 9px;

          font-weight: 800;

          margin-bottom: 1mm;

          padding-right: 26mm;
        }

        .customer-address {
          font-size: 7px;

          line-height: 1.35;

          padding-right: 26mm;

          word-break: break-word;
        }

        .customer-phone {
          font-size: 7px;

          margin-top: 1mm;

          font-weight: 600;

          padding-right: 26mm;
        }

        /* =================================================
           QR
        ================================================= */

        .qr-wrapper {
          position: absolute;

          right: 2.5mm;
          top: 2.5mm;

          width: 24mm;
          height: 24mm;

          background: #fff;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .qr-wrapper svg {
          width: 24mm !important;
          height: 24mm !important;
        }

        /* =================================================
           SHIPPING MODE
        ================================================= */

        .surface-badge {
          position: absolute;

          right: 3mm;
          bottom: 2mm;

          border: 1px solid #111;

          padding: 1mm 2mm;

          font-size: 7px;

          font-weight: 800;
        }

        /* =================================================
           PAYMENT
        ================================================= */

        .payment-row {
          width: 100%;

          min-height: 8mm;

          display: flex;

          justify-content: space-between;

          align-items: center;

          padding: 1.5mm 2.5mm;

          border-bottom: 1px solid #111;

          font-size: 7px;

          font-weight: 800;
        }

        .cod-box {
          border: 1px solid #111;

          padding: 1mm 2mm;
        }

        /* =================================================
           SELLER
        ================================================= */

        .seller-section {
          width: 100%;

          min-height: 16mm;

          padding: 1.8mm 2.5mm;

          border-bottom: 1px solid #111;

          overflow: hidden;
        }

        .seller-title {
          font-size: 7px;

          font-weight: 800;

          margin-bottom: 1mm;
        }

        .seller-text {
          font-size: 6.5px;

          line-height: 1.3;

          word-break: break-word;
        }

        /* =================================================
           PRODUCT TABLE
        ================================================= */

        .product-table {
          width: 100%;

          border-collapse: collapse;

          font-size: 6.5px;

          table-layout: fixed;
        }

        .product-table th,
        .product-table td {
          border: 1px solid #111;

          padding: 1mm 1.5mm;

          text-align: left;
        }

        .product-table th:first-child,
        .product-table td:first-child {
          width: calc(100% - 12mm);
        }

        .product-table th:last-child,
        .product-table td:last-child {
          width: 12mm;

          text-align: center;
        }

        .product-name {
          font-weight: 600;

          word-break: break-word;
        }

        .total-row td {
          font-weight: 800;
        }

        .total-row td:first-child {
          text-align: right;
        }

        /* =================================================
           ROUTING
        ================================================= */

        .routing-row {
          width: 100%;

          min-height: 7mm;

          display: flex;

          justify-content: space-between;

          align-items: center;

          padding: 1.5mm 2.5mm;

          font-size: 7px;

          font-weight: 800;

          border-bottom: 1px solid #111;
        }

        /* =================================================
           TRACKING
        ================================================= */

        .tracking-section {
          width: 100%;

          height: 17mm;

          text-align: center;

          padding: 1.5mm 2mm;

          border-bottom: 1px solid #111;

          overflow: hidden;
        }

        .tracking-label {
          font-size: 6.5px;

          font-weight: 700;

          margin-bottom: 1mm;

          white-space: nowrap;
        }

        .tracking-barcode {
          display: block;

          width: 70mm;

          height: 10mm;

          object-fit: contain;

          margin: auto;
        }

        /* =================================================
           FOOTER
        ================================================= */

        .label-footer {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          width: 100%;

          min-height: 8mm;

          display: flex;

          justify-content: space-between;

          align-items: center;

          padding: 1.5mm 2.5mm;

          border-top: 1px solid #111;

          font-size: 6.5px;

          font-weight: 600;

          background: #fff;
        }

        .not-resale {
          font-weight: 800;
        }

        .print-date {
          text-align: right;
        }
      `}</style>
    </>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
      />
    </div>
  );
}

/* =========================================================
   SHIPPING LABEL
========================================================= */

function ShippingLabel({
  label,
  barcodeImages,
  getTotalQty,
}) {
  const orderBarcode =
    barcodeImages[label.orderId];

  const trackingBarcode =
    barcodeImages[label.trackingId];

  const totalQty =
    getTotalQty(label.items);

  return (
    <div className="shipping-label">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="label-header">
        <div className="header-cell">
          <div className="header-title">
            STD
          </div>

          <div className="header-value">
            {label.courierName || "Courier"}
          </div>
        </div>

        <div className="header-cell">
          <div className="header-value">
            {label.orderId}
          </div>

          {label.orderDate && (
            <div
              style={{
                fontSize: "6px",
                marginTop: "1mm",
              }}
            >
              {label.orderDate}
            </div>
          )}
        </div>

        <div className="header-cell">
          <div className="ship-mode">
            {label.shipMode}

            <span>
              {label.paymentMode === "COD"
                ? "COD"
                : "PREPAID"}
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
          CUSTOMER / COURIER
      ================================================= */}

      <div className="label-main">
        <div className="courier-column">
          <div className="ordered-text">
            Ordered through
          </div>

          <div className="business-logo">
            {label.businessName}

            <span>BUSINESS</span>
          </div>

          {orderBarcode && (
            <img
              src={orderBarcode}
              alt=""
              className="vertical-barcode"
            />
          )}

          <div className="awb-vertical">
            AWB No.{" "}
            {label.awbNo ||
              label.trackingId ||
              "-"}
          </div>

          <div className="courier-footer">
            {label.courierName ||
              "LOGISTICS"}
          </div>
        </div>

        <div className="address-area">
          <div className="address-heading">
            Shipping/Customer address:
          </div>

          <div className="customer-name">
            Name: {label.customerName}
          </div>

          <div className="customer-address">
            {label.customerAddress}
          </div>

          <div className="customer-address">
            {[
              label.customerCity,
              label.customerState,
            ]
              .filter(Boolean)
              .join(", ")}

            {label.customerPincode
              ? ` - ${label.customerPincode}`
              : ""}
          </div>

          {label.customerPhone && (
            <div className="customer-phone">
              Phone: {label.customerPhone}
            </div>
          )}

          <div className="qr-wrapper">
            <QRCode
              value={
                label.trackingId ||
                label.orderId ||
                "LABEL"
              }
              size={88}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <div className="surface-badge">
            {label.shipMode}
          </div>
        </div>
      </div>

      {/* =================================================
          PAYMENT
      ================================================= */}

      <div className="payment-row">
        <span>
          {label.paymentMode === "COD"
            ? "COD Collect Amount"
            : "PREPAID - DO NOT COLLECT CASH"}
        </span>

        {label.paymentMode === "COD" && (
          <span className="cod-box">
            ₹{label.codAmount || "0.00"}
          </span>
        )}
      </div>

      {/* =================================================
          SELLER
      ================================================= */}

      <div className="seller-section">
        <div className="seller-title">
          Sold By:
        </div>

        <div className="seller-text">
          <strong>
            {label.businessName}
          </strong>

          {label.businessAddress
            ? `, ${label.businessAddress}`
            : ""}
        </div>

        {label.gstin && (
          <div className="seller-text">
            GSTIN: {label.gstin}
          </div>
        )}
      </div>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <table className="product-table">
        <thead>
          <tr>
            <th>
              SKU ID | Description
            </th>

            <th>QTY</th>
          </tr>
        </thead>

        <tbody>
          {label.items.map((item) => (
            <tr key={item.id}>
              <td className="product-name">
                {item.name}
              </td>

              <td>{item.qty}</td>
            </tr>
          ))}

          <tr className="total-row">
            <td>Total</td>

            <td>{totalQty}</td>
          </tr>
        </tbody>
      </table>

      {/* =================================================
          ROUTING
      ================================================= */}

      {label.routingCode && (
        <div className="routing-row">
          <span>(N)</span>

          <span>
            {label.routingCode}
          </span>
        </div>
      )}

      {/* =================================================
          TRACKING
      ================================================= */}

      <div className="tracking-section">
        <div className="tracking-label">
          Tracking ID:{" "}
          {label.trackingId}
        </div>

        {trackingBarcode && (
          <img
            src={trackingBarcode}
            alt=""
            className="tracking-barcode"
          />
        )}
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="label-footer">
        <span className="not-resale">
          Not for resale.
        </span>

        <span>
          {label.courierName ||
            "Business Logistics"}
        </span>

        <span className="print-date">
          Printed at{" "}
          {label.printDate}
        </span>
      </div>
    </div>
  );
}