var fileOpened = document.querySelector('.fileOpened');

var array = JSON.parse(localStorage.getItem("files")) || [];
// fileOpened.innerHTML = `
//                 <h1>Last file opened</h1>
//             ${array.map(file => {
//     return `
//                     <div class="file" onclick="handleClick()">
//                     <a href="/index.html#${file.name}">
//                         <i class="fa-regular fa-file-word fa-2x"></i>
//                         <button> ${file.name}</button>
//                     </a>
//                     <div>${file.date}</div>
//                     </div>
//                     `
// }).join(" ")}
//                 `;
for(let i = 0; i < array.length; i++){
    var file  = JSON.parse(localStorage.getItem("file#" + array[i].name))
    fileOpened.innerHTML += `
            <div class="file" onclick="handleClick()">
            <a href="/index.html#${file.name}">
                <i class="fa-regular fa-file-word fa-2x"></i>
                <button> ${file.name}</button>
            </a>
            <div>${file.date}</div>
            </div>
    `
}



