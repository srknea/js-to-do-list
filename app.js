const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', (e) => {
  e.preventDefault();

  //div oluşturma
  const gorevDiv = document.createElement('div');
  gorevDiv.classList.add('gorev-item'); //oluşturduğumuz div 'e classname ekledik
  //gorevDiv.classList.add('gorev-tamamlandi');
  
  //li oluşturma
  const gorevLi = document.createElement('li');
  gorevLi.classList.add('gorev-tanim');
  gorevLi.innerText = yeniGorev.value;
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

  yeniGorev.value =''; 
  //Görev eklendikten sonra "Not giriniz" alanını temizler
  
})

gorevListesi.addEventListener('click', (e) => {
    //console.log(e.target);
    const tiklanilanEleman = e.target;

    //Tamamlan
    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        //console.log("Tamamlandi");
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
        /*butonun parent elementine yani div 'de :
        "gorev-tamamlandi" class adı yoksa ekler,varsa siler*/
    }
    //Sil
    if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        //console.log("Sil");
        tiklanilanEleman.parentElement.classList.toggle('kaybol');
        // animasyon için "kaybol" sınıf adı div'e verildi

        //animasyon bittikten sonra silme işlemi gercekleşecek
        tiklanilanEleman.parentElement.addEventListener('transitionend', (e) => {
            tiklanilanEleman.parentElement.remove();
        })
    }
})
