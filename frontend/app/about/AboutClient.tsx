"use client";
import React from 'react';
import { 
  CalendarDays, 
  Wrench, 
  ShieldCheck, 
  BadgeDollarSign, 
  Laptop, 
  Home,
  CheckCircle2,
  HeartHandshake,
  Award,
  Clock,
  Eye,
  Zap
} from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-black text-white">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-black/40 border border-white/20 text-red-100 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
              TENTANG KAMI
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              Tentang Service Cianjur
            </h1>
            <p className="text-xl md:text-2xl font-light text-red-50 max-w-3xl mx-auto mb-10 leading-relaxed">
              Lebih dari 35 Tahun Menjaga Elektronik Tetap Berfungsi untuk Keluarga Cianjur.
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl mt-8">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-white font-light">
              Sejak tahun 1990, Service Cianjur telah menjadi bagian dari masyarakat Cianjur dalam memberikan layanan perbaikan berbagai perangkat elektronik rumah tangga. Berawal dari sebuah bengkel servis sederhana di Kampung Sinagar, usaha ini tumbuh berkat kepercayaan pelanggan yang terus kembali dari generasi ke generasi.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-white font-light">
              Hari ini, kami terus berbenah dengan menggabungkan pengalaman puluhan tahun para teknisi dengan sistem pelayanan yang lebih modern agar setiap pelanggan mendapatkan pengalaman servis yang lebih cepat, transparan, dan terpercaya.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PERJALANAN KAMI */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">Perjalanan Kami</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-100 text-red-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-transform group-hover:scale-110">
                <Clock size={18} className="font-bold" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-red-700">1990</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Didirikan sebagai usaha servis elektronik keluarga yang berfokus pada perbaikan televisi dan berbagai perangkat elektronik rumah tangga.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-black text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-transform group-hover:scale-110">
                <HeartHandshake size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-black">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-black">1990–2000</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Membangun kepercayaan masyarakat melalui pelayanan yang jujur, harga yang wajar, serta hasil perbaikan yang dapat diandalkan.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-100 text-red-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-transform group-hover:scale-110">
                <Award size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-red-50/50 border border-red-100 shadow-sm transition-all hover:shadow-md hover:border-red-300">
                <div className="flex flex-col mb-2">
                  <span className="text-lg font-bold text-red-700 mb-1">Pernah Menjadi Service Center Resmi</span>
                </div>
                <p className="text-gray-800 leading-relaxed">
                  Dalam perjalanan usaha, Service Cianjur pernah dipercaya menjadi mitra layanan resmi Polytron untuk wilayah Cianjur. Pengalaman tersebut memperkuat standar pelayanan dan kemampuan teknis tim kami dalam menangani berbagai jenis perangkat elektronik.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-black text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-transform group-hover:scale-110">
                <ShieldCheck size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-black">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-black">2018–2025</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Walaupun menghadapi berbagai tantangan dalam pengelolaan usaha, kepercayaan pelanggan tetap terjaga berkat kualitas pengerjaan dan dedikasi para teknisi yang telah berpengalaman selama bertahun-tahun.
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-transform group-hover:scale-110">
                <Zap size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-red-50/80 border border-red-200 shadow-sm transition-all hover:shadow-md hover:border-red-400">
                <div className="flex flex-col mb-3">
                  <span className="text-xl font-bold text-red-700">Sekarang</span>
                </div>
                <p className="text-gray-800 mb-4 leading-relaxed">
                  Memasuki babak baru, Service Cianjur mulai melakukan transformasi dengan menghadirkan:
                </p>
                <ul className="space-y-2">
                  {[
                    "Sistem tracking servis berbasis website",
                    "Digitalisasi data pelanggan",
                    "Bukti servis dan garansi yang lebih rapi",
                    "Peningkatan standar pelayanan",
                    "Branding yang lebih profesional"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 size={18} className="text-red-600 mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-800 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FILOSOFI KAMI */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900 via-black to-black"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-10 tracking-tight text-red-500">Filosofi Kami</h2>
          <blockquote className="text-3xl md:text-5xl font-medium leading-tight mb-8 text-white italic drop-shadow-md">
            "Memperbaiki Perangkat, Menjaga Kepercayaan."
          </blockquote>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            Bagi kami, setiap perangkat elektronik bukan sekadar barang. Di balik setiap televisi, kulkas, atau mesin cuci terdapat aktivitas dan kebutuhan sehari-hari sebuah keluarga. Karena itu, setiap pekerjaan kami dilakukan dengan tanggung jawab, ketelitian, dan komitmen untuk memberikan hasil terbaik.
          </p>
        </div>
      </section>

      {/* 4. MENGAPA MEMILIH KAMI */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">Mengapa Memilih Service Cianjur?</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CalendarDays,
                title: "Berpengalaman Sejak 1990",
                desc: "Lebih dari tiga dekade melayani masyarakat Cianjur."
              },
              {
                icon: Wrench,
                title: "Teknisi Berpengalaman",
                desc: "Dikerjakan oleh teknisi yang telah menangani berbagai jenis kerusakan elektronik selama bertahun-tahun."
              },
              {
                icon: ShieldCheck,
                title: "Garansi Servis",
                desc: "Setiap pekerjaan disertai garansi sesuai jenis perbaikan."
              },
              {
                icon: BadgeDollarSign,
                title: "Harga Transparan",
                desc: "Estimasi biaya dijelaskan sebelum proses pengerjaan dilanjutkan."
              },
              {
                icon: Laptop,
                title: "Tracking Servis Online",
                desc: "Pelanggan dapat memantau status pengerjaan melalui website tanpa harus datang ke lokasi."
              },
              {
                icon: Home,
                title: "Panggilan ke Rumah",
                desc: "Melayani servis langsung ke lokasi pelanggan untuk perangkat tertentu."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NILAI-NILAI KAMI */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">Nilai-Nilai Kami</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Kejujuran",
                desc: "Memberikan informasi kondisi perangkat secara apa adanya tanpa menambahkan kerusakan yang tidak diperlukan.",
                icon: HeartHandshake,
                color: "text-red-600",
                bg: "bg-red-50",
                border: "border-red-100 hover:border-red-300"
              },
              {
                title: "Profesional",
                desc: "Bekerja sesuai prosedur dengan standar pelayanan yang terus ditingkatkan.",
                icon: Award,
                color: "text-black",
                bg: "bg-gray-100",
                border: "border-gray-200 hover:border-black"
              },
              {
                title: "Tanggung Jawab",
                desc: "Setiap perangkat pelanggan diperlakukan dengan hati-hati dan penuh tanggung jawab.",
                icon: ShieldCheck,
                color: "text-red-700",
                bg: "bg-red-50",
                border: "border-red-200 hover:border-red-400"
              },
              {
                title: "Transparansi",
                desc: "Pelanggan memperoleh informasi mengenai estimasi biaya, proses pengerjaan, dan garansi secara jelas.",
                icon: Eye,
                color: "text-gray-800",
                bg: "bg-gray-50",
                border: "border-gray-200 hover:border-gray-400"
              }
            ].map((value, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border ${value.border} ${value.bg} transition-all duration-300 hover:shadow-lg`}>
                <value.icon size={36} className={`${value.color} mb-6`} />
                <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KOMITMEN KAMI & VISI MISI */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 bg-red-600 text-white">
                <h3 className="text-3xl font-bold mb-6">Komitmen Kami</h3>
                <p className="text-red-50 text-lg leading-relaxed mb-8">
                  Kami percaya bahwa kepercayaan pelanggan dibangun melalui kualitas pekerjaan dan pelayanan yang konsisten. Oleh karena itu, kami terus melakukan pengembangan sistem, peningkatan kualitas layanan, serta memanfaatkan teknologi agar proses servis menjadi lebih mudah, lebih transparan, dan lebih nyaman bagi setiap pelanggan.
                </p>
                <div className="w-full h-px bg-red-500/50 my-8"></div>
                <h3 className="text-2xl font-bold mb-4">Visi</h3>
                <p className="text-red-100 leading-relaxed">
                  Menjadi penyedia layanan servis elektronik rumah tangga terpercaya di Kabupaten Cianjur yang mengedepankan kualitas, kejujuran, inovasi, dan pelayanan berbasis teknologi.
                </p>
              </div>
              <div className="p-10 md:p-16">
                <h3 className="text-3xl font-bold mb-8 text-black">Misi</h3>
                <ul className="space-y-6">
                  {[
                    "Memberikan layanan servis yang berkualitas dengan hasil yang dapat dipertanggungjawabkan.",
                    "Menjaga kepercayaan pelanggan melalui pelayanan yang jujur dan transparan.",
                    "Mengembangkan sistem pelayanan berbasis digital untuk meningkatkan kenyamanan pelanggan.",
                    "Meningkatkan kompetensi teknisi agar mampu mengikuti perkembangan teknologi elektronik.",
                    "Menjadi mitra terpercaya masyarakat dalam menjaga perangkat elektronik rumah tangga tetap berfungsi optimal."
                  ].map((misi, idx) => (
                    <li key={idx} className="flex items-start group">
                      <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mr-4 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <span className="font-bold text-sm">{idx + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{misi}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PENUTUP */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white">Terima Kasih Atas Kepercayaan Anda</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 font-light">
            Selama lebih dari tiga dekade, kepercayaan pelanggan telah menjadi fondasi perjalanan Service Cianjur. Kami menyadari bahwa perkembangan zaman menuntut perubahan, dan karena itu kami terus bertransformasi tanpa meninggalkan nilai-nilai yang telah kami pegang sejak awal: kejujuran, kualitas, dan tanggung jawab.
          </p>
          <p className="text-xl md:text-2xl font-medium text-red-400 leading-relaxed">
            Kami berkomitmen untuk terus memberikan layanan terbaik bagi setiap pelanggan, hari ini dan di masa mendatang.
          </p>
        </div>
      </section>
      
    </div>
  );
}

