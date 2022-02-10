const Parse = form=>{
    const input = form.querySelector('input').value
    const select = form.querySelector('select').value
    if(input!=''){
        axios.post('script.php', {
            rawDate: input,
            parse_type: select
        })
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
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