import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, UsersThree, Briefcase, CalendarBlank, GraduationCap, Desktop, House, Person, Handshake } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const otherRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const container = containerRef.current;
        const other = otherRef.current;

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
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                }
            }
        );

        // Other Experience animation
        if (other) {
            const otherChildren = Array.from(other.children);
            gsap.fromTo(otherChildren,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: other,
                        start: 'top 90%',
                    }
                }
            );
        }
    }, []);

    const experiences = [
        {
            id: 1,
            role: "Vice President",
            organization: "Computer Science Student Community, SLIIT",
            period: "2025 – Present",
            description: "Provide strategic oversight for academic, professional, and student-led initiatives within the department. Liaise with faculty representatives and student leadership to support departmental objectives.",
            icon: <Crown size={32} weight="fill" />,
            color: "text-primary",
            borderColor: "hover:border-primary/30",
            bgGradient: "from-primary/10",
        },
        {
            id: 2,
            role: "Value Delivery Team Leader",
            organization: "AIESEC in SLIIT",
            period: "2024 – Present",
            description: "Lead a functional team responsible for the effective delivery of organisational programmes. Facilitate cross-functional collaboration to ensure timely execution of initiatives.",
            icon: <UsersThree size={32} weight="fill" />,
            color: "text-accent-cyan",
            borderColor: "hover:border-accent-cyan/30",
            bgGradient: "from-accent-cyan/10",
        },
        {
            id: 3,
            role: "Batch Representative",
            organization: "2nd Batch, BSc Computer Science – SLIIT",
            period: "2023 – Present",
            description: "Serve as the primary point of contact between students and academic staff. Support coordination of academic schedules, events, and student communications.",
            icon: <GraduationCap size={32} weight="fill" />,
            color: "text-accent-violet",
            borderColor: "hover:border-accent-violet/30",
            bgGradient: "from-accent-violet/10",
        },
        {
            id: 4,
            role: "Committee Member",
            organization: "Faculty of Computing Student Community (FCSC), SLIIT",
            period: "2026 – Present",
            description: "Contribute to faculty-level student initiatives and community engagement activities.",
            icon: <House size={32} weight="fill" />,
            color: "text-accent-electric",
            borderColor: "hover:border-accent-electric/30",
            bgGradient: "from-accent-electric/10",
        },
        {
            id: 5,
            role: "Member",
            organization: "Microsoft Club of SLIIT",
            period: "2024 – Present",
            description: "Engage in technology-focused workshops, seminars, and community initiatives hosted by the Microsoft Student Club.",
            icon: <Desktop size={32} weight="fill" />,
            color: "text-primary",
            borderColor: "hover:border-primary/30",
            bgGradient: "from-primary/10",
        },
        {
            id: 6,
            role: "Prefect",
            organization: "President's College, Embilipitiya",
            period: "2017 – 2020",
            description: "Contributed to student leadership, discipline enforcement, and coordination of school activities.",
            icon: <Person size={32} weight="fill" />,
            color: "text-accent-cyan",
            borderColor: "hover:border-accent-cyan/30",
            bgGradient: "from-accent-cyan/10",
        }
    ];

    const otherExperience = [
        {
            id: 1,
            role: "Trainee",
            organization: "Bank of Ceylon (BOC)",
            period: "2022 – 2023",
            description: "Supported daily banking operations, customer service functions, and administrative processes. Developed professional competencies including confidentiality, organisational discipline, and time management.",
            icon: <Handshake size={28} weight="fill" />,
            color: "text-accent-violet",
            borderColor: "hover:border-accent-violet/30",
            bgGradient: "from-accent-violet/10",
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
                            Career &amp; Leadership
                        </div>
                        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                            Positions of <span className="text-primary">Responsibility</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-violet mx-auto rounded-full opacity-50" />
                    </div>

                    {/* Positions of Responsibility */}
                    <div ref={containerRef} className="grid sm:grid-cols-2 gap-5">
                        {experiences.map((exp) => (
                            <div key={exp.id} className={`group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${exp.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}>
                                {/* Top Shine */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Hover Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${exp.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                <div className="relative z-10 flex gap-5 items-start">
                                    {/* Icon */}
                                    <div className={`p-3 rounded-2xl bg-black/20 border border-white/5 ${exp.color} group-hover:scale-110 transition-transform duration-500 shadow-inner flex-shrink-0`}>
                                        {exp.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col gap-1 mb-2">
                                            <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors tracking-tight leading-tight">{exp.role}</h3>
                                            <div className="flex items-center gap-1.5 text-white/40 text-xs font-medium bg-white/5 px-2 py-0.5 rounded-full border border-white/5 w-fit">
                                                <CalendarBlank size={11} weight="bold" />
                                                <span>{exp.period}</span>
                                            </div>
                                        </div>

                                        <h4 className={`text-sm font-semibold ${exp.color} mb-2 leading-snug`}>
                                            {exp.organization}
                                        </h4>

                                        <p className="text-white/60 leading-relaxed text-sm">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Other Experience */}
                    <div className="mt-16">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-wider mb-4">
                                <Briefcase size={14} weight="bold" />
                                Other Experience
                            </div>
                        </div>
                        <div ref={otherRef} className="space-y-5">
                            {otherExperience.map((exp) => (
                                <div key={exp.id} className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${exp.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}>
                                    {/* Top Shine */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                                        <div className={`p-4 rounded-2xl bg-black/20 border border-white/5 ${exp.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                            {exp.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                                                <div className="flex items-center gap-2 text-white/50 text-sm font-medium mt-2 md:mt-0 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                                    <CalendarBlank size={14} weight="bold" />
                                                    <span>{exp.period}</span>
                                                </div>
                                            </div>
                                            <h4 className={`text-lg font-semibold ${exp.color} mb-3`}>{exp.organization}</h4>
                                            <p className="text-white/70 leading-relaxed text-lg font-light">{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
