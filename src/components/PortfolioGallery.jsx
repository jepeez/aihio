import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA ---
const base = import.meta.env.BASE_URL;

const PROJECTS = [
    {
        id: 'mirrykoru',
        title: 'MIRRYKORU',
        category: 'WEB DESIGN // BRANDING // COMMERCE',
        tag: 'CASE_STUDY',
        image: `${base}mirrymockup.webp`,
        url: 'https://mirrykoru.fi',
        content: {
            name: 'Projektin nimi: Mirrykoru: Verkkokauppa ja 3D-kustomointityökalu suomalaiselle korubrändille',
            oneLiner: 'Räätälöity verkkokauppakokemus, joka yhdistää suomalaisen käsityön ja modernin teknologian antamalla käyttäjien suunnitella omat korunsa reaaliaikaisella esikatselulla.',
            context: {
                title: '1. Tausta ja Tavoitteet (Context)',
                items: [
                    { label: 'Asiakas', value: 'Mirrykoru Oy (Suomalainen korubrändi).' },
                    { label: 'Tavoite', value: 'Luoda myyntialusta uniikeille, käsintehdyille puu- ja hartsikoruille sekä tarjota asiakkaille interaktiivinen työkalu omien korujen suunnitteluun.' },
                    { label: 'Minun roolini', value: 'Full Stack -kehittäjä / UI/UX-suunnittelija / Shopify-asiantuntija' },
                    { label: 'Teknologiat', value: 'Shopify (Liquid), HTML5, CSS3 (SCSS), JavaScript (ES6+), three.js, paytrail' },
                    { label: 'Aikataulu', value: '4 viikkoa' },
                ]
            },
            challenge: {
                title: '2. Haaste (The Challenge)',
                text: 'Korujen verkkokauppamarkkina on kilpailtu, joten Mirrykorun oli erotuttava massasta ei vain tuotteillaan, vaan myös ostokokemuksellaan.\n\nProjektin suurin tekninen ja suunnittelullinen haaste oli luoda intuitiivinen "Luo omat korusi" -työkalu. Sen piti toimia saumattomasti mobiililaitteilla ja ladata raskaat kuvat ja mallinnukset nopeasti, jotta sivuston suorituskyky ei kärsi. Lisäksi brändin piti viestiä vahvasti suomalaista luotettavuutta uudelle asiakaskunnalle.'
            },
            solution: {
                title: '3. Ratkaisu (The Solution)',
                features: [
                    {
                        name: 'Ominaisuus 1: Interaktiivinen kustomointityökalu ("Luo omat korusi")',
                        what: 'Toteutin toiminnallisuuden, jossa käyttäjä voi valita korumallin, ladata oman kuvansa tai valita värin, ja nähdä lopputuloksen välittömästi tuotekuvassa.',
                        why: 'Tämä poistaa ostamisen esteitä. Asiakkaat uskaltavat tilata kustomoidun tuotteen todennäköisemmin, kun he näkevät visuaalisen esikatselun ("WYSWIG - What You See Is What You Get") ennen ostopäätöstä.'
                    },
                    {
                        name: 'Ominaisuus 2: Luottamuksen rakentaminen ja brändäys',
                        what: 'Integroin sivuston ulkoasuun näkyvästi "Avainlippu"- ja "Design from Finland" -tunnukset sekä selkeät tiedot suomalaisesta valmistuksesta.',
                        why: 'Uudelle verkkokaupalle luottamus on elinehto. Kotimaisuuden korostaminen ei ole vain estetiikkaa, vaan strateginen valinta konversion (myynnin) kasvattamiseksi.'
                    },
                    {
                        name: 'Ominaisuus 3: Mobiilioptimoitu ostopolku',
                        what: 'Suunnittelin navigaation ja kassasivun (checkout) niin, että ne toimivat virheettömästi pienillä näytöillä. Valikot ovat helposti peukalolla käytettävissä ja tuotekuvat skaalautuvat oikein.',
                        why: 'Suurin osa korujen selaamisesta ja heräteostoksista tapahtuu mobiililaitteilla. Kitkaton mobiilikokemus varmistaa, ettei asiakas turhaudu kesken tilauksen.'
                    }
                ]
            },
            result: {
                title: '4. Lopputulos (The Result)',
                text: 'Lopputuloksena syntyi moderni ja responsiivinen verkkokauppa, joka tukee Mirrykorun brändiä. Sivusto ei ainoastaan toimi katalogina, vaan osallistaa käyttäjän suunnitteluprosessiin, mikä luo syvemmän suhteen tuotteeseen ja brändiin.'
            }
        }
    },
    {
        id: 'owleye',
        title: 'OWLEYE',
        category: 'WEBDESIGN',
        tag: 'WEBDESIGN',
        image: `${base}owleyemockup.webp`,
        url: 'https://owleye.fi',
        imageClass: 'object-center md:object-[center_30%]', // Custom positioning for this specific image
        content: {
            name: 'Projektin nimi: OwlEye: Digitaalinen alusta teollisuuden drone- ja suunnittelupalveluille',
            oneLiner: 'Selkeä ja vakuuttava yrityssivusto, joka visualisoi korkean teknologian palvelut – kuten lämpökuvauksen ja 3D-pistepilvet – teollisuuden päättäjille.',
            context: {
                title: '1. Tausta ja Tavoitteet (Context)',
                items: [
                    { label: 'Asiakas', value: 'OwlEye Oy (Teollisuuden dronepalveluihin ja 3D-suunnitteluun erikoistunut yritys).' },
                    { label: 'Tavoite', value: 'Luoda ammattimainen verkkopreesens, joka selkeyttää yrityksen monimutkaisen palvelutarjooman (tarkastukset, mallinnus) ja generoi tarjouspyyntöjä yritysasiakkailta.' },
                    { label: 'Minun roolini', value: 'Web-kehittäjä / UI-suunnittelija' },
                    { label: 'Teknologiat', value: 'HTML5, CSS3, JavaScript' },
                    { label: 'Aikataulu', value: '2 viikkoa' },
                ]
            },
            challenge: {
                title: '2. Haaste (The Challenge)',
                text: 'B2B-palveluissa haaste on usein monimutkaisen asian selittäminen yksinkertaisesti.\n\nOwlEye tarjoaa korkean tason teknisiä palveluita, kuten tuulivoimaloiden tarkastuksia ja fotogrammetriaa. Haasteena oli rakentaa sivusto, joka ei huku tekniseen jargoniin, vaan näyttää heti visuaalisesti, mitä yritys tekee.\n\nLisäksi sivuston oli oltava salamannopea raskaasta kuvamateriaalista huolimatta, ja sen piti vakuuttaa suuret teollisuuden toimijat yrityksen luotettavuudesta.'
            },
            solution: {
                title: '3. Ratkaisu (The Solution)',
                features: [
                    {
                        name: 'Ominaisuus 1: Palveluarkkitehtuurin selkeyttäminen',
                        what: 'Jaottelin sivuston navigaation selkeästi kahteen pääliiketoimintaan: Dronepalvelut ja Suunnittelupalvelut.',
                        why: 'Asiakas, joka etsii CAD-mallinnusta, on eri kohderyhmää kuin se, joka etsii katon lämpökuvausta. Selkeä jako ohjaa kävijän heti oikean tiedon äärelle ilman turhaa etsimistä.'
                    },
                    {
                        name: "Ominaisuus 2: Visuaalinen todistusaineisto (Show, don't tell)",
                        what: 'Sivusto rakennettiin visuaalisuuden ehdoilla. Käytin korkealaatuisia referenssikuvia (esim. pistepilvet ja ilmakuvat) keskeisissä kohdissa.',
                        why: 'Drone-alalla kuvanlaatu on tuote. Sivusto itsessään toimii portfoliona, joka todistaa OwlEyen kaluston ja osaamisen tason välittömästi.'
                    },
                    {
                        name: 'Ominaisuus 3: Suorituskyky ja mobiililataus',
                        what: 'Optimoin kuvat ja koodin niin, että sivusto latautuu nopeasti myös mobiiliverkossa, vaikka se sisältää visuaalista dataa.',
                        why: "Monet teollisuuden asiakkaat saattavat selata palveluita työmaalla tai liikkeessä. Hidas sivusto vie uskottavuuden 'high-tech' -toimijalta."
                    }
                ]
            },
            result: {
                title: '4. Lopputulos (The Result)',
                text: 'Sivusto on onnistuneesti tukenut OwlEyen myyntiä toimimalla digitaalisena käyntikorttina, joka herättää luottamusta. Selkeät Call-to-Action -painikkeet ja yhteydenottolomakkeet ovat madaltaneet kynnystä tarjouspyynnön jättämiseen vaativissa projekteissa.'
            }
        }
    },
    {
        id: 'kinetic',
        title: 'KINETIC FLOW',
        category: '3D ANIMATION // MOTION',
        tag: 'RENDER_03',
        isPlaceholder: true,
        placeholderNum: '03',
        bgClass: 'bg-zinc-900',
        gradClass: 'bg-gradient-to-br from-zinc-900 to-zinc-800'
    },
    {
        id: 'aura',
        title: 'AURA BRAND',
        category: 'IDENTITY // VIDEO',
        tag: 'BRAND_ID',
        isPlaceholder: true,
        placeholderNum: '04',
        bgClass: 'bg-neutral-900',
        gradClass: 'bg-gradient-to-br from-neutral-900 to-neutral-800'
    }
];

// --- COMPONENTS ---

const TiltCard = ({ project, onClick }) => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = (x / rect.width) * 2 - 1;
        const centerY = (y / rect.height) * 2 - 1;
        const maxTilt = 8;

        setStyle({
            '--mouse-x': `${x}px`,
            '--mouse-y': `${y}px`,
            transform: `perspective(1000px) rotateX(${-centerY * maxTilt}deg) rotateY(${centerX * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
        });
    };

    return (
        <div
            ref={cardRef}
            onClick={() => onClick(project)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`tilt-card aspect-video group cursor-pointer relative transition-transform duration-100 ease-out`}
            style={style}
        >
            {/* Borders/Brackets */}
            <div className="holo-sheen absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
            <div className="corner-bracket corner-bracket-tl top-0 left-0 border-t border-l border-white/20 absolute w-2 h-2 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-signal-blue"></div>
            <div className="corner-bracket corner-bracket-tr top-0 right-0 border-t border-r border-white/20 absolute w-2 h-2 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-signal-blue"></div>
            <div className="corner-bracket corner-bracket-bl bottom-0 left-0 border-b border-l border-white/20 absolute w-2 h-2 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-signal-blue"></div>
            <div className="corner-bracket corner-bracket-br bottom-0 right-0 border-b border-r border-white/20 absolute w-2 h-2 transition-all duration-300 group-hover:w-5 group-hover:h-5 group-hover:border-signal-blue"></div>

            {/* Content Deep Layer */}
            <div className={`absolute inset-0 tilt-deep overflow-hidden ${project.isPlaceholder ? project.bgClass : 'bg-gray-900'}`}>
                {project.image ? (
                    <>
                        <img
                            src={project.image}
                            alt={`${project.title} Mockup`}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                    </>
                ) : project.isPlaceholder ? (
                    <>
                        <div className={`absolute inset-0 ${project.gradClass} transition-transform duration-700 ease-out`}></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 font-mono text-9xl font-bold text-white select-none">
                            {project.placeholderNum}
                        </div>
                    </>
                ) : null}
            </div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 tilt-content z-10">
                <div className="border-l-2 border-signal-blue pl-4 backdrop-blur-sm bg-black/20 p-2 rounded-r">
                    <h3 className="font-mono text-2xl text-white font-bold mb-1 tracking-tight group-hover:text-signal-blue transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-signal-blue rounded-full animate-pulse"></span>
                        <p className="font-sans text-sm text-white/80">
                            {project.category}
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute top-6 right-6 tilt-floating z-20">
                <div className="font-mono text-[10px] text-signal-blue border border-signal-blue/30 px-2 py-1 bg-black/40 backdrop-blur-sm">
                    {project.tag}
                </div>
            </div>
        </div>
    );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
    // Determine target location. 
    // If window is defined (client-side), use document.body, otherwise null (server-side, though this component is client-loaded)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project || !mounted) return null;
    const { content } = project;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto custom-scrollbar"
                    onClick={onClose}
                >
                    <div className="min-h-full flex items-center justify-center py-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full max-w-5xl bg-neutral-900 border border-white/10 shadow-2xl relative flex flex-col md:rounded-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all border border-white/10 group"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Header Image */}
                            <div className="relative h-[40vh] md:h-[50vh] shrink-0 overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover ${project.imageClass || 'object-top'}`}
                                    />
                                ) : (
                                    <div className={`w-full h-full ${project.gradClass || 'bg-zinc-900'}`}></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full pb-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex flex-wrap items-center gap-4 mb-4">
                                            <div className="inline-block px-3 py-1 border border-signal-blue/30 bg-signal-blue/10 rounded-full">
                                                <p className="text-signal-blue font-mono text-xs tracking-wider">{project.category}</p>
                                            </div>
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-signal-green hover:text-black border border-white/10 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer z-50"
                                                >
                                                    <span className="font-mono text-xs tracking-wider uppercase text-white group-hover:text-black">Vieraile sivuilla</span>
                                                    <svg className="w-3 h-3 text-white/70 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">{project.title}</h2>
                                    </motion.div>
                                </div>
                            </div>


                            {/* Content Body */}
                            <div className="bg-neutral-900 relative">
                                {content ? (
                                    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-16 pb-24">
                                        {/* One-Liner */}
                                        <section>
                                            <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed">
                                                "{content.oneLiner}"
                                            </p>
                                        </section>

                                        {/* Grid Stats */}
                                        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5">
                                            {content.context.items.map((item, idx) => (
                                                <div key={idx} className="col-span-1">
                                                    <h4 className="text-signal-blue text-xs font-mono uppercase tracking-wider mb-2 opacity-80">{item.label}</h4>
                                                    <p className="text-white font-medium text-sm leading-snug">{item.value}</p>
                                                </div>
                                            ))}
                                        </section>

                                        {/* Challenge & Solution */}
                                        <div className="grid md:grid-cols-2 gap-16">
                                            <section>
                                                <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6 font-mono">
                                                    <span className="text-signal-blue">01.</span>
                                                    Haaste
                                                </h3>
                                                <p className="text-gray-400 leading-relaxed whitespace-pre-line text-lg">
                                                    {content.challenge.text}
                                                </p>
                                            </section>

                                            <section>
                                                <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6 font-mono">
                                                    <span className="text-signal-blue">02.</span>
                                                    Ratkaisu
                                                </h3>
                                                <div className="space-y-8">
                                                    {content.solution.features.map((feature, idx) => (
                                                        <div key={idx}>
                                                            <h4 className="text-white font-bold mb-2 text-lg">
                                                                {feature.name.split(':')[1].trim()}
                                                            </h4>
                                                            <p className="text-gray-400 text-sm leading-relaxed mb-2">
                                                                <span className="text-signal-blue uppercase text-xs font-bold tracking-wide">Mitä tein:</span> {feature.what}
                                                            </p>
                                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                                <span className="text-signal-blue uppercase text-xs font-bold tracking-wide">Miksi:</span> {feature.why}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>

                                        {/* Result */}
                                        <section className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl p-8 border border-white/5">
                                            <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4 font-mono">
                                                <span className="text-signal-blue">03.</span>
                                                Lopputulos
                                            </h3>
                                            <p className="text-gray-200 leading-relaxed text-lg">
                                                {content.result.text}
                                            </p>
                                        </section>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-32 opacity-30">
                                        <div className="text-6xl mb-6 grayscale">Waiting</div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Case Study In Progress</h3>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div >
            )}
        </AnimatePresence >,
        document.body
    );
};

export default function PortfolioGallery() {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const closeDrawer = () => {
        setSelectedProject(null);
    };

    return (
        <>
            <div className="grid md:grid-cols-2 gap-12">
                {PROJECTS.map((project) => (
                    <TiltCard key={project.id} project={project} onClick={handleProjectClick} />
                ))}
            </div>
            <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={closeDrawer} />
        </>
    );
}
