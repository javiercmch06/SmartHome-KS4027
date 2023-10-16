input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (ventana == 0) {
        pins.servoWritePin(AnalogPin.P9, 180)
        ventana = 1
    } else {
        pins.servoWritePin(AnalogPin.P9, 90)
        ventana = 0
    }
    lluviaS = 0
    fuegoS = 0
    basic.showIcon(IconNames.House)
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
    connect_flag = 1
    while (connect_flag == 1) {
        bluetooth_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        if (bluetooth_val == "p1") {
            I2C_LCD1602.off()
            puerta = 1
            pins.servoWritePin(AnalogPin.P8, 180)
            basic.showIcon(IconNames.Heart)
            I2C_LCD1602.on()
        } else if (bluetooth_val == "p0") {
            I2C_LCD1602.off()
            puerta = 0
            pins.servoWritePin(AnalogPin.P8, 90)
            I2C_LCD1602.on()
            basic.showIcon(IconNames.Yes)
        } else if (bluetooth_val == "v1") {
            ventana = 1
            pins.servoWritePin(AnalogPin.P9, 180)
            basic.showIcon(IconNames.Square)
        } else if (bluetooth_val == "v0") {
            ventana = 0
            pins.servoWritePin(AnalogPin.P9, 90)
            basic.showIcon(IconNames.SmallSquare)
        } else if (bluetooth_val == "d") {
            strip.clear()
            strip.show()
            noche = 0
            basic.showIcon(IconNames.Diamond)
        } else if (bluetooth_val == "n") {
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            noche = 1
            basic.showIcon(IconNames.SmallDiamond)
        } else if (bluetooth_val == "vi1") {
            viaje = 1
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
            basic.showIcon(IconNames.Tortoise)
        } else if (bluetooth_val == "vi0") {
            viaje = 0
            strip.clear()
            strip.show()
            basic.showIcon(IconNames.EighthNote)
        } else if (bluetooth_val == "l1") {
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
            basic.showIcon(IconNames.Target)
        } else if (bluetooth_val == "l0") {
            strip.clear()
            strip.show()
            basic.showIcon(IconNames.Triangle)
        } else if (bluetooth_val == "s1") {
            I2C_LCD1602.clear()
            I2C_LCD1602.ShowString("Solar", 0, 0)
            I2C_LCD1602.ShowString("Activada", 0, 1)
            basic.showIcon(IconNames.Cow)
        } else if (bluetooth_val == "s0") {
            I2C_LCD1602.clear()
            I2C_LCD1602.ShowString("Bienvenido", 0, 0)
            basic.showIcon(IconNames.Scissors)
        } else if (bluetooth_val == "ac1") {
            basic.showIcon(IconNames.Triangle)
            I2C_LCD1602.off()
            pins.digitalWritePin(DigitalPin.P12, 1)
            pins.digitalWritePin(DigitalPin.P13, 0)
            basic.pause(2000)
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.digitalWritePin(DigitalPin.P13, 0)
            I2C_LCD1602.on()
            I2C_LCD1602.ShowString("Bienvenido", 0, 0)
        } else if (bluetooth_val == "pD") {
            if (puerta == 0) {
                pins.servoWritePin(AnalogPin.P8, 180)
                basic.pause(2000)
                pins.servoWritePin(AnalogPin.P8, 90)
            } else {
                pins.servoWritePin(AnalogPin.P8, 90)
                basic.pause(2000)
                pins.servoWritePin(AnalogPin.P8, 180)
            }
            basic.showIcon(IconNames.Silly)
        } else if (bluetooth_val == "vD") {
            if (ventana == 0) {
                pins.servoWritePin(AnalogPin.P9, 180)
                basic.pause(2000)
                pins.servoWritePin(AnalogPin.P9, 90)
            } else {
                pins.servoWritePin(AnalogPin.P9, 90)
                basic.pause(2000)
                pins.servoWritePin(AnalogPin.P9, 180)
            }
            basic.showIcon(IconNames.Silly)
        } else if (bluetooth_val == "lD") {
            strip.showColor(neopixel.colors(NeoPixelColors.Violet))
            basic.showIcon(IconNames.Surprised)
        }
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
input.onButtonPressed(Button.A, function () {
    lluviaS = 0
    fuegoS = 1
    basic.showIcon(IconNames.Skull)
})
input.onButtonPressed(Button.B, function () {
    lluviaS = 1
    fuegoS = 0
    basic.showIcon(IconNames.Umbrella)
})
let gas = 0
let vapor = 0
let humedad = 0
let temperatura = 0
let bluetooth_val = ""
let connect_flag = 0
let fuegoS = 0
let lluviaS = 0
let viaje = 0
let noche = 0
let ventana = 0
let puerta = 0
let strip: neopixel.Strip = null
serial.redirectToUSB()
dht11_dht22.queryData(
DHTtype.DHT11,
DigitalPin.P2,
true,
true,
true
)
basic.showIcon(IconNames.House)
pins.servoWritePin(AnalogPin.P8, 0)
basic.pause(200)
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.clear()
basic.pause(100)
I2C_LCD1602.ShowString("Bienvenido", 0, 0)
basic.pause(2000)
strip = neopixel.create(DigitalPin.P14, 4, NeoPixelMode.RGB)
pins.servoWritePin(AnalogPin.P9, 90)
pins.digitalWritePin(DigitalPin.P16, 0)
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
bluetooth.startUartService()
puerta = 0
ventana = 0
noche = 0
viaje = 0
lluviaS = 0
fuegoS = 0
strip.clear()
strip.show()
loops.everyInterval(500, function () {
    bluetooth.uartWriteString("Q" + temperatura)
    bluetooth.uartWriteString("H" + humedad)
    bluetooth.uartWriteString("V" + vapor)
    bluetooth.uartWriteString("G" + gas)
})
basic.forever(function () {
    serial.writeValue("x", dht11_dht22.readData(dataType.humidity))
    serial.writeValue("x", dht11_dht22.readData(dataType.temperature))
    if (lluviaS == 0) {
        vapor = pins.digitalReadPin(DigitalPin.P0)
    } else {
        vapor = 450
    }
    if (fuegoS == 0) {
        gas = pins.digitalReadPin(DigitalPin.P1)
    } else {
        gas = 0
    }
    if (dht11_dht22.readData(dataType.temperature) == -999) {
        temperatura = input.temperature()
    } else {
        temperatura = dht11_dht22.readData(dataType.temperature)
    }
    if (dht11_dht22.readData(dataType.humidity) == -999) {
        humedad = 36
    } else {
        humedad = dht11_dht22.readData(dataType.humidity)
    }
    if (viaje == 0) {
        if (vapor > 400 && ventana == 1) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            pins.servoWritePin(AnalogPin.P9, 90)
            ventana = 0
            basic.pause(2000)
        }
        if (gas == 0) {
            if (gas == 0 && ventana == 0) {
                music.play(music.tonePlayable(523, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
                pins.servoWritePin(AnalogPin.P9, 180)
                ventana = 1
                basic.pause(2000)
            }
        }
        if (noche == 1) {
            if (pins.digitalReadPin(DigitalPin.P15) == 1) {
                pins.digitalWritePin(DigitalPin.P16, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P16, 0)
            }
        }
    } else {
        if (ventana == 1) {
            pins.servoWritePin(AnalogPin.P9, 90)
            ventana = 0
        }
        if (pins.digitalReadPin(DigitalPin.P15) == 1) {
            pins.digitalWritePin(DigitalPin.P16, 1)
        } else {
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
    }
})
