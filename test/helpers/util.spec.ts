import {
  isPlainObject,
  isDate,
  extend,
  deepMerge,
  isFormData,
  isURLSearchParams
} from '../../src/helper/utils'

describe('helper: utils', () => {
  describe('isXXX', () => {
    test('should validate date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
      expect(isDate({})).toBeFalsy()
      expect(isDate(1234)).toBeFalsy()
    })

    test('should valideta plain object', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(123)).toBeFalsy()
      expect(isPlainObject(Object.create(null))).toBeTruthy()
    })

    test('should validate form data', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData('a=b&c=d')).toBeFalsy()
      expect(isFormData('a=1')).toBeFalsy()
      expect(isFormData(1234)).toBeFalsy()
    })

    test('should validate search params', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams('a=b&c=d')).toBeFalsy()
      expect(isURLSearchParams('a=1')).toBeFalsy()
      expect(isURLSearchParams(1234)).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should mute', () => {
      const a = Object.create(null)
      const b = { test: 1 }
      extend(a, b)
      expect(a.test).toEqual(1)
    })

    test('should extend properties', () => {
      const a = { a: 1, b: 2, c: 3 }
      const b = { b: 4, c: null }
      const c = extend(a, b)
      expect(c.b).toEqual(4)
      expect(c.a).toEqual(1)
      expect(c.c).toEqual(null)
    })
  })

  describe('deepMerge', () => {
    test('return new result after merge', () => {
      const a = { a: 1, b: { d: 2 } }
      const b = {}
      const c = deepMerge(a, b)

      expect(c).toEqual({ a: 1, b: { d: 2 } })
      expect(c.b).not.toBe(a.b)
    })

    test('can merge first level', () => {
      const t = { k: 1 }
      const t1 = { j: 3 }
      const a = { f: 1, h: 2, m: t }
      const b = { f: 1, h: 2, m: 3 }
      const c = { f: t1, h: 3 }
      const r = deepMerge(a, b, c)
      expect(r.f).toEqual(t1)
      expect(r.h).toEqual(3)
      expect(r.m).toEqual(3)
    })

    test('can merge nest level', () => {
      const t = { k: 1, j: 3 }
      const t1 = { j: 4 }
      const a = { f: 1, h: 2, m: t }
      const b = { f: 1, h: 2, m: t1 }
      const c = { f: 1, h: 3 }
      const r = deepMerge(a, b, c)
      expect(r.f).toEqual(1)
      expect(r.h).toEqual(3)
      expect(r.m).toEqual({
        k: 1,
        j: 4
      })
    })

    test('can merge nullish val', () => {
      const t = { k: 1, j: 3 }
      const t1 = { j: null }
      const a = { f: 1, h: 2, m: t }
      const b = { f: 1, h: 2, m: t1 }
      const c = { f: null, h: 3 }
      const r = deepMerge(a, b, c)
      expect(r.f).toEqual(null)
      expect(r.h).toEqual(3)
      expect(r.m).toEqual({
        k: 1,
        j: null
      })
    })

    test('can merge with nullish param', () => {
      const t = { k: 1, j: 3 }
      const t1 = { j: null }
      const a = { f: 1, h: 2, m: t }
      const b = { f: 1, h: 2, m: t1 }
      const c = null
      const r = deepMerge(a, b, c)
      expect(r.f).toEqual(1)
      expect(r.h).toEqual(2)
      expect(r.m).toEqual({
        k: 1,
        j: null
      })
    })

    test('can merge  nullish param', () => {
      const a = null
      const b = undefined
      const c = null
      const r = deepMerge(a, b, c)
      expect(r).toEqual({})
    })
  })
})
