declare module 'react-read-pdf'

declare global {
  interface Window {
    frappe?: {
      boot?: {
        sitename?: string;
        versions?: {
          frappe?: string;
        };
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}