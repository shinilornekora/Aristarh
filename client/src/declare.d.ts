declare module "*.module.css";

declare const Aristarh: {
    DEBUG: 'log' | 'disabled';
    setDebugMode: (value: boolean) => void,
    makeTestProject: () => void;
    voice: (text: string, ...rest: unknown) => void;
    scream: (error: string, ...rest: unknown) => void
}