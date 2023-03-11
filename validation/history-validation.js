let dictionary = localStorage.getItem('dictionary');
dictionary = JSON.parse(dictionary);
let index = 0;

function removeAll() {
    localStorage.removeItem('dictionary');
    var dictionary = [];
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
}
function deletePerticularbox(event){
    event.target.setAttribute('id','delete-box');
    let detail = document.getElementById('delete-box');
    let delete_word = detail.parentElement.parentElement.parentElement.children[1].children[0].innerHTML;
    console.log(delete_word); 
    for(let i=0; i<dictionary.length; i++){
        console.log(dictionary[i].word);
        if(`Word: ${dictionary[i].word}` == delete_word){
            console.log("case in");
            dictionary.splice(i,1);
            localStorage.setItem('dictionary',JSON.stringify(dictionary));
            detail.parentElement.parentElement.parentElement.remove();
            if(dictionary.length == 0){
                document.getElementById("message-not-found").innerHTML = "OOps, stack is empty!!";
                document.getElementById('remove').innerHTML = "";
            }
            break;
        }
    }
}

(function chal() {
    if (dictionary.length > 0) {
        document.getElementById('remove').innerHTML = "Remove All";
    }
    if (dictionary.length <= 0) {
        document.getElementById("message-not-found").innerHTML = "OOps, stack is empty!!";
    }
    for (index = 0; index < dictionary.length; index++) {
        // box created
        let box_parent = document.createElement('div');
        box_parent.setAttribute('class', 'box');

        // counter creating...
        let counter_box = document.createElement('div');
        counter_box.innerHTML = `${dictionary[index].counter}`;
        counter_box.setAttribute('class','counter');
        box_parent.appendChild(counter_box);

        //header created..
        let box_header = document.createElement('div');
        box_header.setAttribute('class', 'box-header');
        let heading = document.createElement('h3');
        heading.setAttribute('class','heading-word');
        console.log("line 15");
        let heading_text = document.createTextNode(`Word: ${dictionary[index].word}`);
        console.log("line 17");
        heading.appendChild(heading_text);
        box_header.appendChild(heading);
        box_parent.appendChild(box_header);

        //body created
        let box_body = document.createElement('div');
        box_body.setAttribute('class', 'box-body');
        let text_body = document.createTextNode(`meaning: ${dictionary[index].meaning}`);
        box_body.appendChild(text_body);
        box_parent.appendChild(box_body);

        //footer created
        let box_footer = document.createElement('div');
        box_footer.setAttribute('class', 'box-footer');

        let btn = document.createElement('button');
        btn.setAttribute('class', 'delete');
        btn.setAttribute('onclick', 'deletePerticularbox(event)');
        let i = document.createElement('i');
        i.setAttribute('class', 'bx bx-trash');
        btn.appendChild(i);
        box_footer.appendChild(btn);
        box_parent.appendChild(box_footer);

        //finally adding box to container body
        let container_body = document.getElementById('container-body');
        container_body.appendChild(box_parent);

    }
})();

///finding word in page
function findInPage(){
    let header = document.getElementsByClassName('heading-word');
    let search_input = document.getElementById('search-input').value;
    if(search_input != "")
    for(var i=0; i<header.length; i++){
        console.log(header[i].innerHTML);
        if(header[i].innerHTML == `Word: ${search_input}`){
            console.log("matched string");
            header[i].parentElement.parentElement.setAttribute('id','target-box');
            document.getElementById("find-alert").innerHTML = "";
            break;
        }
    }
    if(i >= header.length){
        document.getElementById("find-alert").innerHTML = "OOps, no item fond!";
    }
}

