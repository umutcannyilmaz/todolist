
// 1. ADIM
const input = document.querySelector("#task");
let ulDOM = document.querySelector("#list");
let liDOM = document.createElement("li");
let addBtn = document.querySelector("#liveToastBtn");
// 2. ADIM
// addBtn.addEventListener("click", çalıştırılacak fonksiyonun adı) 
// function fonksiyonun adı(){}
// zaten onclick eklenmiş gerek yok newElement fonk var

function newElement() {
  if (
    input.value == "" ||
    input.value == input.defaultValue ||
    input.value.trim() == "" // baştan ve sondan bosluklar silindikten sonra 
  ) {
    $(".error").toast("show");
    input.value = ""; // input alanını sıfırladık

  } else if (input.value.length>0 ){
    let liDOM = document.createElement("li")
     // dışarıdan alsaydık liDOMu beklenmedik sonuç veriyor bu yüzden fonksiyon içinde yap
     // hep aynı li yi değiştirip yeni li oluşturmuyor
     let ulDOM = document.querySelector("#list")
    liDOM.innerHTML = input.value;
    ulDOM.appendChild(liDOM);
    $(".success").toast("show");
    //input.value=""; // input alanını sıfırlıyor ileride input.value değerini kullanamazsın
    
    //********************************************************************* */
   let span = document.createElement("span")
    span.innerHTML= "&#10005" // çarpı işareti
    span.className= "close" // spana class vermeseydik direk yazı sonunu eklenirdi. css de yerini ayarladık
    liDOM.appendChild(span);

    //******************************************************************* */
    // addEventListener("click",(parametre)=>{})
    span.addEventListener("click",(event) => {
      /*
        Bir olayın olduğu yer için işlem yapılacaksa
        fonksiyonun () içine event ekle ve
        event.target kullan
        */
    liDOM.remove()
    let todoArr =JSON.parse( localStorage.getItem("todoArr"));
    let liText = event.target.parentElement.innerText; 

    /* innerText ile başlık etiketinin içerisindeki sadece metni alabilirsin.
        textContent ile innerText aynı işlevi görür. 
       innerHtml ile başlık etiketi içindeki metni at başlıklarıyla alabilirsin */
    // Silmek istenen bilgini bir üst elementi olan li'nin text bilgisini alıyor.
    // parentElement bir üst düğüme götürür.

      let changeItemIndex = getTodos.findIndex(
        (s) => s.todo == liText.slice(0, liText.length - 1).trim()
      ); 
      // li bilgisi localstorage'ta bulunan todo bilgisi ile eşleştiriliyor ve 
      // dizideki index numarası alınıyor.
      getTodos.splice(changeItemIndex, 1); 
      // changeItemIndex ile aldığımız dizi index numarası ile getTodos disindeki eşleştirdiğimiz alanı siliyor.
      localStorage.setItem("todoArr", JSON.stringify(getTodos)); 
      // silme işleminden sonra tekrardan dizimizi set ederek güncelliyoruz.
      event.target.parentElement.remove(); 
      // listeden li etiketi siliniyor. Sayfa yenilenmeden kullanıcının görmesi sağlanıyor.
    }); 

    liDOM.onclick = function (event) {
      // yeni eklenen her li'ye tekrar tıkladığımızda getTodos ile localStorage bilgisi alınmak zorunda.
      let getTodos = JSON.parse(localStorage.getItem("todoArr"));
      event.currentTarget.classList.toggle("checked"); 
      // listeden li etiketi siliniyor. Sayfa yenilenmeden kullanıcının görmesi sağlanıyor.
      let liText = event.currentTarget.innerText;
      let changeItemIndex = getTodos.findIndex(
        (s) => s.todo == liText.slice(0, liText.length - 1).trim()
      ); // li bilgisi localstorage'ta bulunan todo bilgisi ile eşleştiriliyor ve 
      // dizideki index bumarası alınıyor.

      /* default olarak isChecked = false olarak tamamlanmıştır.
         Tamamlanan görevler için seçilen satırın isChecked = false ise li etiketine checked, 
         true ise checked classını kaldırıyor.
         ilgili todonun isChecked özelliğini şarta göre false yada true yapıyor. */

      if (getTodos[changeItemIndex]) {
        if (getTodos[changeItemIndex].isChecked) {
          liDOM.classList.remove("checked");
          getTodos[changeItemIndex].isChecked = false;
          localStorage.setItem("todoArr", JSON.stringify(getTodos));
        } else {
          liDOM.classList.add("checked");
          getTodos[changeItemIndex].isChecked = true;
          localStorage.setItem("todoArr", JSON.stringify(getTodos));
        }
      }
    };
    
  }



}; // func

// ******** LocalStorage ******** //
// add fonksiyonu addElmenentinde oluşturulan li yapısını item parametresi ile alıyor,
addBtn.addEventListener("click",add);
function add(item) {
  item.preventDefault();
  // localStorege bilgileri json.parse ile çekilerek daha önceden oluşturulan todoArr disine aktarılıyor.
  let todoArr = JSON.parse(localStorage.getItem("todoArr"));
  /* todo adında bir obje oluşturuluyor ve item parametresinden gelen bilgiler 
     slice ile kesilerek sadece input alanına girilen değer alınıyor. 
      Ve isChecked ile henüz todonun tamamlanmamış olduğu ifade ediliyor. */
  const toDoText = input.value;
  const todo = {
    todo: toDoText,
    isChecked: false,
  };
  // Oluşturulan todo yapısı push ile todoArr dizisinin sonuna ekleniyor.
  todoArr.push(todo);
  // Dizinin son hali localStorage'a tekrardan set ediliyor.
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
}



// 3. ADIM

/* 
const todo={} object (nesne)
todos =[]  array(dizi) içine todo nesnelerine koyacağız 

*/
// Sayfa Yüklendiğinde çalışacak fonksiyon
window.addEventListener("load", () => {
  
  // Sayfa yüklendiğinde LocalStorage var mı kontrolü yapılıyor. Yoksa todoArr adında boş dizi oluşturup LocalStorage set ediliyor.
  // Eğer localstorege varsa JSON.parse ile todos değişkenine alınıyor.
  let todos = JSON.parse(localStorage.getItem("todoArr"));
  if (!todos) {
    // Eğer localstorage yoksa todoArr dizisi oluşturuluyor ve localstorage set ediliyor.
    todoArr = [];
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }else{
    /* for ile todoArr dizimizin uzunluğu kadar dönerek ul etiketimizin altına 
    li ve span etiketleri oluşturup içerisine ilgili class ve text bilgileri yazılıyor. */
    for (let i = 0; i < todos.length; i++) {
      let ulDOM = document.getElementById("list");
      let liDOM = document.createElement("li");
      let spanDOM = document.createElement("span");
      spanDOM.innerHTML = "&#10005;";
      spanDOM.classList.add("close");
      liDOM.innerHTML = `${todos[i].todo} `;
      liDOM.appendChild(spanDOM);
      // Span etiketi silme işlemi yapmaktadır.

      spanDOM.onclick = function (event) {
        let liText = event.target.parentElement.innerText; 
        // Silmek istenen bilgini bir üst elementi olan li'nin text bilgisini alıyor.
        let changeItemIndex = todos.findIndex(
          (s) => s.todo == liText.slice(0, liText.length - 1).trim()
        ); 
        // li bilgisi localstorage'ta bulunan todo bilgisi ile eşleştiriliyor ve dizideki index bumarası alınıyor.
        todos.splice(changeItemIndex, 1); // diziden siliniyor
        localStorage.setItem("todoArr", JSON.stringify(todos)); // yeni dizi bilgisi set ediliyorek güncelleme yapılıyor.
        event.target.parentElement.remove(); // listeden li etiketi siliniyor. Sayfa yenilenmeden kullanıcının görmesi sağlanıyor.
      };
      //
      liDOM.onclick = function (event) {
        event.currentTarget.classList.toggle("checked");
        let liText = event.currentTarget.innerText;
        let changeItemIndex = todos.findIndex(
          (s) => s.todo == liText.slice(0, liText.length - 1).trim()
        ); // li bilgisi localstorage'ta bulunan todo bilgisi ile eşleştiriliyor ve dizideki index bumarası alınıyor.

        // default olarak isChecked = false olarak tamamlanmıştır. Tamamlanan görevler için seçilen satırın isChecked = false ise li etiketine checked, true ise checked classını kaldırıyor.
        // ilgili todonun isChecked özelliğini şarta göre false yada true yapıyor.
        if (todos[changeItemIndex]) {
          if (todos[changeItemIndex].isChecked) {
            liDOM.classList.remove("checked");
            todos[changeItemIndex].isChecked = false;
            localStorage.setItem("todoArr", JSON.stringify(todos));
          } else {
            liDOM.classList.add("checked");
            todos[changeItemIndex].isChecked = true;
            localStorage.setItem("todoArr", JSON.stringify(todos));
          }
        }
      };
      // ul etiketinin append ile sonuna oluşturulan li elementi ekleniyor.
      ulDOM.append(liDOM);
    }
  } 
});


