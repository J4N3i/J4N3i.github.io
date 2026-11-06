import type { Project } from '@/types';
import { profile } from './profile';

export const projects: Project[] = [
  {
    title: 'Enterprise DevOps Lab & Private Cloud',
    desc: 'Architected a zero-trust private cloud using Proxmox VE for virtualisation and TrueNAS SCALE for ZFS-backed RAID 1 storage. Deployed a containerised microservices stack (Nextcloud, Pi-hole, n8n, Nginx) and an automated CI/CD pipeline via GitHub Actions deploying to Azure/AWS.',
    tags: ['Proxmox', 'TrueNAS', 'Docker', 'Tailscale', 'GitHub Actions', 'Grafana'],
    link: profile.githubUrl,
    featured: true,
  },
  {
    title: 'Internova — Internship Matching Portal',
    desc: 'Engineered a 3-tier architecture deployed on Microsoft Azure using an ASP.NET Core Web API backend and a React.js (Vite) frontend. Implemented JWT authentication, Role-Based Access Control (RBAC), and a 3NF normalised database on Azure Flexible Server.',
    tags: ['.NET 8', 'React', 'Azure', 'MySQL', 'JWT', 'RBAC'],
    link: `${profile.githubUrl}/Internova`,
  },
  {
    title: 'DS-Pay — Distributed Payments System',
    desc: 'Designed a distributed payments prototype demonstrating leader election via Apache ZooKeeper, WAL replication, and idempotent transactions. Built a multi-node FastAPI cluster with Lamport logical clocks and Berkeley-style time synchronisation.',
    tags: ['Python', 'FastAPI', 'ZooKeeper', 'SQLite', 'Distributed Systems'],
    link: `${profile.githubUrl}/payment_system_zookeeper`,
  },
  {
    title: 'TestLang Compiler (PPcom)',
    desc: 'Developed a custom language compiler in Java using JFlex for lexical analysis and CUP for parsing to generate an Abstract Syntax Tree (AST). Integrated with a Spring Boot REST API to process and execute custom language scripts via a web interface.',
    tags: ['Java', 'JFlex', 'CUP', 'Spring Boot', 'AST', 'REST API'],
    link: `${profile.githubUrl}/PPcom`,
  },
  {
    title: 'Exodus — 3D Interactive Environment',
    desc: "Programmed custom AI agent behaviours and navigation tracking using Unity's baked NavMesh system. Integrated custom 3D models alongside dynamic interactive object scripts for an immersive interactive environment.",
    tags: ['Unity', 'C#', 'AI Navigation', 'NavMesh', '3D Modelling'],
    link: `${profile.githubUrl}/Exodus`,
  },
  {
    title: 'Personal Portfolio Website',
    desc: `Designed and built this animated personal portfolio using React 18, TypeScript, and Vite. Integrated GSAP ScrollTrigger animations, shadcn-ui components, a Spline 3D background, and a custom AI chatbot assistant — deployed live at ${profile.siteUrl.replace('https://', '')}.`,
    tags: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Vite', 'Spline'],
    link: `${profile.githubUrl}/J4N3i.github.io`,
  },
];
