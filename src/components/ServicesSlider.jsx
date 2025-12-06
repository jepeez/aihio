import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { ScrambleText } from '../scripts/scramble.js';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const services = [
    {
        title: "WEB & BRÄNDI",
        description: "Modernit verkkosivut ja erottuva yritysilme. Suunnittelemme logot, grafiikat ja responsiiviset sivustot.",
        module: "VISUAL STORYTELLING",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
        ),
        image: "/floating-ui-design.webp"
    },
    {
        title: "KUVAUS & VIDEO",
        description: "Elokuvallista laatua maalta ja ilmasta. Mainosvideot, drone-kuvaus ja potretit.",
        module: "CAPTURE",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
            </svg>
        ),
        image: "/camera-drone.webp"
    },
    {
        title: "3D & MOTION",
        description: "Tuotteet ja tilat fotorealistisena 3D-mallinnuksena. Animaatiot ja visualisoinnit.",
        module: "IMMERSIVE",
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
        ),
        image: "/3drender.webp"
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
          height: 420px;
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
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={service.image}
                                    alt=""
                                    className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-hw-black/50 via-hw-black/80 to-hw-black"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col p-8">
                                {/* Icon with Glow */}
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-signal-blue/20 blur-xl rounded-full transform -translate-y-1/2"></div>
                                    <div className="text-signal-blue relative z-10">
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
                                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between group-hover:border-signal-blue/30 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest">Module</span>
                                        <span className="text-xs text-signal-blue font-mono tracking-wider">{service.module}</span>
                                    </div>

                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:border-signal-blue/50 group-hover:text-signal-blue transition-all">
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
