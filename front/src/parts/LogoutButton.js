import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

export default props => {
	
	const [fetching, setFetching] = useState(false);
	
	const logoutClick = () => setFetching(true)
	
	const logoutRequest = async (fetchingStatus) => {
		try {
			if (fetchingStatus) {
				const res = await fetch('/api/session', {method: 'DELETE'});
				if (res.ok) {
					setFetching(false)
					props.logout(null)
				}
        if (res.status === 204){
					throw new Error('You havn\'t logged in')
				}
			} else {
				throw new Error('Logout is proceeding')
			}	
		} catch (e) {
			console.log(e.message)
		}
		
	}
	
	useEffect(()=>{
		logoutRequest(fetching)
	},[fetching])
	
	return <Button
		onClick={logoutClick}
	>
		{props.children}
	</Button>
}