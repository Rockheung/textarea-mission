import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

export default function TreeUnit ({path,setText,getSubTree}) {
	const [extend, setExtend] = useState(false);
	const [subTree, setSubTree] = useState([]);
	
	const extendFn = (e) => {
		e.stopPropagation()
		setExtend(!extend);
	}
	
	const makeSubTree = subTreeItem => <TreeUnit
		path={[path,subTreeItem].join('/')}
		setText={setText}
		getSubTree={getSubTree}
	/>
	
	useEffect(()=>{
		if (extend) {
			getSubTree('/'+path)
			.then(res=>{
				const {fileList, fileContent} = res
				setSubTree(fileList)
				setText(fileContent)
				return fileList
			})
			.then(list=>{
				if (list === null) setExtend(false)
			})
		}
	},[extend])
	
	return <ListGroupItem>
		<span><Button size='sm' onClick={extendFn}>{extend ? 'ㅜ' : 'ㅏ'}</Button></span>{path === '' ? '/' : path}
		{extend && <ListGroup>
			{subTree && subTree.map(makeSubTree)}
		</ListGroup>}
	</ListGroupItem>
}