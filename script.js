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

let date = new Date();
let timeOpened = date.getDate().toString() + '/'
  + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();

function handleClick() {
  if (location.hash.trim() != "") {
    // var file = JSON.parse(localStorage.getItem('file' + location.hash));
    var a = files.filter(ele => ele.name == decodeURI(location.hash).substring(1));
    console.log(a);
    var file = a.reduce(
      (obj, item) => Object.assign(obj, { "name": item.name, "content": item.content, "download": item.download, "date": item.date })
    )
    console.log(file.name);
    var content = quill.getContents();
    var download = quill.getText();
    var newFile = {
      name: file.name,
      content: content,
      date: timeOpened,
      download: download,
    }
    files = files.filter(ele => ele.name != decodeURI(location.hash).substring(1));
    files.push(newFile);
    localStorage.setItem('files', JSON.stringify(files));
    // localStorage.setItem(`file#${file.name}`, JSON.stringify(newFile));
    notice.remove('hidden');
  } else {
    handleSave();
  }
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
        download: download,
      }
      const found = files.some(el => el.name === newFile.name);
      if (found) {
        var a = confirm("File's name is EXITED. Do you want to replace this file");
        if (a) {
          files = files.filter(ele => ele.name != fileName.value.trim());
          files.push(newFile);
          // localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
          localStorage.setItem('files', JSON.stringify(files));
          notice.remove('hidden');
          save.add('hidden');
          fileName.value = "";
        } else {
          fileName.value = "";
        }
      } else {
        notice.remove('hidden');
        save.add('hidden');
        fileName.value = "";
        files.push(newFile);
        // localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
        localStorage.setItem('files', JSON.stringify(files));
      }
    } else {
      alert("You must type your file's name");
    }
  })
  check[1].addEventListener('click', () => {
    save.add('hidden');
  });
}




/////////////
if (location.hash.trim() != '') {
  // var file = localStorage.getItem('file' + decodeURI(location.hash));
  var a = files.filter(ele => ele.name == decodeURI(location.hash).substring(1));
  var file = a.reduce(
    (obj, item) => Object.assign(obj, { "name": item.name, "content": item.content, "download": item.download, "date": item.date })
  )
  // var newFile = {
  //   name: JSON.parse(file).name,
  //   content: JSON.parse(file).content,
  //   date: timeOpened,
  //   download: JSON.parse(file).download,
  // }
  var newFile = {
    name: file.name,
    content: file.content,
    date: timeOpened,
    download: file.download,
  }
  // var content = JSON.parse(file).content;
    var content = file.content;
  quill.setContents(content);
  // localStorage.setItem(`file#${newFile.name}`, JSON.stringify(newFile));
  files = files.filter(ele => ele.name != file.name);
  files.push(newFile);
  localStorage.setItem('files',JSON.stringify(files));
}
