//GLOBAL METHODS
log = function(printThis){
    if (typeof(printThis) == Object){
        printThis = string.toString();
    }
    console.log(printThis)
};


doesNotHaveKey = function(object, key){
    return (object[key] === undefined);
};
