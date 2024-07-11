function roleMiddleware(requiredRole) {
    return (req, res, next) =>{
        const user = req.user;

        if(!user){
            return res.status(401).send("Unauthorized");
        }

        if(user.role !== requiredRole){
            return res.status(403).send("Forbidden");
        }

        next();
    }
}

module.exports = roleMiddleware;
