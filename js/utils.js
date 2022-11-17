// Постоянные величины
const r = 6356767;
const g0 = 9.80665;
const R = 287.05287;

// Считаем геопотенциальную высоту
const getHeight = function (height) {
    let i = 0;
    let H = ((r * height) / (r + height));
        while ((H > 10) || (H < (- 10))) {
            H /= 10;
            i += 1;
        };
    return {
        height: Math.round(H * 100000) / (100000),
        index: i,
        real: H * Math.pow(10, i)
    }
};
// Считаем ускорение свободного падения
const getAcceleration = function (height) {
    getHeight(height);
    let g = (g0 * Math.pow((r / (r + height)), 2));
    return Math.round(g * 100000) / (100000);
};

// Считаем параметры атмосферы
const getParameters = function (height) {
    let Hx, b, Tx, px;
    let H = getHeight(height).real;
    if ((H >= (- 2001)) && (H < 0)) {
        Hx = (- 2000);
        b = (- 0.0065);
        Tx = 301.15;
        px = 127774;
    } else {
        if (((H >= 0) && (H <= 11000))) {
            Hx = 0;
            b = (- 0.0065);
            Tx = 288.15;
            px = 101325;
        } else {
            if (((H > 11000) && (H < 20000))) {
                Hx = 11000;
                Tx = 216.65;
                b = 0;
                px = 22632;
            } else {
                if (((H >= 20000) && (H < 32000))) {
                    Hx = 20000;
                    b = 0.001;
                    Tx = 216.65;
                    px = 5474.87;
                } else {
                    if (((H >= 32000) && (H < 47000))) {
                        Hx = 32000;
                        b = 0.0028;
                        Tx = 228.65;
                        px = 868.014;
                    } else {
                        if (((H >= 47000) && (H < 51000))) {
                            Hx = 47000;
                            Tx = 270.65;
                            b = 0;
                            px = 110.906;
                        } else {
                            if (((H >= 51000) && (H < 71000))) {
                                Hx = 51000;
                                b = (- 0.0028);
                                Tx = 270.65;
                                px = 66.9384;
                            } else {
                                if (((H >= 71000) && (H < 85000))) {
                                    Hx = 71000;
                                    b = (- 0.002);
                                    Tx = 214.65;
                                    px = 3.95639;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return {
        minHeight: Hx,
        betta: b,
        minTemperature: Tx,
        minAcceleration: px
    }
}

// Считаем температуру 
const getTemperature = function (height) {
    getHeight(height);
    getParameters(height);
    let T = (getParameters(height).minTemperature + getParameters(height).betta * (getHeight(height).real - getParameters(height).minHeight));
    return {
        value: Math.round((T / 100) * 100000) / (100000),
        real: T
    };
}

// Считаем давление 
const getPressure = function (height) {
    let H = getHeight(height).real;
    let Hx = getParameters(height).minHeight;
    let b = getParameters(height).betta;
    let Tx = getParameters(height).minTemperature;
    let px = getParameters(height).minAcceleration;
    let p;
    let T = getTemperature(height).real;
    let i = 0;
    if (b !== 0) {
        p = Math.pow(10, (Math.log10(px) - ((g0 / (b * R)) * Math.log10((T / Tx)))));
    } else {
        p = Math.pow(10, (Math.log10(px) - (((0.434294 * g0) * (H - Hx)) / (T * R))));
    }
    while ((p > 10)) {
        p /= 10;
        i += 1;
    }
    return {
        value: Math.round(p * 100000) / (100000),
        index: i,
        real: p * Math.pow(10, i)
    }
}

// Считаем плотность
const getDensity = function (height) {  
    let T = getTemperature(height).real;
    let p = getPressure(height).real;
    let i = 0;
    let ro = (p / (R * T));
    if (ro < 1) {
        while (ro < 1) {
            ro *= 10;
            i += 1;
        }
    }
    return {
        value: Math.round(ro * 100000) / (100000),
        index: i,
        real: ro*Math.pow(10,-i)
    };
}

// Считаем скорость звука
const getSpeed = function (height) {
    let T = getTemperature(height).real;
    let a = (20.046796 * Math.sqrt(T));
    return Math.round((a / 100) * 100000) / (100000);
}

export { getHeight };
export { getAcceleration };
export { getTemperature };
export { getPressure };
export { getDensity };
export { getSpeed }
