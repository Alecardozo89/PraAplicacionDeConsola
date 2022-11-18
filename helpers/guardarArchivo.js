const fs = require('fs');

const archivo = './DataBase/datos.json'

const guardarArchi = ( data ) =>{
    fs.writeFileSync( archivo, JSON.stringify(data) ); // fs(fileSystem) para guardar en DataBase
}     //el JSON.stringify convierte un objeto a una version de string


const leerBD = () =>{
    
    if (!fs.existsSync(archivo)){ //Para saber si existe algun archivo
        return null;
    }
        const info = fs.readFileSync(archivo, {encoding: 'utf-8'} );
        const data = JSON.parse(info);
        //console.log(data);
   
    return data;
}



module.exports = {
    guardarArchi,
    leerBD
};




