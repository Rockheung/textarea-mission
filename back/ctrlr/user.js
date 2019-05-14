const { getDB } = require("../mdl")
const { addUser } = require("../mdl/user.js")

// signup
exports.post = async ({res,queryString, body, header}) => {
	try {
		await addUser({db: getDB(), data: {...body, ...header}})
		res.write(JSON.stringify({status:'user post ok:'+ queryString + JSON.stringify(body)}))
		res.statusCode = 201;
		res.end()	
	} catch (e) {
		res.statusCode = 400;
		res.write(JSON.stringify({status:e.message}));
		res.end();
	}  
}
