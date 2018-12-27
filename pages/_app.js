import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import { OpenGraph } from '../utilities/SeoUtilities';
import '../scss/main.scss';

/**
 * Componente principal que sobrescribe al que nextjs
 * trae por defecto, para agregar estilos y SEO al head.
 */
export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		return { pageProps }
	}
	
	render () {
		const { Component, pageProps } = this.props
		return (
			<>
				<Head>
					<meta charSet="utf-8" />
					<link rel="shortcut icon" href="/static/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
					<meta name="theme-color" content="#FFE600" />
					<link rel="manifest" href="/static/manifest.json" />
					<meta name="description" content="La comunidad de compra y venta online más grande de América Latina." />
					<OpenGraph
						description="La comunidad de compra y venta online más grande de América Latina."
						image="/static/Logo_ML@2x.png.png"
					/>
				</Head>

				<Container>
					<Component {...pageProps} />
				</Container>
			</>
		);
	}
}
