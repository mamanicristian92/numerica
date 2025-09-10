const maxIter=20; // Valor por defecto
const cabeceraCerrados=["Iter.","a","b","c","f(a)","f(b)","f(c)"];
const cabeceraAbiertos=["Iter.","x0","x1","x2","f(x0)","f(x1)","f(x2)"];
class TablaHtml {
    constructor(tablahtml) {
        console.log(tablahtml);
        this.tablahtml=tablahtml;
        this.body=tablahtml.getElementsByTagName('tbody');
    }
    vaciar() {
        this.tablahtml.innerHTML="";
    } // fin vaciar
    agregarCabecera(cabecera) {
        let line="<thead><tr>";
        cabecera.forEach(elemento => {
            line+=`<th>${elemento}</th>`;
        });
        line+='</tr></thead>';
        this.tablahtml.innerHTML+=line;
        this.iniciarCuerpo();
    } // fin iniciarCabecera
    iniciarCuerpo() {
        this.body=document.createElement('tbody');
        this.tablahtml.appendChild(this.body);
    } // fin iniciarCuerpo
    agregarFila(fila) {
        let line="<tr>";
        fila.forEach(elemento => {
            line+=`<td>${elemento}</td>`;
        });
        line+=`</tr>`;
        this.body.insertAdjacentHTML('beforeend', line);
    } // fin agregarFila
}
document.getElementById('formRaices').addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario
            const funcionStr = document.getElementById('funcion').value;
            const a = parseFloat(document.getElementById('a').value);
            const b = parseFloat(document.getElementById('b').value);
            const error = parseFloat(document.getElementById('error').value);
            let tablaResultados1 = new TablaHtml(document.getElementById('tablaResultados1'));
            let tablaResultados2 = new TablaHtml(document.getElementById('tablaResultados2'));
            let tablaResultados3 = new TablaHtml(document.getElementById('tablaResultados3'));
            //const maxIter = parseInt(document.getElementById('maxIter').value);
            //const maxIter = 100; // Valor por defecto
            function evaluarFuncion(x) {
                var x=x;
                return eval(funcionStr);
            }
            // Función de bisección
            let resultado1 = biseccion(evaluarFuncion, a, b, error, tablaResultados1);
            let resultado2 = rf(evaluarFuncion, a, b, error, tablaResultados2);
            let resultado3 = rfm(evaluarFuncion, a, b, error, tablaResultados3);
            document.getElementById('resultado1').innerText = resultado1;
            document.getElementById('resultado2').innerText = resultado2;
            document.getElementById('resultado3').innerText = resultado3;
});
document.getElementById('biseccion').addEventListener('click', function() {
    if (this.checked) {
        document.getElementById('bis_result').style.display = 'block';
    }
    else {
        document.getElementById('bis_result').style.display = 'none';
    }
});
document.getElementById('regulafalsi').addEventListener('click', function() {
    const style_display = this.checked?'block':'none';
    document.getElementById('rf_result').style.display = style_display;
});
document.getElementById('regulafalsimodificada').addEventListener('click', function() {
    if (this.checked) {
        document.getElementById('rfm_result').style.display = 'block';
    }
    else {
        document.getElementById('rfm_result').style.display = 'none';
    }
});
const fun =function(x) {
    return Math.exp(x)-(x*x)+1;
}
const biseccion= function(f,a,b,e,tablaResultados) {
    tablaResultados.vaciar();
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    tablaResultados.agregarCabecera(cabeceraCerrados);
    let i=0;
    let c=(a+b)/2;
    tablaResultados.agregarFila([i,a,b,c,f(a),f(b),f(c)]);
    while (Math.abs(f(c))>e) {
        if (f(a)*f(c)<0) {
            b=c;
        } else {
            a=c;
        }
        c=(a+b)/2;
        i++;
        tablaResultados.agregarFila([i,a,b,c,f(a),f(b),f(c)]);
        if (i>maxIter) {
            return "No converge";
        }
    }
    //tablaResultados.finalizarCuerpo();
    return c;
}
const rf=function(f,a,b,e,tablaResultados) {
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    tablaResultados.vaciar();
    let i=0;
    let c=b-((f(b)*(a-b))/(f(a)-f(b)));
    tablaResultados.agregarCabecera(cabeceraCerrados);
    tablaResultados.agregarFila([i,a,b,c,f(a),f(b),f(c)]);
    while (Math.abs(f(c))>e) {
        if (f(a)*f(c)<0) {
            b=c;
        } else {
            a=c;
        }
        c=b-((f(b)*(a-b))/(f(a)-f(b)));
        i++;
        tablaResultados.agregarFila([i,a,b,c,f(a),f(b),f(c)]);
        if (i>maxIter) {
            return "No converge";
        }
    }
    return c;
}

const rfm=function(f,a,b,e,tablaResultados) {
    tablaResultados.innerHTML="";
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    let i=0;
    let F=f(a);
    let G=f(b);
    let W=F;
    let c=((a*G-b*F)/(G-F));
    tablaResultados.innerHTML=`<tr><th>Iter.</th><th>a</th><th>b</th><th>c</th><th>f(a)</th><th>f(b)</th><th>f(c)</th></tr>`;
    tablaResultados.innerHTML += `<tr><td>${i}</td><td>${a}</td><td>${b}</td><td>${c}</td><td>${f(a)}</td><td>${f(b)}</td><td>${f(c)}</td></tr>`;
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
        tablaResultados.innerHTML += `<tr><td>${i}</td><td>${a}</td><td>${b}</td><td>${c}</td><td>${f(a)}</td><td>${f(b)}</td><td>${f(c)}</td></tr>`;
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