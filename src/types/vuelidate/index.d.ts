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
