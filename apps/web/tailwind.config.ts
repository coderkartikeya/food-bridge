import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A7F37',       
          'primary-hover': '#14612A', 
          secondary: '#FBBF24',     
          destructive: '#DC2626',
        },
        status: {
          success: "#2A7938",
          error: "#DC2626",
          warning: "#F5A623",
          info: "#3B82F6",
        },
        text: {
          heading: "#111827",
          body: "#4B5563",
          muted: "#6B7280",
          disabled: "#9CA3AF",
        },
        bg: {
          app: "#F8F9FA",
          card: "#FFFFFF",
          disabled: "#E5E7EB",
        },
        border: {
          subtle: "#E5E7EB",
          focus: "#2A7938",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        }
      },
      keyframes: {
        dropdownIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        }
      },
      animation: {
        
        dropdownIn: 'dropdownIn 120ms cubic-bezier(0.16, 1, 0.3, 1) both',
      }
    },
  },
  plugins: [],
}

export default config;