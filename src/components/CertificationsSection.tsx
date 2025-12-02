import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Medal, BookOpen, CheckCircle, ArrowUpRight, GraduationCap } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const CertificationsSection = () => {
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

        // Content Animation
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

    const certifications = [
        {
            id: 1,
            name: "Meta Front-End Developer Professional Certificate",
            issuer: "Coursera",
            date: "2023",
            skills: ["React", "JavaScript", "UI/UX"],
            icon: <Medal size={24} weight="fill" className="text-accent-cyan" />
        },
        {
            id: 2,
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2023",
            skills: ["Cloud Computing", "Security", "AWS Services"],
            icon: <Medal size={24} weight="fill" className="text-primary" />
        }
    ];

    const ongoingCourses = [
        {
            id: 1,
            name: "Advanced React Patterns & Performance",
            platform: "Udemy",
            progress: "75%",
            icon: <BookOpen size={24} weight="fill" className="text-accent-violet" />
        },
        {
            id: 2,
            name: "Machine Learning A-Z: AI, Python & R",
            platform: "Udemy",
            progress: "40%",
            icon: <BookOpen size={24} weight="fill" className="text-accent-electric" />
        }
    ];

    return (
        <section id="certifications" ref={sectionRef} className="py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/3 -right-64 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                            Certifications & <span className="text-accent-cyan">Learning</span>
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-primary mx-auto rounded-full opacity-50" />
                    </div>

                    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Certifications Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Medal size={24} weight="fill" />
                                </div>
                                <h3 className="text-2xl font-semibold text-white">Professional Certificates</h3>
                            </div>

                            <div className="space-y-4">
                                {certifications.map((cert) => (
                                    <div key={cert.id} className="group relative p-6 rounded-2xl bg-surface-elevated/30 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="relative z-10 flex gap-4">
                                            <div className="p-3 h-fit rounded-xl bg-black/20 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                                {cert.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{cert.name}</h4>
                                                    <ArrowUpRight size={16} className="text-white/20 group-hover:text-primary transition-colors" />
                                                </div>
                                                <p className="text-white/60 text-sm mt-1 mb-3">{cert.issuer} • {cert.date}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {cert.skills.map((skill, idx) => (
                                                        <span key={idx} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-white/50">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ongoing Courses Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-accent-violet/10 text-accent-violet">
                                    <GraduationCap size={24} weight="fill" />
                                </div>
                                <h3 className="text-2xl font-semibold text-white">Courses in Progress</h3>
                            </div>

                            <div className="space-y-4">
                                {ongoingCourses.map((course) => (
                                    <div key={course.id} className="group relative p-6 rounded-2xl bg-surface-elevated/30 border border-white/5 hover:border-accent-violet/30 transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 rounded-xl bg-black/20 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                                {course.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-white group-hover:text-accent-violet transition-colors mb-1">{course.name}</h4>
                                                <p className="text-white/60 text-sm mb-3">{course.platform}</p>

                                                {/* Progress Bar */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs text-white/40">
                                                        <span>Progress</span>
                                                        <span>{course.progress}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-accent-violet to-accent-electric rounded-full"
                                                            style={{ width: course.progress }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* "More" Placeholder */}
                                <div className="p-6 rounded-2xl border border-white/5 border-dashed flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all cursor-pointer">
                                    <span className="text-sm font-medium">View All Learning Activity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificationsSection;
