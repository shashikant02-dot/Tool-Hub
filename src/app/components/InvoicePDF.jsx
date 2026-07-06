import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },

  /* ---------- Header ---------- */

 header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 30,
  paddingBottom: 18,
  borderBottomWidth: 0,
  // borderBottomColor: "#2563EB",
},

 companySection: {
  width: "48%",
},
  invoiceSection: {
  width: "48%",
  paddingLeft: 20,
},

logo: {
  width: 75,
  height: 75,
  objectFit: "contain",
  marginBottom: 15,
},

 companyName: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#111827",
  marginBottom: 10,
},

 text: {
  fontSize: 10,
  color: "#6B7280",
  marginBottom: 5,
  lineHeight: 1.6,
},
  invoiceTitle: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#2563EB",
  marginBottom: 18,
  textAlign: "right",
},
  infoTable: {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 6,
},

infoRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
  paddingVertical: 8,
  paddingHorizontal: 10,
}
,
infoLabel: {
  color: "#6B7280",
  fontSize: 9,
  fontWeight: "bold",
},
infoValue: {
  color: "#111827",
  fontSize: 10,
  fontWeight: "bold",
},

  /* ---------- Common ---------- */

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#383838",
    marginBottom: 10,
  },

  card: {
    // borderWidth: 1,
    // borderColor: "#E5E7EB",
    // borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    // backgroundColor: "#FFFFFF",
  },

  customerName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#4B5563",
  },

  line: {
    fontSize: 10,
    color: "#4B5563",
    marginBottom: 4,
  },

  /* ---------- Table ---------- */

  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#383838",
    color: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  colDesc: {
    width: "45%",
  },

  colQty: {
    width: "15%",
    textAlign: "center",
  },

  colPrice: {
    width: "20%",
    textAlign: "right",
  },

  colTotal: {
    width: "20%",
    textAlign: "right",
    fontWeight: "bold",
  },

  /* ---------- Totals ---------- */

  totalBox: {
    width: 220,
    marginTop: 20,
    marginLeft: "auto",
    // borderWidth: 1,
    // borderColor: "#D1D5DB",
    // borderRadius: 6,
    padding: 12,
    // backgroundColor: "#F9FAFB",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#CBD5E1",
    paddingTop: 8,
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#383838",
  },

  /* ---------- Footer ---------- */

  signature: {
    width: 120,
    height: 60,
    objectFit: "contain",
  },

  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    textAlign: "center",
    fontSize: 9,
    color: "#383838",
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
  },
  evenRow: {
    backgroundColor: "#FFFFFF",
  },

  oddRow: {
    backgroundColor: "#F8FAFC",
  },
invoiceGrid: {
  marginTop: 15,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

infoCard: {
  width: "48%",
  marginBottom: 12,
  paddingBottom: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
},

infoLabel: {
  fontSize: 8,
  color: "#6B7280",
  textTransform: "uppercase",
  marginBottom: 3,
},

infoValue: {
  fontSize: 11,
  fontWeight: "bold",
  color: "#111827",
},
});
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          {/* Company Details */}

         <View style={styles.companySection}>

  {company.logo && (
    <Image
      src={company.logo}
      style={styles.logo}
    />
  )}

  <Text style={styles.companyName}>
    {company.name}
  </Text>

  <Text style={styles.text}>
    {company.address}
  </Text>

  <Text style={styles.text}>
    {company.email}
  </Text>

  <Text style={styles.text}>
    {company.phone}
  </Text>

  <Text style={styles.text}>
    GST : {company.gst}
  </Text>

</View>

          {/* Invoice Details */}

         <View style={styles.invoiceSection}>

  <Text style={styles.invoiceTitle}>
    INVOICE
  </Text>

  <View style={styles.infoTable}>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Invoice No</Text>
      <Text style={styles.infoValue}>{invoice.number}</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Invoice Date</Text>
      <Text style={styles.infoValue}>{invoice.date}</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Due Date</Text>
      <Text style={styles.infoValue}>{invoice.dueDate}</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Payment Terms</Text>
      <Text style={styles.infoValue}>{invoice.paymentTerms}</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>PO Number</Text>
      <Text style={styles.infoValue}>{invoice.poNumber}</Text>
    </View>

    <View
      style={[
        styles.infoRow,
        {
          borderBottomWidth: 0,
        },
      ]}
    >
      <Text style={styles.infoLabel}>Currency</Text>
      <Text style={styles.infoValue}>{invoice.currency}</Text>
    </View>

  </View>

</View>
        </View>

        {/* ================= BILL TO ================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill To</Text>

          <View style={styles.card}>
            <Text style={styles.customerName}>
              {customer.name || "Customer Name"}
            </Text>

            {customer.address && (
              <Text style={styles.line}>{customer.address}</Text>
            )}

            {customer.email && (
              <Text style={styles.line}>{customer.email}</Text>
            )}

            {customer.phone && (
              <Text style={styles.line}>{customer.phone}</Text>
            )}
          </View>
        </View>

        {/* TABLE */}

        {/* ================= ITEMS TABLE ================= */}

        {/* ================= TOTAL BOX ================= */}

        {/* ================= ITEMS TABLE ================= */}

        <View style={styles.tableContainer}>
          {/* Header */}

          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
            <Text style={styles.colTotal}>Amount</Text>
          </View>

          {/* Rows */}

          {items?.length > 0 ? (
            items.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >
                <Text style={styles.colDesc}>{item.description}</Text>

                <Text style={styles.colQty}>{item.qty}</Text>

                <Text style={styles.colPrice}>₹{item.price}</Text>

                <Text style={styles.colTotal}>
                  ₹{Number(item.qty) * Number(item.price)}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text>No Items Added</Text>
            </View>
          )}
        </View>

        {/* ================= TOTALS ================= */}

        <View style={styles.totalBox}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text>Tax</Text>
            <Text>₹{taxAmount}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text>Shipping</Text>
            <Text>₹{shippingAmount}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text>Discount</Text>
            <Text>- ₹{discountAmount}</Text>
          </View>

          <View style={styles.grandTotal}>
            <Text>Grand Total</Text>
            <Text>₹{grandTotal}</Text>
          </View>
        </View>

        {/* PAYMENT */}

        {/* ================= PAYMENT DETAILS ================= */}

        {/* ================= PAYMENT DETAILS ================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <View style={styles.card}>
            {company.bankName && (
              <Text style={styles.line}>Bank : {company.bankName}</Text>
            )}

            {company.accountName && (
              <Text style={styles.line}>
                Account Holder : {company.accountName}
              </Text>
            )}

            {company.accountNumber && (
             <Text style={styles.line}>
  Account Number : {company.accountNumber}
</Text>
            )}

            {company.ifsc && (
             <Text style={styles.line}>
  IFSC : {company.ifsc}
</Text>
            )}

            {company.upi && (
              <Text style={styles.line}>
  UPI : {company.upi}
</Text>
            )}
          </View>
        </View>

        {/* ================= NOTES ================= */}

        {notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>

            <View style={styles.card}>
              <Text style={styles.line}>{notes}</Text>
            </View>
          </View>
        ) : null}

        {/* ================= TERMS ================= */}

        {terms ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>

            <View style={styles.card}>
              <Text style={styles.line}>{terms}</Text>
            </View>
          </View>
        ) : null}

        {/* ================= SIGNATURE ================= */}

        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text
              style={{
                color: "#383838",
                fontWeight: "bold",
                fontSize: 11,
              }}
            >
              Thank You For Your Business!
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 9,
                color: "#6B7280",
              }}
            >
              We appreciate your trust and look forward to serving you again.
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            {company.signature && (
              <Image src={company.signature} style={styles.signature} />
            )}

            <View
              style={{
                width: 140,
                borderTopWidth: 1,
                borderTopColor: "#9CA3AF",
                marginTop: 8,
              }}
            />

            <Text
              style={{
                marginTop: 5,
                fontSize: 10,
                color: "#374151",
              }}
            >
              Authorized Signature
            </Text>
          </View>
        </View>

        {/* ================= FOOTER ================= */}

        <Text style={styles.footer}>
          This invoice was generated electronically and is valid without a
          physical signature.
        </Text>
      </Page>
    </Document>
  );
}
