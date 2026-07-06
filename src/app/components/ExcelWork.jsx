import { Upload, Loader, Download } from "lucide-react";

export default function ExcelWork() {
  const steps = [
    {
      icon: Upload,
      title: "1. Upload File",
      description:
        "Upload any picture of a spreadsheet, scanned document, or screenshot to excel.",
      color: "text-blue-600",
    },
    {
      icon: Loader,
      title: "2. Processing",
      description:
        "Our AI excel converter engine will extract table from image and format it.",
      color: "text-purple-600",
    },
    {
      icon: Download,
      title: "3. Download XLSX",
      description:
        "Download excel image data as a ready-to-use .xlsx file.",
      color: "text-green-600",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto bg-[#f8fafc] border border-gray-200 rounded-[40px] p-12 md:p-20">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            How to Convert Image to Excel?
          </h2>

          <p className="mt-6 text-[22px] text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Follow these steps for <b>jpg to excel conversion</b> or to
            <b> convert scanned PDF to excel</b>.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-16 mt-20">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-8">
                  <Icon className={`w-12 h-12 ${step.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}