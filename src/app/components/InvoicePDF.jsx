// import {
//   Document,
//   Page,
//   View,
//   Text,
//   Image,
//   StyleSheet,
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 35,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//     backgroundColor: "#FFFFFF",
//     color: "#1F2937",
//   },

//   /* ---------- Header ---------- */

//  header: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "flex-start",
//   marginBottom: 30,
//   paddingBottom: 18,
//   borderBottomWidth: 0,
//   // borderBottomColor: "#2563EB",
// },

//  companySection: {
//   width: "48%",
// },
//   invoiceSection: {
//   width: "48%",
//   paddingLeft: 20,
// },

// logo: {
//   width: 75,
//   height: 75,
//   objectFit: "contain",
//   marginBottom: 15,
// },

//  companyName: {
//   fontSize: 22,
//   fontWeight: "bold",
//   color: "#111827",
//   marginBottom: 10,
// },

//  text: {
//   fontSize: 10,
//   color: "#6B7280",
//   marginBottom: 5,
//   lineHeight: 1.6,
// },
//   invoiceTitle: {
//   fontSize: 30,
//   fontWeight: "bold",
//   color: "#2563EB",
//   marginBottom: 18,
//   textAlign: "right",
// },
//   infoTable: {
//   borderWidth: 1,
//   borderColor: "#E5E7EB",
//   borderRadius: 6,
// },

// infoRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   borderBottomWidth: 1,
//   borderBottomColor: "#E5E7EB",
//   paddingVertical: 8,
//   paddingHorizontal: 10,
// }
// ,
// infoLabel: {
//   color: "#6B7280",
//   fontSize: 9,
//   fontWeight: "bold",
// },
// infoValue: {
//   color: "#111827",
//   fontSize: 10,
//   fontWeight: "bold",
// },

//   /* ---------- Common ---------- */

//   section: {
//     marginTop: 20,
//   },

//   sectionTitle: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#383838",
//     marginBottom: 10,
//   },

//   card: {
//     // borderWidth: 1,
//     // borderColor: "#E5E7EB",
//     // borderRadius: 6,
//     padding: 12,
//     marginBottom: 16,
//     // backgroundColor: "#FFFFFF",
//   },

//   customerName: {
//     fontSize: 12,
//     fontWeight: "bold",
//     marginBottom: 6,
//     color: "#4B5563",
//   },

//   line: {
//     fontSize: 10,
//     color: "#4B5563",
//     marginBottom: 4,
//   },

//   /* ---------- Table ---------- */

//   table: {
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//   },

//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#383838",
//     color: "#FFFFFF",
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//   },

//   tableRow: {
//     flexDirection: "row",
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E5E7EB",
//   },

//   colDesc: {
//     width: "45%",
//   },

//   colQty: {
//     width: "15%",
//     textAlign: "center",
//   },

//   colPrice: {
//     width: "20%",
//     textAlign: "right",
//   },

//   colTotal: {
//     width: "20%",
//     textAlign: "right",
//     fontWeight: "bold",
//   },

//   /* ---------- Totals ---------- */

//   totalBox: {
//     width: 220,
//     marginTop: 20,
//     marginLeft: "auto",
//     // borderWidth: 1,
//     // borderColor: "#D1D5DB",
//     // borderRadius: 6,
//     padding: 12,
//     // backgroundColor: "#F9FAFB",
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 6,
//   },

//   grandTotal: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderTopWidth: 1,
//     borderTopColor: "#CBD5E1",
//     paddingTop: 8,
//     marginTop: 8,
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#383838",
//   },

//   /* ---------- Footer ---------- */

//   signature: {
//     width: 120,
//     height: 60,
//     objectFit: "contain",
//   },

//   footer: {
//     marginTop: 30,
//     borderTopWidth: 1,
//     borderTopColor: "#E5E7EB",
//     paddingTop: 12,
//     textAlign: "center",
//     fontSize: 9,
//     color: "#383838",
//   },
//   tableContainer: {
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 4,
//   },
//   evenRow: {
//     backgroundColor: "#FFFFFF",
//   },

//   oddRow: {
//     backgroundColor: "#F8FAFC",
//   },
// invoiceGrid: {
//   marginTop: 15,
//   flexDirection: "row",
//   flexWrap: "wrap",
//   justifyContent: "space-between",
// },

// infoCard: {
//   width: "48%",
//   marginBottom: 12,
//   paddingBottom: 8,
//   borderBottomWidth: 1,
//   borderBottomColor: "#E5E7EB",
// },

// infoLabel: {
//   fontSize: 8,
//   color: "#6B7280",
//   textTransform: "uppercase",
//   marginBottom: 3,
// },

// infoValue: {
//   fontSize: 11,
//   fontWeight: "bold",
//   color: "#111827",
// },
// });
// export default function InvoicePDF({ data }) {
//   if (!data) return null;

//   const {
//     company,
//     customer,
//     invoice,
//     items,
//     subtotal,
//     taxAmount,
//     shippingAmount,
//     discountAmount,
//     grandTotal,
//     notes,
//     terms,
//   } = data;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* ================= HEADER ================= */}

//         <View style={styles.header}>
//           {/* Company Details */}

//          <View style={styles.companySection}>

//   {company.logo && (
//     <Image
//       src={company.logo}
//       style={styles.logo}
//     />
//   )}

//   <Text style={styles.companyName}>
//     {company.name}
//   </Text>

//   <Text style={styles.text}>
//     {company.address}
//   </Text>

//   <Text style={styles.text}>
//     {company.email}
//   </Text>

//   <Text style={styles.text}>
//     {company.phone}
//   </Text>

//   <Text style={styles.text}>
//     GST : {company.gst}
//   </Text>

// </View>

//           {/* Invoice Details */}

//          <View style={styles.invoiceSection}>

//   <Text style={styles.invoiceTitle}>
//     INVOICE
//   </Text>

//   <View style={styles.infoTable}>

//     <View style={styles.infoRow}>
//       <Text style={styles.infoLabel}>Invoice No</Text>
//       <Text style={styles.infoValue}>{invoice.number}</Text>
//     </View>

//     <View style={styles.infoRow}>
//       <Text style={styles.infoLabel}>Invoice Date</Text>
//       <Text style={styles.infoValue}>{invoice.date}</Text>
//     </View>

//     <View style={styles.infoRow}>
//       <Text style={styles.infoLabel}>Due Date</Text>
//       <Text style={styles.infoValue}>{invoice.dueDate}</Text>
//     </View>

//     <View style={styles.infoRow}>
//       <Text style={styles.infoLabel}>Payment Terms</Text>
//       <Text style={styles.infoValue}>{invoice.paymentTerms}</Text>
//     </View>

//     <View style={styles.infoRow}>
//       <Text style={styles.infoLabel}>PO Number</Text>
//       <Text style={styles.infoValue}>{invoice.poNumber}</Text>
//     </View>

//     <View
//       style={[
//         styles.infoRow,
//         {
//           borderBottomWidth: 0,
//         },
//       ]}
//     >
//       <Text style={styles.infoLabel}>Currency</Text>
//       <Text style={styles.infoValue}>{invoice.currency}</Text>
//     </View>

//   </View>

// </View>
//         </View>

//         {/* ================= BILL TO ================= */}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bill To</Text>

//           <View style={styles.card}>
//             <Text style={styles.customerName}>
//               {customer.name || "Customer Name"}
//             </Text>

//             {customer.address && (
//               <Text style={styles.line}>{customer.address}</Text>
//             )}

//             {customer.email && (
//               <Text style={styles.line}>{customer.email}</Text>
//             )}

//             {customer.phone && (
//               <Text style={styles.line}>{customer.phone}</Text>
//             )}
//           </View>
//         </View>

//         {/* TABLE */}

//         {/* ================= ITEMS TABLE ================= */}

//         {/* ================= TOTAL BOX ================= */}

//         {/* ================= ITEMS TABLE ================= */}

//         <View style={styles.tableContainer}>
//           {/* Header */}

//           <View style={styles.tableHeader}>
//             <Text style={styles.colDesc}>Description</Text>
//             <Text style={styles.colQty}>Qty</Text>
//             <Text style={styles.colPrice}>Price</Text>
//             <Text style={styles.colTotal}>Amount</Text>
//           </View>

//           {/* Rows */}

//           {items?.length > 0 ? (
//             items.map((item, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.tableRow,
//                   index % 2 === 0 ? styles.evenRow : styles.oddRow,
//                 ]}
//               >
//                 <Text style={styles.colDesc}>{item.description}</Text>

//                 <Text style={styles.colQty}>{item.qty}</Text>

//                 <Text style={styles.colPrice}>₹{item.price}</Text>

//                 <Text style={styles.colTotal}>
//                   ₹{Number(item.qty) * Number(item.price)}
//                 </Text>
//               </View>
//             ))
//           ) : (
//             <View style={styles.tableRow}>
//               <Text>No Items Added</Text>
//             </View>
//           )}
//         </View>

//         {/* ================= TOTALS ================= */}

//         <View style={styles.totalBox}>
//           <View style={styles.totalRow}>
//             <Text>Subtotal</Text>
//             <Text>₹{subtotal}</Text>
//           </View>

//           <View style={styles.totalRow}>
//             <Text>Tax</Text>
//             <Text>₹{taxAmount}</Text>
//           </View>

//           <View style={styles.totalRow}>
//             <Text>Shipping</Text>
//             <Text>₹{shippingAmount}</Text>
//           </View>

//           <View style={styles.totalRow}>
//             <Text>Discount</Text>
//             <Text>- ₹{discountAmount}</Text>
//           </View>

//           <View style={styles.grandTotal}>
//             <Text>Grand Total</Text>
//             <Text>₹{grandTotal}</Text>
//           </View>
//         </View>

//         {/* PAYMENT */}

//         {/* ================= PAYMENT DETAILS ================= */}

//         {/* ================= PAYMENT DETAILS ================= */}

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Payment Details</Text>

//           <View style={styles.card}>
//             {company.bankName && (
//               <Text style={styles.line}>Bank : {company.bankName}</Text>
//             )}

//             {company.accountName && (
//               <Text style={styles.line}>
//                 Account Holder : {company.accountName}
//               </Text>
//             )}

//             {company.accountNumber && (
//              <Text style={styles.line}>
//   Account Number : {company.accountNumber}
// </Text>
//             )}

//             {company.ifsc && (
//              <Text style={styles.line}>
//   IFSC : {company.ifsc}
// </Text>
//             )}

//             {company.upi && (
//               <Text style={styles.line}>
//   UPI : {company.upi}
// </Text>
//             )}
//           </View>
//         </View>

//         {/* ================= NOTES ================= */}

//         {notes ? (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Notes</Text>

//             <View style={styles.card}>
//               <Text style={styles.line}>{notes}</Text>
//             </View>
//           </View>
//         ) : null}

//         {/* ================= TERMS ================= */}

//         {terms ? (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Terms & Conditions</Text>

//             <View style={styles.card}>
//               <Text style={styles.line}>{terms}</Text>
//             </View>
//           </View>
//         ) : null}

//         {/* ================= SIGNATURE ================= */}

//         <View
//           style={{
//             marginTop: 40,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "flex-end",
//           }}
//         >
//           <View>
//             <Text
//               style={{
//                 color: "#383838",
//                 fontWeight: "bold",
//                 fontSize: 11,
//               }}
//             >
//               Thank You For Your Business!
//             </Text>

//             <Text
//               style={{
//                 marginTop: 5,
//                 fontSize: 9,
//                 color: "#6B7280",
//               }}
//             >
//               We appreciate your trust and look forward to serving you again.
//             </Text>
//           </View>

//           <View style={{ alignItems: "center" }}>
//             {company.signature && (
//               <Image src={company.signature} style={styles.signature} />
//             )}

//             <View
//               style={{
//                 width: 140,
//                 borderTopWidth: 1,
//                 borderTopColor: "#9CA3AF",
//                 marginTop: 8,
//               }}
//             />

//             <Text
//               style={{
//                 marginTop: 5,
//                 fontSize: 10,
//                 color: "#374151",
//               }}
//             >
//               Authorized Signature
//             </Text>
//           </View>
//         </View>

//         {/* ================= FOOTER ================= */}

//         <Text style={styles.footer}>
//           This invoice was generated electronically and is valid without a
//           physical signature.
//         </Text>
//       </Page>
//     </Document>
//   );
// }

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

/* ---------- Brand color (change this one value to re-theme the whole invoice) ---------- */
const BRAND = "#155d3a";

/* ---------- Currency helper ---------- */
const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  CAD: "$",
  AUD: "$",
  EUR: "€",
  GBP: "£",
};

function getCurrencySymbol(code) {
  if (!code) return "₹";
  return CURRENCY_SYMBOLS[code.toUpperCase()] || `${code} `;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 132,
    paddingBottom: 70,
    paddingHorizontal: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },

  content: {
    paddingHorizontal: 40,
  },

  /* ---------- Header banner (fixed, repeats on every page) ---------- */

  headerBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: BRAND,
    paddingHorizontal: 40,
    paddingVertical: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logoImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    objectFit: "contain",
  },

  logoInitials: {
    fontSize: 16,
    fontWeight: "bold",
    color: BRAND,
  },

  headerCompanyBlock: {
    alignItems: "flex-end",
    maxWidth: "78%",
  },

  headerCompanyName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
    textAlign: "right",
  },

  headerLine: {
    fontSize: 8.5,
    color: "#E5F3EC",
    marginBottom: 2,
    textAlign: "right",
  },

  /* ---------- Footer banner (fixed, repeats on every page) ---------- */

  footerBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BRAND,
    paddingVertical: 14,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerItem: {
    fontSize: 8.5,
    color: "#FFFFFF",
  },

  /* ---------- Title row ---------- */

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1.5,
    borderBottomColor: "#1F2937",
    paddingBottom: 10,
    marginBottom: 16,
  },

  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#1F2937",
  },

  gstText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1F2937",
  },

  /* ---------- Meta (invoice no / date) ---------- */

  metaBlock: {
    marginBottom: 18,
  },

  metaLine: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 3,
  },

  /* ---------- From / To ---------- */

  fromToRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  fromToBox: {
    width: "48%",
  },

  fromToLabel: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },

  fromToFieldRow: {
    flexDirection: "row",
    marginBottom: 3,
  },

  fromToFieldLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1F2937",
    width: 62,
  },

  fromToFieldValue: {
    fontSize: 9,
    color: "#374151",
    flex: 1,
  },

  /* ---------- Section title ---------- */

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },

  /* ---------- Items table ---------- */

  table: {
    borderWidth: 1,
    borderColor: BRAND,
    marginBottom: 18,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: BRAND,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },

  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
  },

  tableRowText: {
    fontSize: 9,
    color: "#1F2937",
  },

  colSr: { width: "8%" },
  colDesc: { width: "42%" },
  colQty: { width: "15%", textAlign: "center" },
  colPrice: { width: "15%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right", fontWeight: "bold" },

  /* ---------- Totals ---------- */

  totalsWrap: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  totalsBox: {
    width: 230,
  },

  totalsHeading: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 6,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  totalLabel: {
    fontSize: 9.5,
    color: "#374151",
  },

  totalValue: {
    fontSize: 9.5,
    color: "#1F2937",
  },

  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1.5,
    borderTopColor: BRAND,
    paddingTop: 7,
    marginTop: 6,
  },

  grandTotalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1F2937",
  },

  grandTotalValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: BRAND,
  },

  /* ---------- Payment details ---------- */

  paymentBlock: {
    marginBottom: 18,
  },

  paymentBulletRow: {
    flexDirection: "row",
    marginBottom: 4,
  },

  bullet: {
    fontSize: 9,
    color: "#1F2937",
    width: 12,
  },

  paymentText: {
    fontSize: 9,
    color: "#374151",
    flex: 1,
    lineHeight: 1.5,
  },

  /* ---------- Notes / terms ---------- */

  noteBlock: {
    marginBottom: 18,
  },

  noteText: {
    fontSize: 9,
    color: "#4B5563",
    lineHeight: 1.5,
  },

  /* ---------- Signature ---------- */

  signRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  thankYou: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#1F2937",
  },

  thankYouSub: {
    marginTop: 4,
    fontSize: 8.5,
    color: "#6B7280",
  },

  signature: {
    width: 110,
    height: 50,
    objectFit: "contain",
  },

  signLine: {
    width: 140,
    borderTopWidth: 1,
    borderTopColor: "#9CA3AF",
    marginTop: 6,
  },

  signCaption: {
    marginTop: 4,
    fontSize: 9,
    color: "#374151",
  },
});

function InitialsBadge({ name }) {
  const initials = (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return <Text style={styles.logoInitials}>{initials || "?"}</Text>;
}

export default function InvoicePDF({ data }) {
  if (!data) return null;

  const {
    company,
    customer,
    invoice,
    items,
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    grandTotal,
    notes,
    terms,
  } = data;

  const symbol = getCurrencySymbol(invoice?.currency);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER BANNER (fixed) ================= */}

        <View style={styles.headerBanner} fixed>
          <View style={styles.logoCircle}>
            {company.logo ? (
              <Image src={company.logo} style={styles.logoImage} />
            ) : (
              <InitialsBadge name={company.name} />
            )}
          </View>

          <View style={styles.headerCompanyBlock}>
            <Text style={styles.headerCompanyName}>{company.name}</Text>
            {company.address ? (
              <Text style={styles.headerLine}>{company.address}</Text>
            ) : null}
            {(company.phone || company.email) ? (
              <Text style={styles.headerLine}>
                {[company.phone, company.email].filter(Boolean).join("   |   ")}
              </Text>
            ) : null}
          </View>
        </View>

        {/* ================= FOOTER BANNER (fixed) ================= */}

        <View style={styles.footerBanner} fixed>
          <Text style={styles.footerItem}>{company.phone || " "}</Text>
          <Text style={styles.footerItem}>{company.address || " "}</Text>
          <Text style={styles.footerItem}>{company.email || " "}</Text>
        </View>

        {/* ================= BODY ================= */}

        <View style={styles.content}>
          {/* Title + GST */}
          <View style={styles.titleRow}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            {company.gst ? (
              <Text style={styles.gstText}>GST No: {company.gst}</Text>
            ) : null}
          </View>

          {/* Invoice meta */}
                    {/* Invoice meta */}
          <View style={styles.metaBlock}>
            <Text style={styles.metaLine}>Invoice No: {invoice.number}</Text>
            <Text style={styles.metaLine}>Invoice Date: {invoice.date}</Text>
            {invoice.dueDate ? (
              <Text style={styles.metaLine}>Due Date: {invoice.dueDate}</Text>
            ) : null}
            {invoice.paymentTerms ? (
              <Text style={styles.metaLine}>
                Payment Terms: {invoice.paymentTerms}
              </Text>
            ) : null}
            {invoice.poNumber ? (
              <Text style={styles.metaLine}>PO Number: {invoice.poNumber}</Text>
            ) : null}
            {invoice.currency ? (
              <Text style={styles.metaLine}>Currency: {invoice.currency}</Text>
            ) : null}
          </View>
          {/* From / To */}
          <View style={styles.fromToRow}>
            <View style={styles.fromToBox}>
              <Text style={styles.fromToLabel}>From:</Text>

              <View style={styles.fromToFieldRow}>
                <Text style={styles.fromToFieldLabel}>Name:</Text>
                <Text style={styles.fromToFieldValue}>{company.name}</Text>
              </View>

              {company.email ? (
                <View style={styles.fromToFieldRow}>
                  <Text style={styles.fromToFieldLabel}>Email:</Text>
                  <Text style={styles.fromToFieldValue}>{company.email}</Text>
                </View>
              ) : null}

              {company.phone ? (
                <View style={styles.fromToFieldRow}>
                  <Text style={styles.fromToFieldLabel}>Phone:</Text>
                  <Text style={styles.fromToFieldValue}>{company.phone}</Text>
                </View>
              ) : null}

              {company.address ? (
                <View style={styles.fromToFieldRow}>
                  <Text style={styles.fromToFieldLabel}>Address:</Text>
                  <Text style={styles.fromToFieldValue}>
                    {company.address}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.fromToBox}>
              <Text style={styles.fromToLabel}>To:</Text>

              <View style={styles.fromToFieldRow}>
                <Text style={styles.fromToFieldLabel}>Name:</Text>
                <Text style={styles.fromToFieldValue}>
                  {customer.name || "Customer Name"}
                </Text>
              </View>

              {customer.email ? (
                <View style={styles.fromToFieldRow}>
                  <Text style={styles.fromToFieldLabel}>Email:</Text>
                  <Text style={styles.fromToFieldValue}>
                    {customer.email}
                  </Text>
                </View>
              ) : null}

              {customer.phone ? (
                <View style={styles.fromToFieldRow}>
                  <Text style={styles.fromToFieldLabel}>Phone:</Text>
                  <Text style={styles.fromToFieldValue}>
                    {customer.phone}
                  </Text>
                </View>
              ) : null}

              {customer.address ? (
                <View style={styles.fromToFieldRow}>
                  <Text style={styles.fromToFieldLabel}>Address:</Text>
                  <Text style={styles.fromToFieldValue}>
                    {customer.address}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* ================= SERVICES / ITEMS TABLE ================= */}

          <Text style={styles.sectionTitle}>Services Details</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colSr]}>
                Sr. No.
              </Text>
              <Text style={[styles.tableHeaderText, styles.colDesc]}>
                Description
              </Text>
              <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderText, styles.colPrice]}>
                Price
              </Text>
              <Text style={[styles.tableHeaderText, styles.colTotal]}>
                Amount
              </Text>
            </View>

            {items?.length > 0 ? (
              items.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableRowText, styles.colSr]}>
                    {index + 1}
                  </Text>
                  <Text style={[styles.tableRowText, styles.colDesc]}>
                    {item.description}
                  </Text>
                  <Text style={[styles.tableRowText, styles.colQty]}>
                    {item.qty}
                  </Text>
                  <Text style={[styles.tableRowText, styles.colPrice]}>
                    {symbol}
                    {item.price}
                  </Text>
                  <Text style={[styles.tableRowText, styles.colTotal]}>
                    {symbol}
                    {Number(item.qty) * Number(item.price)}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.tableRowText}>No Items Added</Text>
              </View>
            )}
          </View>

          {/* ================= TOTALS ================= */}

          <View style={styles.totalsWrap}>
            <View style={styles.totalsBox}>
              <Text style={styles.totalsHeading}>Total Amount</Text>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>
                  {symbol}
                  {subtotal}
                </Text>
              </View>

              {Number(taxAmount) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tax</Text>
                  <Text style={styles.totalValue}>
                    {symbol}
                    {taxAmount}
                  </Text>
                </View>
              )}

              {Number(shippingAmount) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Shipping</Text>
                  <Text style={styles.totalValue}>
                    {symbol}
                    {shippingAmount}
                  </Text>
                </View>
              )}

              {Number(discountAmount) > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount</Text>
                  <Text style={styles.totalValue}>
                    - {symbol}
                    {discountAmount}
                  </Text>
                </View>
              )}

              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>
                  {symbol}
                  {grandTotal}
                </Text>
              </View>
            </View>
          </View>

          {/* ================= PAYMENT DETAILS ================= */}

          {(company.bankName ||
            company.accountName ||
            company.accountNumber ||
            company.ifsc ||
            company.upi) && (
            <View style={styles.paymentBlock}>
              <Text style={styles.sectionTitle}>Payment Details</Text>

              <View style={styles.paymentBulletRow}>
                <Text style={styles.bullet}>-</Text>
                <Text style={styles.paymentText}>
                  {company.accountName
                    ? `Account Name: ${company.accountName}\n`
                    : ""}
                  {company.bankName ? `Bank: ${company.bankName}\n` : ""}
                  {company.accountNumber
                    ? `Account Number: ${company.accountNumber}\n`
                    : ""}
                  {company.ifsc ? `IFSC Code: ${company.ifsc}\n` : ""}
                  {company.upi ? `UPI: ${company.upi}` : ""}
                </Text>
              </View>
            </View>
          )}

          {/* ================= NOTES ================= */}

          {/* {notes ? (
            <View style={styles.noteBlock}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.noteText}>{notes}</Text>
            </View>
          ) : null} */}

          {/* ================= TERMS ================= */}

          {/* {terms ? (
            <View style={styles.noteBlock}>
              <Text style={styles.sectionTitle}>Terms & Conditions</Text>
              <Text style={styles.noteText}>{terms}</Text>
            </View>
          ) : null} */}

          {/* ================= SIGNATURE ================= */}

          {/* <View style={styles.signRow}>
            <View>
              <Text style={styles.thankYou}>Thank You For Your Business!</Text>
              <Text style={styles.thankYouSub}>
                We appreciate your trust and look forward to serving you again.
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              {company.signature && (
                <Image src={company.signature} style={styles.signature} />
              )}
              <View style={styles.signLine} />
              <Text style={styles.signCaption}>Authorized Signature</Text>
            </View>
          </View> */}
        </View>
      </Page>
    </Document>
  );
}