// TypeScript Version: 2.4
import Vue, { PluginFunction } from 'vue'

/**
 * Covers beforeCreate(), beforeDestroy() and data().
 *
 * No public members.
 */
export const validationMixin: any

// const Validation
export interface Validation extends Vue {
  // const validationGetters
  readonly $invalid: boolean
  readonly $dirty: boolean
  readonly $error: boolean
  readonly $pending: boolean
  readonly $params: boolean

  // const validationMethods
  $touch (): never
  $reset (): never
  $flattenparams (): Params[]
}

// const ValidationRule
export interface ValidationRule {
  $params(): Params
  $pending(): boolean
}

// pre-defined rules
export function required (): ValidationRule
export function requiredIf (field: string): ValidationRule
export function requiredUnless (field: string): ValidationRule
export function sameAs (field: string): ValidationRule

// build your own rule
export function withParams (params: Params, rule: CustomRule): ValidationRule
export interface Params {
  type: string
}
export interface CustomRule extends ValidationRule {
  (value: any, parentVm?: Vue): boolean
}

export const Vuelidate: PluginFunction<any>

export default Vuelidate

// vue augmentation
declare module 'vue/types/vue' {
  interface Vue {
    $v: { [attr: string]: Validation } // TODO support validationGroup
  }
}

declare module 'vue/types/options' {
  type ValidationDecl = (...args: any[]) => ValidationRule

  interface ComponentOptions<V extends Vue> {
    // TODO support validationGroup
    // validations?: { [attr: string]: { [rule: string]: ValidationDecl } } | { [attr: string]: ValidationDecl }
    validations?: any;
  }
}

// import Vue from 'vue';
// import * as validators from './lib/validators';

// export function Vuelidate(vue: typeof Vue): void;
// export default Vuelidate;

// declare module 'vue/types/vue' {
//   interface ValidationMethods {
//     $touch(): void;
//     $reset(): void;
//     $flattenParams(): any[];
//   }
//   interface ValidationMethodsNested {
//     [key: string]: ValidationMethods & ValidationMethodsNested;
//   }
//   interface Vue {
//     $v: ValidationMethods & ValidationMethodsNested;
//   }
// }

// declare module 'vue/types/options' {
//   interface ComponentOptions<V extends Vue> {
//     validations?: { [key: string]: validators.Validators };
//   }
// }

// declare module "vuelidate" {
//   var _a: any;
//   export = _a;
// }

// // https://github.com/monterail/vuelidate/issues/175

// declare module 'vuelidate' {
//   // we need to augment the actual Vue types
//   import vue from 'vue'

//   // must bolt on the validations property to the input of ComponentOptions
//   // and also onto the "output" of @Component in the form of VueClass<Vue>
//   module 'vue/types/options' {
//     interface ComponentOptions<V extends vue> {
//       validations?: { [x: string]: any }
//     }
//     interface VueClass<V extends vue> {
//       validations?: { [x: string]: any }
//     }
//   }

//   // handles making this.$v work within a component context, but it isn't typed
//   // at all right now. still need to look in depth at @mrellipse's version
//   module 'vue/types/vue' {
//     interface Vue {
//       $v?: { [x: string]: any }
//     }
//   }

//   // definitions of what vuelidate exports help keep typescript from yelling
//   export const validationMixin: {
//     data: () => { [x: string]: any }
//     beforeCreate: () => void
//     beforeDestroy: () => void
//   }

//   // untested
//   export function withParams (
//     paramsOrClosure: any,
//     maybeValidator: any,
//   ): (...args: any[]) => any

//   // these are untested, the Vue.use approach to make it a global mixin
//   export function Vuelidate(Vue: vue): void
//   export default function (Vue: vue): void
// }

// // the individual validators to import
// declare module 'vuelidate/lib/validators' {
//   /** Accepts only alphabet characters. */
//   function alpha (value: any): boolean
//   /** Accepts only alphanumerics. */
//   function alphaNum (value: any): boolean
//   /** Checks if a number is in specified bounds. Min and max are both inclusive. */
//   function between (min: number, max: number): (value: any) => boolean
//   /** Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email. */
//   function email (value: any): boolean
//   /** Requires the input to have a maximum specified length, inclusive. Works with arrays. */
//   function maxLength (max: number): (value: any) => boolean
//   /** Requires the input to have a minimum specified length, inclusive. Works with arrays. */
//   function minLength (min: number): (value: any) => boolean
//   /** Requires non-empty data. Checks for empty arrays and strings containing only whitespaces. */
//   function required (value: any): boolean
//   /** Checks for equality with a given property. Locator might be either a sibling property name or a function, that will get your component as this and nested model which sibling properties under second parameter. */
//   function sameAs (locator: string): (value: any, vm?: any) => boolean

//   // stripped these down to just any[] to keep this first attempt simple
//   /** Passes when at least one of provided validators passes. */
//   function or (...validators: any[]): () => boolean
//   /** Passes when all of provided validators passes. */
//   function and (...validators: any[]): () => boolean

//   // new validators since @mrellipse's version, need comments/verification of params/types
//   function numeric (value: any): boolean
//   function ipAddress (value: any): boolean
//   function macAddress (separator?: string): (value: any) => boolean
//   function requiredIf (locator: string): (value: any, vm?: any) => boolean
//   function requiredUnless (locator: string): (value: any, vm?: any) => boolean
//   function url (value: any): boolean
//   function minValue (min: number): (value: any) => boolean
//   function maxValue (max: number): (value: any) => boolean
// }
