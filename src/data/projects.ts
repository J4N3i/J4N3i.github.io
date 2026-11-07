import type { Project } from '@/types';
import { profile } from './profile';

export const projects: Project[] = [
  {
    slug: 'enterprise-devops-lab',
    title: 'Enterprise DevOps Lab & Private Cloud',
    oneLiner: 'Self-hosted private cloud and automated CI/CD infrastructure for microservices.',
    problem:
      'Managing personal and team data across fragmented third-party services posed privacy risks and lacked automated deployment workflows.',
    role: 'I architected the virtualised environment on Proxmox VE with TrueNAS storage and configured automated GitHub Actions pipelines.',
    // TODO: Replace with measurable uptime, build speedup, or storage capacity (e.g. "Achieved 99.9% uptime and reduced deployment time by 40%")
    result:
      'Delivers secure, zero-trust access to self-hosted microservices with automated cloud deployment.',
    image: '/projects/enterprise-devops-lab.svg',
    imageAlt:
      'Architecture diagram and status monitoring dashboard of the Proxmox and TrueNAS private cloud',
    tags: ['Proxmox', 'Docker', 'TrueNAS', 'GitHub Actions', 'Azure'],
    repoUrl: profile.githubUrl,
    link: profile.githubUrl,
    desc: 'Architected a zero-trust private cloud using Proxmox VE for virtualisation and TrueNAS SCALE for ZFS-backed RAID 1 storage. Deployed containerised microservices with automated CI/CD via GitHub Actions.',
    featured: true,
  },
  {
    slug: 'internova-matching-portal',
    title: 'Internova — Internship Matching Portal',
    oneLiner: 'Cloud-hosted web platform connecting university students with industry internships.',
    problem:
      'Undergraduate students lacked a structured, secure platform to discover and apply for verified internship openings.',
    role: 'I engineered the 3-tier system using ASP.NET Core Web API and React, with role-based access control and Azure cloud hosting.',
    // TODO: Replace with measurable user count or placement rate (e.g. "Supported 200+ student applications with sub-second API responses")
    result:
      'Enables students and employers to manage verified internship applications with secure authenticated workflows.',
    image: '/projects/internova-portal.svg',
    imageAlt:
      'Internova dashboard displaying student applications, matching listings, and role-based permissions',
    tags: ['ASP.NET Core', 'React', 'Azure', 'MySQL', 'JWT'],
    repoUrl: `${profile.githubUrl}/Internova`,
    link: `${profile.githubUrl}/Internova`,
    desc: 'Engineered a 3-tier architecture deployed on Microsoft Azure using an ASP.NET Core Web API backend and React frontend with JWT authentication and role-based access control.',
    featured: false,
  },
  {
    slug: 'ds-pay-distributed-payments',
    title: 'DS-Pay — Distributed Payments System',
    oneLiner:
      'Fault-tolerant distributed payment cluster ensuring consensus and exact transactions.',
    problem:
      'High-volume payment networks risk duplicate charges and data inconsistency when network partitions or server failures occur.',
    role: 'I built a multi-node FastAPI backend cluster with Apache ZooKeeper leader election and write-ahead log replication.',
    // TODO: Replace with transaction throughput or failover recovery latency (e.g. "Processed 1,000+ simulated transactions/sec with zero duplicate charges during node failover")
    result:
      'Guarantees safe transaction processing and automatic failover across nodes without double-spending.',
    image: '/projects/ds-pay-system.svg',
    imageAlt:
      'Distributed node cluster topology showing ZooKeeper leader election and transaction replication',
    tags: ['Python', 'FastAPI', 'ZooKeeper', 'SQLite', 'Distributed Systems'],
    repoUrl: `${profile.githubUrl}/payment_system_zookeeper`,
    link: `${profile.githubUrl}/payment_system_zookeeper`,
    desc: 'Designed a distributed payments prototype demonstrating leader election via Apache ZooKeeper, WAL replication, and idempotent transactions across a multi-node FastAPI cluster.',
    featured: false,
  },
  {
    slug: 'portfolio-website',
    title: 'Modern Personal Portfolio & AI Chatbot',
    oneLiner: 'Prerendered, accessible portfolio featuring interactive AI assistance and motion.',
    problem:
      'Client-side rendered portfolios fail to show content to search engine crawlers and lack interactive recruiter engagement.',
    role: 'I developed the statically prerendered React and Vite architecture with custom GSAP animations and an embedded AI chatbot.',
    // TODO: Replace with measurable Lighthouse score (e.g. "Achieved 98+ Lighthouse performance on mobile and 100% crawlable content")
    result:
      'Delivers instant first-paint loads with full search engine indexation and accessible WCAG-compliant interactions.',
    image: '/projects/portfolio-website.svg',
    imageAlt:
      'Portfolio desktop preview showcasing recruiter-friendly layout, hero value statement, and chatbot',
    tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP'],
    liveUrl: profile.siteUrl,
    repoUrl: `${profile.githubUrl}/J4N3i.github.io`,
    link: `${profile.githubUrl}/J4N3i.github.io`,
    desc: 'Designed and built this personal portfolio using React 18, TypeScript, and Vite with native SSR prerendering, GSAP ScrollTrigger animations, and an interactive NLP chatbot assistant.',
    featured: false,
  },
];

export const otherProjects = [
  {
    title: 'TestLang Compiler (PPcom)',
    desc: 'Custom language compiler in Java using JFlex and CUP to generate Abstract Syntax Trees, integrated with a Spring Boot REST API.',
    tags: ['Java', 'JFlex', 'CUP', 'Spring Boot', 'AST'],
    repoUrl: `${profile.githubUrl}/PPcom`,
  },
  {
    title: 'Exodus — 3D Interactive Environment',
    desc: "Programmed custom AI agent behaviours and navigation tracking using Unity's baked NavMesh system.",
    tags: ['Unity', 'C#', 'AI Navigation', 'NavMesh'],
    repoUrl: `${profile.githubUrl}/Exodus`,
  },
];
