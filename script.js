bkLib.onDomLoaded(function(){
      // nicEditors.allTextAreas();
      new nicEditor().panelInstance('area');

    var files = JSON.parse(localStorage.getItem("files")) || [];
    
    document.querySelector(".button").addEventListener("click", function(e){
      var d = new Date();   
      var result = prompt("Tên file", "*");
      if(result != null){
            alert("Save Success");
      }
      var noidung = nicEditors.findEditor('area').getContent();
      var newFile = {
            name: result,
            content: noidung
      }
      localStorage.setItem("files", JSON.stringify([...files,newFile]));
      files = JSON.parse(localStorage.getItem("files")) || [];
      files.forEach(element => {
            var date = new Date();
            var lastTimeOpened= date.getDate().toString() +'/' + date.getMonth().toString()+ '/'+ date.getFullYear().toString();
            localStorage.setItem(element.name,lastTimeOpened);
      });
      
      });
      
      // nicEditors.findEditor( "area" ).setContent(localStorage.getItem("a"));
  });

var show = document.querySelector(".show");
var array = JSON.parse(localStorage.getItem("files")) || [];
var sample =document.getElementById("sample");
var side_bar = document.querySelector(".side-bar");


show.innerHTML = `<h1>Last file opened</h1>
${array.map(file => {
      return `<div class="fileOpen">
      <div>
      <i class="fa-regular fa-file-word fa-2x"></i>
      <button onclick="handleClick(this)" value=${file.name}> ${file.name}</button>
      </div>
      <div>Last Time Opened:${localStorage.getItem(file.name)}</div>
      </div>
      `
    }).join(" ")}
    `;
    

var handleClick = function(e){
      // alert(e.value); 
      var prg =  array.find(file => file.name === e.value);
      sample.classList.remove("hidden");
      show.remove();
      // side_bar.classList.add("hidden");
      nicEditors.findEditor( "area" ).setContent(prg.content);
      side_bar.innerHTML =` <div class="tools" onclick="newPage()">
      <i class="fa-solid fa-file"></i>
      New File</div>    
      
      <h2>Last Open File</h2>
                        ${array.map(file => {
            return `
            <div class="opened-file">
            <button onclick="handleClick(this)" value=${file.name}  class="btn btn-light">${file.name}</button>
            <div>Last Time Opened:${localStorage.getItem(file.name)}</div>   
            </div>
            `
          }).join(" ")}
           
          `;
      // side_bar.classList.add("hidden");
      var date = new Date();
      var month = date.getMonth()+1;
      var lastTimeOpened= date.getDate().toString() +'/' + month.toString()+ '/'+ date.getFullYear().toString();
      localStorage.setItem(e.value,lastTimeOpened);
}

var newPage = function(){
      sample.classList.remove("hidden");
            show.remove();
            side_bar.innerHTML =`<div class="tools" onclick="newPage()">
            <i class="fa-solid fa-file"></i>
            New File</div>
            <h2>Last Open File</h2>
                        ${array.map(file => {
                  return `
                  <div class="opened-file">
                  <button onclick="handleClick(this)" value=${file.name}  class="btn btn-light">${file.name}</button>
                  <div>Last Time Opened:${localStorage.getItem(file.name)}</div>
                  </div>
                  `
                }).join(" ")}
                
                `;
            // side_bar.classList.add("hidden");
            nicEditors.findEditor( "area" ).setContent("");
}

// var editor;
//   function reLoadEditor() {
//       editor.removeInstance('area'); 
//       editor = new nicEditor({fullPanel : false}).panelInstance('area');
//   };

//   $(window).resize( function() {
//      reLoadEditor();
//   } );