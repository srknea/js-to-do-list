const yeniGorev = document.getElementsByClassName('input-gorev');
const yeniGorevEkleBtn = document.getElementsByClassName('btn-gorev-ekle');
const gorevListesi = document.getElementsByClassName('gorev-listesi')

for (let i = 0; i < yeniGorevEkleBtn.length; i++) {
  yeniGorevEkleBtn[i].onclick = function(){  
      //Boş görev eklemeyi engelleme
      if(yeniGorev[i].value.length > 0){
        if(i===0){
          gorevItemOlustur(yeniGorev[i].value, gorevListesi[i], false);

          //local storage
          localSave(yeniGorev[i].value, 'firstLocalArray');

          yeniGorev[i].value =''; 
          //Görev eklendikten sonra "Not giriniz" alanını temizler
        }
        else if(i===1){
          gorevItemOlustur(yeniGorev[i].value, gorevListesi[i], false);

          //local storage
          localSave(yeniGorev[i].value, 'secondLocalArray');

          yeniGorev[i].value =''; 
          //Görev eklendikten sonra "Not giriniz" alanını temizler
        }
        else if(i===2){
          gorevItemOlustur(yeniGorev[i].value, gorevListesi[i], false);

          //local storage
          localSave(yeniGorev[i].value, 'thirdLocalArray');

          yeniGorev[i].value =''; 
          //Görev eklendikten sonra "Not giriniz" alanını temizler
        }
        else if(i===3){
          gorevItemOlustur(yeniGorev[i].value, gorevListesi[i], false);

          //local storage
          localSave(yeniGorev[i].value, 'fourthLocalArray');

          yeniGorev[i].value =''; 
          //Görev eklendikten sonra "Not giriniz" alanını temizler
        }
      }   
  }
}

function gorevItemOlustur(gorev, gorevListesiElemani, cizgi){
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item'); //oluşturduğumuz div 'e classname ekledik
    if(cizgi){
      gorevDiv.classList.add('gorev-tamamlandi');
    }
    
    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    /*start: drag and drop*/    
    gorevLi.draggable = 'true'; 
    gorevLi.setAttribute("ondragstart", "drag(event)");  
    gorevLi.setAttribute("id", "drag1");  
    /*end: drag and drop*/    
    gorevDiv.appendChild(gorevLi);

    
    //tamamlandı butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    gorevDiv.appendChild(gorevTamamBtn);
    
  
    //tamamlandı butonu ekle
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    gorevDiv.appendChild(gorevSilBtn);
  
    //ul 'ye oluşturduğumuz div 'i ekleme
    gorevListesiElemani.appendChild(gorevDiv);
  }

for (let i = 0; i < gorevListesi.length; i++) {
  gorevListesi[i].addEventListener('click', (e) => {
    //console.log(e.target);
    const tiklanilanEleman = e.target;
    
    //Tamamlandı
    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        //console.log("Tamamlandi");
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
        //butonun parent elementine yani div 'de : gorev-tamamlandi" class adı yoksa ekler,varsa siler
    }
    //Sil
    if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        //local storage sil
  
        //console.log(tiklanilanEleman.parentElement);
        const silinecekGörev = tiklanilanEleman.parentElement.children[0].innerText;
        //console.log(silinecekGörev);
        
        if(i===0){
          localDelete(silinecekGörev, 'firstLocalArray');
        }
        else if(i===1){
          localDelete(silinecekGörev, 'secondLocalArray');
        }
        else if(i===2){
          localDelete(silinecekGörev, 'thirdLocalArray');
        }
        else if(i===3){
          localDelete(silinecekGörev, 'fourthLocalArray');
        }
        
        //console.log("Sil");
        tiklanilanEleman.parentElement.classList.toggle('kaybol');
        // animasyon için "kaybol" sınıf adı div'e verildi
        
        //animasyon bittikten sonra silme işlemi gercekleşecek
        tiklanilanEleman.parentElement.addEventListener('transitionend', (e) => {
            tiklanilanEleman.parentElement.remove();
        })
    }
  })
}

function localSave(yeniGorev, localArrayName){
    let array = localStorageArrayDonustur(localArrayName);
    array.push(yeniGorev);
    localStorage.setItem(localArrayName, JSON.stringify(array));
}


function localRead (localArrayName) {
    let array = localStorageArrayDonustur(localArrayName);
    
    if(localArrayName === 'firstLocalArray'){
      array.forEach(value => {     
        gorevItemOlustur(value, gorevListesi[0], false);
      });
    }

    if(localArrayName === 'secondLocalArray'){
      array.forEach(value => {     
        gorevItemOlustur(value, gorevListesi[1],false);
      });
    }

    if(localArrayName === 'thirdLocalArray'){
      array.forEach(value => {     
        gorevItemOlustur(value, gorevListesi[2],false);
      });
    }

    if(localArrayName === 'fourthLocalArray'){
      array.forEach(value => {     
        gorevItemOlustur(value, gorevListesi[3],false);
      });
    }
}

function localDelete(gorev, localArrayName){
    let array = localStorageArrayDonustur(localArrayName);
    
    //splice ile item sil
    const silinecekElemanIndex = array.indexOf(gorev);
    //console.log(silinecekElemanIndex);
    array.splice(silinecekElemanIndex,1);

    localStorage.setItem(localArrayName, JSON.stringify(array));
}

function localStorageArrayDonustur (value) {
    let myArray;
    if(localStorage.getItem(value) === null){
        myArray = [];
    } else {
        myArray = JSON.parse(localStorage.getItem(value));
    }
    return myArray;
}

/* start: demo */
demoListItem('firstLocalArray', gorevListesi[0]);
demoListItem('secondLocalArray', gorevListesi[1]);
demoListItem('thirdLocalArray', gorevListesi[2]);
demoListItem('fourthLocalArray', gorevListesi[3]);

function demoListItem (localArrayName,gorevListesiElemani) {
  let array = localStorageArrayDonustur(localArrayName);
  console.log(array);
  if(array.length === 0){
    gorevItemOlustur('Test', gorevListesiElemani, true);  
  }
}
/*end: demo */

/*start: drag and drop*/
let silinecekGörev;
let listeden;
let localArray;
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  //sürüke
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    
     //local silme
     silinecekGörev = ev.target.innerText;
     listeden = ev.target.parentElement;
     localArray = ev.target.parentElement.parentElement.parentElement.id;
  }
  
  //bırak
  function drop(ev) {
    ev.preventDefault();

    if(localArray === 'firstDiv'){
      localDelete(silinecekGörev, 'firstLocalArray');
    }
    else if(localArray === 'secondDiv'){
      localDelete(silinecekGörev, 'secondLocalArray');
    }
    else if(localArray === 'thirdDiv'){
      localDelete(silinecekGörev, 'thirdLocalArray');
    }
    else if(localArray === 'fourthDiv'){
      localDelete(silinecekGörev, 'thirdLocalArray');
    }

    //listeden çıkarma
    listeden.remove();
  }
/*end: drag and drop*/

/*start: alert */
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}
/*end: alert */


//Var olan tüm DOM yapısı yüklendikten sonra aşağıdaki çalışır.
document.addEventListener('DOMContentLoaded', localRead('firstLocalArray'));
document.addEventListener('DOMContentLoaded', localRead('secondLocalArray'));
document.addEventListener('DOMContentLoaded', localRead('thirdLocalArray'));
document.addEventListener('DOMContentLoaded', localRead('fourthLocalArray'));