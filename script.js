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


var files = JSON.parse(localStorage.getItem('files')) || [];
var button = document.querySelector('.button');
var save = document.querySelector(".save").classList;
var notice = document.querySelector('.notice').classList;
var check = document.querySelectorAll(".save .check button");


document.querySelectorAll(".close-btn").forEach(ele => {
  ele.addEventListener('click', () => {
    save.add('hidden');
    notice.add('hidden');
  })
});
// exit[0].addEventListener('click', () => {
//   save.add('hidden');
// });
// exit[1].addEventListener('click', () => {
//   notice.add('hidden');
// })

let date = new Date();
let timeOpened = date.getDate().toString() + '/'
  + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();

function handleClick() {
  if (location.hash.trim() != "") {
    var file = JSON.parse(localStorage.getItem('file' + location.hash));
    var content = quill.getContents();
    var download = quill.getText();
    var newFile = {
      name: file.name,
      content: content,
      date: timeOpened,
      download: download
    }
    localStorage.setItem(`file#${file.name}`, JSON.stringify(newFile));
    notice.remove('hidden');
  } else {
    handleSave();
  }
}
if (location.hash.trim() != '') {
  var file = localStorage.getItem('file' + decodeURI(location.hash));
  var newFile = {
    name: JSON.parse(file).name,
    content: JSON.parse(file).content,
    date: timeOpened,
    download: JSON.parse(file).download,
  }
  var content = JSON.parse(file).content;
  quill.setContents(content);
  localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
}


function handleSave() {
  save.remove('hidden')
  check[0].addEventListener('click', () => {
    var fileName = document.getElementById("fileName");

    if (fileName.value.trim() != "") {
      var content = quill.getContents();
      var download = quill.getText();
      var newFile = {
        name: fileName.value,
        content: content,
        date: timeOpened,
        download: download
      }

      const found = files.some(el => el.name === newFile.name);
      if (found) {
        var a = confirm("File's name is EXITED. Do you want to replace this file");
        if (a) {
          // localStorage.setItem(`file${location.hash.trim()}`, JSON.stringify(newFile));
          // localStorage.setItem('files', JSON.stringify(files));
          notice.remove('hidden');
          save.add('hidden');
          fileName.value = "";
        } else {
          fileName.value = "";
        }
      } else {
        files.push(newFile);
        notice.remove('hidden');
        save.add('hidden');
        fileName.value = "";
      }
      localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
      localStorage.setItem('files', JSON.stringify(files));
    } else {
      alert("You must type your file's name");
    }
  })
  check[1].addEventListener('click', () => {
    save.add('hidden');
  });
}