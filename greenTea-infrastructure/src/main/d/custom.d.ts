declare module "*.svg" {
    const content: any;
    export default content;
}

declare module '*.html' {
  const value: string;
  export default value
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
