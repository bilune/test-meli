import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

/**
 * Componente que renderiza un formulario de búsqueda de productos
 */
class SearchBox extends Component {
	constructor(props) {
		super(props);
		const { query } = this.props.router;
		this.state = {
			search: query.search || '',
		}
	}

	static propTypes = {
		// propiedad pasada por el HOC withRouter
		router: PropTypes.object,
		// Propiedad que define si enfocar el campo de búsqueda al inicio
		autoFocus: PropTypes.bool,
	}

	componentDidMount() {
		this.autoFocus();
	}
	
	/**
	 * Función que hace focus en input si está seteada la propiedad correspondiente
	 */
	autoFocus = () => {
		const { autoFocus } = this.props;
		if (autoFocus && this.input) {
			this.input.focus();
		}
	}

	/**
	 * Función que se ejecuta al enviar el formulario.
	 * Redirige a la ruta para la búsqueda si tiene valor
	 * o hace focus en el input nuevamente si es vacío.
	 */
	search = () => {
		const { router } = this.props;
		const { search } = this.state;
		if (search) {
			router.push(
				{ pathname: '/search', query: { search } }, //href
				{ pathname: '/items', query: { search } } // as
			)
		} else if (this.input) {
			this.input.focus();
		}
	}

	/**
	 * Función que setea el valor del campo search en el componente
	 */
	handleChange = e => {
		this.setState({ search: e.target.value });
	}

	render() {
		const { search } = this.state;
		return (
			<form className="searchbox" onSubmit={e => e.preventDefault()}>
				<input
					ref={input => this.input = input}
					type="text"
					value={search}
					onChange={this.handleChange}
					className="searchbox__input"
					placeholder="Nunca dejes de buscar"
					aria-label="Buscar en MercadoLibre"
					aria-required="true"
				/>
				<button className="searchbox__button" onClick={this.search}>
					<img src="/static/ic_Search.png" alt="Ícono de búsqueda"/>
				</button>
			</form>
		);
	}
}

export default withRouter(SearchBox);