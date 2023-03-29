var fileOpened = document.querySelector('.fileOpened');

var array = JSON.parse(localStorage.getItem("files")) || [];
function load(array){
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
                <i class="fa-solid fa-download download"></i>
                <i class="fa-solid fa-trash delete" ></i>
                </div>
                </div>
                
        `
    })
}
load(array);

document.querySelectorAll('.download').forEach(ele => {
    ele.addEventListener('click', () => {
        var fileName = ele.parentNode.id;
        var file = JSON.parse(localStorage.getItem("file#" + fileName));
        downloadURI(`data:text/html,${file.download}`, `${file.name}.txt`);
    })
});

document.querySelectorAll('.delete').forEach(ele => {
    ele.addEventListener('click', () => {
        var fileName = ele.parentNode.id;
        localStorage.removeItem("file#" + fileName);
        array = array.filter(file => file.name != fileName);
        fileOpened.innerHTML = `<h1>Last file opened</h1>`;
        load(array);
        localStorage.setItem("files",JSON.stringify(array))
    })
});
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

