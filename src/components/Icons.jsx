const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false };
export const LockIcon = (p) => (<svg {...base} {...p}><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
export const SpeakerIcon = (p) => (<svg {...base} {...p}><path d="M4 9.5v5h4l5 4v-13l-5 4H4z" /><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11" /></svg>);
export const MutedIcon = (p) => (<svg {...base} {...p}><path d="M4 9.5v5h4l5 4v-13l-5 4H4z" /><path d="M17 9.5l4 5M21 9.5l-4 5" /></svg>);
export const CheckIcon = (p) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const CloseIcon = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const ChevronIcon = ({ dir = 'right', ...p }) => (<svg {...base} {...p}><path d={dir === 'right' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'} /></svg>);
export const MenuIcon = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const PlayIcon = (p) => (<svg {...base} {...p} fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5z" /></svg>);
