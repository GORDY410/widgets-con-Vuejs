var reloj = new Vue({
	el: '#reloj',

	data: {
		hora: ''
	},

	created: function() {
		this.obtenerHora();
		setInterval( this.obtenerHora, 1000 );
	},

	methods: {
		obtenerHora: function(){
			var tiempo = new Date();
			var horas = tiempo.getHours();
			var minutos = tiempo.getMinutes();
			var segundos = tiempo.getSeconds();
			var perido = 'AM';

			if( horas > 12 ){
				horas = horas.valueOf()-12;
				perido = 'PM';
			}

			horas = this.validarDosDigitos( horas );
			minutos = this.validarDosDigitos( minutos );
			segundos = this.validarDosDigitos( segundos );

			this.hora = horas + ':' + minutos + ':' + segundos + ' ' + perido;
		},

		validarDosDigitos: function(numero){
			if( numero < 10 ){
				numero = '0' + numero;
			}
			return numero;
		}
	}
});

var fechas = new Vue({
	el: '#fechas',

	data: {
		fecha: ''
	},

	created: function(){
		this.obtenerFecha();
	},

	methods: {
		obtenerFecha: function(){
			var tiempo = new Date();
			var formato = {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			};

			fecha = tiempo.toLocaleDateString('es-MX', formato);

			this.fecha = fecha.toString().toUpperCase();
		}
	}
});

var calculadora = new Vue({
	el: '#calculadora',

	data: {
		pantallaSec: '',
		pantallaPrin: '',
		
		numero1: 0,
		numero2: 0,
		operacion: '',

		vista: true
	},

	methods: {
		obtenerNumero: function( numero ){
			this.pantallaPrin = this.pantallaPrin + numero.toString();
		},

		operar: function( operacion ){
			if( this.pantallaPrin !== '' || this.pantallaSec !== '' ){
				if( this.pantallaPrin === '' && this.pantallaSec !== '' ){
					this.pantallaSec = this.pantallaSec.slice(0, -1) + ' ' + operacion;
				}else{
					this.numero1 = Number(this.pantallaPrin.valueOf());
					this.pantallaSec = this.pantallaPrin + ' ' + operacion;
					this.pantallaPrin = '';
				}
				this.operacion = operacion;
			}
		},

		obtenerResul: function(){
			var resultado = 0;

			this.numero2 = Number(this.pantallaPrin.valueOf());

			switch( this.operacion ){
				case( '+' ):
					resultado = this.numero1 + this.numero2;
				break;

				case( '-' ):
					resultado = this.numero1 - this.numero2;
				break;

				case( '/' ):
					resultado = this.numero1 / this.numero2;
				break;

				case( '*' ):
					resultado = this.numero1 * this.numero2;
				break;

				default:
					resultado = this.numero2;
				break;
			}

			this.pantallaSec = '';
			this.operacion = '';
			this.pantallaPrin = resultado.toString();
		},

		borrarCaracter: function(){
			this.pantallaPrin = this.pantallaPrin.slice(0, -1);
		},

		limpiarPantallas: function(){
			this.pantallaPrin = '';
			this.pantallaSec = '';
			this.numero1 = 0;
			this.numero2 = 0;
			this.operacion = '';
		}
	}
});

var gato = new Vue({
	el: '#gato',

	data: {
		parrafoMensaje: '',
		mensajeEstado: '',
		mensajeTurno: '',

		boton1: '',
		boton2: '',
		jugadores: false,
		jugador1: true,
		jugador2: false,
		simbolos: [ , ],
		tablero: [ ['', '', ''],
			['', '', ''],
			['', '', ''] ],

		vista: false,
		vistaPartida: false,
		vistaMensaje: true,
		vistaBotonesJug: true,
		vistaBotonesSim: false
	},

	created: function(){
		this.parrafoMensaje = 'Número de jugadores:';

		this.boton1 = '1 Jugador';
		this.boton2 = '2 Jugadores';

		this.vista = false;
	},

	methods: {
		seleccionarJugadores: function( opcion ){
			/*
			True: la partida será de 2 jugadores.
			False: será de 1 jugador.
			*/

			if( opcion ){
				this.parrafoMensaje = 'Jugador 1 elige tu simbolo:';
				this.jugadores = true;
			}else{
				this.parrafoMensaje = 'Jugador elige tu simbolo:';
			}

			this.boton1 = 'X (Cruz)';
			this.boton2 = 'O (Circulo)';

			this.vistaBotonesJug = false;
			this.vistaBotonesSim = true;
		},

		seleccionarSimbolo: function( opcion ){
			/*
			True: El jugador 1 elegió el simbolo 'O'.
			False: EL juagdor 1 eligió el simbolo 'X'.
			Al jugador 2 o a la computadora se le dará el otro simbolo.
			*/

			if( opcion ){
				this.simbolos[0] = 'O';
				this.simbolos[1] = 'X';
			}else{
				this.simbolos[0] = 'X';
				this.simbolos[1] = 'O';
			}

			this.mensajeEstado = 'Jugador 1: ' + '"' + this.simbolos[0] + '"';
			if( this.jugadores ){
				this.mensajeEstado += ' Jugador 2: ' + '"' + this.simbolos[1] + '"';
			}else{
				this.mensajeEstado += ' Computadora: ' + '"' + this.simbolos[1] + '"';
			}

			this.mensajeTurno = 'Jugador 1 es tu turno';

			this.vistaMensaje = false;
			this.vistaPartida = true;
		},

		tirar: function(){

			if( turno ){

			}

		}
	}
});

var navegacion = new Vue({
	el: '#navegacion',
	methods: {
		aparecerCalculadora: function(){
			calculadora.vista = true;

			gato.vista = false;
		},

		aparecerConvertidor: function(){
			calculadora.vista = false;

			gato.vista = false;
		},

		aparecerGato: function(){
			calculadora.vista = false;

			gato.vista = true;
		}
	}
});