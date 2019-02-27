'use strict';

module.exports = function(Todo) {

// Asignar como 'owner' de la lista que se va a crear, al usuario que solicita su creación
    Todo.beforeRemote('create', function (context, Todo, next) {
        context.args.data.owner = context.req.accessToken.id;
        next();
    });
    Todo.beforeRemote('create', function (context, Todo, next) {
        if (Date.now() <= context.args.data.date) {
	        next();
        }else{
            console.log("No es posible generar un evento pasado");
        }
    });
  
	// Asignar el id de la lista recién creada, al usuario que la creó
    Todo.afterRemote('create', function (context, Todo, next) {
    	Todo.propietario(function(err, usuario){
    		if(err) next(err);
    		usuario.TodoId = Todo.id;
    		usuario.save(function(err, usuario){
    			if(err) next(err);
    			next();
    		})
    	})
});


    /**
	 * Muestra los modelos pendientes
	 * @param {Function(Error, string)} callback
	 */

	Todo.prototype.eventosPendientes = function(callback) {
	  var eventosPendientes;
	  // TODO
	  if (!this.isComplete) {
	  	callback(null, eventosPendientes);
	  }
	};


};
