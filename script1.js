var fileOpened = document.querySelector('.fileOpened');

var array = JSON.parse(localStorage.getItem("files")) || [];
function load(array) {
    array.map(file => {
        fileOpened.innerHTML += `
                <div class="file">
                <div class="inforFile">
                <a href="/index.html#${file.name}">
                    <i class="fa-regular fa-file-word fa-2x"></i>
                    <button> ${file.name}</button>
                </a>
                <div>${file.date}</div>
                </div>
                <div class="option" id= "${file.name}">
                <i class="fa-solid fa-download download" onclick="download('${file.name}')"></i>
                <i class="fa-solid fa-pen rename" onclick="rename('${file.name}')" ></i>
                <i class="fa-solid fa-trash delete" onclick="handleDelete('${file.name}')" ></i>
                </div>
                </div>
                
        `
    })
}
load(array);

function download(name) {
    var a = array.filter(ele => ele.name == name);
    var file = a.reduce(
        (obj, item) => Object.assign(obj, { "name": item.name, "content": item.content, "download": item.download, "date": item.date })
    )
    downloadURI(`data:text/html,${file.download}`, `${file.name}.txt`);
}



function handleDelete(name) {
    array = array.filter(file => file.name != name);
    fileOpened.innerHTML = `<h1>Last file opened</h1>`;
    load(array);
    localStorage.setItem("files", JSON.stringify(array))
}


function rename(name){
    var check = document.querySelectorAll('.check button');
    var Rename = document.querySelector('.save').classList;
    Rename.remove('hidden');
    document.querySelector('.close-btn').addEventListener('click', () => {
        Rename.add('hidden');
        fileName.value = '';
    });
    var a = array.filter(ele => ele.name == name);
    var file = a.reduce(
        (obj, item) => Object.assign(obj, { "name": item.name, "content": item.content, "download": item.download, "date": item.date })
    )
    check[0].addEventListener('click', () => {
        if (fileName.value.trim() != "") {
            var newFile = {
                name: fileName.value,
                content: file.content,
                date: file.date,
                download: file.download,
            }
            const found = array.some(el => el.name === newFile.name);
            if (found) {
                var a = confirm("File's name is EXITED. Do you want to replace this file");
                if (a) {
                   
                    array.push(newFile);
                    localStorage.setItem('files', JSON.stringify(array));
                    Rename.add('hidden');
                
                } else {
                    fileName.value = "";
                }
            } else {
                array.push(newFile);
                Rename.add('hidden');
                
                array = array.filter(ele => ele.name != file.name);
                localStorage.setItem('files', JSON.stringify(array));
                fileOpened.innerHTML = `<h1>Last file opened</h1>`;
                load(array);
            }

        } else {
            alert("You must type your file's name");
        }
        

    })
    check[1].addEventListener('click', () => {
        fileName.value = '';
        Rename.add('hidden')
    })
}


function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

