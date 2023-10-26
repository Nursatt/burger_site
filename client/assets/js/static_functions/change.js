$(window).scroll(function () {
   //начинай идти после 1920пикселей
   if ($(window).scrollTop() > 1980) {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      setInterval(function () {
         //Макс чисел
         if (a <= 1023 && b <= 31525 && c <= 194 && d <= 582) {
            document.querySelector('._anim_counter1').innerHTML = a;
            document.querySelector('._anim_counter2').innerHTML = b;
            document.querySelector('._anim_counter3').innerHTML = c;
            document.querySelector('._anim_counter4').innerHTML = d;
            a += 11;
            b += 325;
            c += 2;
            d += 6;
         }
      }, 30);//скорость
   } else {
      document.querySelector('._anim_counter1').innerHTML = 0;
   }
});

/*2021-2022*/

//изменение контента
function year2021() {
   document.querySelector('.change')
   document.getElementById('title2020_2021').innerHTML = 2021;
   document.getElementById('word2020_2021').innerHTML = "RODNOI BURGER® álemdegi ekinshi iri halyqaralyq fast-fýd jelisi. Kompanıa 2019 jyldan beri jumys isteıdi jáne álemniń 100 elinde 14000-nan astam meıramhanalary bar. Kún saıyn búkil álem boıynsha RODNOI BURGER® meıramhanalary 11 000 000-nan astam qonaqqa qyzmet kórsetedi.";
}
//изменение контента
function year2020() {
   document.querySelector('.change')
   document.getElementById('title2020_2021').innerHTML = 2020;
   document.getElementById('word2020_2021').innerHTML = "   RODNOI BURGER® qazaqstandyq naryqqa 2020 jyly shyqty. Qazirgi ýaqytta brend Respýblıkanyń 9 qalasynda 32 meıramhanamen usynylǵan.";
}
