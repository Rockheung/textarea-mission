import React, { useState, useEffect } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

export default function TreeUnit ({path,setText,setPath,getSubTree,cmdFns}) {
	const [extend, setExtend] = useState(false);
	const [subTree, setSubTree] = useState([]);
	
	
	const extendFn = (e) => {
		e.stopPropagation()
		setExtend(!extend);
	}
	
	const isTarOrZip = path =>{
		return [ 
			path.includes('.tar', path.length - 4),
			path.includes('.zip', path.length - 4)
		].some(b=>b)
	}
	
	const unTatOrZip = () =>cmdFns.untarFn(path)
	
	
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
			.then(()=>setPath(path))
		}
	},[extend])
	
	
	const makeSubTree = subTreeItem => <TreeUnit
		path={[path,subTreeItem].join('/')}
		setText={setText}
	  setPath={setPath}
	  cmdFns={cmdFns}
		getSubTree={getSubTree}
	/>
	
	return <ListGroupItem>
		<span><Button size='sm' onClick={extendFn}>{extend ? 'ㅜ' : 'ㅏ'}</Button></span>{path === '' ? '/' : path}
		{isTarOrZip(path) && <Button size='sm' onClick={unTatOrZip}>Ex</Button>}
		{extend && <ListGroup>
			{subTree && subTree.map(makeSubTree)}
		</ListGroup>}
	</ListGroupItem>
}