/* ============================================================================
   StudyPOP — data.js
   Contenido REAL extraído de los sílabos UCSUR 2025:
     • Matemática I (MA-109-813863)
     • Física I para Ingeniería (FI-302)
     • Lengua y Comunicación (HUM-104-813853)
   Estructura: COURSES[].sessions[].nodes[] (mapa de prerrequisitos)
   Cada sesión incluye un banco de preguntas de fallback (sin necesitar API).
   ========================================================================== */

const COURSES = [
  /* ======================= MATEMÁTICA I ================================= */
  {
    id: "MATE01",
    code: "MA-109",
    name: "Matemática I",
    short: "Mate 1",
    tagline: "Funciones, límites y derivadas",
    icon: "function",
    accent: "#3b82f6",
    credits: 4,
    desc: "Cálculo y álgebra universitaria básica. Funciones, límites, continuidad y derivadas con sus aplicaciones.",
    sessions: [
      {
        id: "m1s1",
        week: "Semana 1",
        title: "El plano cartesiano y función lineal",
        module: "Módulo I — Funciones",
        intro: "Antes de modelar relaciones lineales necesitas dominar la ubicación de puntos en el plano y la noción de par ordenado.",
        nodes: [
          { id: "par-ordenado", label: "Par ordenado", x: 0, y: 0, desc: "Un par (x, y) ubica un punto en el plano. El orden importa: (2,3) ≠ (3,2).", resources: [
              { type: "video", label: "Plano cartesiano (Khan Academy)", url: "https://es.khanacademy.org/math/cc-sixth-grade-math/cc-6th-negative-number-topic/cc-6th-coordinate-plane/v/the-coordinate-plane" } ] },
          { id: "plano", label: "Plano cartesiano", x: 0, y: 0, desc: "Sistema de dos ejes perpendiculares (X horizontal, Y vertical) y sus cuatro cuadrantes.", resources: [
              { type: "video", label: "Cuadrantes del plano", url: "https://www.youtube.com/results?search_query=cuadrantes+plano+cartesiano" } ] },
          { id: "distancia", label: "Distancia entre dos puntos", x: 0, y: 0, desc: "d = √((x₂−x₁)² + (y₂−y₁)²). Derivada del teorema de Pitágoras.", resources: [
              { type: "video", label: "Fórmula de distancia", url: "https://www.youtube.com/results?search_query=distancia+entre+dos+puntos+formula" } ] },
          { id: "func-lineal", label: "Función lineal: dominio, rango, gráfica", x: 0, y: 0, desc: "y = mx + b. Pendiente m, intercepto b. Dominio y rango = todos los reales.", resources: [
              { type: "video", label: "Función lineal", url: "https://www.youtube.com/results?search_query=funcion+lineal+pendiente+intercepto" } ] }
        ],
        edges: [["par-ordenado","plano"],["plano","distancia"],["plano","func-lineal"]],
        bank: [
          { q: "¿Cuál es la distancia entre los puntos (1,2) y (4,6)?", a: ["5","7","√7","25"], correct: 0, expl: "d=√((4−1)²+(6−2)²)=√(9+16)=√25=5." },
          { q: "En la función y = 3x − 2, ¿cuál es la pendiente?", a: ["−2","3","2","1/3"], correct: 1, expl: "En y=mx+b, la pendiente es m=3." },
          { q: "¿En qué cuadrante se ubica el punto (−3, 5)?", a: ["I","II","III","IV"], correct: 1, expl: "x negativo y y positivo → segundo cuadrante." },
          { q: "El dominio de una función lineal y=mx+b es:", a: ["Solo positivos","Todos los reales","Solo enteros","[0,1]"], correct: 1, expl: "Una recta está definida para todo número real." },
          { q: "¿Cuál es el intercepto con el eje Y de y = 2x + 5?", a: ["2","−5","5","0"], correct: 2, expl: "El intercepto en Y es b=5 (cuando x=0)." },
          { q: "El par ordenado (0, 4) se ubica sobre:", a: ["El eje X","El eje Y","El origen","Cuadrante III"], correct: 1, expl: "Como x=0, el punto está sobre el eje Y." }
        ]
      },
      {
        id: "m1s2",
        week: "Semana 2-3",
        title: "Modelos lineales y función cuadrática",
        module: "Módulo I — Funciones",
        intro: "Aplicaciones de funciones lineales y la introducción a la parábola: dominio, rango y gráfica de la cuadrática.",
        nodes: [
          { id: "func-lineal2", label: "Función lineal", x: 0, y: 0, desc: "Base para los modelos lineales: relación entre dos variables con tasa de cambio constante.", resources: [
              { type: "video", label: "Repaso función lineal", url: "https://www.youtube.com/results?search_query=funcion+lineal" } ] },
          { id: "modelos-lin", label: "Modelos lineales", x: 0, y: 0, desc: "Aplicaciones: costo total, oferta/demanda, movimiento uniforme expresados como rectas.", resources: [
              { type: "video", label: "Modelos lineales aplicados", url: "https://www.youtube.com/results?search_query=modelos+lineales+aplicaciones" } ] },
          { id: "parabola", label: "Parábola", x: 0, y: 0, desc: "Curva de una función cuadrática. Tiene vértice, eje de simetría y abre hacia arriba o abajo.", resources: [
              { type: "video", label: "La parábola", url: "https://www.youtube.com/results?search_query=parabola+funcion+cuadratica" } ] },
          { id: "func-cuad", label: "Función cuadrática: dominio, rango, gráfica", x: 0, y: 0, desc: "y = ax² + bx + c. El signo de a define la concavidad; el vértice da el valor extremo.", resources: [
              { type: "video", label: "Función cuadrática", url: "https://www.youtube.com/results?search_query=funcion+cuadratica+vertice" } ] }
        ],
        edges: [["func-lineal2","modelos-lin"],["func-lineal2","func-cuad"],["parabola","func-cuad"]],
        bank: [
          { q: "En y = ax² + bx + c, si a > 0 la parábola:", a: ["Abre hacia abajo","Abre hacia arriba","Es una recta","No tiene vértice"], correct: 1, expl: "Con a>0 la parábola es cóncava hacia arriba (vértice mínimo)." },
          { q: "¿Cuál de estas es una función cuadrática?", a: ["y = 2x + 1","y = x² − 4","y = 3/x","y = √x"], correct: 1, expl: "El término x² la hace cuadrática." },
          { q: "El vértice de y = x² es el punto:", a: ["(1,1)","(0,0)","(0,1)","(−1,0)"], correct: 1, expl: "y=x² tiene su vértice en el origen (0,0)." },
          { q: "Un modelo lineal de costo C = 5x + 20. ¿Cuánto cuesta producir 10 unidades?", a: ["50","70","25","100"], correct: 1, expl: "C=5(10)+20=70." },
          { q: "El rango de y = x² (x real) es:", a: ["Todos los reales","y ≥ 0","y ≤ 0","Solo enteros"], correct: 1, expl: "x² nunca es negativo, así que y≥0." },
          { q: "La gráfica de una función cuadrática se llama:", a: ["Recta","Parábola","Hipérbola","Círculo"], correct: 1, expl: "La curva de ax²+bx+c es una parábola." }
        ]
      },
      {
        id: "m1s3",
        week: "Semana 6-8",
        title: "Funciones exponencial, logarítmica y trigonométricas",
        module: "Módulo I — Funciones",
        intro: "Familias de funciones clave para modelar crecimiento, decaimiento y fenómenos periódicos.",
        nodes: [
          { id: "potencias", label: "Potencias y radicales", x: 0, y: 0, desc: "Reglas de exponentes: aᵐ·aⁿ=aᵐ⁺ⁿ, base de las funciones exponenciales.", resources: [
              { type: "video", label: "Leyes de exponentes", url: "https://www.youtube.com/results?search_query=leyes+de+exponentes" } ] },
          { id: "exp-log", label: "Función exponencial y logaritmo", x: 0, y: 0, desc: "y=aˣ (crecimiento/decaimiento) y su inversa el logaritmo. Propiedades, dominio y rango.", resources: [
              { type: "video", label: "Exponencial y logaritmo", url: "https://www.youtube.com/results?search_query=funcion+exponencial+logaritmo" } ] },
          { id: "trig", label: "Funciones seno y coseno", x: 0, y: 0, desc: "Funciones periódicas con amplitud y periodo. Dominio real, rango [−1,1].", resources: [
              { type: "video", label: "Seno y coseno", url: "https://www.youtube.com/results?search_query=funcion+seno+coseno+grafica" } ] },
          { id: "inversa", label: "Función inversa", x: 0, y: 0, desc: "Deshace lo que hace la función original: f(f⁻¹(x))=x. Requiere función biyectiva.", resources: [
              { type: "video", label: "Función inversa", url: "https://www.youtube.com/results?search_query=funcion+inversa" } ] }
        ],
        edges: [["potencias","exp-log"],["exp-log","inversa"],["trig","inversa"]],
        bank: [
          { q: "El rango de la función y = sen(x) es:", a: ["[0,1]","[−1,1]","Todos los reales","[−π,π]"], correct: 1, expl: "El seno oscila entre −1 y 1." },
          { q: "¿Cuál es la inversa de la función exponencial y = aˣ?", a: ["Otra exponencial","El logaritmo","La raíz cuadrada","El seno"], correct: 1, expl: "El logaritmo en base a es la inversa de aˣ." },
          { q: "log₂(8) = ?", a: ["2","3","4","8"], correct: 1, expl: "2³=8, por lo tanto log₂(8)=3." },
          { q: "Simplifica: 2³ · 2²", a: ["2⁵","2⁶","4⁵","8"], correct: 0, expl: "aᵐ·aⁿ=aᵐ⁺ⁿ → 2³⁺²=2⁵." },
          { q: "El dominio de y = log(x) es:", a: ["x > 0","Todos los reales","x ≥ 0","x < 0"], correct: 0, expl: "El logaritmo solo está definido para x>0." },
          { q: "El periodo de la función coseno es:", a: ["π","2π","1","π/2"], correct: 1, expl: "El coseno se repite cada 2π." }
        ]
      },
      {
        id: "m1s4",
        week: "Semana 9-10",
        title: "Límites y continuidad",
        module: "Módulo II — Límites y continuidad",
        intro: "El concepto que abre el cálculo: a qué valor se acerca una función. Necesitas la intuición de funciones y su comportamiento.",
        nodes: [
          { id: "func-comp", label: "Comportamiento de funciones", x: 0, y: 0, desc: "Cómo crece o decrece una función al acercarse a un valor o al infinito.", resources: [
              { type: "video", label: "Comportamiento de funciones", url: "https://www.youtube.com/results?search_query=comportamiento+funciones" } ] },
          { id: "limite", label: "Límite y límites laterales", x: 0, y: 0, desc: "El valor al que tiende f(x) cuando x se acerca a un punto, por izquierda y por derecha.", resources: [
              { type: "video", label: "Introducción a límites", url: "https://www.youtube.com/results?search_query=introduccion+limites+calculo" } ] },
          { id: "continuidad", label: "Continuidad", x: 0, y: 0, desc: "Una función es continua si no tiene saltos, huecos ni asíntotas en el punto.", resources: [
              { type: "video", label: "Continuidad de funciones", url: "https://www.youtube.com/results?search_query=continuidad+de+funciones" } ] },
          { id: "asintotas", label: "Asíntotas", x: 0, y: 0, desc: "Rectas a las que la gráfica se acerca sin tocar: horizontales, verticales y oblicuas.", resources: [
              { type: "video", label: "Asíntotas", url: "https://www.youtube.com/results?search_query=asintotas+horizontales+verticales" } ] }
        ],
        edges: [["func-comp","limite"],["limite","continuidad"],["limite","asintotas"]],
        bank: [
          { q: "El límite de f(x)=2x cuando x→3 es:", a: ["2","3","6","0"], correct: 2, expl: "Sustituyendo: 2(3)=6." },
          { q: "Una función es continua en un punto si NO tiene:", a: ["Pendiente","Saltos o huecos","Dominio","Rango"], correct: 1, expl: "La continuidad implica ausencia de saltos, huecos o asíntotas." },
          { q: "Una asíntota vertical aparece cuando el denominador:", a: ["Es 1","Se hace cero","Es negativo","Crece"], correct: 1, expl: "Cuando el denominador tiende a 0 la función tiende a ±∞." },
          { q: "Los límites laterales evalúan la función:", a: ["Solo por la derecha","Por izquierda y derecha","En el infinito","En el origen"], correct: 1, expl: "Se analiza x→a⁻ (izquierda) y x→a⁺ (derecha)." },
          { q: "El límite cuando x→∞ de 1/x es:", a: ["∞","1","0","−1"], correct: 2, expl: "Al crecer x, 1/x se acerca a 0." },
          { q: "Si los límites laterales son distintos, el límite:", a: ["Existe","No existe","Es 0","Es infinito"], correct: 1, expl: "Para que exista el límite, ambos laterales deben coincidir." }
        ]
      },
      {
        id: "m1s5",
        week: "Semana 11-16",
        title: "La derivada y sus aplicaciones",
        module: "Módulo III — Derivadas",
        intro: "Tasa de cambio instantánea. Necesitas dominar límites y la noción de recta tangente.",
        nodes: [
          { id: "recta-tan", label: "Recta tangente", x: 0, y: 0, desc: "Recta que toca la curva en un punto; su pendiente es la derivada en ese punto.", resources: [
              { type: "video", label: "Recta tangente", url: "https://www.youtube.com/results?search_query=recta+tangente+derivada" } ] },
          { id: "derivada", label: "La derivada", x: 0, y: 0, desc: "Límite del cociente incremental. Mide la razón de cambio instantánea de una función.", resources: [
              { type: "video", label: "Definición de derivada", url: "https://www.youtube.com/results?search_query=definicion+derivada" } ] },
          { id: "reglas", label: "Reglas y regla de la cadena", x: 0, y: 0, desc: "Fórmulas de derivación: potencia, producto, cociente y composición (cadena).", resources: [
              { type: "video", label: "Reglas de derivación", url: "https://www.youtube.com/results?search_query=reglas+de+derivacion+cadena" } ] },
          { id: "optim", label: "Optimización", x: 0, y: 0, desc: "Usar derivadas para hallar máximos y mínimos: puntos críticos y criterio de la 2ª derivada.", resources: [
              { type: "video", label: "Problemas de optimización", url: "https://www.youtube.com/results?search_query=optimizacion+derivadas" } ] }
        ],
        edges: [["recta-tan","derivada"],["derivada","reglas"],["reglas","optim"]],
        bank: [
          { q: "La derivada de f(x)=x² es:", a: ["x","2x","x³","2"], correct: 1, expl: "Por la regla de la potencia: d/dx(xⁿ)=n·xⁿ⁻¹ → 2x." },
          { q: "La derivada representa geométricamente:", a: ["El área","La pendiente de la recta tangente","El intercepto","El dominio"], correct: 1, expl: "f'(x) es la pendiente de la tangente en ese punto." },
          { q: "La derivada de una constante (ej. f(x)=7) es:", a: ["7","1","0","x"], correct: 2, expl: "La derivada de cualquier constante es 0." },
          { q: "La derivada de f(x)=5x es:", a: ["5","5x","0","x"], correct: 0, expl: "d/dx(5x)=5." },
          { q: "En un máximo de una función, la derivada vale:", a: ["Infinito","Cero","Uno","Negativa siempre"], correct: 1, expl: "En máximos y mínimos la derivada (pendiente) es 0." },
          { q: "La regla de la cadena se usa para derivar:", a: ["Sumas","Funciones compuestas","Constantes","Rectas"], correct: 1, expl: "La cadena deriva composiciones f(g(x))." }
        ]
      }
    ]
  },

  /* ======================= FÍSICA I ===================================== */
  {
    id: "FIS01",
    code: "FI-302",
    name: "Física I para Ingeniería",
    short: "Física 1",
    tagline: "Mecánica clásica",
    icon: "atom",
    accent: "#f97316",
    credits: 3,
    desc: "Vectores, cinemática, leyes de Newton, trabajo y energía, y fluidos. Las bases físicas de la ingeniería.",
    sessions: [
      {
        id: "f1s1",
        week: "Semana 1-2",
        title: "Magnitudes, notación científica y vectores",
        module: "Módulo I — Introducción",
        intro: "Todo en física empieza por medir bien y representar magnitudes con dirección. Necesitas el SI y operaciones con vectores.",
        nodes: [
          { id: "magnitudes", label: "Magnitudes físicas y SI", x: 0, y: 0, desc: "Cantidades medibles (longitud, masa, tiempo) y sus unidades del Sistema Internacional.", resources: [
              { type: "video", label: "Magnitudes y SI", url: "https://www.youtube.com/results?search_query=magnitudes+fisicas+sistema+internacional" } ] },
          { id: "notacion", label: "Notación científica", x: 0, y: 0, desc: "Expresar números muy grandes o pequeños como a×10ⁿ. Esencial para cálculos físicos.", resources: [
              { type: "video", label: "Notación científica", url: "https://www.youtube.com/results?search_query=notacion+cientifica" } ] },
          { id: "vectores", label: "Vectores y sus operaciones", x: 0, y: 0, desc: "Magnitudes con módulo y dirección. Suma, resta y multiplicación por escalar.", resources: [
              { type: "video", label: "Vectores", url: "https://www.youtube.com/results?search_query=vectores+fisica+operaciones" } ] },
          { id: "componentes", label: "Componentes de un vector", x: 0, y: 0, desc: "Descomponer un vector en sus proyecciones X e Y usando trigonometría (sen, cos).", resources: [
              { type: "video", label: "Componentes de un vector", url: "https://www.youtube.com/results?search_query=componentes+de+un+vector" } ] }
        ],
        edges: [["magnitudes","notacion"],["magnitudes","vectores"],["vectores","componentes"]],
        bank: [
          { q: "¿Cuál es la unidad de masa en el SI?", a: ["Gramo","Kilogramo","Libra","Newton"], correct: 1, expl: "La unidad base de masa en el SI es el kilogramo (kg)." },
          { q: "300 000 en notación científica es:", a: ["3×10⁵","3×10⁴","30×10⁴","3×10⁶"], correct: 0, expl: "300000 = 3×10⁵." },
          { q: "Un vector se caracteriza por tener:", a: ["Solo módulo","Módulo y dirección","Solo dirección","Ningún valor"], correct: 1, expl: "Un vector tiene magnitud (módulo) y dirección." },
          { q: "Las componentes de un vector se hallan usando:", a: ["Logaritmos","Trigonometría (sen, cos)","Derivadas","Integrales"], correct: 1, expl: "Vx=V·cosθ y Vy=V·senθ." },
          { q: "¿Cuál es una magnitud vectorial?", a: ["Temperatura","Masa","Velocidad","Tiempo"], correct: 2, expl: "La velocidad tiene dirección; las demás son escalares." },
          { q: "0.0005 en notación científica es:", a: ["5×10³","5×10⁻⁴","5×10⁻³","5×10⁴"], correct: 1, expl: "0.0005 = 5×10⁻⁴." }
        ]
      },
      {
        id: "f1s2",
        week: "Semana 3-4",
        title: "Cinemática 1D: MRU, MRUV y caída libre",
        module: "Módulo II — Cinemática",
        intro: "Describir el movimiento en línea recta. Necesitas vectores y la relación entre posición, velocidad y aceleración.",
        nodes: [
          { id: "vectores2", label: "Vectores", x: 0, y: 0, desc: "Repaso: el movimiento se describe con vectores de posición, velocidad y aceleración.", resources: [
              { type: "video", label: "Vectores en cinemática", url: "https://www.youtube.com/results?search_query=vectores+cinematica" } ] },
          { id: "mru", label: "MRU", x: 0, y: 0, desc: "Movimiento Rectilíneo Uniforme: velocidad constante, x = x₀ + v·t.", resources: [
              { type: "video", label: "MRU", url: "https://www.youtube.com/results?search_query=movimiento+rectilineo+uniforme+MRU" } ] },
          { id: "mruv", label: "MRUV", x: 0, y: 0, desc: "Movimiento con aceleración constante: v = v₀ + a·t, x = x₀ + v₀t + ½at².", resources: [
              { type: "video", label: "MRUV", url: "https://www.youtube.com/results?search_query=MRUV+aceleracion+constante" } ] },
          { id: "caida", label: "Caída libre", x: 0, y: 0, desc: "MRUV vertical con a = g ≈ 9.8 m/s². Movimiento bajo gravedad sin resistencia del aire.", resources: [
              { type: "video", label: "Caída libre", url: "https://www.youtube.com/results?search_query=caida+libre+gravedad" } ] }
        ],
        edges: [["vectores2","mru"],["mru","mruv"],["mruv","caida"]],
        bank: [
          { q: "En el MRU la velocidad es:", a: ["Variable","Constante","Cero","Negativa"], correct: 1, expl: "Por definición el MRU tiene velocidad constante (a=0)." },
          { q: "En caída libre, la aceleración vale aproximadamente:", a: ["1 m/s²","9.8 m/s²","100 m/s²","0 m/s²"], correct: 1, expl: "g ≈ 9.8 m/s² hacia abajo." },
          { q: "Fórmula de la velocidad en MRUV:", a: ["v = x/t","v = v₀ + at","v = at²","v = mg"], correct: 1, expl: "En MRUV: v = v₀ + a·t." },
          { q: "Un auto recorre 100 m en 5 s a velocidad constante. Su rapidez es:", a: ["20 m/s","500 m/s","5 m/s","100 m/s"], correct: 0, expl: "v = d/t = 100/5 = 20 m/s." },
          { q: "El MRUV se caracteriza por una aceleración:", a: ["Variable","Constante","Nula","Infinita"], correct: 1, expl: "MRUV = aceleración constante distinta de cero." },
          { q: "Un objeto soltado desde reposo en caída libre, tras 1 s su velocidad es ≈:", a: ["0 m/s","9.8 m/s","19.6 m/s","1 m/s"], correct: 1, expl: "v=gt=9.8(1)=9.8 m/s." }
        ]
      },
      {
        id: "f1s3",
        week: "Semana 5-6",
        title: "Cinemática 2D: movimiento parabólico y circular",
        module: "Módulo II — Cinemática",
        intro: "El movimiento en el plano combina componentes. Necesitas trigonometría y descomposición de vectores.",
        nodes: [
          { id: "trig2", label: "Trigonometría básica", x: 0, y: 0, desc: "Seno, coseno y tangente para descomponer velocidades en X e Y.", resources: [
              { type: "video", label: "Trigonometría básica", url: "https://www.youtube.com/results?search_query=trigonometria+basica+seno+coseno" } ] },
          { id: "comp-vel", label: "Componentes de velocidad", x: 0, y: 0, desc: "Vx = v·cosθ, Vy = v·senθ. La base del tiro parabólico.", resources: [
              { type: "video", label: "Componentes de velocidad", url: "https://www.youtube.com/results?search_query=componentes+velocidad+tiro+parabolico" } ] },
          { id: "parabolico", label: "Movimiento parabólico", x: 0, y: 0, desc: "Combina MRU horizontal y MRUV vertical (gravedad). Trayectoria de parábola.", resources: [
              { type: "video", label: "Movimiento parabólico", url: "https://www.youtube.com/results?search_query=movimiento+parabolico" } ] },
          { id: "circular", label: "Movimiento circular", x: 0, y: 0, desc: "Movimiento sobre una circunferencia con velocidad angular y aceleración centrípeta.", resources: [
              { type: "video", label: "Movimiento circular", url: "https://www.youtube.com/results?search_query=movimiento+circular+uniforme" } ] }
        ],
        edges: [["trig2","comp-vel"],["comp-vel","parabolico"],["comp-vel","circular"]],
        bank: [
          { q: "El movimiento parabólico combina:", a: ["Dos MRU","MRU horizontal y MRUV vertical","Dos MRUV verticales","Solo caída libre"], correct: 1, expl: "Horizontal: MRU; vertical: MRUV por gravedad." },
          { q: "La componente horizontal de la velocidad en tiro parabólico (sin aire):", a: ["Aumenta","Disminuye","Es constante","Es cero"], correct: 2, expl: "No hay aceleración horizontal, Vx se mantiene constante." },
          { q: "Si v=10 m/s y θ=30°, Vx = v·cos30° ≈:", a: ["5 m/s","8.7 m/s","10 m/s","0 m/s"], correct: 1, expl: "10·cos30°=10·0.866≈8.7 m/s." },
          { q: "La aceleración en el movimiento circular uniforme apunta:", a: ["Hacia afuera","Hacia el centro","En la dirección del movimiento","Hacia arriba"], correct: 1, expl: "La aceleración centrípeta apunta al centro." },
          { q: "En el punto más alto de un tiro parabólico, Vy vale:", a: ["Máxima","Cero","Igual a Vx","Negativa máxima"], correct: 1, expl: "En la cima la velocidad vertical es 0." },
          { q: "Vy en tiro parabólico se calcula con:", a: ["v·cosθ","v·senθ","v·tanθ","v/θ"], correct: 1, expl: "La componente vertical es Vy=v·senθ." }
        ]
      },
      {
        id: "f1s4",
        week: "Semana 7-9",
        title: "Leyes de Newton, equilibrio y dinámica",
        module: "Módulo III — Leyes de Newton",
        intro: "Por qué se mueven los cuerpos. Necesitas el concepto de fuerza como vector y el diagrama de cuerpo libre.",
        nodes: [
          { id: "fuerza", label: "Fuerza (vector)", x: 0, y: 0, desc: "Interacción que puede cambiar el movimiento. Es un vector: módulo y dirección.", resources: [
              { type: "video", label: "Concepto de fuerza", url: "https://www.youtube.com/results?search_query=fuerza+fisica+vector" } ] },
          { id: "leyes", label: "Leyes de Newton", x: 0, y: 0, desc: "1ª inercia, 2ª F=ma, 3ª acción-reacción. Base de toda la dinámica.", resources: [
              { type: "video", label: "Leyes de Newton", url: "https://www.youtube.com/results?search_query=tres+leyes+de+newton" } ] },
          { id: "equilibrio", label: "Equilibrio de partícula", x: 0, y: 0, desc: "ΣF = 0: cuando las fuerzas se cancelan, el cuerpo está en reposo o velocidad constante.", resources: [
              { type: "video", label: "Equilibrio de partícula", url: "https://www.youtube.com/results?search_query=equilibrio+de+una+particula" } ] },
          { id: "friccion", label: "Fricción", x: 0, y: 0, desc: "Fuerza que se opone al movimiento entre superficies: f = μ·N.", resources: [
              { type: "video", label: "Fuerza de fricción", url: "https://www.youtube.com/results?search_query=fuerza+de+friccion" } ] }
        ],
        edges: [["fuerza","leyes"],["leyes","equilibrio"],["leyes","friccion"]],
        bank: [
          { q: "La segunda ley de Newton se expresa como:", a: ["F = mv","F = ma","F = mgh","F = ½mv²"], correct: 1, expl: "Fuerza = masa × aceleración." },
          { q: "La primera ley de Newton se conoce como ley de:", a: ["Gravedad","Inercia","Acción-reacción","Hooke"], correct: 1, expl: "La 1ª ley es el principio de inercia." },
          { q: "Un cuerpo está en equilibrio cuando la suma de fuerzas es:", a: ["Máxima","Cero","Negativa","Variable"], correct: 1, expl: "ΣF=0 implica equilibrio." },
          { q: "Si m=2 kg y a=3 m/s², la fuerza es:", a: ["5 N","6 N","1.5 N","9 N"], correct: 1, expl: "F=ma=2·3=6 N." },
          { q: "La fuerza de fricción se calcula como:", a: ["μ·N","m·g·h","½mv²","v/t"], correct: 0, expl: "f = μ·N (coef. de fricción × normal)." },
          { q: "Por cada acción hay una reacción igual y opuesta. Esta es la ley:", a: ["Primera","Segunda","Tercera","De Hooke"], correct: 2, expl: "Es la tercera ley de Newton." }
        ]
      },
      {
        id: "f1s5",
        week: "Semana 10-15",
        title: "Trabajo, energía y fluidos",
        module: "Módulos IV y V",
        intro: "Conservación de la energía y comportamiento de fluidos. Necesitas las leyes de Newton y el concepto de fuerza.",
        nodes: [
          { id: "trabajo", label: "Trabajo", x: 0, y: 0, desc: "W = F·d·cosθ. Energía transferida cuando una fuerza desplaza un cuerpo.", resources: [
              { type: "video", label: "Trabajo en física", url: "https://www.youtube.com/results?search_query=trabajo+fisica+fuerza+distancia" } ] },
          { id: "energia", label: "Energía cinética y potencial", x: 0, y: 0, desc: "Ec = ½mv² (movimiento), Ep = mgh (posición). Energía mecánica = Ec + Ep.", resources: [
              { type: "video", label: "Energía mecánica", url: "https://www.youtube.com/results?search_query=energia+cinetica+potencial" } ] },
          { id: "conserv", label: "Conservación de la energía", x: 0, y: 0, desc: "La energía mecánica total se conserva si solo actúan fuerzas conservativas.", resources: [
              { type: "video", label: "Conservación de energía", url: "https://www.youtube.com/results?search_query=conservacion+de+la+energia+mecanica" } ] },
          { id: "fluidos", label: "Fluidos: presión y Bernoulli", x: 0, y: 0, desc: "Densidad, presión, principios de Pascal, Arquímedes y la ecuación de Bernoulli.", resources: [
              { type: "video", label: "Mecánica de fluidos", url: "https://www.youtube.com/results?search_query=presion+fluidos+bernoulli+arquimedes" } ] }
        ],
        edges: [["trabajo","energia"],["energia","conserv"],["conserv","fluidos"]],
        bank: [
          { q: "La energía cinética se calcula como:", a: ["mgh","½mv²","F·d","μN"], correct: 1, expl: "Ec = ½mv²." },
          { q: "La energía potencial gravitatoria es:", a: ["½mv²","mgh","F·d·cosθ","P·V"], correct: 1, expl: "Ep = mgh." },
          { q: "El trabajo de una fuerza se calcula como:", a: ["F·d·cosθ","m·a","½mv²","ρ·g·h"], correct: 0, expl: "W = F·d·cosθ." },
          { q: "El principio de Arquímedes se relaciona con:", a: ["La fricción","El empuje en fluidos","La inercia","La energía cinética"], correct: 1, expl: "Arquímedes describe el empuje (flotación)." },
          { q: "La unidad de trabajo y energía en el SI es:", a: ["Newton","Joule","Watt","Pascal"], correct: 1, expl: "Trabajo y energía se miden en Joules (J)." },
          { q: "Si solo hay fuerzas conservativas, la energía mecánica total:", a: ["Aumenta","Disminuye","Se conserva","Se anula"], correct: 2, expl: "Sin fricción, Ec+Ep se mantiene constante." }
        ]
      }
    ]
  },

  /* ======================= LENGUA Y COMUNICACIÓN ======================== */
  {
    id: "LENG01",
    code: "HUM-104",
    name: "Lengua y Comunicación",
    short: "Lengua",
    tagline: "Comunicación y redacción académica",
    icon: "pen",
    accent: "#f59e0b",
    credits: 4,
    desc: "Exposición académica, comentario crítico, redacción académica y la monografía como investigación científica con normas APA 7.",
    sessions: [
      {
        id: "l1s1",
        week: "Semana 1-5",
        title: "Lengua, comprensión lectora y exposición académica",
        module: "Módulo I — Exposición académica",
        intro: "Las bases de la comunicación. Necesitas distinguir lengua/habla y manejar técnicas de comprensión lectora.",
        nodes: [
          { id: "lengua-habla", label: "Lengua, dialecto y habla", x: 0, y: 0, desc: "Lengua = sistema; habla = uso individual; dialecto = variedad regional. Conceptos base.", resources: [
              { type: "video", label: "Lengua, dialecto y habla", url: "https://www.youtube.com/results?search_query=lengua+dialecto+habla" } ] },
          { id: "comp-lectora", label: "Comprensión lectora: niveles", x: 0, y: 0, desc: "Niveles literal, inferencial y crítico. Técnicas de subrayado y sumillado.", resources: [
              { type: "video", label: "Niveles de comprensión lectora", url: "https://www.youtube.com/results?search_query=niveles+comprension+lectora" } ] },
          { id: "exp-verbal", label: "Exposición: comunicación verbal", x: 0, y: 0, desc: "Uso de la voz, claridad, estructura del discurso oral académico.", resources: [
              { type: "video", label: "Comunicación verbal", url: "https://www.youtube.com/results?search_query=comunicacion+verbal+exposicion" } ] },
          { id: "exp-noverbal", label: "Exposición: comunicación no verbal", x: 0, y: 0, desc: "Postura, gestos, contacto visual y apoyo visual en la exposición.", resources: [
              { type: "video", label: "Comunicación no verbal", url: "https://www.youtube.com/results?search_query=comunicacion+no+verbal" } ] }
        ],
        edges: [["lengua-habla","comp-lectora"],["comp-lectora","exp-verbal"],["exp-verbal","exp-noverbal"]],
        bank: [
          { q: "La 'lengua' se refiere a:", a: ["El uso individual","El sistema compartido por una comunidad","Un gesto","Un acento regional"], correct: 1, expl: "La lengua es el sistema; el habla es su uso individual." },
          { q: "El nivel de comprensión que extrae información explícita del texto es:", a: ["Literal","Inferencial","Crítico","Creativo"], correct: 0, expl: "El nivel literal recupera lo que el texto dice directamente." },
          { q: "El contacto visual y los gestos son parte de la comunicación:", a: ["Verbal","No verbal","Escrita","Digital"], correct: 1, expl: "Gestos, postura y mirada son comunicación no verbal." },
          { q: "Una variedad regional de una lengua se llama:", a: ["Habla","Dialecto","Idiolecto","Norma"], correct: 1, expl: "El dialecto es la variedad geográfica de una lengua." },
          { q: "Deducir información NO explícita en el texto corresponde al nivel:", a: ["Literal","Inferencial","Fonético","Ortográfico"], correct: 1, expl: "El nivel inferencial deduce lo implícito." },
          { q: "Una buena exposición académica oral requiere:", a: ["Leer todo de memoria sin mirar","Claridad, estructura y apoyo visual","Hablar muy rápido","Evitar el contacto visual"], correct: 1, expl: "Claridad, estructura y recursos visuales fortalecen la exposición." }
        ]
      },
      {
        id: "l1s2",
        week: "Semana 6-8",
        title: "Comentario crítico y análisis textual",
        module: "Módulo II — Comentario crítico",
        intro: "Evaluar y contrastar fuentes. Necesitas comprensión lectora avanzada y la noción de tesis y argumento.",
        nodes: [
          { id: "contraste", label: "Contraste de información", x: 0, y: 0, desc: "Comparar fuentes, detectar acuerdos, contradicciones y sesgos entre textos.", resources: [
              { type: "video", label: "Contraste de fuentes", url: "https://www.youtube.com/results?search_query=contraste+de+informacion+fuentes" } ] },
          { id: "tesis", label: "Tesis y argumentos", x: 0, y: 0, desc: "La tesis es la idea principal a defender; los argumentos la sostienen con razones.", resources: [
              { type: "video", label: "Tesis y argumentos", url: "https://www.youtube.com/results?search_query=tesis+y+argumentos" } ] },
          { id: "analisis", label: "Análisis textual", x: 0, y: 0, desc: "Identificar estructura, propósito, ideas principales y secundarias de un texto.", resources: [
              { type: "video", label: "Análisis textual", url: "https://www.youtube.com/results?search_query=analisis+textual" } ] },
          { id: "comentario", label: "Comentario crítico", x: 0, y: 0, desc: "Texto que valora una fuente con criterio propio fundamentado, no solo resumen.", resources: [
              { type: "video", label: "Comentario crítico", url: "https://www.youtube.com/results?search_query=comentario+critico+texto" } ] }
        ],
        edges: [["contraste","analisis"],["tesis","comentario"],["analisis","comentario"]],
        bank: [
          { q: "La tesis de un texto argumentativo es:", a: ["Un ejemplo","La idea principal que se defiende","Una cita","El título"], correct: 1, expl: "La tesis es la postura central que se sostiene." },
          { q: "Un comentario crítico se diferencia del resumen porque:", a: ["Es más corto","Incluye una valoración fundamentada","No usa fuentes","Solo copia el texto"], correct: 1, expl: "El comentario crítico evalúa, no solo reproduce." },
          { q: "Contrastar información implica:", a: ["Aceptar una sola fuente","Comparar varias fuentes","Ignorar contradicciones","Copiar textual"], correct: 1, expl: "Contrastar es comparar y evaluar varias fuentes." },
          { q: "Los argumentos sirven para:", a: ["Adornar","Sostener la tesis","Confundir","Resumir"], correct: 1, expl: "Los argumentos respaldan la tesis con razones." },
          { q: "El análisis textual busca identificar:", a: ["Solo errores ortográficos","Estructura, propósito e ideas","El número de palabras","El color del texto"], correct: 1, expl: "Analizar es reconocer estructura, propósito e ideas." },
          { q: "Detectar el sesgo de una fuente es parte de:", a: ["La paráfrasis","El contraste de información","La cita textual","La portada"], correct: 1, expl: "Evaluar sesgos pertenece al contraste de fuentes." }
        ]
      },
      {
        id: "l1s3",
        week: "Semana 9-12",
        title: "Propiedades de redacción y párrafos académicos",
        module: "Módulo III — Redacción preliminar",
        intro: "Escribir bien capítulos académicos. Necesitas coherencia, cohesión y los tipos de párrafo.",
        nodes: [
          { id: "coherencia", label: "Coherencia", x: 0, y: 0, desc: "Las ideas se conectan con lógica y mantienen un hilo conductor claro.", resources: [
              { type: "video", label: "Coherencia textual", url: "https://www.youtube.com/results?search_query=coherencia+textual" } ] },
          { id: "cohesion", label: "Cohesión y conectores", x: 0, y: 0, desc: "Conectores y referencias unen las oraciones: 'además', 'sin embargo', 'por lo tanto'.", resources: [
              { type: "video", label: "Cohesión y conectores", url: "https://www.youtube.com/results?search_query=cohesion+conectores+logicos" } ] },
          { id: "parrafo", label: "Tipos de párrafo", x: 0, y: 0, desc: "Enumerativo, comparativo y estadístico, según la estrategia de redacción.", resources: [
              { type: "video", label: "Tipos de párrafo", url: "https://www.youtube.com/results?search_query=tipos+de+parrafo+academico" } ] },
          { id: "redaccion", label: "Propiedades de redacción", x: 0, y: 0, desc: "Claridad, precisión, concisión y corrección de un texto académico.", resources: [
              { type: "video", label: "Propiedades de la redacción", url: "https://www.youtube.com/results?search_query=propiedades+de+la+redaccion" } ] }
        ],
        edges: [["coherencia","cohesion"],["cohesion","parrafo"],["parrafo","redaccion"]],
        bank: [
          { q: "La cohesión textual se logra principalmente con:", a: ["Conectores y referencias","Más páginas","Mayúsculas","Negritas"], correct: 0, expl: "Conectores y referencias unen las oraciones." },
          { q: "Un texto coherente se caracteriza por:", a: ["Ideas conectadas con lógica","Muchas palabras difíciles","Frases sin relación","Repetir todo"], correct: 0, expl: "La coherencia da un hilo lógico al texto." },
          { q: "El conector 'sin embargo' expresa:", a: ["Adición","Contraste","Causa","Ejemplo"], correct: 1, expl: "'Sin embargo' indica oposición/contraste." },
          { q: "Un párrafo que presenta datos numéricos es:", a: ["Enumerativo","Comparativo","Estadístico","Narrativo"], correct: 2, expl: "El párrafo estadístico usa datos y cifras." },
          { q: "'Por lo tanto' es un conector de:", a: ["Consecuencia","Adición","Tiempo","Duda"], correct: 0, expl: "'Por lo tanto' introduce una consecuencia." },
          { q: "La concisión en la redacción significa:", a: ["Escribir mucho","Expresar con las palabras justas","Usar tecnicismos","Repetir ideas"], correct: 1, expl: "Concisión = decir lo necesario sin rodeos." }
        ]
      },
      {
        id: "l1s4",
        week: "Semana 13-16",
        title: "La monografía y las normas APA 7",
        module: "Módulo IV — Monografía científica",
        intro: "El producto final del curso. Necesitas dominar citas APA, paráfrasis y la estructura de la monografía.",
        nodes: [
          { id: "parafrasis", label: "Paráfrasis y resumen", x: 0, y: 0, desc: "Reformular ideas de una fuente con palabras propias sin alterar el sentido.", resources: [
              { type: "video", label: "Paráfrasis y resumen", url: "https://www.youtube.com/results?search_query=parafrasis+y+resumen" } ] },
          { id: "apa", label: "Normas APA 7", x: 0, y: 0, desc: "Formato de citas y referencias: (Autor, año) en el texto y lista de referencias al final.", resources: [
              { type: "video", label: "Normas APA 7", url: "https://www.youtube.com/results?search_query=normas+apa+7+citas" } ] },
          { id: "estructura", label: "Estructura de la monografía", x: 0, y: 0, desc: "Introducción, capítulos (desarrollo), conclusiones y referencias.", resources: [
              { type: "video", label: "Estructura de monografía", url: "https://www.youtube.com/results?search_query=estructura+de+una+monografia" } ] },
          { id: "introduccion", label: "Introducción y conclusión", x: 0, y: 0, desc: "La introducción presenta el tema y objetivos; la conclusión sintetiza hallazgos.", resources: [
              { type: "video", label: "Introducción y conclusión", url: "https://www.youtube.com/results?search_query=introduccion+conclusion+monografia" } ] }
        ],
        edges: [["parafrasis","apa"],["apa","estructura"],["estructura","introduccion"]],
        bank: [
          { q: "Una cita en formato APA 7 dentro del texto incluye:", a: ["Solo el título","(Autor, año)","El número de página solamente","Nada"], correct: 1, expl: "APA usa el formato (Autor, año) en el texto." },
          { q: "Parafrasear significa:", a: ["Copiar textualmente","Reformular con palabras propias","Inventar datos","Traducir"], correct: 1, expl: "La paráfrasis reexpresa la idea sin copiar." },
          { q: "La parte de la monografía que sintetiza los hallazgos es:", a: ["La introducción","La conclusión","La portada","El índice"], correct: 1, expl: "La conclusión sintetiza los resultados del trabajo." },
          { q: "Las referencias APA se ubican:", a: ["Al inicio","Al final del documento","En cada página","En el título"], correct: 1, expl: "La lista de referencias va al final, ordenada alfabéticamente." },
          { q: "La introducción de una monografía debe:", a: ["Dar las conclusiones","Presentar el tema y objetivos","Incluir solo citas","Repetir el título"], correct: 1, expl: "La introducción contextualiza el tema y plantea objetivos." },
          { q: "Citar correctamente las fuentes evita:", a: ["La coherencia","El plagio","La cohesión","La paráfrasis"], correct: 1, expl: "Citar las fuentes evita el plagio académico." }
        ]
      }
    ]
  }
];

/* Usuarios ficticios para el ranking simulado (nombres tipo cachimbos UCSUR) */
const FAKE_USERS = [
  { name: "Gina.exe777",        pts: 1380 },
  { name: "Sebas_tian0",      pts: 1050 },
  { name: "Lu0_404",         pts: 890  },
  { name: "Mafe.Overflow",   pts: 740  },
  { name: "Elsa_ncudo",   pts: 610  },
  { name: "Humbby.jpg",      pts: 480  },
  { name: "Paw_ctrl_z",      pts: 355  },
  { name: "Melichacha99",    pts: 270  },
  { name: "Chris_Debugging", pts: 185  },
  { name: "Jime.undefined",  pts: 140  },
  { name: "Kenneth_Prro",    pts: 100  },
  { name: "Fabri_NaN",       pts:  75  },
  { name: "Eunice.sudo",     pts:  45  },
  { name: "Sofi_git_push",   pts:  20  }
];

/* Sistema de ligas */
const LEAGUES = [
  { name: "Bronce",  min: 0,    color: "#c2702f", glow: "#f97316", dots: 3, emoji: "🟤" },
  { name: "Plata",   min: 100,  color: "#d7dbe0", glow: "#ffffff", dots: 4, emoji: "⚪" },
  { name: "Oro",     min: 300,  color: "#f5c544", glow: "#f59e0b", dots: 5, emoji: "🟡" },
  { name: "Platino", min: 600,  color: "#38bdf8", glow: "#3b82f6", dots: 6, emoji: "🔵" },
  { name: "Leyenda", min: 1000, color: "#a855f7", glow: "#ec4899", dots: 8, emoji: "🌈" }
];
