let toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "+1" }, { indent: "-1" }],
  [{ indent: "+1" }, { indent: "-1" }],
  [{ indent: "+1" }, { indent: "-1" }],
  [{ align: [] }],
  [{ size: ['small', 'large', 'huge', false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  ["image", "link", "video", "formula"],

]
let quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: "snow",

})


var files = [];

var button = document.querySelector('.button')
let date = new Date();
let timeOpened = date.getDate().toString() + '/' 
                + (date.getMonth() + 1).toString() + '/'+ date.getFullYear().toString();
function handleClick() {
  
  var fileName = prompt("Tên file", "*");
  if (fileName != null) {
    alert("Save Success");
  }
  var content = quill.getContents();
  var newFile = {
    name: fileName,
    content: content,
    date : timeOpened,
  }
  files.push(newFile);
  localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
  localStorage.setItem('files', JSON.stringify(files));
}
var file = localStorage.getItem('file' + location.hash);
var newFile = {
  name: JSON.parse(file).name,
  content : JSON.parse(file).content,
  date : timeOpened,
}
var content = JSON.parse(file).content;
quill.setContents(content);
localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
