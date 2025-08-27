import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'primary': ['var(--font-primary)'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					elevated: 'hsl(var(--surface-elevated))',
					glass: 'hsl(var(--surface-glass))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					dark: 'hsl(var(--primary-dark))',
					light: 'hsl(var(--primary-light))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				accent: {
					electric: 'hsl(var(--accent-electric))',
					violet: 'hsl(var(--accent-violet))',
					cyan: 'hsl(var(--accent-cyan))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-surface': 'var(--gradient-surface)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-hero': 'var(--gradient-hero)',
			},
			boxShadow: {
				'glow-primary': '0 0 20px var(--glow-primary)',
				'glow-accent': '0 0 20px var(--glow-accent)',
				'glow-violet': '0 0 20px var(--glow-violet)',
				'glass': '0 8px 32px var(--glass-shadow)',
			},
			backdropBlur: {
				'glass': '20px',
			},
			letterSpacing: {
				'tight': 'var(--letter-spacing-tight)',
				'wide': 'var(--letter-spacing-wide)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
