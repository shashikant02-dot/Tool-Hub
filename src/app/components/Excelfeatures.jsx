"use client";

import {
  FileText,
  Shield,
  Monitor,
  Globe,
  Pencil,
  Loader,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Universal Format Support",
    desc: "We support every major format. Convert png to excel, jpg to xlsx, tiff to excel, or even pdf table to excel online free. Our tool acts as a jpeg to excel converter and can even convert gif to excel or webp to excel.",

    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    icon: Loader,
    title: "Advanced OCR Extraction",
    desc: "Our image to excel OCR technology is best-in-class. Extract table from image and perform massive data entry automatically.",
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    icon: Shield,
    title: "Professional Business Tools",
    desc: "Ideal for professionals. Use as a business card scanner to excel, barcode scanner to excel spreadsheet, or scan invoices into excel. Perfect for inventory with barcode scanner excel workflows..",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    icon: Monitor,
    title:"CrossPlatform Compatibility",
    desc: "Works everywhere. Scan to excel android, iphone scan to spreadsheet, or desktop. It's the ultimate mobile barcode scanner to excel and camscanner to excel alternative",
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  {
    icon: Globe,
    title: "Cloud & Online Access",
    desc: "Access image to excel online free from anywhere. No software needed. Convert jpg to excel online, handle google image to excel tasks, or convert image url to table instantly.",
    bg: "bg-cyan-50",
    color: "text-cyan-600",
  },
  {
    icon: Pencil,
    title: "Editable & Secure Output",
    desc: "Get fully editable ms excel files. Convert picture to excel table with formatting preserved. Securely extract data from image to excel without storing your data.",
    bg: "bg-pink-50",
    color: "text-pink-600",
  },
];

export default function Excelfeatures() {
  return (
    <section className="py-20 px-6 mt-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-8`}
                >
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-5">
                  {item.title}
                </h3>

                <p className="text-lg leading-7 font-semibold text-slate-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}