
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'poppins': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Updated Color Palette
				primary: {
					50: '#FDF2F5',
					100: '#FCE7EB',
					200: '#F9CDD6',
					300: '#F4A6B6',
					400: '#EC7A90',
					500: '#D91656', // New base color
					600: '#C01349',
					700: '#A1103E',
					800: '#850E35',
					900: '#6F0D2E',
				},
				accent: {
					50: '#FDF2F3',
					100: '#FCE7E9',
					200: '#F9CDD0',
					300: '#F4A6AC',
					400: '#EC7983',
					500: '#BE3144', // Accent 2
					600: '#A82A39',
					700: '#8C242F',
					800: '#7A2029',
					900: '#6B1F26',
				},
				coral: {
					50: '#FEF3F1',
					100: '#FDE4E0',
					200: '#FBCDC6',
					300: '#F7A89E',
					400: '#F17866',
					500: '#E17564', // Accent 3
					600: '#D1554A',
					700: '#B0453A',
					800: '#923B32',
					900: '#79342E',
				},
				background: {
					light: '#FFFFFF',
					dark: '#000000', // Pure black
					'dark-secondary': '#141414',
					'dark-tertiary': '#282828',
				},
				text: {
					light: '#000000', // Pure black for light mode
					dark: '#FFFFFF',
					'light-secondary': '#4A5568',
					'dark-secondary': '#E2E8F0',
				},
				// Keep existing shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				'typewriter': {
					'0%': { width: '0ch' },
					'100%': { width: '12ch' }
				},
				'blink': {
					'0%, 50%': { borderColor: 'transparent' },
					'51%, 100%': { borderColor: 'currentColor' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
				'typewriter': 'typewriter 3s steps(12) infinite',
				'blink': 'blink 1s infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
