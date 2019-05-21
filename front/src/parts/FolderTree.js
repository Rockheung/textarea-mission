import React, {useEffect} from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap'; 
import TreeUnit from './TreeUnit.js';

export default ({user,setText}) => {
	
	const getFSUnits = async (path)=>{
		path = path
			.replace(/\.\./g,'')
			.replace(/\/+/g,'/')
			.replace(/\.\//g,'')
			.replace(/.\/$/g,'')
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
	return <ListGroup>
		<TreeUnit
			path={''}
			setText={setText}
			getSubTree={getFSUnits}
	  />
	</ListGroup>
}