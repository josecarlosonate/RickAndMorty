export default class API {
    getCharacter(){
        fetch('https://rickandmortyapi.com/api/character')
        .then((Response) => Response.json())
        .then((data) => console.log('data: ',data.results))
        .catch(function(err) {
            console.error(err);
        });
    }
}