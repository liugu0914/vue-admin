/**
 * ------------------------------------------------------------------------
 *  工具类
 *  @author lyc
 *  @date 2020年06月04日17:48:50
 * ------------------------------------------------------------------------
 */
class Utils {
  /**
     * 数组中是否包含item
     * @param {Array<String>} arr
     * @param {String} item
     */
  static contains(arr, item) {
    return !!item && arr.some(value => item.startsWith(value))
  }
}

export default Utils
