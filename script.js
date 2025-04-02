
const imgPoke = document.querySelector('.sprite-poke')
const btnLeft = document.querySelector('#left')
const btnRight= document.querySelector('#right')
const nomePoke = document.querySelector('.nome-pokemon')
const hpPoke = document.querySelector('#hp')
const atkPoke = document.querySelector('#atk')
const defPoke = document.querySelector('#def')
const velPoke = document.querySelector('#vel')
const typePoke = document.querySelector('#tipo-t')
const telaPoke = document.querySelector('#tela-pokedex')
const fotPoke1 = document.querySelector('#fot1')
const fotPoke2 = document.querySelector('#fot2')
const fotPoke3 = document.querySelector('#fot3')
const fotPoke4 = document.querySelector('#fot4')
const pesqPoke = document.querySelector('#pesquisa-pokemon')
const boxPesq = document.querySelector('#box-pesquisa')
const listaP = document.querySelector('.lista-pesq')

let contador = 0

async function getPoke() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`status da respsota: ` + response.status)
        }
        const json = await response.json()
        const lista = json.results
        await modificaPoke(lista[contador].name)
        listaNomesPokes = []
            for(pokemon in lista){
                listaNomesPokes.push(lista[pokemon].name)
            }
        
        
        
        

    }catch(error){
        console.log('erro: '+ error)
    }
}

async function buscaPoke(nome){
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`

    const response = await fetch(url)
    const json = await response.json()
    const pokemon = await json

    return [pokemon.sprites.front_default,pokemon.name,pokemon.id]
  

}

async function modificaPoke(nome){

    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`

    const response = await fetch(url)
    const json = response.json()
    const pokemon = await json
    nomePoke.innerText = pokemon.name
    imgPoke.src = `${pokemon.sprites.other['official-artwork'].front_default}`
    fot1.src = `${pokemon.sprites.other.showdown.front_default}`
    fotPoke2.src = `${pokemon.sprites.other.showdown.back_default}`
    fotPoke3.src = `${pokemon.sprites.other.dream_world.front_default}`
    fotPoke4.src = `${pokemon.sprites.other.home.front_default}`
    typePoke.innerText = `${pokemon.types['0'].type['name']}`
    hpPoke.innerText = `${pokemon.stats['0'].base_stat}`
    atkPoke.innerText =`${pokemon.stats['1'].base_stat}`
    defPoke.innerText = `${pokemon.stats['2'].base_stat}`
    velPoke.innerText = `${pokemon.stats['5'].base_stat}`

    if(pokemon.types['0'].type['name'] == 'grass'){
        telaPoke.style.backgroundColor = '#78C850'
    }else if(pokemon.types['0'].type['name'] == 'fire'){
        telaPoke.style.backgroundColor = '#F08030'
    }else if(pokemon.types['0'].type['name'] == 'water'){
        telaPoke.style.backgroundColor = '#6890F0'
    }else if(pokemon.types['0'].type['name'] == 'electric'){
        telaPoke.style.backgroundColor = '#F8D030'
    }else if(pokemon.types['0'].type['name'] == 'ice'){
        telaPoke.style.backgroundColor = '#98D8D8'
    }else if(pokemon.types['0'].type['name'] == 'fighting'){
        telaPoke.style.backgroundColor = '#C03028'
    }else if(pokemon.types['0'].type['name'] == 'poison'){
        telaPoke.style.backgroundColor = '#A040A0 '
    }else if(pokemon.types['0'].type['name'] == 'ground'){
        telaPoke.style.backgroundColor = '#E0C068'
    }else if(pokemon.types['0'].type['name'] == 'flying'){
        telaPoke.style.backgroundColor = '#A890F0 '
    }else if(pokemon.types['0'].type['name'] == 'psychic'){
        telaPoke.style.backgroundColor = '#F85888 '
    }else if(pokemon.types['0'].type['name'] == 'bug'){
        telaPoke.style.backgroundColor = '#A8B820'
    }else if(pokemon.types['0'].type['name'] == 'rock'){
        telaPoke.style.backgroundColor = '#B8A038'
    }else if(pokemon.types['0'].type['name'] == 'ghost'){
        telaPoke.style.backgroundColor = '#705898 '
    }else if(pokemon.types['0'].type['name'] == 'dragon'){
        telaPoke.style.backgroundColor = '#7038F8'
    }else if(pokemon.types['0'].type['name'] == 'dark'){
        telaPoke.style.backgroundColor = '#705848'
    }else if(pokemon.types['0'].type['name'] == 'steel'){
        telaPoke.style.backgroundColor = '#B8B8D0'
    }else if(pokemon.types['0'].type['name'] == 'fairy'){
        telaPoke.style.backgroundColor = 'pink'
    }else{
        telaPoke.style.backgroundColor = 'white'
    }

}

btnLeft.addEventListener('click',()=>{
    contador--
    if(contador<0){
        contador = 1000
    }
    pesqPoke.removeEventListener('input',(event)=>{
        event.preventDefault()
    })
    getPoke()
})

btnRight.addEventListener('click',()=>{
    contador++
    if(contador > 1000){
        contador = 0
    }
    pesqPoke.removeEventListener('input',(event)=>{
        event.preventDefault()
    })
    getPoke()
})


pesqPoke.addEventListener('input', (event) => {
    event.preventDefault();
    listaF = listaNomesPokes.filter(nome => nome.startsWith(pesqPoke.value))
    if(!pesqPoke.value){
        console.clear()
        console.log("vaazio")
        listaP.innerHTML = ''
    }else{
        console.clear()
        console.log(listaF)
        listaP.innerHTML = ''
        for (let i = 0; i < 5 && i<listaF.length; i++){
           criaListaP(listaF[i])
        }
    }
});



pesqPoke.addEventListener("beforeinput",(event)=>{
    listaF = listaNomesPokes.filter(nome => nome.startsith(pesqPoke.value))
    if(!pesqPoke.value){
        console.clear()
        console.log("vaazio")
        listaP.innerHTML = ''
    }else{
        console.clear()
        console.log(listaF)
        listaP.innerHTML = ''
        for (let i = 0; i < 5 && i<listaF.length; i++){
           criaListaP(listaF[i])
        }
    }
})

async function EscolhePoke(){
    modificaPoke(event.currentTarget.querySelector('p').innerText)
    contador = event.currentTarget.querySelector('span').innerText - 1
    pesqPoke.value = ''
    listaP.innerHTML = ''

}

async function criaListaP(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    const response = await fetch(url)
    const json = await response.json()
    listaP.innerHTML += 
    `
    <li onclick="EscolhePoke()" class="item-poke">
    <img class="poke-img-pesq" src="${json.sprites.front_default}" alt="">
    <p class="nome-pesq">${json.name}</p>
    <p>id:<span>${json.id}</span></p>
    </li>
    `
}

getPoke()


