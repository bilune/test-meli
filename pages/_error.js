import React from 'react';
import '../scss/main.scss';
import Link from 'next/link';

export default class CustomError extends React.Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		return { statusCode }
	}

	render() {
		const { statusCode } = this.props;
		return (
			<div className="error-page">
				<img
					className="error-page__logo"
					src="/static/Logo_ML@2x.png.png"
					alt="Logo de MercadoLibre"
				/>
				<div className="error-page__message">
					<h1 className="error-page__status-code">{statusCode}</h1>
					La página no fue encontrada.
				</div><br/>
				<Link href="/">
					<button className="error-page__redirect">
						Ir al inicio
					</button>
				</Link>
			</div>
		)
	}
}