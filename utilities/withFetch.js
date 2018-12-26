import React, { Component } from 'react';
import axios from 'axios';

const withFetch = (url) => (MyComponent) => (
	class WithFetching extends Component {
		constructor(props) {
			super(props);
			this.state = {
				data: null,
				loading: false,
				error: false,
			}
		}

		componentDidMount() {
			this.setState(
				() => ({ loading: true}),
				this.fetch
			)
		}

		fetch = () => {
			axios.get(url)
				.then(result => this.setState({
					data: result.data,
					loading: false,
				}))
				.catch(error => this.setState({
					error,
					loading: false,
				}));
		}

		render() {
			const { loading, error } = this.state;
			
			if (loading) {
				return (<div>Loading...</div>);
			} else if (error) {
				return (<div>Loading...</div>);
			}

			return (
				<MyComponent
					{...this.props}
					{...this.state}
				/>
			);
		}
	}
)

export default withFetch;