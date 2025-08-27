
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--accent))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					elevated: 'hsl(var(--surface-elevated))',
					overlay: 'hsl(var(--surface-overlay))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-hover))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))'
				},
				muted: {
					DEFAULT: 'hsl(var(--surface))',
					foreground: 'hsl(var(--foreground-muted))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					elevated: 'hsl(var(--card-elevated))',
					foreground: 'hsl(var(--foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--surface-elevated))',
					foreground: 'hsl(var(--foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--foreground))'
				},
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))',
				info: 'hsl(var(--info))',
				hover: 'hsl(var(--hover))',
				active: 'hsl(var(--active))',
				// Added: code color tokens so utilities like bg-code-bg, border-code-border, text-code-keyword exist
				code: {
					bg: 'hsl(var(--code-bg))',
					border: 'hsl(var(--code-border))',
					keyword: 'hsl(var(--code-keyword))',
					string: 'hsl(var(--code-string))',
					comment: 'hsl(var(--code-comment))',
					number: 'hsl(var(--code-number))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'var(--radius-sm)'
			},
			fontFamily: {
				sans: [
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'sans-serif'
				],
				mono: [
					'JetBrains Mono',
					'Fira Code',
					'Monaco',
					'Cascadia Code',
					'Roboto Mono',
					'monospace'
				]
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'hsl(var(--foreground-muted))',
						'[class~="lead"]': {
							color: 'hsl(var(--foreground-muted))'
						},
						a: {
							color: 'hsl(var(--accent))',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline'
							}
						},
						strong: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						'h1, h2, h3, h4, h5, h6': {
							color: 'hsl(var(--foreground))',
							fontWeight: '700'
						},
						code: {
							color: 'hsl(var(--code-keyword))',
							backgroundColor: 'hsl(var(--code-bg))',
							padding: '0.25rem 0.5rem',
							borderRadius: '0.375rem',
							fontSize: '0.875rem',
							fontWeight: '500'
						},
						'code::before': {
							content: '""'
						},
						'code::after': {
							content: '""'
						},
						pre: {
							backgroundColor: 'hsl(var(--code-bg))',
							border: '1px solid hsl(var(--code-border))',
							borderRadius: '0.75rem'
						}
					}
				}
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
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
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
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'glow-pulse': {
					'0%': {
						opacity: '0.5'
					},
					'100%': {
						opacity: '1'
					}
				},
				'loading-shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
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
				'scroll-left': {
					'0%': {
						transform: 'translateX(100%)'
					},
					'100%': {
						transform: 'translateX(-100%)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(-5%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'slide-up': 'slide-up 0.8s ease-out forwards',
				'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.4s ease-out forwards',
				'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
				'loading-shimmer': 'loading-shimmer 1.5s infinite',
				'float': 'float 6s ease-in-out infinite',
				'scroll-left': 'scroll-left 30s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	],
} satisfies Config;
