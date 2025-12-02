import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, UsersThree, Briefcase, CalendarBlank } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
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

    const experiences = [
        {
            id: 1,
            role: "Vice President",
            organization: "Computer Sciences Student Committee (CSSC)",
            period: "2023 - Present",
            description: "Leading initiatives to empower CS students, organizing tech events, and fostering a collaborative community at SLIIT.",
            icon: <Crown size={32} weight="fill" />,
            color: "text-primary",
            borderColor: "hover:border-primary/30",
            bgGradient: "from-primary/10",
            iconBg: "bg-primary/20"
        },
        {
            id: 2,
            role: "Team Leader (VD)",
            organization: "AIESEC in SLIIT",
            period: "1 Year Experience",
            description: "Managed video development projects, led a creative team, and contributed to impactful global exchange campaigns.",
            icon: <UsersThree size={32} weight="fill" />,
            color: "text-accent-cyan",
            borderColor: "hover:border-accent-cyan/30",
            bgGradient: "from-accent-cyan/10",
            iconBg: "bg-accent-cyan/20"
        }
    ];

    return (
        <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider mb-4">
                            <Briefcase size={14} weight="bold" />
                            Career & Leadership
                        </div>
                        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                            Professional <span className="text-primary">Experience</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-violet mx-auto rounded-full opacity-50" />
                    </div>

                    <div ref={containerRef} className="space-y-6">
                        {experiences.map((exp) => (
                            <div key={exp.id} className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${exp.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}>
                                {/* Top Shine */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Hover Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${exp.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                    {/* Icon */}
                                    <div className={`p-4 rounded-2xl bg-black/20 border border-white/5 ${exp.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                        {exp.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors tracking-tight">{exp.role}</h3>
                                            <div className="flex items-center gap-2 text-white/50 text-sm font-medium mt-2 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                <CalendarBlank size={14} weight="bold" />
                                                <span>{exp.period}</span>
                                            </div>
                                        </div>

                                        <h4 className={`text-lg font-semibold ${exp.color} mb-4 flex items-center gap-2`}>
                                            {exp.organization}
                                        </h4>

                                        <p className="text-white/70 leading-relaxed text-lg font-light">
                                            {exp.description}
                                        </p>
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

export default ExperienceSection;
