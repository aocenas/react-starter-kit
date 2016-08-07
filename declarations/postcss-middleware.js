declare module 'postcss-middleware' {
    declare interface PostCssMiddlewareOptions {
        /**
         * An array of PostCSS plugins.
         */
        plugins: Function[];
        /**
         * PostCSS options
         */
        options?: Object;
        /**
         * Build the file path to the source file(s) you wish to read.
         */
        src?:
        /**
         * @param request The Express app's request object.
         * @returns A glob string or an array of glob strings. All files matched
         * will be concatenated in the response.
         */
        (request: any) => string | string[];
        /**
         * Generate inlined sourcemaps.
         */
        inlineSourcemaps?: boolean;
    }
    declare function PostCssMiddleware(options?: PostCssMiddlewareOptions): (req: any, res: any, next: Function) => void;
    declare var exports: PostCssMiddleware
}