bkLib.onDomLoaded(function(){
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
            content:  noidung
      }
            // console.log(ngu);
            
            // console.log()
      localStorage.setItem("files", JSON.stringify([...files,newFile]));
      files = JSON.parse(localStorage.getItem("files")) || [];
      files.forEach(element => {
            console.log(element.name);
      });
      });
      
      // nicEditors.findEditor( "area" ).setContent(localStorage.getItem("a"));
  });
// var c= document.querySelector(".test");
//       c.innerHTML = `${localStorage.getItem("a")}`

var show = document.querySelector(".show");
var array = JSON.parse(localStorage.getItem("files")) || [];
var sample =document.getElementById("sample");
var side_bar = document.querySelector(".side-bar");
var tools = document.querySelector(".tools");
// var textarea = document.getElementById("area");
show.innerHTML = `<h1>Last file opened</h1>
${array.map(file => {
      
      return `<button onclick="handleClick(this)" value=${file.name}>${file.name}</button>`
    }).join(" ")}`;
var handleClick = function(e){
      alert(e.value); 
      var prg =  array.find(file => file.name === e.value);
      sample.classList.remove("hidden");
      show.remove();
      // side_bar.classList.add("hidden");
      nicEditors.findEditor( "area" ).setContent(prg.content);
      side_bar.innerHTML =`<h2>Last Open File</h2>
                        ${array.map(file => {
            return `<button onclick="handleClick(this)" value=${file.name}>${file.name}</button>`
          }).join(" ")}`;
      
}
tools.addEventListener("click", function(){
      sample.classList.remove("hidden");
      show.remove();
      side_bar.innerHTML =`<h2>Last Open File</h2>
                  ${array.map(file => {
            return `<button onclick="handleClick(this)" value=${file.name}>${file.name}</button>`
          }).join(" ")}`;
      
})