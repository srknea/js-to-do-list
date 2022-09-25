const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');


yeniGorevEkleBtn.addEventListener('click', (e) => {
  e.preventDefault();

  //Boş görev eklemeyi engelleme
  if(yeniGorev.value.length > 0){
    gorevItemOlustur(yeniGorev.value);

    //local storage
    localSave(yeniGorev.value);

    yeniGorev.value =''; 
    //Görev eklendikten sonra "Not giriniz" alanını temizler
  }else{
    alert("Lütfen bir şeyler yazınız !");
  }

})

function gorevItemOlustur(gorev){
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item'); //oluşturduğumuz div 'e classname ekledik
    //gorevDiv.classList.add('gorev-tamamlandi');
    
    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
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
    gorevListesi.appendChild(gorevDiv);
  }


gorevListesi.addEventListener('click', (e) => {
    //console.log(e.target);
    const tiklanilanEleman = e.target;

    //Tamamlandı
    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        //console.log("Tamamlandi");
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
        /*butonun parent elementine yani div 'de :
        "gorev-tamamlandi" class adı yoksa ekler,varsa siler*/
    }
    //Sil
    if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        //local storage sil
        //console.log(tiklanilanEleman.parentElement);
        const silinecekGörev = tiklanilanEleman.parentElement.children[0].innerText;
        //console.log(silinecekGörev);
        localDelete(silinecekGörev);
        
        
        //console.log("Sil");
        tiklanilanEleman.parentElement.classList.toggle('kaybol');
        // animasyon için "kaybol" sınıf adı div'e verildi
        
        //animasyon bittikten sonra silme işlemi gercekleşecek
        tiklanilanEleman.parentElement.addEventListener('transitionend', (e) => {
            tiklanilanEleman.parentElement.remove();
        })
    }
})

function localSave(yeniGorev){
    let myArray;
    if(localStorage.getItem('myArray') === null){
        myArray = [];
    } else {
        myArray = JSON.parse(localStorage.getItem('myArray'));
    }

    myArray.push(yeniGorev);

    localStorage.setItem('myArray', JSON.stringify(myArray));
}


function localRead () {
    let myArray;
    if(localStorage.getItem('myArray') === null){
        myArray = [];
    } else {
        myArray = JSON.parse(localStorage.getItem('myArray'));
    }

    myArray.forEach(value => {     
        gorevItemOlustur(value);
    });
}

function localDelete(gorev){
    let myArray;
    if(localStorage.getItem('myArray') === null){
        myArray = [];
    } else {
        myArray = JSON.parse(localStorage.getItem('myArray'));
    }
    
    //splice ile item sil
    const silinecekElemanIndex = myArray.indexOf(gorev);
    //console.log(silinecekElemanIndex);
    myArray.splice(silinecekElemanIndex,1);

    localStorage.setItem('myArray', JSON.stringify(myArray));
}


//Var olan tüm DOM yapısı yüklendikten sonra aşağıdaki çalışır.
document.addEventListener('DOMContentLoaded', localRead);