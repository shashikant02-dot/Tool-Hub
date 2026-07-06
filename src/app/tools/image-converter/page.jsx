import ImageConverterUI from '@/app/components/ImageConverterUI';
import React from 'react'
export const metadata = {
  title: "Image Format Converter ",
  description:
    "Convert images between PNG, JPG, WEBP formats instantly. Fast, secure and 100% free online image converter tool.",
  keywords: [
    "image converter",
    "png to jpg",
    "jpg to webp",
    "webp converter",
    "image format converter",
  ],
  alternates: {
    canonical: "https://yourdomain.com/tools/image-converter",
  },
  openGraph: {
    title: "Image Format Converter ",
    description:
      "Convert PNG, JPG, and WEBP images instantly with high quality output.",
    url: "https://yourdomain.com/tools/image-converter",
    type: "website",
  },
};
export default function page() {
  return (
<section className='mt-20 '>
        <div className='flex flex-col text-center mt-22'>
          <h1 className="text-5xl font-bold">
  Image Format<span className="text-amber-500"> Converter</span>
</h1>
            <p className='text-2xl text-gray-600 leading-14'>Convert images between PNG, JPG, and WEBP formats instantly.

</p>
        </div>
        <ImageConverterUI/>
        </section>
)
}
