# Quiz

He conseguido hacer una funcion que saque pregunta y respuestas y las imprima.

Como el quiz es de 20, en un principio pretendía sacar 20 preguntas e ir imprimiéndolas aleatoriamente. El problema es que como por un lado imprimes la pregunta como "p" y por otro las respuestas como "inputs", no se puede hacer aleatorio, porque imprimes preguntas y respuestas no relacionadas.

Entonces creo que lo mejor, que es lo que he hecho, es sacar una sola, porque así se imprimen seguro sus respuestas. Faltaría un botón submit que tenga una funcion que haga dos cosas, primero mandar al local storage el resultado y segundo, volver a ejecutar la funcion sacar pregunta, que va a sacar otra nueva totalmente aleatoria. En esta segunda función, poner un contador para que deje de ejecutarse tras 20. Con esto lograríamos 20 preguntas con sus respuestas, y como nunca se repiten, no tenemos que preocuparnos por ordenarlas. El único problema es ordenar las respuestas, que de esta manera siempre salen en el mismo orden. 

Ahora mismo la funcion preguntas imprime un p con la pregunta y un 4 inputs radio, supongo que se podrá hacer de tal manera que se vuelquen sobre el formulario que tenías en html
