// Основная функция
function mainFunct (x) {
    return (2 * (x**2)) - 5;
}
// Первая производная
function derivative_1 (x) {
    return 4 * x;
}
// Вторая производная
function derivative_2 (x) {
    return 6;
}
// Числа Фибоначчи
function fib (i) {
    if (i == 1) return 1;
    if (i == 2) return 1;
    return fib(i - 1) + fib(i - 2);
}
// Метод Ньютона №1
function methodR (x, prev, accuracy) {
    if (Math.abs(x - prev) > accuracy) {
        return methodR(x - derivative_1(x) / derivative_2(x), x, accuracy);
    }else {
        return x;
    }
}
// Поиск максимума на концах отрезка
function getMax (a, b) {
    if (Math.abs(derivative_1(a)) > Math.abs(derivative_1(b))) {
        return Math.abs(derivative_1(a));
    } else {
        return Math.abs(derivative_1(b));
    }
}
// Метод полного перебора
function pr_2 () {
    let x = -5, min = 999, argmin = 0, y;

    while (x <= 5) {
        y = mainFunct(x);
        // console.log("x = " + x.toFixed(1) + " y = " + y.toFixed(2));
        x += 0.001;
        if (y <= min){
            min = y;
            argmin = x;
        }
    }
    console.log("Мининмум в точке x: " + argmin.toFixed(4));  
}
// Метод поразрядного поиска;
function pr_3 () {
    let x = -5, min = 999, argmin = 0, y;

    while (x <= 5) {
        y = mainFunct(x);
        // console.log("x = " + x.toFixed(1) + " y = " + y.toFixed(2));
        x += 0.3;
        if (y <= min){
            min = y;
            argmin = x;
        }
    }
    console.log("Мининмум в точке x: " + argmin.toFixed(4));  
}
// Метод дихотомии;
function pr_4 (a, b, delta, sigma) {
    let result = 0, sr, x1, x2;
    while (Math.abs(b - a) >= delta) {
        sr = (a + b) / 2;
        x1 = sr - sigma;
        x2 = sr + sigma;
        if (mainFunct(x1) <= mainFunct(x2)) {
            b = x2;
        } else {
            a = x1;
        }
        result = (b + a) / 2;
    }
    console.log("Мининмум в точке x: " + result.toFixed(2));
}
// Метод золотого сечения;
function pr_5 (a, b, e) {
    let phi = (1 + Math.sqrt(5)) / 2, x1, x2;
    do {
        x1 = b - (b - a) / phi;
        x2 = a + (b - a) / phi;
        if (mainFunct(x1) >= mainFunct(x2)) {
            a = x1;
        } else {
            b = x2;
        }
    } while (!(Math.abs(b - a) < e));
    console.log("Мининмум в точке x: " + ((a + b) / 2));
    console.log("Мининмум в точке x: " + ((a + b) / 2).toFixed(5));
}
// Метод Фибоначчи;
function pr_6 (a, b, e) {
    let iterationCount = ((b - a) / e), s = 0, x1, x2, l, 
    fibList = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946];
    for (index = 0; index < fibList.length; ++index) {
        if (iterationCount >= fibList[index]) {
            s = index;
        }
    }
    do {
        l = (b - a) / fib(s + 2);
        x1 = a + l * fib(s);
        x2 = b - l * fib(s);
        if (mainFunct(x1) < mainFunct(x2)) {
            b = x2;
        } else {
            a = x1;
        }
    } while (!(Math.abs(b - a) < e));
    console.log("Мининмум в точке x: " + ((a + b) / 2));
    console.log("Мининмум в точке x: " + ((a + b) / 2).toFixed(5));
}
// Метод парабол
function pr_7 (a, b, h) {
    let x1 = a - 0.5 * h * (mainFunct(a + h) - mainFunct(a - h)) / (mainFunct(a + h) - 2 * mainFunct(a) + mainFunct(a - h));
    if (a == 0) a += 0.1;
    while ((mainFunct(a + h) - 2 * mainFunct(a) + mainFunct(a - h)) / (h * h) <= 0) {
        a += 0.1;
    }
    x1;
    while (Math.abs(x1- a) > b) {
        a = x1;
        x1 = a - 0.5 * h * (mainFunct(a + h) - mainFunct(a - h)) / (mainFunct(a + h) - 2 * mainFunct(a) + mainFunct(a - h));
    }
    console.log("Мининмум в точке x: " + x1.toFixed(5));
}
// Метод средней точки
function pr_8 (a, b, e) {
    let x = ((a + b) / 2);
    while (Math.abs(derivative_1(x)) > e) {
        x;
        if (derivative_1(x) > 0) {
            b = x;
        }else {
            a = x;
        }
    }
    x;
    console.log("Мининмум в точке x: " + x.toFixed(5));
}
// Метод хорд
function pr_9 (a, b, e, accuracy) {
    let x = a - (derivative_1(a) / (derivative_1(a) - derivative_1(b))) * (a - b), y = derivative_1(x);
    if (Math.abs(y) > accuracy) {
        if ( y > 0.0) {
            pr_9(a, x, e, accuracy);
        } else {
            pr_9(x, b, e, accuracy);
        }
    }
    console.log("Мининмум в точке x: " + x.toFixed(5));
}
// Метод Ньютона №2
function pr_10 (x, accuracy, xprev) {
    methodR(x, xprev, accuracy);
    console.log("Мининмум в точке x: " + methodR(x, xprev, accuracy).toFixed(6));
}

function pr_11 (a, b, e, iteration) {
    let l = getMax(a, b), x0, p0, d, x1, x2, ld, final;
    while (true) {
        x0 = (1 / (2 * l)) * (mainFunct(a) - mainFunct(b) + l * a + l * b);
        p0 =  0.5 * (mainFunct(a) + mainFunct(b) + l * a - l * a);
        d = ((1 / (2 * l)) * (mainFunct(x0) - p0));
        x1 = x0 - d;
        x2 = x0 + d;
        ld = 2 * l * d;
        if (ld > e) {
            if (Math.abs(derivative_1(x1)) < Math.abs(derivative_2(x2))) {
                b = x0;
            } else {
                 a = x0;
            }
            iteration += 0.1;
        } else {
            break;
        }
    }
    final = x0;
    console.log("Мининмум в точке x: " + final.toFixed(6));
    
}
// Вызов всех функций
function init () {
    pr_2();
    pr_3();
    pr_4(-5, 5, 0.1, 0.04);
    pr_5(-5, 5, 0.001);
    pr_6(-5, 5, 0.001);
    pr_7(0, 1, 0.001);
    pr_8(-5, 5, 0.001);
    pr_9(-5, 5, 0.1, 0.001);
    pr_10(-5, 0.1, 0.1);
    pr_11(-5, 5, 0.1, 1);
}
init();

