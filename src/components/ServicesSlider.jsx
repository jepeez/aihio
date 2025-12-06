import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { ScrambleText } from '../scripts/scramble.js';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const services = [
    {
        title: "YRITYSSIVUSTOT",
        description: "Moderni digitaalinen pääkonttori. Rakennamme uskottavuutta herättävät sivustot, jotka on optimoitu keräämään liidejä.",
        module: "CORPORATE",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
                <rect x="14" y="13" width="4" height="4"></rect>
            </svg>
        ),
        image: "/floating-ui-design.webp",
        colorClass: "text-signal-blue",
        bgGlow: "bg-signal-blue/20",
        borderHover: "group-hover:border-signal-blue/50",
        textGlow: "group-hover:text-signal-blue"
    },
    {
        title: "VERKKOKAUPAT",
        description: "Skaalautuvat kaupparatkaisut. Keskitymme kassavirran kasvattamiseen poistamalla ostopolun tekniset esteet.",
        module: "COMMERCE",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        ),
        image: "/floating-ui-design.webp",
        colorClass: "text-[#0aff68]",
        bgGlow: "bg-[#0aff68]/20",
        borderHover: "group-hover:border-[#0aff68]/50",
        textGlow: "group-hover:text-[#0aff68]"
    },
    {
        title: "KAMPANJAT & NOPEUS",
        description: "Täsmäaseet markkinointiin. Korkean konversion laskeutumissivut ja nykyisen sivuston nopeusoptimointi.",
        module: "PERFORMANCE",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        ),
        image: "/3drender.webp",
        colorClass: "text-[#a855f7]",
        bgGlow: "bg-[#a855f7]/20",
        borderHover: "group-hover:border-[#a855f7]/50",
        textGlow: "group-hover:text-[#a855f7]"
    }
];

export default function ServicesSlider() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll(".service-title");
            elements.forEach((el) => {
                new ScrambleText(el);
            });
        }
    }, []);

    return (
        <div className="w-full py-10 services-slider" ref={containerRef}>
            <style>{`
        .services-slider .swiper {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 50px;
        }
        .services-slider .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 300px;
          height: 450px;
          border-radius: 20px;
        }
        .services-slider .swiper-pagination-bullet {
          background: #00f0ff;
          opacity: 0.5;
        }
        .services-slider .swiper-pagination-bullet-active {
          opacity: 1;
          box-shadow: 0 0 10px #00f0ff;
        }
      `}</style>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                initialSlide={0}
            >
                {services.map((service, index) => (
                    <SwiperSlide key={index} className="relative group">
                        <div className="absolute inset-0 bg-hw-black/80 backdrop-blur-xl rounded-[20px] border border-white/10 overflow-hidden">
                            {/* Background Image with Overlay - REMOVED */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-hw-black/50 via-hw-black/80 to-hw-black"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col p-8">
                                {/* Icon with Glow */}
                                <div className="mb-6 relative">
                                    <div className={`absolute inset-0 ${service.bgGlow} blur-xl rounded-full transform -translate-y-1/2`}></div>
                                    <div className={`${service.colorClass} relative z-10`}>
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <h3 className="service-title text-2xl font-bold text-white mb-4 font-mono tracking-tight">
                                    {service.title}
                                </h3>

                                <p className="text-white/60 text-sm leading-relaxed mb-auto">
                                    {service.description}
                                </p>

                                {/* Footer / Module Info */}
                                <div className={`mt-8 pt-6 border-t border-white/10 flex items-center justify-between transition-colors ${service.borderHover}`}>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Module</span>
                                        <span className={`text-xs font-mono tracking-wider ${service.colorClass}`}>{service.module}</span>
                                    </div>

                                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all ${service.borderHover} ${service.textGlow}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Glass Reflections/Borders */}
                            <div className="absolute inset-0 rounded-[20px] border border-white/5 pointer-events-none"></div>
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
