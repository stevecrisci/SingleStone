import React from 'react';
import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Step from './step.js'
import Screentext from './screentext.js'
import Logo from './logo.js'
import Image from './image.js'

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			APIData: []
		};
	}

	componentDidMount() {
		function compare(a, b) {
			if (parseInt(a.stepNumber) > parseInt(b.stepNumber)) return 1;
			if (parseInt(a.stepNumber) < parseInt(b.stepNumber)) return -1;
			return 0;
		}

		function compareDates(a, b) {
			debugger
			var eff1 = new Date(a.effectiveDate);
			var eff2 = new Date(b.effectiveDate);
			if (eff1.getTime() < eff2.getTime()) return 1;
			if (eff1.getTime() > eff2.getTime()) return -1;
			return 0;
		}

		//Fetch here
		const fetchParams = {
			method: 'GET',
			mode: 'cors'
		};
		const url = "https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge";
		fetch(url, fetchParams)
			.then(response => response.json())
			.then(data => {


				//a.  Sort the steps in order by the “stepNumber” value 
				let sortedStepNumber = data.sort(compare);

				
				//c.  Simplify the “step” objects in the resulting array so that extraneous data is removed 
				let readyData = []
				for (let i = 0; i < sortedStepNumber.length; i++) {
					//b.  Extract the content version with the most recent “effectiveDate” value 
					if (sortedStepNumber[i].versionContent.length > 1)
						sortedStepNumber[i].versionContent = sortedStepNumber[i].versionContent.sort(compareDates);

					let thisRecord = {
						"stepNumber": sortedStepNumber[i].stepNumber,
						"title": sortedStepNumber[i].versionContent[0].title,
						"body": sortedStepNumber[i].versionContent[0].body,
						"date": sortedStepNumber[i].versionContent[0].effectiveDate
					}
					readyData.push(thisRecord)
				}
				this.setState({ APIData: readyData })
			})
	}

	render() {
		return (
			<div className="App container-fluid">
				<Logo />
				<br />
				<Screentext />
				<Image />

				<div className="howItWorksDiv row">
					<div className="howItWorksText col-sm-12">
						How It Works
					</div>
				</div>
				<div className="row stepDiv">
					{this.state.APIData.map((step, index) =>
					<div className="center col-sm-12 col-md-3" key={index}>
							<Step number={step.stepNumber} header={step.title} text={step.body} date={step.date} />
						</div>
					)}
				</div>
			</div>
		);
	}
}