function djb2(str) {
  var hash = 5381
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i) /* hash * 33 + c */
  }
  return hash
}

export function hashStringToColor(str) {
  var hash = djb2(str)
  var r = (hash & 0xff0000) >> 16
  var g = (hash & 0x00ff00) >> 8
  var b = hash & 0x0000ff
  return (
    "#" +
    ("0" + r.toString(16)).substr(-2) +
    ("0" + g.toString(16)).substr(-2) +
    ("0" + b.toString(16)).substr(-2)
  )
}

export function rgb2hsv(r, g, b) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn

  h = 0
  rabs = r / 255
  gabs = g / 255
  babs = b / 255
  ;(v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs))
  diffc = (c) => (v - c) / 6 / diff + 1 / 2
  percentRoundFn = (num) => Math.round(num * 100) / 100
  if (diff == 0) {
    h = s = 0
  } else {
    s = diff / v
    rr = diffc(rabs)
    gg = diffc(gabs)
    bb = diffc(babs)

    if (rabs === v) {
      h = bb - gg
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb
    } else if (babs === v) {
      h = 2 / 3 + gg - rr
    }
    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100),
  }
}

export function hexAToRGBA(h, a) {
  let r = "",
    g = "",
    b = ""

  console.log(h.length)
  if (h.length == 3) {
    r = "0x" + h[1] + h[1]
    g = "0x" + h[2] + h[2]
    b = "0x" + h[3] + h[3]
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2]
    g = "0x" + h[3] + h[4]
    b = "0x" + h[5] + h[6]
  }

  return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")"
}
