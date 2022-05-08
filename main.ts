input.touchA2.onEvent(ButtonEvent.Click, function () {
    ShowRules()
})
function ShowRules() {
    light.setAll(0x000000)
    for (let index = 0; index <= 3; index++) {
        if (0 == Rules[index]) {
            light.setPixelColor(index, 0xff9da5)
        } else {
            light.setPixelColor(index, 0xff0000)
        }
    }
    pause(2000)
    showUni()
}
function pickColor() {
    colors = [Colors.Red, Colors.Orange, Colors.Green, Colors.Blue, Colors.Pink, Colors.Purple]
    color2 = colors[Math.randomRange(0, 5)]
}
function cbtNbr(num: number) {
    Left = 0
    Right = 0
    Count = 0
    if (num > 0) {
        Left = num - 1
    } else {
        Left = 99
    }
    if (num < 99) {
        Right = num + 1
    } else {
        Right = 0
    }
    Count = Universe[Left] + Universe[Right] + Universe[num]
}
function doShowAll() {
    for (let index = 0; index <= 99; index++) {
        light.setPixelColor(index % 10, 0xffff00)
        pause(25)
        if (Universe[index] == 0) {
            light.setPixelColor(index % 10, 0x000000)
        } else {
            if (Universe[index] == 1) {
                light.setPixelColor(index % 10, 0x0000ff)
            } else {
                light.setPixelColor(index % 10, 0xff0000)
            }
        }
    }
    doShow10()
}
input.buttonB.onEvent(ButtonEvent.Click, function () {
    if (input.switchRight()) {
        round = 2
    } else {
        round = 10
    }
    pickColor()
    for (let i = 0; i < round; i++) {
        doGen()
        showUni()
        pause(200)
    }
})
input.buttonsAB.onEvent(ButtonEvent.Click, function () {
    round = 10
    for (let index = 0; index <= 99; index++) {
        Universe[index] = 0
    }
    Universe[1] = 1
    Universe[8] = -1
    color2 = Colors.Blue
    showUni()
})
function doGen() {
    for (let index = 0; index <= 99; index++) {
        cbtNbr(index)
        if (Count < 0) {
            Future[index] = 0 - Rules[Math.abs(Count)]
        } else {
            Future[index] = Rules[Count]
        }
    }
    for (let index = 0; index <= 99; index++) {
        Universe[index] = Future[index]
    }
}
input.buttonA.onEvent(ButtonEvent.Click, function () {
    doGen()
    showUni()
})
input.onGesture(Gesture.Shake, function () {
    for (let index = 0; index <= 99; index++) {
        Universe[index] = 1 - Math.randomRange(0, 2)
    }
    Rules = [0, 1, 0, 0]
    showUni()
})
input.touchA3.onEvent(ButtonEvent.Click, function () {
    Rules = [Math.randomRange(0, 1), Math.randomRange(0, 1), Math.randomRange(0, 1), Math.randomRange(0, 1)]
    ShowRules()
})
function doShow10() {
    light.setAll(0x000000)
    for (let index = 0; index <= 9; index++) {
        if (Universe[index] == 1) {
            light.setPixelColor(index, 0x0000ff)
        }
        if (Universe[index] == -1) {
            light.setPixelColor(index, 0xff0000)
        }
    }
}
function Genesis() {
    for (let i = 0; i < 99; i++) {
        Universe.push(0)
        Future.push(0)
    }
    Rules = [0, 1, 0, 0]
    Universe[1] = 1
    Universe[8] = -1
}
input.onSwitchMoved(SwitchDirection.Left, function () {
    showUni()
})
function showUni() {
    light.setAll(0x000000)
    if (input.switchRight()) {
        doShowAll()
    } else {
        doShow10()
    }
}
input.onSwitchMoved(SwitchDirection.Right, function () {
    showUni()
})
let round = 0
let Count = 0
let Right = 0
let Left = 0
let color2 = 0
let colors: number[] = []
let Rules: number[] = []
let Future: number[] = []
let Universe: number[] = []
Universe = [0]
Future = [0]
Genesis()
showUni()
