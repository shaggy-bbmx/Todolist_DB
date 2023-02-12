
exports.getBigDate= ()=>{
    const today=new Date();
    const options={
        day:"numeric",
        month:"long",
        year: "numeric",
        weekday: "long"
    
    };
      
    return today.toLocaleString("en-IN",options);
};


exports.getSmallDate= ()=>{
    const today=new Date();
    const options={
        day:"numeric",
        weekday: "long"
    
    };
      
    return today.toLocaleString("en-IN",options);  
};