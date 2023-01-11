/**
 * @desc: 校验是否是数字
 * @name: sww
 * @date: 2022-02-08
 */
export function isNumber(value: any) {
  const reg = /^[0-9]*$/
  return reg.test(value)
}

/**
 * @desc: 校验是否是数字和字母组合
 * @name: sww
 * @date: 2022-02-08
 */
export function isNumWithString(value: any) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(value)
}

/**
 * 验证手机格式
 */
export function isMobile(value: any) {
  return /^1[23456789]\d{9}$/.test(value)
}
