import React, { useRef } from 'react';
import { Button } from 'reactstrap';

export default props => {
  const inputEle = useRef(null)
	const fileSelect = () => {
		inputEle.current.click();
	}
	const updateFiles = e => {
		console.log(e.target.files)
		props.setFiles(e.target.files)
	}
	return <>
	  <input onChange={updateFiles} ref={inputEle} type={"file"} style={{ display: "none"}} multiple/>
	  <Button onClick={fileSelect} >Select Files...</Button>
	</>	
}