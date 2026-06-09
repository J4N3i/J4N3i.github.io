import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, CalendarBlank, Medal, Bank } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const container = containerRef.current;

        if (!section || !title || !container) return;

        // Title Animation
        gsap.fromTo(title,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                }
            }
        );

        // Cards Animation
        const children = Array.from(container.children);
        gsap.fromTo(children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                }
            }
        );
    }, []);

    const education = [
        {
            id: 1,
            degree: "BSc (Hons) in Computer Science",
            institution: "Sri Lanka Institute of Information Technology (SLIIT)",
            period: "2024 – Present",
            description: "Currently following the undergraduate degree program. Focus areas include Distributed Systems, Compiler Design, Software Engineering, and Database Management.",
            icon: <GraduationCap size={32} weight="fill" />,
            color: "text-primary",
            borderColor: "hover:border-primary/30",
            bgGradient: "from-primary/10",
        },
        {
            id: 2,
            degree: "G.C.E. Advanced Level (A/L)",
            institution: "President's College, Embilipitiya",
            period: "2017 – 2020",
            description: "Completed secondary education with a strong foundation in analytical and academic skills, preparing for higher education in technology.",
            icon: <Bank size={32} weight="fill" />,
            color: "text-accent-violet",
            borderColor: "hover:border-accent-violet/30",
            bgGradient: "from-accent-violet/10",
        }
    ];

    return (
        <section id="education" ref={sectionRef} className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent-violet/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider mb-4">
                            <Medal size={14} weight="bold" />
                            Academic Background
                        </div>
                        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                            My <span className="text-accent-violet">Education</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-accent-violet to-primary mx-auto rounded-full opacity-50" />
                    </div>

                    {/* Education Items */}
                    <div ref={containerRef} className="space-y-6">
                        {education.map((edu) => (
                            <div key={edu.id} className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${edu.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}>
                                {/* Top Shine */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Hover Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${edu.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                                    <div className={`p-4 rounded-2xl bg-black/20 border border-white/5 ${edu.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                        {edu.icon}
                                    </div>
                                    
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                            <h3 className="text-2xl font-bold text-white tracking-tight">{edu.degree}</h3>
                                            <div className="flex items-center gap-2 text-white/50 text-sm font-medium mt-2 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5 whitespace-nowrap">
                                                <CalendarBlank size={14} weight="bold" />
                                                <span>{edu.period}</span>
                                            </div>
                                        </div>
                                        
                                        <h4 className={`text-lg font-semibold ${edu.color} mb-3`}>{edu.institution}</h4>
                                        <p className="text-white/70 leading-relaxed font-light">{edu.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
