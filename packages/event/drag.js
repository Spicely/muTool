/**
 * 鼠标拖拽事件
 */

import lang from '../Base/lang'
import config from '../config'
import browser from '../browser'

let init = {
    X: 0,
    Y: 0,
    _x: 0,
    _y: 0,
    toX: 0,
    toY: 0,
    handleMove: () => {},
    handleEnd: () => {}
}

let event
if (browser.isMobile) {
    event = ['touchmove', 'touchend']
} else {
    event = ['mousemove', 'mouseup']
}

function drag(e, optins = {}) {
    e = e.originalEvent || e
    if (!lang.isElement(e.target)) {
        throw new Error('type not is Element')
    }
    Object.assign(init, optins)
    // 保留初始值
    init._x = e.screenX || e.targetTouches[0].screenX
    init._y = e.screenY || e.targetTouches[0].screenY
    // 监听移动、释放事件11
    window.addEventListener(event[0], move, {
        passive: false
    })
    window.addEventListener(event[1], end, {
        passive: false
    })
}

function move(e) {
    e = e.originalEvent || e
    let x = e.screenX || e.targetTouches[0].screenX
    let y = e.screenY || e.targetTouches[0].screenY
    let _x = init.X + (x - init._x)
    let _y = init.Y + (y - init._y)
    init.toX = _x
    init.toY = _y
    lang.isFunction(init.handleMove) && init.handleMove(_x, _y)
    e.preventDefault()
}

function end() {
    lang.isFunction(init.handleMove) && init.handleEnd(init.toX, init.toY)
    window.removeEventListener(event[0], move, {
        passive: false
    })
    window.removeEventListener(event[1], end, {
        passive: false
    })
}
lang.setObject(config.getObjectName('event.drag'), 1, drag)
export default drag