
export const iconMapper = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  
  edit: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),

  check: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  eye: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  ),
  chevronDown: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  closeSmall: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="currentColor">
      <path d="M6.414 5l2.293-2.293a1 1 0 00-1.414-1.414L5 3.586 2.707 1.293A1 1 0 001.293 2.707L3.586 5 1.293 7.293a1 1 0 001.414 1.414L5 6.414l2.293 2.293a1 1 0 001.414-1.414L6.414 5z" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  ),
  emptyState: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35M11 8v3M11 14h.01" />
    </svg>
  ),
  errorCircle: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 0a7 7 0 100 14A7 7 0 007 0zm.75 10.25h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-4h1.5v4z" />
    </svg>
  ),
  leafCustom: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.34375 19.985C2.28125 18.9225 1.45833 17.7037 0.875 16.3287C0.291667 14.9537 0 13.5475 0 12.11C0 10.7141 0.28125 9.31831 0.84375 7.92248C1.40625 6.52664 2.28125 5.23498 3.46875 4.04748C4.46875 3.04748 5.69792 2.2506 7.15625 1.65685C8.61458 1.0631 10.2031 0.636018 11.9219 0.375601C13.6406 0.115184 15.4531 -0.00981571 17.3594 0.000600962C19.2656 0.0110176 21.1771 0.109976 23.0938 0.297476C23.2604 2.00581 23.3594 3.78706 23.3906 5.64123C23.4219 7.49539 23.3125 9.30268 23.0625 11.0631C22.8125 12.8235 22.401 14.4694 21.8281 16.0006C21.2552 17.5319 20.4479 18.8183 19.4062 19.86C18.2812 21.0058 17.0407 21.86 15.6847 22.4225C14.3287 22.985 12.9442 23.2662 11.5312 23.2662C10.0312 23.2662 8.58333 23.011 7.1875 22.5006C5.79167 21.9902 4.51042 21.1516 3.34375 19.985ZM7.75 18.3912C8.375 18.7454 9.00521 18.9902 9.64062 19.1256C10.276 19.261 10.9053 19.3287 11.5283 19.3287C12.4239 19.3287 13.3097 19.1412 14.1858 18.7662C15.0619 18.3912 15.8854 17.8183 16.6562 17.0475C17.2604 16.4433 17.75 15.6464 18.125 14.6569C18.5 13.6673 18.7917 12.5787 19 11.3912C19.2083 10.2037 19.3385 8.96414 19.3906 7.67248C19.4427 6.38081 19.4375 5.14123 19.375 3.95373C18.4583 3.87039 17.3854 3.84435 16.1562 3.8756C14.9271 3.90685 13.6979 4.02143 12.4688 4.21935C11.2396 4.41727 10.0781 4.71935 8.98438 5.1256C7.89062 5.53185 7.01042 6.06831 6.34375 6.73498C5.51042 7.56831 4.90104 8.43289 4.51562 9.32873C4.13021 10.2246 3.9375 11.0569 3.9375 11.8256C3.9375 12.9319 4.13542 13.9173 4.53125 14.7819C4.92708 15.6464 5.30208 16.2558 5.65625 16.61C6.38542 15.11 7.42188 13.6516 8.76562 12.235C10.1094 10.8183 11.8542 9.55789 14 8.45373C12.5833 9.76623 11.3385 11.2454 10.2656 12.8912C9.19271 14.5371 8.35417 16.3704 7.75 18.3912Z"/>
    </svg>
  ),
};

export type IconName = keyof typeof iconMapper;