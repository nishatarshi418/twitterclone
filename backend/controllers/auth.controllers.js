export const signup = async(res,req) =>{
    
        res.json({
            data:"you hit the signup endpoint",

        });
}

export const login = async(res,req) =>{
    
    res.json({
        data:"you hit the login endpoint",
        
    });
}

export const logout = async(res,req) =>{
    
    res.json({
        data:"you hit the logout endpoint",
        
    });
}