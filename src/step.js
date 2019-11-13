import React from 'react'

export default function Step(props){
	
	//if effective date has not been reached should it be shown??
	var effectiveDate = new Date(props.date)
	var today = new Date()
	if (effectiveDate.getTime() > today.getTime())
		return <div></div>
	
	return(	
	<div className="step">
		
		<div className="workStepNumber">
			{props.number}
			<hr className="underline"/>
			<div className="stepHeader">
				{props.header.toString().toUpperCase()}
			</div>
		</div>
		
		<div className="stepText">
			{props.text}
		</div>

	</div>
	)
}