// this file helps declare all image types that can be imported in TypeScript files. It allows you to import images as modules and use them in your code without TypeScript throwing errors about missing types. Each image type (png, jpg, jpeg, gif, svg) is declared as a module that exports a value of type 'any', which can be used to reference the imported image in your code.

declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.jpg" {
  const value: any;
  export default value;
}
declare module "*.jpeg" {
  const value: any;
  export default value;
}
declare module "*.gif" {
  const value: any;
  export default value;
}
declare module "*.svg" {
  const value: any;
  export default value;
}
