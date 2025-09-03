var maxIter=100; // Valor por defecto
document.getElementById('formRaices').addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario
            const funcionStr = document.getElementById('funcion').value;
            const a = parseFloat(document.getElementById('a').value);
            const b = parseFloat(document.getElementById('b').value);
            const error = parseFloat(document.getElementById('error').value);
            var tablaResultados = document.getElementById('tablaResultados');
            //const maxIter = parseInt(document.getElementById('maxIter').value);
            //const maxIter = 100; // Valor por defecto
            // Aquí puedes agregar la lógica para procesar los datos del formulario
            // Por ejemplo, podrías llamar a una función que realice el método de bisección
            // y mostrar el resultado en la página
            // Ejemplo: document.getElementById('resultado').innerText = `Función: ${funcionStr}, a: ${a}, b: ${b}, Tolerancia: ${tolerancia}, Máximo Iteraciones: ${maxIter}`;
            // Función para evaluar la función ingresada por el usuario
            function evaluarFuncion(x) {
                var x=x;
                return eval(funcionStr);
            }
            // Función de bisección
            const resultado = biseccion(evaluarFuncion, a, b, error, tablaResultados);
            document.getElementById('resultado').innerText = resultado;
        });

const fun =function(x) {
    return Math.exp(x)-(x*x)+1;
}
const biseccion= function(f,a,b,e,tablaResultados) {
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    tablaResultados.innerHTML=`<tr><th>Iter.</th><th>a</th><th>b</th><th>c</th><th>f(a)</th><th>f(b)</th><th>f(c)</th></tr>`;
    let i=0;
    let c=(a+b)/2;
    tablaResultados.innerHTML += `<tr><td>${i}</td><td>${a}</td><td>${b}</td><td>${c}</td><td>${f(a)}</td><td>${f(b)}</td><td>${f(c)}</td></tr>`;
    while (Math.abs(f(c))>e) {
        if (f(a)*f(c)<0) {
            b=c;
        } else {
            a=c;
        }
        c=(a+b)/2;
        i++;
        //console.log(`Iteracion ${i}: a=${a}, b=${b}, c=${c}, f(c)=${f(c)}`);
        if (tablaResultados !== undefined) {
            tablaResultados.innerHTML += `<tr><td>${i}</td><td>${a}</td><td>${b}</td><td>${c}</td><td>${f(a)}</td><td>${f(b)}</td><td>${f(c)}</td></tr>`;
        }
        if (i>maxIter) {
            return "No converge";
        }
    }
    return c;
}
const rf=function(f,a,b,e) {
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    let i=0;
    let c=b-((f(b)*(a-b))/(f(a)-f(b)));
    while (Math.abs(f(c))>e) {
        if (f(a)*f(c)<0) {
            b=c;
        } else {
            a=c;
        }
        c=b-((f(b)*(a-b))/(f(a)-f(b)));
        i++;
        //console.log(`Iteracion ${i}: a=${a}, b=${b}, c=${c}, f(c)=${f(c)}`);
        if (i>maxIter) {
            return "No converge";
        }
    }
    return c;
}

const rfm=function(f,a,b,e) {
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    let i=0;
    let F=f(a);
    let G=f(b);
    let W=F;
    let c=((a*G-b*F)/(G-F));
    while (Math.abs(f(c))>e) {
        if (f(a)*f(c)<0) {
            b=c;
            G=f(c);
            if (W*G>0) {
                F=F/2;
            }
        } else {
            a=c;
            F=f(c);
            if (W*F>0) {
                G=G/2;
            }
        }
        W=f(c);
        c=((a*G-b*F)/(G-F));
        i++;
        console.log(`Iteracion ${i}: a=${a}, b=${b}, c=${c}, f(c)=${f(c)}`);
        if (i>maxIter) {
            return "No converge";
        }
    }
    return c;
}

/* console.log(fun(-2));
console.log(fun(-1));
//biseccion
console.log(biseccion(fun,-2,-1,0.0000001));
//regula falsi
console.log(rf(fun,-2,-1,0.0000001));
console.log(rfm(fun,-2,-1,0.0000001)); */