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
		operacion: ''
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