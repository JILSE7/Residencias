var fs = require('fs');
//Unidades de medida SAT
const tipos = ["Acústica", "Calor", "Diversos", "Electricidad y magnetismo", "Fenomenos periodicos y relacionados", "Fisica Atomica y nuclear", "Fisica de estado sólido", "Fisica, quimica y fisica molecular", "Luz y radiaciones electromagneticas relacionadas", "Mecánica", "Multiplos/Fracciones/Decimales", "Números caracteristicos (parametros adimensionales", "Números enteros / Números /Ratios", "Reaaciones nucleares y radiaciones ionizantes", "Tiempo y espacio", "Unidades base calificadas en los niveles 1 y 2", "Unidades de Empaque", "Unidades de envío y transporte", "Unidades de tecnología de información", "Unidades de venta", "Unidades específicas de la Industria (varias)"];
const subtipos = [
    ["Decremento logarítmico", "Densidad de energía sonora", "volumetríca", "energía de sonido", "Densidad superficial de la impedancia mecánica", "Exposición al sonido", "Impedancia acústica", "Impedancia característica de un medio", "Impedancia mecánica", "Intensidad de sonido", "Intervalo de frecuencia", "Nivel de presión acústica", "Nivel de potencia acústica", "Nivel de volumen", "Presión estática", "presión de sonido(instántanea)", "Volumen (Audio)"], //Acustica
    ["Aislamiento Térmico", "Coeficiente de aislamiento térmico", "Calor", "Cantidad de calor", "Energía", "Energía termodinámica", "Entalpía", "Función Helmholtz", "Energía libre de Helmholtz", "Capacidad calorífica", "Entropía", "Capacidad de calor específica a: -presión constante,  -volumen constante, -saturación ", "Coeficiente de expansión lineal", "Coeficiente de expansión cúbica", "Coeficiente de presión relativa", "Coeficiente de presión", "Coeficiente de superficie de transferencia de calor", "Coeficiente de transferencia de calor", "Conductancia térmica", "Conductividad térmica", "Densidad de energía", "Densidad del flujo de calor", "Difusividad térmica", "Energía libre de Helmholtz", "Energía libre específica de Helmholtz", "Energía masiva", "Energía específica", "Energía termodinámica especifíca", "Energía termodinámica masiva", "Entalpia masica", "Entalpía específica", "Función de Gibbs", "Energía libre de Gibbs", "Función específica de Helmholtz", "Energía libre de Gibbs masiva", "Energía libre específica de Gibbs", "Resistencia térmica", "Tasa de flujo de calor", "Temperatura", "Temperatura de Fahrenheit", "Termodinámico", "Variación de temperatura a lo largo del tiempo"], //Calor
    ["Índice de pureza", "Índice de explosión", "Otros", "Porosidad"], //DIversos
    ["Auto inductancia, Inductancia mutua, Permeabilidad", "Capacidad", "Carga de resistencia por unidad de longitud", "Carga eléctrica, Cantidad de eléctricidad, Flujo eléctrico(flujo de desplazamiento)", "Carga líneal", "Coeficiente, Característica de rendimiento", "Conductancia (para corriente continua), Admitancia…dmitancia), Conductancia (para corriente alterna)", "Conductividad", "Corriente eléctrica, diferencia de potencial magnético, Fuerza magnetomotriz, Conexión actual", "Densidad actual", "Densidad de corriente eléctrica lineal, Corriente eléctrica lineal, Intensidad de campo magnético", "Densidad de energía electromagnética, Energía electromagnética volumetríca", "Densidad de flujo magnético, Inducción magnética, Polarización magnética", "Densidad superficial de carga, Densidad de flujo eléctrico, Polarización eléctrica de desplazamiento", "Densidad volumétrica de carga, Densidad de carga, Carga Volumétrica", "Flujo magnético", "Fuerza de campo eléctrico", "Momento dipolar eléctrico", "Momento electromagnético, Momento magnético, (momento de área magnética)", "Permeabilidad, Permeabilidad del vacío, Constante magnética", "Permitividad, Permitividad del vacío, (constante eléctrica)", "Poder aparente", "Poder reactivo", "Potencia (para corriente continua), Potencia activa", "Potencial del vector magnético", "Potencial eléctrico, Diferencia de potencial, Tensión, Voltaje,  Fuerza electromotriz", "Reluctancia", "Resistencia (a la corriente continua), Impedancia, (impedancias complejas), Módulo de impedancia, Resitencia (a la corriente alterna), Reactancia", "Resistencia lineal", "Resistividad", "Susceptancia"], // Electricidad y magnetismo
    ["Coeficiente de amortiguamiento", "Frecuencia", "Frecuencia rotacional", "Nivel de una cantidad de campo, Nivel de una cantidad de potencia"], //Fenomenos periodicos y relacionados
    ["Actividad", "Actividad específica en una muestra ", "Actividad volumétrica, Concentración de actividad", "Coeficiente giromagnético, (proporción giromagnética)", "Planck constante"], //Fisica Atomica y nuclear
    ["Coeficiente de Seebeck para las sustancias a y b", "Coeficiente de Thompson", "Coeficiente Hall", "Concentración espectral de modos vibratorios (en términos de frecuencia angular)", "Constante de Richardson", "Densidad de estados", "Quantum de flujo magnético", "Repetición angular de Fermi, Número de onda angular de Fermi"], //Fisica de estado solido
    ["Acidez y Alcalinidad", "Actividad catalítica", "Cantidad de sustancia", "Capacidad calorífica molar, Entropía molar, Constante de gas molar", "Conductividad molar", "Constante de Avogrado", "Constante de Faraday", "Dosificación volumétrica", "Energía termodinámica molar", "Flujo molar", "Fuerza iónica", "Masa de mólecula", "Masa molar", "Masa volumétrica, Densidad de masa, Densidad, conc…a de B, Cantidad de sustancia, Concentración de B", "Molalidad del soluto B", "Momento dipolar magnético", "Poder óptico rotatorio, rotatorio, Poder rotatorio óptico específico", "Polarizabilidad eléctrica de una molécula", "Potencia rotatoria óptica molar", "Volumen molar"], //Fisica, Quimica y Fisica molecular
    ["Cantidad de Luz", "Coeficiente de absorción molar", "Concentración espectral de densidad de energía rad…iante espectral (en términos de longitud de onda)", "Constante Stefan-Boltzmann", "Densidad de energía radiante", "Eficacia luminosa, Eficacia luminosa espectral, Ef… especificada, Máxima eficacia luminosa espectral", "Energía radiante, Tasa de fluencia, Salida de radiación, Irradiación, primera constante de radiación", "Exposición a la luz", "Exposición de fotones", "Fluencia de la energía radiante, Exposición a la radiancia", "Flujo luminoso", "Iluminancia", "Intensidad de fotones", "Intensidad luminosa", "Intensidad radiante", "Luminancia", "Luminancia de fotones, Resplandor de fotones", "Número de onda angular, Repetición angular", "Resplandor", "Salida de fotones, Irradiancia", "Salida luminosa", "Segunda radiación constante"], //Luz y radiaciones electromagneticas
    ["Cantidad de movimiento, momento lineal, ímpetu o moméntum", "Caudal de masa", "Caudal volumétrico", "Compresibilidad, Compresibilidad a granel", "Constante gravitacional", "Densidad lineal, Masa lineal", "Densidad superficial, Masa areica", "Densidad, Densidad de masa, Masa volumétrica", "Fuerza dividida por longitud", "Fuerza, Peso", "Impulso", "Impulso angular", "Masa", "Momento de fuerza, Momento puro o Torque", "Momento de impulso, Momento angular", "Momento de inercia (momento dinámico de inercia)", "Otros (mecánica)", "Poder", "Presión, Esfuerzo normal, Esfuerzo cortante, Módul… rigidez, Módulo de volumen, Módulo de compresión", "Proporción de presión", "Relación de masa", "Rigidez torsional, Momento de torsión relacionado con el área", "Segundo momento de área, Segundo momento axial de área", "Segundo momento polar del área", "Tasa de flujo de energía", "Tasa de fuga de gas", "Tensión superficial", "Trabajo, Energía, Energía potencial, Energía cinética", "Viscosidad (viscosidad dinámica)", "Viscosidad cinemática", "Volumen específico, Volumen masivo"], //Mecanica
    ["Múltiplos / Fracciones /Decimales"], // Múltiplos / Fracciones /Decimales
    ["Unidad"], // Numeros caracteristicos, (parametros adimensionales)
    ["Números enteros / Números / Ratios"], // Números enteros / Números / Ratios
    ["Coeficiente de atenuación masiva", "Densidad de fuente de neutrones", "Dosificación física D (Dosificación absorbida)", "Energía específica impartida, Energía masónica impartida", "Exposición", "Fluencia de partículas", "Kerma", "Movilidad", "Potencia de frenado lineal total", "Potencia total de detención de masa", "Potencia total de parada atómica", "Ralentizando la densidad", "Salida de dosis de equivalencia", "Sección transversal angular", "Sección transversal angular espectral", "Sección transversal espectral", "Sección transversal total", "Tasa de dosis absorbida", "Tasa de exposición", "Tasa de fluencia de la energía, (densidad de flujo de energía)", "Tasa de fluencia de partículas, (densidad de flujo partical), Tasa de fluencia de neutrones (densidad de flujo de neutrones)", "Tasa de Kerma"], //Reacciones nucleares y radiaciones ionizantes
    ["Aceleración angular", "Aceleración, Aceleración de caída libre, Aceleración debido a la gravedad", "Ángulo (plano)", "Ángulo sólido", "Área", "Curvatura", "Longitud, Anchura, Altura, Espesor, Radio, Radio d…esianas, Diámetro, longitud del camino, Distancia", "Relación de volumen", "Tiempo", "Velocidad angular", "Velocidad, velocidad de fase, Velocidad de grupo", "Volumen", "Volumen por temperatura"], // Tiempo y espacio
    ["Unidades base calificadas en los niveles 1 y 2"], //Unidades base calificadas en los niveles 1 y 2
    ["Diversos", "Empaques a granel", "Empaques flexibles, tipo bolsa.", "Empaques rígidos, otros.", "Empaques rígidos, tipo bulbo, (esférico)", "Empaques rígidos, tipo caja, (prismático)", "Empaques rígidos, tipo tambor (cilíndrico)", "Otros empaques o empaques especiales", "Sin empaque (incluye a granel)", "Unidades de empaque"],
    ["Unidades de envío y transporte"], // Unidades de envío y transporte
    ["Unidades de tecnología de información"], // Unidades de tecnología de información
    ["Unidades de venta"], // Unidades de venta
    ["Unidades específicas de la industria (varias)"] // Unidades específicas de la industria (varias)
]
//claves & descripcions
const data = [
    [ //Acustica
        [
                { key: "P41", des: "Década(logarítmica)(Una escala logarítmica es una escala de medida que utiliza el logaritmo de una cantidad física en lugar de la propia cantidad.)" }
        ],
        [   
                { key: "A60", des: "Erg por centímetro cúbico" }
        ],
        [       
                { key: "A50", des: "Dina segundo por centímetro cúbico" }
        ],
        [   
                { key: "P42", des: "Pascal por segundo cuadrado (Unidad del conjunto c… SI con exponente 2 y la unidad base segunda SI.)" }
        ],
        [       
                { key: "A52", des: "Dina segundo por centímetro a la quinta potencia" }, 
                { key: "C66", des: "Segundos pascal por metro cúbico" }, 
                { key: "M32", des: "Segundos pascal por litro" }
        ],
        [
                { key: "C67", des: "Segundos pascal por metro" }
        ],
        [
                { key: "A51", des: "Dina segundo por centímetro" }, 
                { key: "C58", des: "Segundos newton por metro" }, 
                { key: "H36", des: "MegaOhm por kilómetro" }
        ],
        [
                { key: "A64", des: "Erg por segundo centímetro cuadrado" },
                { key: "C32", des: "Miliwatt por metro cuadrado (Es equivalente a una milésima de vatio.)" }, 
                { key: "C76", des: "Picowatt por metro cuadrado (Es igual a la trillonésima parte de un vatio (10-12).)" },
                { key: "D85", des: "Microwatt por metro cuadrado (Es equivalente a una millonésima parte de un vatio.)" }
        ],
        [
                { key: "C59", des: "Octava (Una unidad utilizada en la música para des…ir la relación de la frecuencia entre las notas.)" }
        ],
        [
                { key: "H51", des: "Decibel per kilometro" }, 
                { key: "H52", des: "Decibel per metro" }, 
                { key: "P43", des: "Bel por metro (Una unidad Bel dividida por la unidad básica del sistema internacional (metros).)" }
        ],
        [
                { key: "C69", des: "Phon (Unidad de volumen del sonido subjetivo. Un sonido tiene p phons de sonoridad si se parece al oyente a ser iguales en intensidad, con el sonido de un tono puro de frecuencia 1 kilohertz y de la fuerza p decibelios.)" }
        ],
        [
                { key: "D9", des: "Dina por centímetro cuadrado" }
        ],
        [
                { key: "D15", des: "Sone (Una unidad de volumen del sonido subjetivo. Un sone es la intensidad de un tono puro de la frecuencia y la fuerza de un kilohertz 40 decibelios.)" }
        ]
    ],
    [ //Calor
        [       { key: 'D19', des: 'Metro cuadrado kelvin por watt.' }, 
                { key: 'J19', des: 'Grado fahrenheit hora pie cuadrado por unidad térmica británica (termoquímico).' }, 
                { key: 'J22', des: 'Grado fahrenheit hora pie cuadrado por unidad térmica británica (tabla internacional).' }, 
                { key: 'J83', des: 'Clo (Clo es una unidad de medida empleada para el índice de indumento.)' }, 
                { key: 'L14', des: 'Metro cuadrado hora grado celsius por kilocaloría (tabla internacional)' }
        ],
        [       { key: 'A1', des: '15 ° C calorías' }, 
                { key: 'BTU', des: 'Unidad térmica británica (tabla internacional)' }, 
                { key: 'D70', des: 'Calorías (tabla internacional)' }, 
                { key: 'E14', des: 'Kilocaloría (tabla internacional)' }, 
                { key: 'J39', des: 'Unidad térmica británica (significado)' }, 
                { key: 'J55', des: 'Watt segundo' }, 
                { key: 'J75', des: 'Caloría (Unidad de energía térmica, de símbolo cal…do centígrado la temperatura de 1 gramo de agua.)' }, 
                { key: 'K51', des: 'Kilocaloría (significado)' }, 
                { key: 'K53', des: 'Kilocaloría (termoquímico)' }, 
                { key: 'N66', des: 'Unidad térmica británica (39 °f) (Unidad de energí…ades en una temperatura de referencia de 39 ° F.)' }, 
                { key: 'N67', des: 'Unidad térmica británica (59 °f) (Unidad de energí…ades en una temperatura de referencia de 59 ° F.)' }, 
                { key: 'N68', des: 'Unidad térmica británica (60 °f) (Unidad de energí…ades en una temperatura de referencia de 60 ° F.)' }, 
                { key: 'N69', des: 'Caloría (20 °c) (Unidad para la cantidad de calor,…stándar a nivel del mar, de 19,5 ° C a 20,5 ° C.)' }, 
                { key: 'N70', des: 'Quad (Unidad de energía de acuerdo al sistema imperial de unidades)' }, 
                { key: 'N71', des: 'Termia (energía comercial) (Unidad de energía calo…nidos definida como: 1 thm (EC) = 100 000 BtuIT.)' }, 
                { key: 'N72', des: 'Termia (UEA) (Unidad de energía térmica en uso comercial.)' }
        ],
        [       { key: 'B41', des: 'Kilojoule por kelvin' }, 
                { key: 'J43', des: 'Unidad térmica británica (tabla internacional) por libra grado fahrenheit' }, 
                { key: 'J50', des: 'Unidad térmica británica (termoquímico) por libra grado fahrenheit' }, 
                { key: 'J76', des: 'Caloría (tabla internacional) por gramo gadro celsius' }, 
                { key: 'J79', des: 'Caloría (termoquímico) por gramo gadro celsius' },
                { key: 'JE', des: "Joule por kelvin (Es el aumento de entropía de un sistema que recibe una cantidad de calor de 1 joule, a la temperatura termodinámica constante de 1 kelvin, siempre que en el sistema no tenga lugar ninguna transformación irreversible.)" },
                { key: 'N60', des: "Unidad térmica británica (tabla internacional) por grado fahrenheit (Unidad de la capacidad calorífica según el sistema Imperial de unidades.)" }, 
                { key: 'N61', des: "Unidad térmica británica (termoquímico) por grado fahrenheit (Unidad de la capacidad calorífica según el sistema Imperial de unidades.)" }, 
                { key: 'N62', des: "Unidad térmica británica (tabla internacional) por grado rankine (Unidad de la capacidad calorífica según el sistema Imperial de unidades.)" }, 
                { key: 'N63', des: 'Unidad térmica británica (termoquímico) por grado …alorífica según el sistema Imperial de unidades.)' }, 
                { key: 'N64', des: 'Unidad térmica británica (termoquímico) por libra …bra según el sistema de avoirdupois de unidades.)' }, 
                { key: 'N65', des: "Kilocaloría (tabla internacional) por gramo kelvin (Unidad de la capacidad calorífica relacionada con la masa como cociente 1000 veces de la caloría (tabla internacional) dividido por el producto de 0,001 veces de las unidades de base kilogramo y kelvin.)" }
        ],
        [       { key: 'A21', des: 'Unidad térmica británica (tabla internacional) por libra grado rankine' }, 
                { key: 'B11', des: 'Joule por kilogramo kelvin (Es la capacidad térmic…ación de temperatura termodinámica de 1 kelvin. )' }, 
                { key: 'B43', des: 'Kilojoule por kilogramo kelvin' }, 
                { key: 'D37', des: 'Calorías (termoquímicas) por gramo de kelvin' }, 
                { key: 'D76', des: 'Calorías (tabla internacional) por gramo de kelvin' }
        ], //capacidad de calor es
        [
                { key: 'C91', des: 'Recíprocidad de kelvin ó kelvin a la potencia menos 1' }, 
                { key: 'M20', des: 'Recíproco de megakelvin ó megakelvin a la potencia menos 1' }
        ],
        [
                { key: 'C64', des: 'Pascal por kelvin' }, 
                { key: 'F81', des: 'Bar por kelvin' }
        ], //coefi a pre
        [
                { key: 'A20', des: 'Unidad térmica británica (tabla internacional) por segundo pie cuadrado grado rankine.' }, 
                { key: 'A23', des: 'Unidad térmica británica (tabla internacional) por hora pie cuadrado grado rankine.' }, 
                { key: 'D39', des: 'Calorías (termoquímicas) por segundo centímetro cuadrado kelvin' }, 
                { key: 'D72', des: 'Calorías (tabla internacional) por segundo centímetro cuadrado kelvin' }, 
                { key: 'N74', des: "Unidad térmica británica (tabla internacional) por hora pie cuadrado grado fahrenheit. (Unidad del coeficiente de transición térmica según el sistema Imperial de unidades.)" }, 
                { key: 'N75', des: "Unidad térmica británica (termoquímico) por hora pie cuadrado grado farenheit. (Unidad del coeficiente de transición térmica según el sistema imperial de unidades.)" }, 
                { key: 'N76', des: "Unidad térmica británica (tabla internacional) por segundo pie cuadrado grado fahrenheit. (Unidad del coeficiente de transición térmica según el sistema imperial de unidades.)" }, 
                { key: 'N77', des: "Unidad térmica británica (termoquímico) por segundo pie cuadrado grado fahrenheit. (Unidad del coeficiente de transición térmica según el sistema imperial de unidades.)" }, 
                { key: 'N78', des: "Kilowatt por metro cuadrado kelvin (1000 veces la unidad derivada watt, dividida por el producto de la potencia de unidad base, metro, por el exponente 2 y la unidad base, kelvin, del sistema internacional de unidades." }
        ],
        [
                { key: 'D55', des: 'Watt por metro cuadrado kelvin' }
        ],
        [
                { key: 'D52', des: 'Watt por kelvin' }
        ],
        [
                { key: 'A22', des: 'Unidad térmica británica (tabla internacional) por segundo pie grado rankine' }, 
                { key: 'D38', des: 'Calorías (termoquímicas) por segundo centímetro kelvin' }, 
                { key: 'D53', des: "Watt por metro kelvin (Es la conductividad térmica de un cuerpo homogéneo isótropo, en la que una diferencia de temperatura de 1 kelvin entre dos planos paralelos, de área 1 metro cuadrado y distantes 1 metro, produce entre estos planos un flujo térmico de 1 watt.)" }, 
                { key: 'D71', des: 'Calorías (tabla internacional) por segundo centímetro kelvin' }, 
                { key: 'J40', des: 'Unidad térmica británica (tabla internacional) pie por hora pie cuadrado grado fahrenheit.' }, 
                { key: 'J41', des: 'Unidad térmica británica (tabla internacional) pulgada por hora pie cuadrado grado fahrenheit.' }, 
                { key: 'J42', des: 'Unidad térmica británica (tabla internacional) pulgada por segundo pie cuadrado grado fahrenheit.' }, 
                { key: 'J46', des: 'Unidad térmica británica (termoquímico) pie por hora pie cuadrado grado fahrenheit.' }, 
                { key: 'J48', des: 'Unidad térmica británica (termoquímico) pulgada por hora pie cuadrado grado fahrenheit.' }, 
                { key: 'J49', des: 'Unidad térmica británica (termoquímico) pulgada por segundo pie cuadrado grado fahrenheit.' }, 
                { key: 'J78', des: 'Caloría (termoquímica) por centímetro segundo grado celsius' }, 
                { key: 'K52', des: 'Kilocaloría (tabla internacional) por hora metro grado celsius' }, 
                { key: 'N80', des: "Watt por metro grado celsius (Unidad derivada del sistema internacional, watt, dividido por el producto de la unidad base, metro, y la unidad de temperatura grados Celsius.)" }, 
                { key: 'N81', des: "Kilowatt por metro kelvin (1000 veces de la unidad derivada, watt, dividido por el producto de la unidad de base metro y la unidad base kelvin, ambas del sistema internacional.)" }, 
                { key: 'N82', des: "Kilowatt por metro grado celsius (1000 veces de la unidad derivada, watt, dividido por el producto de la unidad base metro y la unidad de temperatura grados Celsius.)" }
            ]
        [
                { key: 'N58', des: 'Unidad térmica británica (tabla internacional) por…e energía según el sistema Imperial de unidades.)' }, 
                { key: 'N59', des: 'Unidad térmica británica (termoquímica) por pie cú…e energía según el sistema Imperial de unidades.)' }
        ],
        [
            { key: 'D54', des: 'Watt por metro cuadrado' },
            { key: 'N48', des: "Watt por centímetro cuadrado (Unidad derivada del sistema internacional, watt, dividido por la potencia de la 0.01 parte de la unidad base del sistema internacional, metro al exponente 2.)" },
            { key: 'N49', des: "Watt por pulgada cuadrada (Unidad derivada del sistema internacional, watt, dividido por la potencia de la unidad pulgada al exponente 2, de acuerdo al sistema de unidades Anglo-Americano y el sistema imperial de unidades.)" },
            { key: 'N5', des: "Unidad térmica británica (tabla internacional) por pulgada cuadrada segundo. (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N50', des: "Unidad térmica británica (tabla internacional) por pie cuadrado hora. (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N51', des: "Unidad térmica británica (termoquímica) por pie cuadrado hora. (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N52', des: "Unidad térmica británica (termoquímico) por pie cuadrado minuto. (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N53', des: "Unidad térmica británica (tabla internacional) por pie cuadrado segundo. (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N54', des: "Unidad térmica británica (termoquímica) por pie cuadrado segundo. (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N56', des: "Caloría (termoquímica) por centímetro cuadrado minuto (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" },
            { key: 'N57', des: "Caloría (termoquímica) por centímetro cuadrado segundo (Unidad del flujo superficial de calor según el sistema Imperial de unidades.)" }

        ],
        [
            { key: 'E97', des: 'Mililitro por gadro celsius metro' },
            { key: 'F53', des: 'Mililitro por kelvin' },
            { key: 'N83', des: 'Metro por grado celsius metro' }
        ],
        [
            { key: 'AZ', des: 'Unidad térmica británica (tabla internacional) por libra' },
            { key: 'N73', des: "Unidad térmica británica (termoquímica) por libra (Unidad de la energía calorífica según el sistema imperial de unidades dividió por la unidad de la libra de avoirdupois según el sistema de avoirdupois de unidades.)" }
        ],
        [
            { key: 'D75', des: 'Calorías (tabla internacional) por gramo' }
        ],
        [
            { key: 'J2', des: 'Joule por kilogramo' }
        ],
        [
            { key: 'JK', des: 'Megajoule por kilogramo' }
        ],
        [
            { key: 'D95', des: 'Joule por gramo' },
            { key: 'Q31', des: 'Kilojoule por gramo' }
        ],
        [
            { key: 'B42', des: 'Kilojoule por kilogramo' }
        ],
        [
            { key: 'D35', des: '"Calorías (termoquímicas)' }
        ],
        [
            { key: 'B36', des: '"Calorías (termoquímicas) por gramo' }
        ],
        [
            { key: 'B21', des: 'Kelvin por watt' },
            { key: 'H35', des: 'Kelvin metro por watt' },
            { key: 'N84', des: "Grado fahrenheit hora por unidad térmica británica (tabla internacional) (Unidad no conforme al sistema internacional de unidades,de la resistencia térmica según el sistema Imperial de unidades.)" },
            { key: 'N85', des: "Grado fahrenheit hora por unidad térmica británica (termoquímico) (Unidad no conforme al sistema internacional de unidades,de la resistencia térmica según el sistema Imperial de unidades.)" },
            { key: 'N86', des: "Grado fahrenheit segundo por unidad térmica británica (tabla internacional) (Unidad no conforme al sistema internacional de unidades,de la resistencia térmica según el sistema Imperial de unidades.)" },
            { key: 'N87', des: "Grago fahrenheit segundo por unidad térmica británica (termoquímico) (Unidad no conforme al sistema internacional de unidades,de la resistencia térmica según el sistema Imperial de unidades.)" },
            { key: 'N88', des: "Grado fahrenheit hora pie cuadrado por unidad térmica británica (tabla internacional) pulgada (Unidad de resistencia térmica específica según el sistema Imperial de unidades)" },
            { key: 'N89', des: "Grado fahrenheit hora pie cuadrado por unidad térmica británica (termoquímico) pulgada. (Unidad de resistencia térmica específica según el sistema Imperial de unidades)" }
        ],

        [
            { key: '2I', des: 'Unidad térmica británica (tabla internacional) por hora' },
            { key: 'E15', des: 'Kilocaloría (termoquímica) por hora' },
            { key: 'J44', des: 'Unidad térmica británica (tabla internacional) por minuto' },
            { key: 'J45', des: 'Unidad térmica británica (tabla internacional) por segundo' },
            { key: 'J47', des: 'Unidad térmica británica (termoquímica) por hora' },
            { key: 'J51', des: 'Unidad térmica británica (termoquímica) por minuto' },
            { key: 'J52', des: 'Unidad térmica británica (termoquímica) por segundo' },
            { key: 'J81', des: 'Caloría (termoquímica) por minuto' },
            { key: 'J82', des: 'Caloría (termoquímica) por segundo' },
            { key: 'K54', des: 'Kilocaloría (termoquímica) por minuto' },
            { key: 'K55', des: 'Kilocaloría (termoquímica) por segundo' }
        ],
        [ //TEMPERATURA
            { key: 'A48', des: 'Grado rankine (Consulte ISO 80000-5 (Cantidades y unidades - Parte 5: Termodinámica))' },
            { key: 'CEL', des: 'Grados celsius (Consulte ISO 80000-5 (Cantidades y unidades - Parte 5: Termodinámica))' },
            { key: 'E98', des: 'Grado celsius por kelvin' },
            { key: 'F02', des: 'Kelvin por kelvin' },
            { key: 'F10', des: 'Kelvin por hora' },
            { key: 'F11', des: 'Kelvin por minuto' },
            { key: 'F12', des: 'Kelvin por segundo' },
            { key: 'F60', des: 'Grado celsius por bar' },
            { key: 'F61', des: 'Kelvin por bar' },
            { key: 'H12', des: 'Grado celsius por hora' },
            { key: 'H13', des: 'Grado celsius por minuto' },
            { key: 'H14', des: 'Grado celsius por segundo' },
            { key: 'J20', des: 'Grado fahrenheit por kelvin' },
            { key: 'J21', des: 'Grado fahrenheit por bar' },
            { key: 'J26', des: '"Reciprocidad grado fahrenheit' },
            { key: 'N79', des: 'Kelvin por pascal (Unidad base del sistema interna…re pascal, unidad base del sistema internacional)' },
        ],
        [
            { key: 'FAH', des: 'Grado fahrenheit (Consulte ISO 80000-5 (Cantidades y unidades - Parte 5: Termodinámica))' }
        ],
        [
            { key: 'KEL', des: "Kelvin (Unidad de temperatura termodinámica, es la fracción 1/273,16 de la temperatura termodinámica del punto triple del agua. )" }
        ],
        [ //Variación de temperatura a lo largo del tiempo
            { key: 'J23', des: 'Grado fahrenheit por hora' },
            { key: 'J24', des: 'Grado fahrenheit por minuto' },
            { key: 'J25', des: 'Grado fahrenheit por segundo' },
            { key: 'J28', des: 'Grado rankine por hora' },
            { key: 'J29', des: 'Grado rankine por minuto' },
            { key: 'J30', des: 'Grado rankine por segundo' },
        ],


    ],
    [ //Diversos
        [
            { key: '34', des: 'Kilopascal por milimetro' },
            { key: 'H42', des: 'Pascal por metro' },
            { key: 'H69', des: 'Picopascal por kilometro' },
            { key: 'P80', des: "Milipascal por metro. ( 0.001 veces de la unidad derivada pascal dividido por la unidad de base metros.)" },
            { key: 'P81', des: 'Kilopascal por metro. (1000 veces de la unidad der…da pascal dividido por la unidad de base metros.)' },
            { key: 'P82', des: "Hectopascal por metro. (100 veces de la unidad derivada pascal SI dividido por la unidad de base metros. )" },
            { key: 'P83', des: "Admosfera estandar por metro. (Unidad anticuadas de la presión dividida por la unidad de base metros.)" },
            { key: 'P84', des: "Admosfera tecnica por metro. (unidad obsoleta y no legal de la presión que se genera por una columna de agua de 10 metros dividida por la unidad de base metros.)" },
            { key: 'P85', des: "Torr por metro. (Unidad de la presión dividida por la unidad de base metros.)" },
            { key: 'P86', des: "Psi por pulgada (Unidad de compuesto para la presión (libra de fuerza de acuerdo con el sistema de la unidad angloamericana dividida por la potencia de la unidad de pulgada de acuerdo con el sistema angloamericano e Imperial de unidades con el exponente 2) dividido por la unidad de pulgada de acuerdo con la sistema angloamericano e Imperial de unidades.)" },
        ],
        [
            { key: '33', des: 'Kilopascal por grtr' },
            { key: 'P79', des: 'Pascal metro cuadrado por kilogramo ( Unidad del índice de estallido como unidad derivada para pascal presión relacionada con la sustancia, representado como cociente de la unidad base SI kilogramo dividida por la potencia de la unidad base SI metros por exponente 2.)' }
        ],
        [ //OTROS
            { key: '10', des: "Grupos (Una unidad de conteo que define el número de grupos (grupo: conjunto de elementos clasificados juntos).)" },
            { key: '11', des: "Equipos (Unidad de recuento que define el número de equipos (equipo: un conjunto completo de equipo / materiales / objetos utilizados para un propósito específico).)" },
            { key: '13', des: "Raciones (Una unidad de recuento para definir el número de raciones (ración: una sola porción de las disposiciones).)" },
            { key: '14', des: 'Shot (Unidad de medida para liquidos.)' },
            { key: '15', des: 'Palo, medida militar. (Unidad para el momento de r…sistema de unidades Anglo-Americanas e Imperial.)' },
            { key: '18', des: 'Tambor de cincuenta y cinco galones (EUA)' },
            { key: '19', des: 'Camión cisterna' },
            { key: '1I', des: "Tipo de interés fijo ( Unidad de cantidad expresada como una tasa predeterminada o conjunto para el uso de una instalación o servicio.)" },
            { key: '26', des: 'Tonelada real' },
            { key: '29', des: 'Libra por mil pies cuadrados' },
            { key: '30', des: 'Día de potencia de caballos por tonelada métrica de aire seco' },
            { key: '31', des: 'Pescar' },
            { key: '32', des: 'Kilogramo por tonelada métrica seca del aire' },
            { key: '36', des: 'Pie cúbico por minuto por pie cuadrado (Se requiere factor de conversión)' },
            { key: '38', des: 'Onzas por pie cuadrado por 0,01 pulgadas' },
            { key: '3C', des: "Manmonth (Unidad de cuenta que define el número de meses que una persona o personas pueden desempeñar alguna actividad.)" },
            { key: '3E', des: 'Libra por libra de producto' },
            { key: '3G', des: 'Libra por pieza de producto' },
            { key: '3H', des: 'Kilogramo por kilogramo de producto' },
            { key: '3I', des: 'Kilogramo por pedazo de producto' },
            { key: '44', des: 'Bolsa a granel de quinientos kilos' },
            { key: '45', des: 'Bolsa a granel de trescientos kilos' },
            { key: '46', des: 'Bolsa a granel de cincuenta libras' },
            { key: '47', des: 'Bolso de cincuenta libras' },
            { key: '48', des: 'Carga masiva' },
            { key: '4B', des: 'Gorra' },
            { key: '5', des: 'Ascensor' },
            { key: '53', des: 'Kilogramo teórico' },
            { key: '54', des: 'Tonelada teórica (UK)' },
            { key: '56', des: 'Sitas ( Unidad de área de placa de estaño igual a un área de superficie de 100 metros cuadrados.)' },
            { key: '57', des: "Malla (Una unidad de recuento de definir el número de hebras por pulgada como una medida de la finura de un producto tejido.)" },
            { key: '5B', des: "Batch (Unidad de conteo que define el número de lotes (lote: cantidad de material producido en una operación o número de animales o personas que vienen a la vez).)" },
            { key: '5C', des: 'Galón (US) por mil' },
            { key: '5E', des: 'Mmscf/day (Unidad de volumen equivalente a un millón (1,000,000) pies cúbicos de gas por día.)' },
            { key: '5F', des: '"Libra por mil' },
            { key: '5G', des: 'bomba' },
            { key: '5H', des: 'Escenario' },
            { key: '5K', des: '"Contar por minuto' },
            { key: '5P', des: 'Nivel sísmico' },
            { key: '5Q', des: 'Línea sísmica' },
            { key: '62', des: 'Por ciento por 1000 horas' },
            { key: '63', des: 'Tasa de fracaso en el tiempo' },
            { key: '64', des: 'Libra por pulgada cuadrada, calíbre' },
            { key: '66', des: 'Oersted' },
            { key: '69', des: 'Escala específica de prueba' },
            { key: '71', des: 'Voltios amperios por libra' },
            { key: '72', des: 'Vatio por libra' },
            { key: '73', des: 'Amperios por centímetro' },
            { key: '76', des: 'Gauss' },
            { key: '78', des: 'Kilogauss' },
            { key: '8', des: 'Montón de calor' },
            { key: '84', des: '"Kilopound-force por pulgada cuadrada (Unidad de p…ice kip por pulgada cuadrada (código común N20).)' },
            { key: '90', des: 'Saybold segundo universal' },
            { key: '92', des: 'Calorías por centímetro cúbico' },
            { key: '93', des: 'Calorías por gramo (Utilice calorías de la tabla internacional (IT) por gramo (código común D75).)' },
            { key: '94', des: 'Unidad de curl' },
            { key: '95', des: 'Veinte mil galones' },
            { key: '96', des: 'Diez mil galones (US)' },
            { key: 'A59', des: "La cobertura de nubes 8-parte (Unidad de recuento para definir el número de octavos de partes como una medida de la cobertura de nubes de la ccúpula celeste.  'Sinónimo: OKTA, OCTA)" },
            { key: 'A9', des: 'Tarífa (Unidad de cantidad expresada como una tasa para el uso de una instalación o servicio.)' },
            { key: 'AA', des: "Balón (Unidad de recuento para definir el número de bolas (Balón: objeto formado en la forma de esfera).)" },
            { key: 'AB', des: 'Paquete a granel (Unidad de recuento para definir el número de artículos por paquete a granel.)' },
            { key: 'AJ', des: 'policía' },
            { key: 'AQ', des: 'Unidad del factir anti-hemofilico. (Unidad de medida para la potencia de la sangre (US).)' },
            { key: 'AS', des: "Variedad (Unidad de recuento para definir el número de surtidos (variedad: conjunto de elementos agrupados en una colección mixta).)" },
            { key: 'AY', des: "Montaje (Una unidad de recuento de definir el número de conjuntos (montaje: artículos que consisten de partes componentes).)" },
            { key: 'B0', des: 'Btu por pie cúbico' },
            { key: 'B17', des: 'Crédito (Unidad de recuento de definir el número de entradas realizadas en el haber de una cuenta.)' },
            { key: 'B2', des: 'litera' },
            { key: 'B5', des: 'palanquilla' },
            { key: 'B6', des: 'Bollo' },
            { key: 'B7', des: "Ciclo (Unidad de recuento de definir el número de ciclos (ciclo: un período recurrente de duración definida).)" },
            { key: 'B9', des: 'Batt' },
            { key: 'BH', des: 'Cepillo' },
            { key: 'BW', des: 'Peso base' },
            { key: 'C1', des: 'Libra de producto compuesto (peso total)' },
            { key: 'C5', des: 'Costo' },
            { key: 'C6', des: 'celda' },
            { key: 'C9', des: "Grupo bobinas (Unidad de conteo que define el número de grupos de bobinas (grupo bobina: grupos de elementos dispuestos por longitudes de los objetos colocados en una secuencia de círculos concéntricos unido).)" },
            { key: 'CE', des: 'Cada mes' },
            { key: 'cero6', des: 'Pequeño aerosol' },
            { key: 'CG', des: "Tarjeta (Unidad de conteo que define el número de unidades de la tarjeta (tarjeta: papel rígido grueso o cartón).)" },
            { key: 'CK', des: 'Conector' },
            { key: 'CZ', des: 'Combo' },
            { key: 'D23', des: "Gramo pluma (proteína) (Unidad de recuento pata definir el número de gramos de aminoácidos prescritos para la terapia parenteral y terapia enteral.)" },
            { key: 'D28', des: 'sifón' },
            { key: 'D63', des: "Libro (Unidad de recuento para definir el número de libros (libro: conjunto de elementos unidos entre sí o documento de un material escrito).)" },
            { key: 'D64', des: 'bloquear' },
            { key: 'D65', des: "Redondo (Unidad de recuento para definir el número de rondas (redondos: un objeto circular o cilíndrico).)" },
            { key: 'D66', des: 'casete' },
            { key: 'D67', des: 'Dólar por hora' },
            { key: 'D7', des: 'Sandwich' },
            { key: 'D92', des: 'banda' },
            { key: 'DC', des: 'Disco (disco)' },
            { key: 'DE', des: 'Acuerdo' },
            { key: 'DS', des: 'monitor' },
            { key: 'DY', des: 'Libro de directorio' },
            { key: 'E12', des: 'Mille (Unidad de recuento de definir el número de cigarrillos en unidades de 1.000.)' },
            { key: 'E25', des: "Unidad activa (Unidad de conteo que define el número de unidades activas dentro de una sustancia.)" },
            { key: 'E27', des: "Dosis (Unidad de recuento de definir el número de dosis (dosis: una cantidad definida de un medicamento o fármaco).)" },
            { key: 'EB', des: "Casilla de correo electrónico (Es el destino al que correo electrónico se entregan los mensajes. Es el equivalente de un buzón en el sistema postal.)" },
            { key: 'F9', des: 'Fibra por centímetro cúbico de aire' },
            { key: 'FB', des: 'Campo' },
            { key: 'FD', des: 'Millones de partículas por pie cúbico' },
            { key: 'FG', des: 'Parche transdérmico' },
            { key: 'G7', des: 'Hoja de microficha' },
            { key: 'GZ', des: 'Sistema de calibración' },
            { key: 'H1', des: 'Media página - electrónica' },
            { key: 'H77', des: "Anchura del módulo (Unidad de medida utilizada para describir la anchura de los conjuntos electrónicos como una norma de instalación o una dimensión de montaje.)" },
            { key: 'H80', des: 'Unidad de bastidor (Unidad de medida utilizada par…bastidor tiene 1,45 pulgadas (44,45 mm) de alto.)' },
            { key: 'HA', des: "Unidad de bastidor (Unidad de medida utilizada para describir la altura en unidades de bastidor del equipo destinado a ser montado en un bastidor de 19 pulgadas o un bastidor de 23 pulgadas. Unidad de bastidor tiene 1,45 pulgadas (44,45 mm) de alto.)" },
            { key: 'IC', des: 'Contar por pulgada' },
            { key: 'IE', des: 'Personas (Unidad de conteo que define el número de personas.)' },
            { key: 'II', des: 'Columna pulgada' },
            { key: 'IM', des: 'Impresión' },
            { key: 'IP', des: 'póliza de seguros' },
            { key: 'IT', des: 'Recuento por centímetro' },
            { key: 'JO', des: 'Articulación' },
            { key: 'KA', des: "Pastel (Unidad de conteo que define el número de pasteles (torta: objeto en forma de una masa plana y compacta).)" },
            { key: 'KB', des: 'Kilocaracter (Unidad de información igual a 10³ (1000) caracteres.)' },
            { key: 'KD', des: 'Kilogram decimal' },
            { key: 'KF', des: 'Kilopacket' },
            { key: 'KO', des: "Miliequivalentes de potasa cáustica por gramo de producto (Unidad de conteo que define el número de miligramos de hidróxido de potasio por gramo de producto como una medida de la concentración de hidróxido de potasio en el producto.)" },
            { key: 'LE', des: 'Lite' },
            { key: 'LJ', des: 'Spray grande' },
            { key: 'LK', des: 'Enlazar (Unidad de distancia igual a 0.01 cadena.)' },
            { key: 'LN', des: "Longitud (Unidad de distancia que define la extensión lineal de un elemento medido de extremo a extremo.)" },
            { key: 'LO', des: "Lote [unidad de adquisición] (Unidad de conteo que define el número de lotes (lote: una colección de artículos asociados).)" },
            { key: 'LR', des: 'Capa (Unidad de conteo que define el número de capas.)' },
            { key: 'LS', des: 'Suma global (Unidad de conteo que define el número de cantidades monetarias completas o completas.)' },
            { key: 'M19', des: "Beaufort (Una medida empírica para describir la velocidad del viento basada principalmente en condiciones marinas observadas. La escala de Beaufort indica la velocidad del viento por números que típicamente varían de 0 para la calma, a 12 para el huracán.)" },
            { key: 'M4', des: 'Valor monetario (Unidad de medida expresada como un monto monetario.)' },
            { key: 'M9', des: 'Millones de btu por 1000 pies cúbicos' },
            { key: 'MA', des: 'Máquina por unidad' },
            { key: 'N1', des: "Pluma calórica (Unidad de conteo que define el número de calorías que se recetan diariamente para la terapia parenteral / enteral.)" },
            { key: 'N2', des: 'número de líneas' },
            { key: 'NF', des: 'Mensaje (Unidad de conteo que define el número de mensajes)' },
            { key: 'OA', des: 'Panel (Unidade de conteo que define el n[umero de paneles )' },
            { key: 'P0', des: 'Página electrónica' },
            { key: 'PD', des: "Almohadilla (Unidad de conteo que define el número de almohadillas (almohadilla: bloquea de hojas de papel sujetas juntas en un extremo).)" },
            { key: 'Q3', des: 'Comida (Unidad de conteo que define el número de comida)' },
            { key: 'ROM', des: 'Habitación (Unidad de conteo que define el número de habitaciones)' },
            { key: 'RS', des: 'Reiniciar' },
            { key: 'RU', des: 'correr' },
            { key: 'S6', des: 'Sesión' },
            { key: 'S7', des: 'unidad de almacenamiento' },
            { key: 'S8', des: 'Unidad de publicidad estándar' },
            { key: 'SE', des: 'Sección' },
            { key: 'SG', des: 'Segmento (Unidad de información equivalente a 64000bytes)' },
            { key: 'SQ', des: 'Cuadrado (Unidad de conteo que define el número de cuadrados (cuadrado: forma rectangular))' },
            { key: 'SR', des: 'Tira (Unidad de conteo que define el número de tiras (pieza larga y estrecha de un objeto))' },
            { key: 'STC', des: "Palo (Unidad de conteo que define el número de palos (palo: pieza delgada y a menudo cilíndirca de una sustancia))" },
            { key: 'STK', des: "Palo, cigarrillo (Unidad de conteo que define el número de cigarrillos en la unidad más pequeña para el cálculo de la población y/o del trabajo)" },
            { key: 'STW', des: "Paja (Unidad de conteo que define el número de pajitas (paja:un tubo delgado utilizado para succionar liquidos))" },
            { key: 'SW', des: "Número de madejas (Unidad de conteo que define el número de madejas (skein:un paquete de hilo o hilo suelto))" },
            { key: 'SYR', des: "Jeringuilla (Unidad de conteo que define el número de jeringuillas (jeringa: un pequeño dispositivo para bombear, pulverizar y/o inyectar liquidos a través de una pequeña abertura))" },
            { key: 'TST', des: "Decena de conjuntos (Unidad de conteo que define el número de conjuntos en múltiplos de 10 (conjunto: un número de objetos agrupados))" },
            { key: 'TTS', des: "Decenas de millar de pegatinas (Unidad de conteo que define el número de palos multiples de 10000 (Pegatina: pieza delgada y a menudo cilíndrica de una sustancia))" },
            { key: 'U1', des: "Tratamiento (Unidad de conteo que define el número de tratamientos (tratamiento: sujección a la acción de un agente químico, físico o biológico))" },
            { key: 'U2', des: 'Número de tabletas (Unidad de conteo que define el número de tabletas)' },
            { key: 'VA', des: 'Voltio-amperio por kilogramo' },
            { key: 'VS', des: 'Visita' },
            { key: 'WA', des: 'Watt por kilogramo (Unidad de potencia)' },
            { key: 'WH', des: 'Rueda' },
            { key: 'WI', des: 'Peso por pulgada cuadrada' },
            { key: 'Z11', des: 'Contenedor colgante (Unidad de conteo que define el número de contenedores colgantes.)' },
            { key: 'Z5', des: 'Arrastre' },
            { key: 'Z8', des: 'Página de noticias' },
            { key: 'ZZ', des: 'Mutuamente definido (Unidad de medida acordada en común entre dos o más partes)' },

        ],
        [
            { key: '35', des: 'Milimetro por un segundo centimetro cuadrado' },
            { key: 'P87', des: "Metro cúbico por segundo de metro cuadrado (Unidad de volumen de flujo metros cúbicos por segundo relacionado con la superficie de transmisión en metros cuadrados.)" }
        ]

    ],
    [ //ELECTRICIDAD Y MAGNETISMO
        [
            { key: '81', des: "Henry (Un henry es la unidad para la inductancia eléctrica en el Sistema Internacional de Unidades. Es la inductancia eléctrica de un circuito cerrado en el que se produce una fuerza electromotriz de 1 voltio, cuando la corriente eléctrica que recorre el circuito varía uniformemente a razón de un amperio por segundo.)" },
            { key: 'B90', des: 'Microhenry' },
            { key: 'C14', des: 'Milihenry' },
            { key: 'C43', des: 'Nanohenry' },
            { key: 'C73', des: 'Picohenry' },
            { key: 'G98', des: 'Micro henry por kiloOhm' },
            { key: 'G99', des: 'Micro henry por Ohm' },
            { key: 'H03', des: 'Henry por kiloOhm' },
            { key: 'H04', des: 'Henry por Ohm' },
            { key: 'H05', des: 'Milihenry por kiloOhm' },
            { key: 'H06', des: 'Milihenry por Ohm' },
            { key: 'P24', des: 'Kilohenry (1000 veces la unidad derivada, henry del sistema internacional.)' }
        ],
        [
            { key: '4O', des: 'Microfaradio' },
            { key: '4T', des: 'Picofaradio' },
            { key: 'C10', des: 'Milifaradio' },
            { key: 'C41', des: 'Nanofaradio' },
            { key: 'FAR', des: 'Farad (Es la capacidad de un condensador eléctrico…una cantidad de electricidad igual a 1 coulomb. )' },
            { key: 'H48', des: 'Attofarad' },
            { key: 'N90', des: 'Kilofaradio (1000 veces del faradio, unidad derivada del sistema internacional)' }

        ],
        [
            { key: 'M26', des: 'GigaOhm por metro' }
        ],
        [
            { key: 'A8', des: 'Amperio segundo' },
            { key: 'AMH', des: 'Amperio hora (Unidad de carga electrica definida p…or un flujo constante de un amperio por 1 hora. )' },
            { key: 'B26', des: 'KiloCulombio' },
            { key: 'B86', des: 'MicroCulombio' },
            { key: 'C40', des: 'NanoCulombio' },
            { key: 'C71', des: 'PicoCulombio' },
            { key: 'COU', des: "Culombio (Es la cantidad de electricidad transportada en 1 segundo por una corriente de intensidad 1 amperio. )" },
            { key: 'D77', des: 'MegaCulombio' },
            { key: 'D86', des: 'MiliCulombio' },
            { key: 'E09', des: "Miliamperio hora (Unidad de carga de potencia entregada a razón de una milésima parte de un amperio durante un período de una hora.)" },
            { key: 'H32', des: "Amperio cuadrado segundo (Es una unidad de medida basada en la energía o el calor que se permite pasar a través del fusible o interruptor durante una condición de cortocircuito.)" },
            { key: 'N94', des: 'Franklin (CGS (Centímetro-Gram-Segundo sistema) un… carga igual se realiza a una distancia de 1 cm.)' },
            { key: 'N95', des: "Amperio minuto (Unidad de carga eléctrica que define la cantidad de carga acumulada por un flujo constante de un amperio por un minuto.)" },
            { key: 'TAH', des: 'Kiloamperio-hora (milamperio-hora)' },
        ],
        [
            { key: 'P10', des: 'Culombio por metro (Unidad derivada, coulomb dividida por la unidad base, metro.)' }
        ],
        [
            { key: 'H34', des: 'Hertz metro' },
            { key: 'H39', des: 'Megahertz kilómetro' },
            { key: 'M17', des: 'Kilohertz metro' },
            { key: 'M18', des: 'Gigahertz metro' },
            { key: 'M21', des: 'Kilovoltio-amperio hora recíprocidad' },
            { key: 'M27', des: 'Megahertz metro' },
            { key: 'M30', des: 'voltio-amperio segundo recíprocidad' },
            { key: 'N91', des: 'Joule recíproco' }
        ],
        [
            { key: 'B53', des: 'Kilosiemens' },
            { key: 'B99', des: 'Microsiemens' },
            { key: 'C27', des: 'Milisiemens' },
            { key: 'G42', des: 'Microsiemens por centímetro' },
            { key: 'G43', des: 'Microsiemens por metro' },
            { key: 'N92', des: "Picosiemens (0.000 000 000 001 veces de la unidad derivada siemens del sistema internacional de unidades.)" },
            { key: 'SIE', des: "Siemens (Se denomina siemens a la unidad derivada del SI para la medida de la conductancia eléctrica.)" },
        ],
        [
            { key: 'B54', des: 'Kilosiemens por metro' },
            { key: 'B77', des: 'Megasiemens por metro' },
            { key: 'D10', des: 'Siemens por metro' },
            { key: 'G44', des: 'Nanosiemens por centímetro' },
            { key: 'G45', des: 'Nanosiemens por metro' },
            { key: 'H43', des: 'Siemens por centímetro' },
            { key: 'H61', des: 'Milisiemens por centímetro' },
            { key: 'L42', des: 'Picosiemens por metro' }
        ],
        [
            { key: '4K', des: 'Miliamperio' },
            { key: 'AMP', des: 'Amperio (Es la intensidad de una corriente constan…za igual a 2·10-7 newton por metro de longitud. )' },
            { key: 'B22', des: 'Kiloamperio' },
            { key: 'B84', des: 'Microamperio' },
            { key: 'C39', des: 'Nanoamperio' },
            { key: 'C70', des: 'Picoamperio' },
            { key: 'H38', des: 'Megaamperio' },
            { key: 'N96', des: 'Biot (El número de Biot (Bi) es un número adimensi…en un sólido y la convección en sus superficies.)' },
            { key: 'N97', des: 'Gilbert (CGS (Centímetro-Gram-Segundo sistema) uni…l magnético de un polo común positivo con 1 erg.)' }
        ],
        [
            { key: 'A4', des: 'Amperio por centímetro cuadrado' },
            { key: 'A41', des: 'Amperio por metro cuadrado' },
            { key: 'A7', des: 'Amperio por milímetro cuadrado' },
            { key: 'B23', des: 'Kiloamperio por metro cuadrado' },
            { key: 'B66', des: 'Megaamperio por metro cuadrado' },
            { key: 'F57', des: 'Miliamperio por libra-fuerza por pulgada cuadrada' },
            { key: 'G59', des: 'Miliamperio por litro minuto' },
            { key: 'H31', des: 'Amperio por kilogramo' },
            { key: 'N93', des: 'Amperio por pascal (Unidad base amperio dividido por la unidad derivada pascal.)' }
        ],
        [
            { key: 'A2', des: 'Amperio por centímetro' },
            { key: 'A3', des: 'Amperio por milímetro' },
            { key: 'AE', des: "Amperio por metro ((a veces llamado amperio vuelta por metro) es la unidad SI de la corriente de campo magnético.)" },
            { key: 'B24', des: 'Kiloamperio por metro' },
            { key: 'F08', des: 'Miliamperio por pulgada' },
            { key: 'F59', des: '"Miliamperio por bar' },
            { key: 'F76', des: 'Miliamperio por milímetro' }
        ],
        [
            { key: 'B8', des: 'Joule por metro cúbico' }
        ],
        [
            { key: 'C29', des: 'Militesla' },
            { key: 'C48', des: 'Nanotesla' },
            { key: 'D33', des: 'Tesla (Es la inducción magnética uniforme que, rep…superficie un flujo magnético total de 1 weber. )' },
            { key: 'D81', des: 'Microtesla' },
            { key: 'P12', des: '"Gamma (Unidad de densidad de flujo magnético.)' },
            { key: 'P13', des: 'Kilotesla (1000 veces la unidad derivada tesla.)' }
        ],
        [
            { key: 'A33', des: 'Culombio por centímetro cuadrado' },
            { key: 'A34', des: 'Culombio por metro cuadrado' },
            { key: 'A35', des: 'Culombio por milímetro cuadrado' },
            { key: 'B28', des: 'KiloCulombio por metro cuadrado' },
            { key: 'B70', des: 'MegaCulombio por metro cuadrado' },
            { key: 'B88', des: '"MicroCulombio por metro cuadrado' }

        ],
        [
            { key: '130', des: '"Culombio por milimetro cúbico' },
            { key: 'A28', des: 'Culombio por centímetro cúbico' },
            { key: 'A29', des: 'Culombio por metro cúbico' },
            { key: 'A84', des: 'GigaCulombio por metro cúbico' },
            { key: 'B27', des: 'KiloCulombio por metro cúbico' },
            { key: 'B69', des: 'MegaCulombio por metro cúbico' },
            { key: 'B87', des: '"MicroCulombio por metro cúbico' },
            { key: 'D88', des: 'MiliCulombio por metro cúbico' }
        ],
        [
            { key: 'C33', des: 'Miliweber' },
            { key: 'P11', des: 'Kiloweber (1000 veces la unidad derivada weber, del sistema internacional de unidades.)' },
            { key: 'WEB', des: 'Weber (Es el flujo magnético que, al atravesar un …o flujo en un segundo por decaimiento uniforme. )' }
        ],
        [
            { key: 'B55', des: 'Kilovoltio por metro' },
            { key: 'B79', des: 'Megavoltio por metro' },
            { key: 'C3', des: 'Microvoltios por metro' },
            { key: 'C30', des: 'Milivoltio por metro' },
            { key: 'D45', des: 'Voltio cuadrado por kelvin cuadrado' },
            { key: 'D47', des: 'Voltio por centímetro' },
            { key: 'D50', des: 'Voltio por metro (Es la intensidad de un campo elé…o con una cantidad de electricidad de 1 coulomb.)' },
            { key: 'D51', des: 'Voltio por milímetro' },
            { key: 'F87', des: 'Voltio por litro minuto' },
            { key: 'G60', des: 'Voltio por bar' },
            { key: 'H22', des: 'Voltio pulgada cuadrada por libra fuerza' },
            { key: 'H23', des: 'Voltio por pulgada' },
            { key: 'H24', des: 'Voltio por microsegundo' },
            { key: 'H45', des: 'Voltio segundo por metro' },
            { key: 'H46', des: 'Voltio por segundo' },
            { key: 'H62', des: 'Milivoltio por minuto' },
            { key: 'N98', des: 'Voltio por pascal (Unidad derivada del sistema int…idad derivada del sistema internacional, pascal.)' }
        ],
        [
            { key: 'A26', des: 'Culombio metro' }
        ],
        [
            { key: 'A5', des: 'Amperio metro cuadrado' }
        ],
        [
            { key: 'A98', des: 'Henry por metro' },
            { key: 'B91', des: 'Microhenry por metro' },
            { key: 'C44', des: 'Nanohenry por metro' }
        ],
        [
            { key: 'A69', des: 'Faradio por metro' },
            { key: 'B89', des: 'Microfaradio por metro' },
            { key: 'C42', des: 'Nanofaradio por metro' },
            { key: 'C72', des: 'Picofaradio por metro' },
            { key: 'H28', des: 'Microfaradio por kilómetro' },
            { key: 'H33', des: 'Faradio por kilómetro' }
        ],
        [
            { key: 'D46', des: 'Voltioio-amperio' },
            { key: 'KVA', des: 'Kilovoltio - amperio' },
            { key: 'M35', des: 'Milivoltio - amperio' },
            { key: 'MVA', des: 'Megavoltio - amperio' },
        ],
        [
            { key: 'D44', des: 'Var (El nombre de la unidad es un acrónimo de volt-amperio-reactive.)' },
            { key: 'K5', des: 'Kilovoltios amperios (reactivos) (Utilice kilovar (código común KVR))' },
            { key: 'KVR', des: 'Kilovar' },
            { key: 'MAR', des: "Megavar (Una unidad de potencia reactiva eléctrica representada por una corriente de mil amperios que fluye debido a una diferencia de potencial de mil voltios donde el seno del ángulo de fase entre ellos es 1.)" },
        ],
        [
            { key: 'C49', des: 'Nanowatt' },
            { key: 'C75', des: 'Picowatt' },
            { key: 'D31', des: 'Terawatt' },
            { key: 'K43', des: "Caballo de fuerza (eléctrico) (Es una unidad de medida de potencia (la velocidad a la que el trabajo se realiza).)" },
            { key: 'P14', des: "Joule por segundo (Cociente de la unidad derivada joule dividido entre la unidad base, segundo, ambas del sistema internacional.)" },
            { key: 'P15', des: "Joule por minuto (Cociente de la unidad derivada, joule, dividido entre la unidad minuto.)" },
            { key: 'P16', des: "Joule por hora (Cociente de la unidad derivada, joule, dividido entre la unidad hora.)" },
            { key: 'P17', des: 'Joule por día (Cociente de la unidad derivada, joule, dividido entre la unidad día.)' },
            { key: 'P18', des: "Kilojoule por segundo (Cociente entre 1000 veces de la unida derivada, joule, dividido por la unidad base segundo.)" },
            { key: 'P19', des: "Kilojoule por minuto (Cociente entre 1000 veces de la unida derivada, joule, dividido por la unidad minuto.)" },
            { key: 'P20', des: "Kilojoule por hora (Cociente entre 1000 veces de la unida derivada, joule, dividido por la unidad hora.)" },
            { key: 'P21', des: "Kilojoule por dia (Cociente entre 1000 veces de la unida derivada, joule, dividido por la unidad día)" },
        ],
        [
            { key: 'B56', des: 'Kiloweber por metro' },
            { key: 'D59', des: 'Weber por metro' },
            { key: 'D60', des: 'Weber por milímetro' },
        ],
        [
            { key: '2Z', des: 'Milivoltio' },
            { key: 'B78', des: 'Megavoltio' },
            { key: 'D82', des: 'Microvoltio' },
            { key: 'KVT', des: 'Kilovoltio' },
            { key: 'N99', des: 'Picovoltio (0.000 000 000 001 veces de la unidad derivada del sistema internacional, voltio.)' },
            { key: 'VLT', des: 'Voltio (Es la unidad derivada del Sistema Internac… la fuerza electromotriz y la tensión eléctrica.)' }
        ],
        [
            { key: 'C89', des: 'Henry recíproco' },
        ],
        [
            { key: 'A87', des: 'GigaOhm' },
            { key: 'B49', des: 'KiloOhm' },
            { key: 'B75', des: 'MegaOhm' },
            { key: 'B94', des: 'Micro Ohm' },
            { key: 'E45', des: 'MiliOhm' },
            { key: 'H44', des: 'TeraOhm' },
            { key: 'Ohm', des: "Ohm (es la resistencia eléctrica que existe entre dos puntos de un conductor cuando una diferencia de potencial constante de 1 volt aplicada entre estos dos puntos produce, en dicho conductor, una corriente de intensidad 1 amperio, cuando no haya fuerza electromotriz en el conductor. )" },
            { key: 'P22', des: 'NanoOhm (0.000 000 001 veces de la unidad derivada Ohm.)' }
        ],
        [
            { key: 'F54', des: 'MiliOhm por metro' },
            { key: 'F55', des: 'Ohm por milla (milla estatal)' },
            { key: 'F56', des: 'Ohm por kilómetro' },
            { key: 'H26', des: 'Ohm por metro' },
            { key: 'H37', des: 'MegaOhm por metro' }
        ],
        [
            { key: 'A88', des: 'GigaOhm metro' },
            { key: 'B50', des: 'KiloOhm metro' },
            { key: 'B76', des: 'MegaOhm metro' },
            { key: 'B95', des: 'MicroOhm metro' },
            { key: 'C23', des: 'MiliOhm metro' },
            { key: 'C46', des: '"NanoOhm metro' },
            { key: 'C60', des: 'Ohm centímetro' },
            { key: 'C61', des: 'Ohm metro' },
            { key: 'H88', des: 'MegaOhm kilómetro' },
            { key: 'M24', des: 'Ohm kilómetro' },
            { key: 'P23', des: 'Ohm circular-mil por pie (Unidad de resistividad.)' }
        ]
    ]
]

    var datos = [];
var objeto = {};
    const sat = {}
    let j = [];
    let k = [];


for(let i = 0; i< subtipos.length; i++){

    subtipos[i].forEach((sub) => {
        
         j.push({[sub.subtipo]: {data:  []}})
        
            //console.log({[sub.subtipo]: {data:  []}});
            
    
    });
    
}   

objeto.data = j;
var dictstring = JSON.stringify(objeto);
fs.writeFileSync("pruba.json", dictstring, function(err, result) {
    if (err) console.log('error', err);
});