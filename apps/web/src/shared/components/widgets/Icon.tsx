import type { SVGProps } from "react";

/**
 * Gradient "AI sphere" mark used as the LingoLearn app icon on the
 * auth pages (indigo -> violet -> pink), matches the Figma component
 * "Gradient AI Sphere Icon with lightning/energy".
 */
export function AiSphereMark({ className }: { className?: string }) {
  return (
    <div
      className={`flex size-14 items-center justify-center rounded-2xl shadow-[0_0_0_4px_white,0_10px_15px_-3px_rgba(70,72,212,0.25),0_4px_6px_-4px_rgba(70,72,212,0.25)] ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(45deg, #4648D4 0%, #7B68EE 50%, #F472B6 100%)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-7 text-white">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <path
        fill="#4285F4"
        d="M19.6 10.23c0-.68-.06-1.32-.17-1.94H10v3.68h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.75 2.99-4.32 2.99-7.26Z"
      />
      <path
        fill="#34A853"
        d="M10 20c2.7 0 4.96-.9 6.61-2.44l-3.23-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H1.07v2.59A10 10 0 0 0 10 20Z"
      />
      <path
        fill="#FBBC05"
        d="M4.41 11.9a6.02 6.02 0 0 1 0-3.8V5.51H1.07a10 10 0 0 0 0 8.98l3.34-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M10 3.98c1.47 0 2.79.5 3.83 1.49l2.87-2.87C14.95.98 12.7 0 10 0 6.09 0 2.72 2.24 1.07 5.51l3.34 2.6C5.2 5.75 7.4 3.98 10 3.98Z"
      />
    </svg>
  );
}

export function MicrosoftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <path fill="#F25022" d="M2 2h8.5v8.5H2z" />
      <path fill="#7FBA00" d="M9.5 2H18v8.5H9.5z" />
      <path fill="#00A4EF" d="M2 9.5h8.5V18H2z" />
      <path fill="#FFB900" d="M9.5 9.5H18V18H9.5z" />
    </svg>
  );
}

/** "Clever" SSO — a bold white "C" on a solid blue rounded background. */
export function CleverIcon({ className }: { className?: string }) {
  return (
    <div
      className={`flex size-5 items-center justify-center rounded-full bg-[#1855A3] ${className ?? ""}`}
    >
      <span className="text-[11px] font-extrabold leading-none text-white">
        C
      </span>
    </div>
  );
}

export function ClassLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M14.8 8.05A4.5 4.5 0 0 0 6.1 6.52 3.5 3.5 0 0 0 6.5 13.5h8a3 3 0 0 0 .3-5.98Z"
        fill="#38BDF8"
      />
    </svg>
  );
}
