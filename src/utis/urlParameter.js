function getUrlKey() {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')
    ) || null
  )
}
function getSeconds(s) {
  var sTime = parseInt(s) // 秒
  var mTime = 0 // 分
  var hTime = 0 // 时
  if (sTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    mTime = parseInt(sTime / 60)
    //获取秒数，秒数取佘，得到整数秒数
    sTime = parseInt(sTime % 60)
    //如果分钟大于60，将分钟转换成小时
    if (mTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hTime = parseInt(mTime / 60)
      //获取小时后取佘的分，获取分钟除以60取佘的分
      mTime = parseInt(mTime % 60)
    }
  }

  var sresult = '',
    mresult = '',
    hresult = ''
  if (sTime >= 0 && sTime < 10) {
    sresult = '0' + parseInt(sTime)
  } else {
    sresult = '' + parseInt(sTime)
  }
  if (mTime >= 0 && mTime < 10) {
    mresult = '0' + parseInt(mTime)
  } else {
    mresult = '' + parseInt(mTime)
  }
  if (hTime >= 0 && hTime < 10) {
    hresult = '0' + parseInt(hTime)
  } else {
    hresult = '' + parseInt(hTime)
  }

  var obj = {
    sresult,
    mresult,
    hresult,
  }
  return obj
}
export { getUrlKey, getSeconds }
// 31'20
