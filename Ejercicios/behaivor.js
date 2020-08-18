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

var conversor = new Vue({
	el: '#conversor',

	data: {
		conversionMensaje: '',
		unidadConvertir: '',
		unidadConvertida: '',
		patron: '',

		valorConvertir: 0,
		valorConvertido: 0,

		vista: false
	},

	created: function(){
		this.conversionMensaje = 'bits a Bytes';
		this.unidadConvertir = 'bits';
		this.unidadConvertida = 'Bytes';

		this.valorConvertir = Number(0);
		this.valorConvertido = 0;

		this.vista = false;
	},

	methods: {
		cambiarUnidades: function(){
			var unidadAux = this.unidadConvertida;
			this.unidadConvertida = this.unidadConvertir;
			this.unidadConvertir = unidadAux;

			this.conversionMensaje = this.unidadConvertir + ' a ' + this.unidadConvertida;
		},

		convertir: function(){
			if( typeof(this.valorConvertir) !== String ){
				if( this.valorConvertir < 0 ){
					alert('No se pueden convertir numeros negativos :/');
				}else{
					if( this.unidadConvertir === 'bits' ){
						if( this.valorConvertir%1 === 0 ){
							this.valorConvertido = this.valorConvertir/8;
						}else{
							alert('No se puede convertir punto decimal de un bit :(');
						}
					}else{
						if( this.valorConvertir >= 0.125 ){
							this.valorConvertido = this.valorConvertir*8;
						}else{
							alert('No se puede convertir punto decimal de un bit :(');
						}
					}
				}
			}
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
		turno: false,
		turnos: 0,
		ganador: false,
		simbolos: [ , ],
		tablero: [ '', '', '',
			'', '', '',
			'', '', '' ],

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

			this.generarPrimerTurno();

			if( this.jugadores ){
				this.mensajeEstado = 'Jugador 1: ' + '"' + this.simbolos[0] + '"';
				this.mensajeEstado += ' Jugador 2: ' + '"' + this.simbolos[1] + '"';

				this.mensajeTurno = !this.turno ? 'Jugador 1 es tu turno' : 'Jugador 2 es tu turno';
			}else{
				this.mensajeEstado = 'Jugador: ' + '"' + this.simbolos[0] + '"';
				this.mensajeEstado += ' Computadora: ' + '"' + this.simbolos[1] + '"';

				if( this.turno ){
					this.tirarComputadora();
				}
				this.mensajeTurno = 'Jugador es tu turno';
				
			}

			this.vistaMensaje = false;
			this.vistaPartida = true;
		},

		generarPrimerTurno: function(){
			if( Math.floor(Math.random()*(2)) === 1 ){
				this.turno = true;
			}
		},

		tirar: function( fila, columna ){

			if( this.tablero[(3*fila)+columna] === '' && !this.ganador ){	// Verificar que no se sobreescriba una celda
				if( !this.turno ){
					Vue.set( this.tablero, (3*fila)+columna, this.simbolos[0] );
				}else{
					Vue.set( this.tablero, (3*fila)+columna, this.simbolos[1] );
				}
	
				/*
					Vue.set( this.tablero, (3*fila)+columna, 'X' );
				La línea anterior hace que al cambiar el contenido de un array sea de manera reactiva,
				es decir, que se actualice en tiempo real, el asignarlo de la manera:
					this.tablero[(3*fila)+columna] = 'X';
				no lo hace reactivo, por lo que no se actualizará en tiempo real la información
				mostrada en el HTML.
				*/

				this.turnos++;

				this.verificarGanador();

				if( !this.ganador ){
					this.turno = !this.turno;
	
					if( this.jugadores ){
						this.mensajeTurno = !this.turno ? 'Jugador 1 es tu turno' : 'Jugador 2 es tu turno';
					}else{
						if( this.turno ){
							this.tirarComputadora();
						}
					}
				}
			}

		},

		tirarComputadora: function(){
			var fila, columna;

			while( true ){
				fila = Math.floor(Math.random()*(3));
				columna = Math.floor(Math.random()*(3));

				if( this.tablero[(3*fila)+columna] === '' ){
					Vue.set( this.tablero, (3*fila)+columna, this.simbolos[1] );
					this.turnos++;

					this.verificarGanador();
					this.turno = false;

					break;
				}
			}

		},

		verificarGanador: function(){
			var simbolo = this.turno ? this.simbolos[1] : this.simbolos[0];

			// Ganar por fila
			for( i = 0; i < 7 && !this.ganador; i += 3 ){
				if( (this.tablero[i] === simbolo) && (this.tablero[i+1] === simbolo) && (this.tablero[i+2] === simbolo) ){
					this.ganador = true;
				}
			}

			// Ganar por columna
			for( i = 0; i < 3 && !this.ganador; i++ ){
				if( (this.tablero[i] === simbolo) && (this.tablero[i+3] === simbolo) && (this.tablero[i+6] === simbolo) ){
					this.ganador = true;
				}
			}

			// Ganar por diagonal
			if( (this.tablero[0] === simbolo) && (this.tablero[4] === simbolo) && (this.tablero[8] === simbolo)  && !this.ganador ){
				this.ganador = true;
			}

			if( (this.tablero[2] === simbolo) && (this.tablero[4] === simbolo) && (this.tablero[6] === simbolo) && !this.ganador ){
				this.ganador = true;
			}

			if( this.ganador ){
				if( !this.jugadores ){
					this.mensajeTurno = !this.turno ? 'El Jugador ha ganador' : 'La computadora ha ganado';
				}else{
					this.mensajeTurno = !this.turno ? 'El Jugador 1 ha ganador' : 'El Jugador 2 ha ganado';
				}
			}else if( this.turnos === 9 && !this.ganador ){	// Se verifica si hay empate
				this.ganador = true;
				this.mensajeTurno = 'Empate';
			}
		},

		reiniciar: function(){
			this.parrafoMensaje = 'Número de jugadores:';
			this.mensajeEstado = '';
			this.mensajeTurno = '';

			this.boton1 = '1 Jugador';
			this.boton2 = '2 Jugadores';
			this.jugadores = false;
			this.turno = false;
			this.turnos = 0;
			this.ganador = false;
			this.simbolos = [ , ];
			this.tablero = [ '', '', '',
				'', '', '',
				'', '', '' ];

			this.vista = true;
			this.vistaPartida = false;
			this.vistaMensaje = true;
			this.vistaBotonesJug = true;
			this.vistaBotonesSim = false;
		}
	}
});

var navegacion = new Vue({
	el: '#navegacion',

	methods: {
		aparecerCalculadora: function(){
			calculadora.vista = true;
			conversor.vista = false;
			gato.vista = false;
		},

		aparecerConvertidor: function(){
			calculadora.vista = false;
			conversor.vista = true;
			gato.vista = false;
		},

		aparecerGato: function(){
			calculadora.vista = false;
			conversor.vista = false;
			gato.vista = true;
		}
	}
});