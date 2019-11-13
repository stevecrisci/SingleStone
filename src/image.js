import React from 'react'
import couch1 from './images/Optimized-photo-couch-300.jpg';
import couch2 from './images/Optimized-photo-couch-768.jpg';

export default function Image(){
    return(<div className="row">
			<div id="imageDiv" className="d-lg-none col-sm-12">
				<img className="couch" src={couch1} alt="couch"/>
			</div>
			<div id="imageDiv" className="d-none d-lg-block col-sm-12">
				<img className="couch" src={couch2} alt="couch"/>
			</div>
		</div>  )
};