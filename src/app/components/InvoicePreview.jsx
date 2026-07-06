"use client";

import QRCode from "react-qr-code";
import DownloadPdf from "./DownloadPdf";
import { useEffect } from "react";
import DownloadWord from "./DownloadWord";

export default function InvoicePreview({ invoiceData }) {
  const { company, customer, invoice, items, tax, discount, shipping } =
    invoiceData;

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
    0,
  );

  const taxAmount = subtotal * (Number(tax || 0) / 100);

  const grandTotal =
    subtotal + taxAmount + Number(shipping || 0) - Number(discount || 0);
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("download-btn")?.click();
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      id="invoice-preview"
      className="bg-white mx-auto"
      style={{
        width: "794px",
        padding: "40px",
        background: "#fff",
      }}
    >
      {" "}
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-8">
        <div>
          {company.logo ? (
            <img
              src={company.logo}
              alt=""
              className="w-24 h-24 object-contain mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
              Logo
            </div>
          )}

          <h1 className="text-3xl font-bold mt-4">
            {company.name || "Company Name"}
          </h1>

          <p className="text-gray-500 mt-2 whitespace-pre-line">
            {company.address || "Company Address"}
          </p>

          <p className="text-gray-500">{company.email}</p>

          <p className="text-gray-500">{company.phone}</p>
        </div>

        <div className="text-right">
          <h1 className="text-5xl font-bold text-blue-600">INVOICE</h1>

          <div className="mt-8 space-y-2">
            <p>
              <span className="font-semibold">Invoice :</span> {invoice.number}
            </p>

            <p>
              <span className="font-semibold">Date :</span> {invoice.date}
            </p>

            <p>
              <span className="font-semibold">Due :</span>{" "}
              {invoice.dueDate || "--"}
            </p>
          </div>
        </div>
      </div>
      {/* Customer */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Bill To</h2>

        <div className="space-y-2">
          <p className="font-semibold text-lg">
            {customer.name || "Customer Name"}
          </p>

          <p className="text-gray-500 whitespace-pre-line">
            {customer.address || "Customer Address"}
          </p>

          <p>{customer.email}</p>

          <p>{customer.phone}</p>
        </div>
      </div>
      {/* Items */}
      <table className="w-full mt-10 border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4 text-left">Description</th>

            <th className="p-4">Qty</th>

            <th className="p-4">Price</th>

            <th className="p-4">Total</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-10 text-gray-400">
                No Items Added
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{item.description}</td>

                <td className="text-center">{item.qty}</td>

                <td className="text-center">
                  ₹{Number(item.price).toFixed(2)}
                </td>

                <td className="text-center font-semibold">
                  ₹{(Number(item.qty) * Number(item.price)).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Totals */}
      <div className="flex justify-end mt-10">
        <div className="w-96 space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>

            <span>₹{taxAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>

            <span>₹{Number(discount).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>

            <span>₹{Number(shipping).toFixed(2)}</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-2xl font-bold">
            <span>Grand Total</span>

            <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="border-t mt-16 pt-8">
        <h3 className="font-bold">Notes</h3>

        <p className="text-gray-500 mt-2">
          {invoiceData.notes || "Thank you for your business."}
        </p>

        <h3 className="font-bold mt-8">Terms & Conditions</h3>

        <p className="text-gray-500 mt-2">
          {invoiceData.terms ||
            "Payment is due within the due date mentioned above."}
        </p>
      </div>
      <div className="border-t mt-10 pt-8 flex justify-between items-end">
        <div>
          {company.signature && (
            <>
              <p className="font-semibold mb-2">Authorized Signature</p>

              <img
                src={company.signature}
                alt="Signature"
                className="w-40 object-contain"
              />
            </>
          )}
        </div>
        <div className="mt-10 border rounded-xl p-5 bg-gray-50">
          <h3 className="font-bold text-lg mb-4">Payment Details</h3>

          <div className="space-y-2 text-sm">
            <p>
              <b>Bank :</b> {company.bankName}
            </p>

            <p>
              <b>Account :</b> {company.accountName}
            </p>

            <p>
              <b>A/C No :</b> {company.accountNumber}
            </p>

            <p>
              <b>IFSC :</b> {company.ifsc}
            </p>

            <p>
              <b>UPI :</b> {company.upi}
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold mb-2">Scan & Pay</p>

          <div className="bg-white p-2 border rounded-lg inline-block">
            <QRCode value={company.upi || "upi://pay"} size={90} />
          </div>
        </div>
      </div>
      {/* <div className="mt-12">
        <DownloadPdf data={invoiceData} />
        <DownloadWord invoiceData={invoiceData} />
      </div> */}
    </div>
  );
}
