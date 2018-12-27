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
			search: query.search,
		}
	}

	static propTypes = {
		router: PropTypes.object,
		autoFocus: PropTypes.bool,
	}

	componentDidMount() {
		const { autoFocus } = this.props;
		console.log(autoFocus)
		if (autoFocus && this.input) {
			console.log('hola')
			this.input.focus();
		}
	}

	handleChange = e => {
		this.setState({ search: e.target.value });
	}

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