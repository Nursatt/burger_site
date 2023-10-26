const delivery = document.getElementById('delivery');

window.addEventListener('click', function(event) {

    if (event.target.dataset.action == 'plus') {
        var counter = event.target.closest('.items_counter').querySelector('[data-counter]');
        counter.innerText = ++counter.innerText;
        calculatePrice();
    } else if (event.target.dataset.action == 'minus') {
        var counter = event.target.closest('.items_counter').querySelector('[data-counter]');
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        } else if (parseInt(counter.innerText) == 1) {
            event.target.closest('.product_in_basket').remove();
        };
        calculatePrice();
    }


    if (event.target.hasAttribute('data-backet')) {
        var product = event.target.closest('.best');
        var productInfo = {
            id: product.dataset.id,
            src: product.querySelector('.basket_img').getAttribute('src'),
            title: product.querySelector('p').innerText,
            price: product.querySelector('h5').innerText
        };
        calculatePrice();
    }

    var InBasket = delivery.querySelector(`[data-id="${productInfo.id}"]`);

    //console.log(InBasket);

    if (InBasket) {

    } else {
        const productHTML = `<div class="product_in_basket" data-id="${productInfo.id}">
   <h6>Your order</h6>
   <div>
      <img src="${productInfo.src}" width="100px" alt="There is no picture">
      <p>${productInfo.title}
         <br>
         <span id="price">${productInfo.price}</span>
      </p>
      <br>
      <div class="items_counter">
         <div class="items_control" data-action="minus">-</div>
         <div class="items_control" data-counter>1</div>
         <div class="items_control" data-action="plus">+</div>
      </div>
   </div>
   <hr id="line_1">
</div>`;

        delivery.insertAdjacentHTML('afterbegin', productHTML);
        calculatePrice();
    };



})

function calculatePrice() {
    const products = document.querySelectorAll('.product_in_basket');
    let totalPrice = 0;

    products.forEach(function(item) {
        const sumProduct = item.querySelector('[data-counter]');
        const priceProduct = item.querySelector('#price');
        const thisPrice = parseInt(sumProduct.innerText) * parseInt(priceProduct.innerText);
        totalPrice += thisPrice;
    });

    document.getElementById('lastPrice').innerText = totalPrice;

}


function finish() {
    alert("Saudanizga Rahmet)");
}