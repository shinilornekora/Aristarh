declare module "*.module.css";

declare const Aristarh: {
    DEBUG: 'log' | 'disabled';
    setDebugMode: (value: boolean) => void,
    makeTestProject: () => void;
}