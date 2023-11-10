let input=document.querySelector("#search");
let lab=document.querySelector("#lab");
let h1=document.querySelector("h1");
let p=document.createElement("p");
let meaning=document.querySelector(".means");

let text=document.querySelector("#text");

let line1=document.querySelector("#line");

let crl=document.querySelector(".crl");

let audio=document.querySelector("audio");

let error=document.querySelector("#error");

let input_box=document.querySelector("#input_box");

function on_of() {
 var on_of=document.getElementById("container");
    on_of.classList.toggle("container1");
}

fontfamily.addEventListener("change", (event) => {
    console.log(event.target.value);
    document.body.className = "";
    document.body.classList.add(event.target.value);
});

let d;
function api(word) {
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then((response)=>response.json())
.then((data)=>{
    error.style.display="none";
    if (data.title=="No Definitions Found") {
        text.style.display="none";
        line1.style.display="none";
        return error.style.display=""; 
    }
    inputtext(data[0]);
    });
}
input.addEventListener("keyup" , function (event) {
    if((event.key=="Enter") && (input.value=="")){
            text.style.display="none";
            line1.style.display="none";
            let h=document.querySelector("#ppp");
            h.innerHTML="Whoops, can’t be empty…";
            input_box.style.border="1px solid red";
            return ;
    } 
    if(event.key=="Enter"){
        api(input.value);
        input.value="";
        meaning.innerHTML="";
    } 
});

function inputtext(data){

    h1.textContent=data.word;
    p.textContent=data.phonetic;
    h1.appendChild(p);

    source.setAttribute("href",data.sourceUrls)
    source.textContent=data.sourceUrls;

    console.log(data);
    let mean=data.meanings;

    let audioScr=data.phonetics.filter((el)=> Boolean(el.audio) !=false)[0]?.audio;

    if((data.phonetics!="")){

        audio.setAttribute("src",audioScr);
        console.log(audioScr);
        
        crl.addEventListener("click", ()=>{
            audio.play();
        });
    }
    else{
        crl.style.display="none";
    }

    for (let i = 0; i < mean.length; i++) {
        turkum(mean[i]);
    }  
}
api("keyboard");

function turkum(d) {
    let box=document.createElement("div");
    let line=document.createElement("div");
    let h2=document.createElement("h2");
    

    line.className="line";
    box.appendChild(h2);
    box.appendChild(line);
    meaning.appendChild(box);

    h2.textContent=d.partOfSpeech;
        abd(d.definitions);
        abd2(d.synonyms);
        abd3(d.antonyms);
    
}

// lab.addEventListener("click", function(){
//     console.log(input.value);
//     let word=input.value;
//     h1.textContent=d.word;
//     return word;
// });

function abd(params) {
    if (params!="") {
        let h3=document.createElement("h3");
        let ul_box=document.createElement("div");
        let ul=document.createElement("ul");
        let param=params;
    for (let i = 0; i < param.length; i++) {
        let li=document.createElement("li");
        li.textContent=param[i].definition;
        ul.appendChild(li);
    }
    h3.textContent="Meaning";
    ul_box.className="meaning"
    ul_box.appendChild(h3);
    ul_box.appendChild(ul);
    meaning.appendChild(ul_box);
    }
}
function abd2(params) {
    if (params!="") {
        let h3=document.createElement("h3");
        let h4=document.createElement("span");
        let param=params;
        let a="";
    for (let i = 0; i < param.length; i++) {
        a=a+param[i]+" ,";
    }
        h3.textContent="Synonyms";
        h4.textContent=`${a}`;
        h3.appendChild(h4);
        meaning.appendChild(h3);
    }
}
function abd3(params) {
    if (params!="") {
        let h3=document.createElement("h3");
        let h4=document.createElement("span");
        let param=params;
        let a="";
    for (let i = 0; i < param.length; i++) {
        a=a + param[i] + " ,";
    }
        h3.textContent="Antonyms";
        h4.textContent=`${a}`;
        h3.appendChild(h4);
        meaning.appendChild(h3);
    }
}
// function audio(params) {
    
// }