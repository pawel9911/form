document.addEventListener('DOMContentLoaded', function(){
    const inputs = document.querySelectorAll("input");
    const inputType = document.querySelector("#type");
    const button = document.querySelector("#submitButton");
    const label = document.querySelector(".uniqueCode");
    const inputImage = document.querySelector("#image");
    const imagePreview = document.querySelector("#preview")
    const textPreview = document.querySelector('span');

    let personData = {
        name: "",
        surname: "",
        type: "",
        id: "",
        image: ""
    }
    inputs.forEach((element)=>{
        element.addEventListener("change", function(){
            const name = element.name;            
            personData = {
                ...personData,
                [name]: element.value,
            };
            console.log(personData)
        })
    })
    inputType.addEventListener("change", function(){
        personData = {
            ...personData,
            type: inputType.value
        }
        if(inputType.value === "osoba"){
            label.innerText = "Pesel"
        }
        else{
            label.innerText = "NIP"
        }
    })
    inputImage.addEventListener("change", function(){
        const file = this.files[0];
        
        if(file){
            const reader = new FileReader();

            imagePreview.style.display = "block";
            textPreview.style.display = "none";

            reader.addEventListener("load", function(){
                console.log(this)
                imagePreview.setAttribute("src", this.result)
            })
            reader.readAsDataURL(file)
        }
    })
    
    button.addEventListener("click", function(event){
        event.preventDefault();
        console.log(personData.id.length)
        if (((personData.id.length === 11) && (personData.type ==="osoba"))|| ((personData.id.length === 10) && (personData.type ==="firma"))){
            fetch('https://localhost:60001/Contractor/Save',{
                method: "POST",
                body: JSON.stringify(personData),
                headers: {
                    "content-type": "aplication/json"
                }
            })
        }
        else {
            alert("Nie znaleziono metody zapisu")
        }
    })
})
