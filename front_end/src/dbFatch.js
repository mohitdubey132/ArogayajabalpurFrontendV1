
/**create(POST) API  */
const hostURL = "http://localhost:5000"
export async function Fetch(path, data) {
    try {
        const endpoint =  hostURL;
        const response = await fetch(endpoint.concat(path), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data),
            
        });
        console.log(data,'data');
        const body = await response.text();
        const result = JSON.parse(body);
        return result;
    }
    catch (e) {
        return {
            success: false,
            message: "Internal server error"
        };
    }
};

/**GET API  */
export async function Get(query) {
    try {
        const endpoint = hostURL + query;
        console.log(endpoint)
        const response = await fetch(endpoint);
        const body = await response.text();
        const result = JSON.parse(body);
        return result;
    }
    catch (e) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
} 

/**UPDATE(PUT) API USE    */
export async function Update(path,data){
    try{
             const endpoint = hostURL;
             const response = await fetch(endpoint.concat(path),{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: (data ? JSON.stringify({
                    data,
                }): null),
             });
             const body = await response.text();
             const result = JSON.parse(body);
             return result;
     
    }
    catch(e){
          return{       
        success:false,
        message:'Internal server error'
    }
    }
}

/**DELETE API  */
export async function Delete(path,data){
    try{
             const endpoint = hostURL;
             const response = await fetch(endpoint.concat(path),{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: (data ? JSON.stringify({
                    data,
                }): null),
             });
             const body = await response.text();
             const result = JSON.parse(body);
             return result;
     
    }
    catch(e){
          return{       
        success:false,
        message:'Internal server error'
    }
    }
}