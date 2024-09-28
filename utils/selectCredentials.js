const { expect, test }  = require("@playwright/test");
/**
 * Function for get de properties from an object 
 */
exports.SelectCredentials =  class SelectCredentials {
    constructor(page) {
        this.page = page
    }

    async encontrarPropiedad(objeto, claveBuscada) {
        if (typeof objeto !== 'object' || objeto === null) {
            //not is a object or is null
            return null; 
        }
    
        if (claveBuscada in objeto) {
             // return the value if key is on object
            return objeto[claveBuscada];
        }
    
        // if properties doesn't directly on object, search in nested properties
        for (let clave of Object.keys(objeto)) {
            const valor = objeto[clave];
            if (typeof valor === 'object') {
                // Recursive call to search nested objects
                const resultado  = valor.find(objeto1 => claveBuscada in objeto1); 
                const resultado1 = this.encontrarPropiedad(resultado, claveBuscada);                
                if (resultado1) {
                    return resultado1;
                }
            }
        }
    
        return null; // don't found properties
    }



}