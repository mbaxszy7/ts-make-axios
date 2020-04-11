import cookie from '../../src/helper/cookie'

describe('helper: cookie', () => {
  test('should read cookie', () => {
    document.cookie = 'a=b'
    expect(cookie.read('a')).toBe('b')
  })
  test('should return null when cookie not exit', () => {
    document.cookie = 'a=b'
    expect(cookie.read('c')).toBe(null)
  })
})
