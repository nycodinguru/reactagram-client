import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

class Layout extends Component {

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
		  window.scrollTo(0, 0)
		}
	  }

	render() {
	return (
		<React.Fragment>
			{ this.props.location.pathname !== '/' && 
				this.props.location.pathname.slice(1,10) !== 'accounts/' &&
					<Navbar props={this.props}/> }
			{this.props.children}
			<Footer props={this.props}/>
		</React.Fragment>
	);
	}
}
export default withRouter(Layout);
