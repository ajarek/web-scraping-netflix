const input = document.querySelector('#in')
const items = document.querySelectorAll('.item')

const filterList = ()=>{
    items.forEach(item=>{
        
        const match =new RegExp(input.value, 'i').test(item.children[1].innerText)
        console.log(match);
        if(!match){
            item.style.display='none'
        }
        else{
            item.style.display='block'
        }
    })
}
input.addEventListener('keyup',filterList)