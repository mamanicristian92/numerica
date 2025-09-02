const fun =function(x) {
    return (Math.exp(x))-(x*x)+1;
}
const bis= function(f,a,b,e) {
    if (f(a)*f(b)>0) {
        return "No se cumple el teorema de Bolzano";
    }
    let i=0;
    let c=(a+b)/2;
    while (Math.abs(f(c))>e) {
        if (f(a)*f(c)<0) {
            b=c;
        } else {
            a=c;
        }
        c=(a+b)/2;
        i++;
        console.log(`Iteracion ${i}: a=${a}, b=${b}, c=${c}, f(c)=${f(c)}`);
        if (i>30) {
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
        console.log(`Iteracion ${i}: a=${a}, b=${b}, c=${c}, f(c)=${f(c)}`);
        if (i>30) {
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
        if (i>30) {
            return "No converge";
        }
    }
    return c;
}


console.log(fun(-2));
console.log(fun(-1));
//biseccion
//console.log(bis(fun,-2,-1,0.0000001));
//regula falsi
console.log(rf(fun,-2,-1,0.0000001));
console.log(rfm(fun,-2,-1,0.0000001));