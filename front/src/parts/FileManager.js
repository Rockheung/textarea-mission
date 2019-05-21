import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FolderTree from './FolderTree.js';
import Editor from './Editor.js';

import FileUpload from './FileUpload.js';

export default ({user}) => {
	
	const [files, setFiles] = useState([]);
	const [text, setText] = useState('');
	const [path, setPath] = useState(null);

	
	const sendFiles = async files => {
		if (files.length === 0) return null;
		let formFiles = new FormData();
		for (let i=0; i<files.length; i++) {
			formFiles.append(i,files[i])
		}

		const ops = {
			method: 'POST',
			body: formFiles
		}
		let res = await fetch('/api/file', ops)
		setFiles([])
		console.log(res)
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
	
	useEffect(()=>{
		console.log('effect')
		sendFiles(files)
	},[files])
	
	return <>
		<Container fluid>
			<Row>
				<Col sm="4">
					<FileUpload
						setFiles={setFiles}
					/>
					<FolderTree 
						user={user}
						setText={setText}
						setPath={setPath}
						untarFn={putFSUnits}
					/>
				</Col>
				<Col sm="8">
					<Editor 
						user={user}
						path={path}
						text={text}
						setText={setText}
						saveFn={putFSUnits}
					/>
				</Col>
			</Row>
		</Container>
	</>
}