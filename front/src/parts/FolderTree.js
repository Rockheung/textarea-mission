import React, {useEffect} from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap'; 
import TreeUnit from './TreeUnit.js';

export default ({user,setText}) => {
	
	const getFSUnits = async (path)=>{
		const ops = {
			method: 'GET'
		}
		const query = new URLSearchParams();
		query.set('path', path || '')
		const res = await fetch(`/api/file?${query.toString()}`, ops)
		const {fileList, fileContent} = await res.json();
		return {
			fileList,
			fileContent
		}
	}
	
	const putFSUnits = async (path, data=null)=>{
		const ops = {
			method: 'PUT',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: data,
		}
		const query = new URLSearchParams();
		query.set('path', path || '')
		const res = await fetch(`/api/file?${query.toString()}`, ops)
		console.log(res)
	}
	
	return <ListGroup>
		<TreeUnit
			path={''}
			setText={setText}
			getSubTree={getFSUnits}
	  />
	</ListGroup>
}