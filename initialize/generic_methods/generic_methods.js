GenericOnLoginSuccess = function(params){

    var res             = params['settings']['res'],
        req             = params['settings']['req'],
        responseBody    = params['responseBody'];

    if (isErrorFreeResponse(responseBody)){
        var user = responseBody['user'];
        req.session.currentUser = user;
        res.render('home', {
            user: user
        });
    }else{
        res.json({error: params['response'], msg: 'Error Logging in.'})
    }

};

isErrorFreeResponse = function(response){
    if (typeof(response) !== 'object') return false;
    var error   = response['error'];

    return (error === null || error === undefined);
};


GenericOnGetError = function(params){
    var res             = params['settings']['res'],
        req             = params['settings']['req'],
        responseBody    = params['responseBody'];
    //TODO - catch all errors not here but by emitting an event
    console.log('GenericOnGetError got this ' + params['responseBody']);
    res.json({error: params['responseBody'], msg: 'Error Logging in.'})
};

isLoggedIn = function(req){
    return req.session.currentUser !== undefined
};

GenericOnLogoutSuccess = function(params){
    var res         = params['settings']['res'],
        req         = params['settings']['req'],
        response    = params['response'];

    req.session.destroy();
    res.redirect('/');
};