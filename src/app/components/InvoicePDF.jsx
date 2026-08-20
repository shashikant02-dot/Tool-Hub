import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Svg,
  Path,
  Circle,
  Rect,
} from "@react-pdf/renderer";
import { getItemTaxes, calculateInvoice } from "@/app/utils/calculateInvoice";

const BRAND = "#155d3a";

const CURRENCY_SYMBOLS = {
  INR: "Rs. ", USD: "$", CAD: "$", AUD: "$", EUR: "EUR ", GBP: "GBP ",
};

function getCurrencySymbol(code) {
  if (!code) return "Rs. ";
  return CURRENCY_SYMBOLS[code.toUpperCase()] || `${code} `;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 132, paddingBottom: 70, paddingHorizontal: 0,
    fontSize: 10, fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF", color: "#1F2937",
  },
  content: { paddingHorizontal: 40 },
  headerBanner: {
    position: "absolute", top: 0, left: 0, right: 0,
    backgroundColor: BRAND, paddingHorizontal: 40, paddingVertical: 22,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  logoCircle: { width: 150, height: 70, alignItems: "center", justifyContent: "center", backgroundColor: "transparent" },
  logoImage: { width: 140, height: 65, objectFit: "contain" },
  logoInitials: { fontSize: 16, fontWeight: "bold", color: BRAND },
  headerCompanyBlock: { alignItems: "flex-end", maxWidth: "78%" },
  headerCompanyName: { fontSize: 15, fontWeight: "bold", color: "#FFFFFF", marginBottom: 5, textAlign: "right" },
  headerLine: { fontSize: 8.5, color: "#E5F3EC", marginBottom: 2, textAlign: "right" },
  footerBanner: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: BRAND, paddingVertical: 14, paddingHorizontal: 40,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  footerContact: { flexDirection: "row", alignItems: "center", maxWidth: "32%" },
  footerItem: { fontSize: 8.5, color: "#FFFFFF", marginLeft: 5 },
  titleRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
    borderBottomWidth: 1.5, borderBottomColor: "#1F2937", paddingBottom: 10, marginBottom: 16,
  },
  invoiceTitle: { fontSize: 24, fontWeight: "bold", letterSpacing: 2, color: "#1F2937" },
  gstText: { fontSize: 9, fontWeight: "bold", color: "#1F2937" },
  metaBlock: { marginBottom: 18 },
  metaLine: { fontSize: 9.5, fontWeight: "bold", color: "#1F2937", marginBottom: 3 },
  fromToRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  fromToBox: { width: "48%" },
  fromToLabel: { fontSize: 9.5, fontWeight: "bold", color: "#1F2937", marginBottom: 6 },
  fromToFieldRow: { flexDirection: "row", marginBottom: 3 },
  fromToFieldLabel: { fontSize: 9, fontWeight: "bold", color: "#1F2937", width: 62 },
  fromToFieldValue: { fontSize: 9, color: "#374151", flex: 1 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", color: "#1F2937", marginBottom: 8 },

  /* ===== TABLE (cleaned up for consistent row heights & alignment) ===== */
  table: { width: "100%", borderWidth: 1, borderColor: "#9CA3AF", marginBottom: 18 },
  tableHeader: { flexDirection: "row", backgroundColor: BRAND, borderBottomWidth: 1, borderBottomColor: "#9CA3AF" },
  tableHeaderText: { fontSize: 8.5, fontWeight: "bold", color: "#FFFFFF" },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
  },
  tableRowText: { fontSize: 8.5, color: "#1F2937" },
  colSr: { width: "5%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "center" },
  colDesc: { width: "20%", paddingVertical: 8, paddingHorizontal: 6, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center" },
  colHsn: { width: "10%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "center" },
  colQty: { width: "7%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "center" },
  colPrice: { width: "11%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "flex-end" },
  colAmount: { width: "11%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "flex-end" },
  colTaxType: { width: "16%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "center" },
  colTaxAmt: { width: "9%", paddingVertical: 8, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: "#9CA3AF", justifyContent: "center", alignItems: "flex-end" },
  colTotal: { width: "10%", paddingVertical: 8, paddingHorizontal: 4, justifyContent: "center", alignItems: "flex-end" },

  totalsWrap: { alignItems: "flex-end", marginBottom: 20 },
  totalsBox: { width: 230 },
  totalsHeading: { fontSize: 10.5, fontWeight: "bold", color: "#1F2937", marginBottom: 6 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  totalLabel: { fontSize: 9.5, color: "#374151" },
  totalValue: { fontSize: 9.5, color: "#1F2937" },
  grandTotalRow: {
    flexDirection: "row", justifyContent: "space-between",
    borderTopWidth: 1.5, borderTopColor: BRAND, paddingTop: 7, marginTop: 6,
  },
  grandTotalLabel: { fontSize: 11, fontWeight: "bold", color: "#1F2937" },
  grandTotalValue: { fontSize: 11, fontWeight: "bold", color: BRAND },
  paymentBlock: { marginBottom: 18 },
  paymentBulletRow: { flexDirection: "row", marginBottom: 4 },
  bullet: { fontSize: 9, color: "#1F2937", width: 12 },
  paymentText: { fontSize: 9, color: "#374151", flex: 1, lineHeight: 1.5 },
  noteBlock: { marginBottom: 18 },
  noteText: { fontSize: 9, color: "#4B5563", lineHeight: 1.5 },
  signRow: { marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  thankYou: { fontSize: 10.5, fontWeight: "bold", color: "#1F2937" },
  thankYouSub: { marginTop: 4, fontSize: 8.5, color: "#6B7280" },
  signature: { width: 110, height: 50, objectFit: "contain" },
  signLine: { width: 140, borderTopWidth: 1, borderTopColor: "#9CA3AF", marginTop: 6 },
  signCaption: { marginTop: 4, fontSize: 9, color: "#374151" },
});

function InitialsBadge({ name }) {
  const initials = (name || "?")
    .split(" ").filter(Boolean).slice(0, 2)
    .map((w) => w[0]?.toUpperCase()).join("");
  return <Text style={styles.logoInitials}>{initials || "?"}</Text>;
}

export default function InvoicePDF({ data }) {
  if (!data) return null;

  // calculateInvoice se sahi values compute hoti hain
  const computed = calculateInvoice(data);

  const {
    company, customer, invoice, items,
    subtotal, taxAmount, shippingAmount,
    discountAmount, grandTotal, notes, terms, docMeta,
  } = computed;

  const meta = docMeta || { title: "INVOICE" };
  const symbol = getCurrencySymbol(invoice?.currency);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ===== HEADER BANNER (fixed) ===== */}
        <View style={styles.headerBanner} fixed>
          <View style={styles.logoCircle}>
            {company.logo ? (
              <Image src={company.logo} style={styles.logoImage} />
            ) : (
              <InitialsBadge name={company.headerName || company.name} />
            )}
          </View>
          <View style={styles.headerCompanyBlock}>
            <Text style={styles.headerCompanyName}>
              {company.headerName || company.name || "Company Name"}
            </Text>
            {(company.headerAddress || company.address) && (
              <Text style={styles.headerLine}>{company.headerAddress || company.address}</Text>
            )}
            {(company.headerPhone || company.phone) && (
              <Text style={styles.headerLine}>{company.headerPhone || company.phone}</Text>
            )}
            {(company.headerEmail || company.email) && (
              <Text style={styles.headerLine}>{company.headerEmail || company.email}</Text>
            )}
          </View>
        </View>

        {/* ===== FOOTER BANNER (fixed) ===== */}
        <View style={styles.footerBanner} fixed>
          {(company.headerPhone || company.phone) && (
            <View style={styles.footerContact}>
              <Svg width="11" height="11" viewBox="0 0 24 24">
                <Path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.footerItem}>{company.headerPhone || company.phone}</Text>
            </View>
          )}
          {(company.headerAddress || company.address) && (
            <View style={styles.footerContact}>
              <Svg width="11" height="11" viewBox="0 0 24 24">
                <Path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"
                  fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="12" cy="10" r="3" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              </Svg>
              <Text style={styles.footerItem}>{company.headerAddress || company.address}</Text>
            </View>
          )}
          {(company.headerEmail || company.email) && (
            <View style={styles.footerContact}>
              <Svg width="11" height="11" viewBox="0 0 24 24">
                <Rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                <Path d="m3 7 9 6 9-6" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={styles.footerItem}>{company.headerEmail || company.email}</Text>
            </View>
          )}
        </View>

        {/* ===== BODY ===== */}
        <View style={styles.content}>

          {/* Title + GST */}
          <View style={styles.titleRow}>
            <Text style={styles.invoiceTitle}>{meta.title}</Text>
            {company.gst && <Text style={styles.gstText}>GST No: {company.gst}</Text>}
          </View>

          {/* Invoice Meta */}
          <View style={styles.metaBlock}>
            <Text style={styles.metaLine}>Invoice No: {invoice.number}</Text>
            <Text style={styles.metaLine}>Invoice Date: {invoice.date}</Text>
            {invoice.dueDate && <Text style={styles.metaLine}>Due Date: {invoice.dueDate}</Text>}
            {invoice.paymentTerms && <Text style={styles.metaLine}>Payment Terms: {invoice.paymentTerms}</Text>}
            {invoice.poNumber && <Text style={styles.metaLine}>PO Number: {invoice.poNumber}</Text>}
            {invoice.currency && <Text style={styles.metaLine}>Currency: {invoice.currency}</Text>}
          </View>

          {/* From / To */}
          <View style={styles.fromToRow}>
            <View style={styles.fromToBox}>
              <Text style={styles.fromToLabel}>From:</Text>
              {company.company && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Company:</Text><Text style={styles.fromToFieldValue}>{company.company}</Text></View>}
              {company.name && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Name:</Text><Text style={styles.fromToFieldValue}>{company.name}</Text></View>}
              {company.designation && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Designation:</Text><Text style={styles.fromToFieldValue}>{company.designation}</Text></View>}
              {company.service && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Service:</Text><Text style={styles.fromToFieldValue}>{company.service}</Text></View>}
              {company.email && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Email:</Text><Text style={styles.fromToFieldValue}>{company.email}</Text></View>}
              {company.phone && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Phone:</Text><Text style={styles.fromToFieldValue}>{company.phone}</Text></View>}
              {company.address && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Address:</Text><Text style={styles.fromToFieldValue}>{company.address}</Text></View>}
            </View>
            <View style={styles.fromToBox}>
              <Text style={styles.fromToLabel}>To:</Text>
              <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Name:</Text><Text style={styles.fromToFieldValue}>{customer.name || "Customer Name"}</Text></View>
              {customer.email && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Email:</Text><Text style={styles.fromToFieldValue}>{customer.email}</Text></View>}
              {customer.phone && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Phone:</Text><Text style={styles.fromToFieldValue}>{customer.phone}</Text></View>}
              {customer.address && <View style={styles.fromToFieldRow}><Text style={styles.fromToFieldLabel}>Address:</Text><Text style={styles.fromToFieldValue}>{customer.address}</Text></View>}
            </View>
          </View>

          {/* ===== ITEMS TABLE ===== */}
          <Text style={styles.sectionTitle}>Services Details</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader} wrap={false}>
              <Text style={[styles.tableHeaderText, styles.colSr]}>Sr.No</Text>
              <Text style={[styles.tableHeaderText, styles.colDesc]}>Item Description</Text>
              <Text style={[styles.tableHeaderText, styles.colHsn]}>HSN/SAC</Text>
              <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderText, styles.colPrice]}>Price</Text>
              <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
              <Text style={[styles.tableHeaderText, styles.colTaxType]}>Taxes</Text>
              <Text style={[styles.tableHeaderText, styles.colTaxAmt]}>Tax Amt</Text>
              <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
            </View>

            {items?.length > 0 ? (
              items.map((item, index) => {
                const qty = Number(item.qty || 0);
                const price = Number(item.price || 0);
                // calculateInvoice se pre-computed values use karo
                const amount = item.baseTotal ?? (qty * price);
                const taxes = item.taxes || getItemTaxes(item);

                const taxLabel = taxes
                  .map((t) => t.taxType === "No Tax" ? "No Tax" : `${t.taxType} ${t.taxRate}%`)
                  .join("\n");

                const taxDetails = taxes.map((t) => {
                  const rate = t.taxType === "No Tax" ? 0 : Number(t.taxRate || 0);
                  return { taxType: t.taxType, taxRate: rate, taxAmt: amount * (rate / 100) };
                });

                const itemTaxAmount = item.itemTaxAmount ?? taxDetails.reduce((sum, t) => sum + t.taxAmt, 0);
                const itemTotal = (item.total ?? (amount + itemTaxAmount)).toFixed(2);

                return (
                  <View key={index} style={styles.tableRow} wrap={false}>
                    <View style={styles.colSr}>
                      <Text style={styles.tableRowText}>{index + 1}</Text>
                    </View>
                    <View style={styles.colDesc}>
                      <Text style={styles.tableRowText}>{item.description || "-"}</Text>
                    </View>
                    <View style={styles.colHsn}>
                      <Text style={styles.tableRowText}>{item.hsn || "-"}</Text>
                    </View>
                    <View style={styles.colQty}>
                      <Text style={styles.tableRowText}>{qty}</Text>
                    </View>
                    <View style={styles.colPrice}>
                      <Text style={styles.tableRowText}>{symbol}{price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.colAmount}>
                      <Text style={styles.tableRowText}>{symbol}{amount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.colTaxType}>
                      <Text style={[styles.tableRowText, { textAlign: "center" }]}>{taxLabel}</Text>
                    </View>
                    <View style={styles.colTaxAmt}>
                      <Text style={styles.tableRowText}>{symbol}{itemTaxAmount.toFixed(2)}</Text>
                    </View>
                    <View style={styles.colTotal}>
                      <Text style={[styles.tableRowText, { fontWeight: "bold" }]}>{symbol}{itemTotal}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.tableRow}>
                <Text style={[styles.tableRowText, { padding: 10 }]}>No items added</Text>
              </View>
            )}
          </View>

          {/* ===== TOTALS ===== */}
          <View style={styles.totalsWrap}>
            <View style={styles.totalsBox}>
              <Text style={styles.totalsHeading}>Total Amount</Text>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>{symbol}{Number(subtotal).toFixed(2)}</Text>
              </View>

              {Number(taxAmount) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={[styles.totalLabel, { fontWeight: "bold" }]}>Total Tax</Text>
                  <Text style={[styles.totalValue, { fontWeight: "bold" }]}>
                    {symbol}{Number(taxAmount).toFixed(2)}
                  </Text>
                </View>
              )}

              {/* Item-wise Tax Breakdown yahan totals section me rehta hai (yeh detailed hai, table me nahi) */}
              {Number(taxAmount) > 0 && items?.map((item, idx) => {
                const amount = item.baseTotal ?? (Number(item.qty || 0) * Number(item.price || 0));
                const taxes = item.taxes || getItemTaxes(item);
                const taxDetails = taxes
                  .map((t) => {
                    const rate = t.taxType === "No Tax" ? 0 : Number(t.taxRate || 0);
                    return { taxType: t.taxType, taxRate: rate, taxAmt: amount * (rate / 100) };
                  })
                  .filter((t) => t.taxAmt > 0);

                const itemTaxAmt = item.itemTaxAmount ?? taxDetails.reduce((sum, t) => sum + t.taxAmt, 0);
                if (itemTaxAmt <= 0) return null;

                const name = item.description?.trim() || `Item ${idx + 1}`;
                return (
                  <View key={idx} style={{ marginBottom: 3, paddingLeft: 6, borderLeftWidth: 1.5, borderLeftColor: BRAND }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 7.5, color: "#374151" }}>• {name}</Text>
                      <Text style={{ fontSize: 7.5, color: "#374151" }}>{symbol}{Number(itemTaxAmt).toFixed(2)}</Text>
                    </View>
                    {taxDetails.map((td, tIdx) => (
                      <View key={tIdx} style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 6 }}>
                        <Text style={{ fontSize: 7, color: "#6B7280" }}>{td.taxType} ({td.taxRate}%)</Text>
                        <Text style={{ fontSize: 7, color: "#6B7280" }}>{symbol}{td.taxAmt.toFixed(2)}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}

              {Number(shippingAmount) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Shipping</Text>
                  <Text style={styles.totalValue}>{symbol}{Number(shippingAmount).toFixed(2)}</Text>
                </View>
              )}

              {Number(discountAmount) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount</Text>
                  <Text style={styles.totalValue}>- {symbol}{Number(discountAmount).toFixed(2)}</Text>
                </View>
              )}

              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>{symbol}{Number(grandTotal).toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* ===== PAYMENT DETAILS ===== */}
          {(company.bankName || company.accountName || company.accountNumber || company.ifsc || company.upi) && (
            <View style={styles.paymentBlock}>
              <Text style={styles.sectionTitle}>Payment Details</Text>
              <View style={styles.paymentBulletRow}>
                <Text style={styles.bullet}>-</Text>
                <Text style={styles.paymentText}>
                  {company.accountName ? `Account Name: ${company.accountName}\n` : ""}
                  {company.bankName ? `Bank: ${company.bankName}\n` : ""}
                  {company.accountNumber ? `Account Number: ${company.accountNumber}\n` : ""}
                  {company.ifsc ? `IFSC Code: ${company.ifsc}\n` : ""}
                  {company.upi ? `UPI: ${company.upi}` : ""}
                </Text>
              </View>
            </View>
          )}

          {/* ===== NOTES ===== */}
          {notes ? (
            <View style={styles.noteBlock}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.noteText}>{notes}</Text>
            </View>
          ) : null}

          {/* ===== TERMS ===== */}
          {terms ? (
            <View style={styles.noteBlock}>
              <Text style={styles.sectionTitle}>Terms & Conditions</Text>
              <Text style={styles.noteText}>{terms}</Text>
            </View>
          ) : null}

          {/* ===== SIGNATURE ===== */}
          {company.signature && (
            <View style={styles.signRow}>
              <View>
                <Text style={styles.thankYou}>Thank You For Your Business!</Text>
                <Text style={styles.thankYouSub}>
                  We appreciate your trust and look forward to serving you again.
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image src={company.signature} style={styles.signature} />
                <View style={styles.signLine} />
                <Text style={styles.signCaption}>Authorized Signature</Text>
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
