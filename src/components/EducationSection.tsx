import { useRef } from 'react';
import { gsap } from 'gsap';
import { Medal, CalendarBlank } from 'phosphor-react';
import { educationList } from '@/data';
import { useSectionReveal } from '@/hooks/useSectionReveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ANIMATION_DURATION, ANIMATION_EASING, SCROLL_TRIGGER_POINTS } from '@/constants/animations';

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useSectionReveal(sectionRef, () => {
        const title = titleRef.current;
        const container = containerRef.current;

        // Title Animation
        if (title) {
            gsap.fromTo(title,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: ANIMATION_DURATION.normal,
                    ease: ANIMATION_EASING.power3Out,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        ...SCROLL_TRIGGER_POINTS.header,
                    }
                }
            );
        }

        // Cards Animation
        if (container) {
            const children = Array.from(container.children);
            gsap.fromTo(children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: ANIMATION_DURATION.normal,
                    stagger: 0.2,
                    ease: ANIMATION_EASING.power3Out,
                    scrollTrigger: {
                        trigger: container,
                        ...SCROLL_TRIGGER_POINTS.cards,
                    }
                }
            );
        }
    });

    return (
        <section id="education" ref={sectionRef} className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent-violet/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <SectionHeader
                        ref={titleRef}
                        className="mb-16"
                        badgeIcon={Medal}
                        badgeText="Academic Background"
                        titleNormal="My"
                        titleAccent="Education"
                        accentColorClass="text-accent-violet"
                        dividerGradient="from-accent-violet to-primary"
                    />

                    {/* Education Items */}
                    <div ref={containerRef} className="space-y-6">
                        {educationList.map((edu) => {
                            const IconComponent = edu.icon;
                            return (
                                <div key={edu.id} className={`group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 ${edu.borderColor} transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10`}>
                                    {/* Top Shine */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${edu.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                                        <div className={`p-4 rounded-2xl bg-black/20 border border-white/5 ${edu.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                            <IconComponent size={32} weight="fill" />
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
