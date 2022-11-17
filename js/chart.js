// Импортируем функции подсчета высот
import { getHeight } from './utils.js';
import { getAcceleration } from './utils.js';
import { getTemperature } from './utils.js';
import { getPressure } from './utils.js';
import { getDensity } from './utils.js';
import { getSpeed } from './utils.js';

//Находим canvas по айдишнику
const ctxFirst = document.getElementById('myChartFirst');
const ctxSecond = document.getElementById('myChartSecond');
const ctxThird = document.getElementById('myChartThird');
const ctxFourth = document.getElementById('myChartFourth');
const ctxFifth = document.getElementById('myChartFifth');
const ctxSixth = document.getElementById('myChartSixth');
const buttonChart = document.querySelector('.button__charts')

const diagramms = () => {
    const myChartFirst = new Chart(ctxFirst, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Плотность',
                    data: [],
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'H, м',
                        font: {
                            size: 24,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'ro, кг/м^3',
                        font: {
                            size: 24,
                        }
                    }
                }
            },
        }
    });
    const myChartSecond = new Chart(ctxSecond, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Высота',
                    data: [],
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'H, м',
                        font: {
                            size: 24,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'h, м',
                        font: {
                            size: 24,
                        }
                    }
                }
            },
        }
    });
    const myChartThird = new Chart(ctxThird, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Давление',
                    data: [],
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'H, м',
                        font: {
                            size: 24,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Р, Па',
                        font: {
                            size: 24,
                        }
                    }
                }
            },
        }
    });
    const myChartFourth = new Chart(ctxFourth, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Температура',
                    data: [],
                    borderColor: 'black',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'H, м',
                        font: {
                            size: 24,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Т, К',
                        font: {
                            size: 24,
                        }
                    }
                }
            },
        }
    });
    const myChartFifth = new Chart(ctxFifth, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Ускорение свободного падения',
                    data: [],
                    borderColor: 'blue',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'H, м',
                        font: {
                            size: 24,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'g, м/с^2',
                        font: {
                            size: 24,
                        }
                    }
                }
            },
        }
    });
    const myChartSixth = new Chart(ctxSixth, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Скорость звука',
                    data: [],
                    borderColor: 'darkblue',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'H, м',
                        font: {
                            size: 24,
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'а, м/с',
                        font: {
                            size: 24,
                        }
                    }
                }
            },
        }
    });

    // Размер 
    Chart.defaults.font.size = 16;

    // Заполняем данными
    for (let x = -2000; x < 85000; x += 1000) {

        // Считаем плотность
        myChartFirst.data.labels.push(x);
        myChartFirst.data.datasets[0].data.push(getDensity(x).real);

        // Считаем высоту
        myChartSecond.data.labels.push(x);
        myChartSecond.data.datasets[0].data.push(getHeight(x).real);

        // Считаем давление
        myChartThird.data.labels.push(x);
        myChartThird.data.datasets[0].data.push(getPressure(x).real);

        // Считаем температуру
        myChartFourth.data.labels.push(x);
        myChartFourth.data.datasets[0].data.push(getTemperature(x).real);

        // Считаем ускорение свободного падения
        myChartFifth.data.labels.push(x);
        myChartFifth.data.datasets[0].data.push(getAcceleration(x));

        // Считаем скорость звука
        myChartSixth.data.labels.push(x);
        myChartSixth.data.datasets[0].data.push(100*getSpeed(x));
    }
    
    //Обновляем
    myChartFirst.update();
    myChartSecond.update();
    myChartThird.update();
    myChartFourth.update();
    myChartFifth.update();
    myChartSixth.update();

    ctxFirst.classList.remove('hidden');
    ctxSecond.classList.remove('hidden');
    ctxThird.classList.remove('hidden');
    ctxFourth.classList.remove('hidden');
    ctxFifth.classList.remove('hidden');
    ctxSixth.classList.remove('hidden');

    ctxFirst.scrollIntoView({behavior: "smooth"});
};

buttonChart.addEventListener('click', diagramms)