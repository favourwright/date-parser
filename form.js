const Modal=data=>{
    const modal = document.querySelector('.modal')
    modal.querySelector('h2').innerHTML=data
    modal.classList.add('active')
    
    const display = setTimeout(()=>{
        modal.classList.add('close')
        const closing = setTimeout(() =>{
            modal.classList.remove('close')
            modal.classList.remove('active')
            clearTimeout(closing)
        }, 1000)
        clearTimeout(display)
    }, 5000)
}
const Parse = form=>{
    const input = form.querySelector('input').value
    const select = form.querySelector('select').value
    if(input!=''){
        axios.post('script.php', {
            raw_date: input,
            parse_type: select
        })
        .then(({data})=>Modal(data))
        .catch(error=>console.log(error))
    }
}
const Bootstrap = ()=>{
    const form = document.querySelector('form')
    const input = form.querySelector('input')
    form.addEventListener('change',()=>Parse(form))
    form.addEventListener('submit',ev=>{
        ev.preventDefault()
        Parse(form)
    })
}
document.addEventListener("DOMContentLoaded", ()=>Bootstrap())