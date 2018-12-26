import React, { Component } from 'react';
import routerEvents from "next-router-events";

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
			clearTimeout(this.timeOut);
		}

		routerEvents.off("routeChangeStart", this.pageLoadStart);
		routerEvents.off("routeChangeComplete", this.pageLoadEnd);
	}

	pageLoadStart = url => {
		const { pathname, search } = window.location;
		const currentUrl = pathname + search;
		if (url !== currentUrl) {
			this.timeOut = setTimeout(() => {
				if (!this.state.loading) {
					this.setState({ loading: true });
				}
			}, 500)
		}
	}

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