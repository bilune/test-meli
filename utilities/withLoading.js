import React, { Component } from 'react';
import routerEvents from "next-router-events";

/**
 * HOC que permite a los componentes saber cuando se está haciendo un fetch en la
 * aplicación. Da la posibilidad de que en ese lapso de tiempo se muestre un Loader
 * que se pasa por parámetro o se le pase la propiedad loading al componente en cuestión.
 * @param {React Element} Loader Componente que se renderiza mientras se hace una request.
 */
const withLoading = (Loader) => (MyComponent) => class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		}
	}

	componentWillMount() {
		routerEvents.on("routeChangeStart", this.pageLoadStart);
		routerEvents.on("routeChangeComplete", this.pageLoadEnd);	
	}
	
	componentDidMount() {
		this.setState({ loading: false });
	}

	componentWillUnmount() {
		if (this.timeOut) {
			// Si se desmonta antes de que finalice el período
			// .5s en el que no se muestra loader, cancela el timeout.
			clearTimeout(this.timeOut);
		}

		routerEvents.off("routeChangeStart", this.pageLoadStart);
		routerEvents.off("routeChangeComplete", this.pageLoadEnd);
	}

	/**
	 * Función que se ejecuta cuando comienza el cambio
	 * de ruta. Si la transición de pages tarda más de .5s
	 * setea el estado del componente en loading: true.
	 */
	pageLoadStart = url => {
		const { pathname, search } = window.location;
		const currentUrl = pathname + search;
		if (url !== currentUrl) {
			this.timeOut = setTimeout(() => {
				if (!this.state.loading) {
					this.setState({ loading: true });
				}
			}, 500);
		}
	}

	/**
	 * Función que se ejecuta cuando finaliza
	 * el cambio de ruta. Setea el estado del componente en loading:false
	 */
	pageLoadEnd = url => {
		if (this.state.loading) {
			this.setState({ loading: false });
		}
	}

	render() {
		const { loading } = this.state;
		return (
			(loading && Loader) ?

			<Loader /> :

			<MyComponent
				{...this.state}
				{...this.props}
			/>
		);
	}

}

export default withLoading;