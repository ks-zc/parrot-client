declare module '*.png';
declare const __DEV__: boolean;

declare namespace React {
    interface Attributes {
        styleName?: string | undefined;
    }
    interface HTMLAttributes<T> {
        styleName?: string | undefined;
    }
    interface SVGAttributes<T> {
        styleName?: string | undefined;
    }
}
