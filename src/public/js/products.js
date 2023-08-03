const token = window.localStorage.getItem('token')

fetch('/products',{
    method:'GET',
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json",
        'authorization':`Bearer ${token}`
    }
}).then(response=>{
    if(response.status===401){
     window.location.replace('/login')
    }else{
        return response.json();
    }
})
