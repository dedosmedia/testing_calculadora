const fs = require('fs');
document.body.innerHTML = fs.readFileSync('./calculadora.html');

const { limpiar, resetear, resolver, init, getVariables } = require('../funcionalidad')

describe('Prueba del método init()',()=>{

    // Para probar el método init es necesario invocarlo primero
    // esto inicializa todos los botones y les asigna eventos onClick
    init();

    // Luego probamos que cada uno de los botones ejecuten correctamente el evento onClick
    test('Prueba del evento onClick en el botón 1', ()=>{
        // simulamos pulsar el botón 1
        uno.click();
        // Esperamos que en la pantalla se muestre el '1', recordar que la pantalla está asociada a la propiedad resultado.textContent
        expect(resultado.textContent).toBe('1');
    })
    test('Prueba del evento onClick en el botón 2', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora, para que borre el número '1' que clickamos en el caso anterior
        limpiar();
        // simulamos pulsar el botón 2
        dos.click();
        // Esperamos que en la pantalla se muestre el '2'
        expect(resultado.textContent).toBe('2');
    })
    test('Prueba del evento onClick en el botón 3', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 3
        tres.click();
        // Esperamos que en la pantalla se muestre el '3'
        expect(resultado.textContent).toBe('3');
    })
    test('Prueba del evento onClick en el botón 4', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 4
        cuatro.click();
        // Esperamos que en la pantalla se muestre el '4'
        expect(resultado.textContent).toBe('4');
    })
    test('Prueba del evento onClick en el botón 5', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 5
        cinco.click();
        // Esperamos que en la pantalla se muestre el '5'
        expect(resultado.textContent).toBe('5');
    })
    test('Prueba del evento onClick en el botón 6', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 6
        seis.click();
        // Esperamos que en la pantalla se muestre el '6'
        expect(resultado.textContent).toBe('6');
    })
    test('Prueba del evento onClick en el botón 7', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 7
        siete.click();
        // Esperamos que en la pantalla se muestre el '7'
        expect(resultado.textContent).toBe('7');
    })
    test('Prueba del evento onClick en el botón 8', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 8
        ocho.click();
        // Esperamos que en la pantalla se muestre el '8'
        expect(resultado.textContent).toBe('8');
    })
    test('Prueba del evento onClick en el botón 9', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 9
        nueve.click();
        // Esperamos que en la pantalla se muestre el '9'
        expect(resultado.textContent).toBe('9');
    })
    test('Prueba del evento onClick en el botón 0', ()=>{
        // Debemos simular limpiar la pantalla de la calculadora
        limpiar();
        // simulamos pulsar el botón 0
        cero.click();
        // Esperamos que en la pantalla se muestre el '0'
        expect(resultado.textContent).toBe('0');
    })



    test('Prueba del evento onClick en el botón suma', ()=>{
        // Para probar las operaciones matemáticas es necesario resetear el estado de todas las variables de la calculadora. No basta con limpiar la pantalla.
        // Implicitamente resetear también limpia la pantalla.
        resetear();
        // simulamos pulsar el botón suma, sin haber pulsado el primer operando
        // Esperariamos que la variable operacion sea igual al signo '+'
        suma.click();
        // traemos las variables de funcionalidad.js y desestructuramos el objeto trayendo solo la variable operacion
        const { operacion } = getVariables();
        expect(operacion).toBe('+');
    })
    test('Prueba del evento onClick en el botón resta', ()=>{
        resetear();
        // simulamos pulsar el botón resta, sin haber pulsado el primer operando
        // Esperariamos que la variable operacion sea igual al signo '-'
        resta.click();
        const { operacion } = getVariables();
        expect(operacion).toBe('-');
    })
    test('Prueba del evento onClick en el botón multiplicación', ()=>{
        resetear();
        // simulamos pulsar el botón multiplicación, sin haber pulsado el primer operando
        // Esperariamos que la variable operacion sea igual al signo '*'
        multiplicacion.click();
        const { operacion } = getVariables();
        expect(operacion).toBe('*');
    })
    test('Prueba del evento onClick en el botón divisón', ()=>{
        resetear();
        // simulamos pulsar el botón división, sin haber pulsado el primer operando
        // Esperariamos que la variable operacion sea igual al signo '/'
        division.click();
        const { operacion } = getVariables();
        expect(operacion).toBe('/');
    })

    test('Prueba del evento onClick en el botón igual', ()=>{
        // Para probar el operador igual  es necesario resetear el estado de todas las variables de la calculadora. No basta con limpiar la pantalla.
        resetear();
        // simulamos pulsar el botón = 
        igual.click();
        // Esperariamos que al presionar igual, se reseteen todas las variables y en pantalla aparezca el número 0
        const { operandob } = getVariables();
        expect(operandob).toBe(0);
    })
    test('Prueba del evento onClick en el botón "C" ', ()=>{       
        // simulamos pulsar el botón 'C'
        reset.click();
        // Esperariamos que al presionar 'C', se reseteen todas las variables y en pantalla aparezca el número 0
        const { operacion, operandoa, operandob } = getVariables();
        expect(operandoa).toBe(0);
        expect(operandob).toBe(0);
        expect(operacion).toBe("");
        expect(resultado.textContent).toBe("");
    })
})

describe('Probar funcionalidad de resetear()', ()=>{
    // Esperariamos que al resetear, las variables tomen estos valores
    //   operandoa = 0;
    //   operandob = 0;
    //   operacion = "";
    //   resultado.textContent = "";
    
    test('Invocar el método resetear',()=>{
        // simulamos llamar la función resetear()    
        resetear();
        const { operacion, operandoa, operandob } = getVariables();
        expect(operandoa).toBe(0);
        expect(operandob).toBe(0);
        expect(operacion).toBe("");
        expect(resultado.textContent).toBe("");
    })
})

describe('Pruebas de función limpiar()',()=>{
    test('Probar limpiar()',()=>{
        // simulamos llamar la función resetear()    
        limpiar();
        // Esperamos que la pantalla quede vacía
        expect(resultado.textContent).toBe("");
    })
})

describe('Pruebas de función resolver()',()=>{
    test('Probar resolver() con operación suma',()=>{
        // Necesitamos resetear la calculadora y simular una operación completa de suma
        resetear();
        // simulamos primer operando = 23
        dos.click();      
        tres.click();  
        // simulamos operador suma
        suma.click()
        // simulamos segundo operando = 10
        uno.click();
        cero.click();
        // simulamos operador igual... que implicitamente invoca el método resolver()
        igual.click();
        // Esperariamos la pantalla mostrar el resultado de la suma, 33
        expect(resultado.textContent).toBe('33');
    })
    test('Probar resolver() con operación resta',()=>{
        // Necesitamos resetear la calculadora y simular una operación completa de resta
        resetear();
        // simulamos primer operando = 23
        dos.click();      
        tres.click();  
        // simulamos operador resta
        resta.click()
        // simulamos segundo operando = 10
        uno.click();
        cero.click();
        // simulamos operador igual
        igual.click();
        // Esperariamos la pantalla mostrar el resultado de la resta, 13
        expect(resultado.textContent).toBe('13');
    })
    test('Probar resolver() con operación multiplicacion',()=>{
        // Necesitamos resetear la calculadora y simular una operación completa de multiplicacion
        resetear();
        // simulamos primer operando = 23
        dos.click();      
        tres.click();  
        // simulamos operador multiplicacion
        multiplicacion.click()
        // simulamos segundo operando = 10
        uno.click();
        cero.click();
        // simulamos operador igual
        igual.click();
        // Esperariamos la pantalla mostrar el resultado de la multiplicacion, 230
        expect(resultado.textContent).toBe('230');
    })
    test('Probar resolver() con operación división',()=>{
        // Necesitamos resetear la calculadora y simular una operación completa de división
        resetear();
        // simulamos primer operando = 23
        dos.click();      
        tres.click();  
        // simulamos operador división
        division.click()
        // simulamos segundo operando = 10
        uno.click();
        cero.click();
        // simulamos operador igual
        igual.click();
        // Esperariamos la pantalla mostrar el resultado de la división, 2.3
        expect(resultado.textContent).toBe('2.3');
    })
})