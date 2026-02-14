const products = [
 {id:1,name:"Espresso Beans",price:15,category:"Beans",img:"https://images.unsplash.com/photo-1511920170033-f8396924c348"},
 {id:2,name:"Arabica Whole Beans",price:18,category:"Beans",img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},
 {id:3,name:"Ground Coffee",price:12,category:"Ground",img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"},
 {id:4,name:"Cold Brew Bottle",price:10,category:"Cold Brew",img:"https://images.unsplash.com/photo-1504639725590-34d0984388bd"}
];

let cart = [];

function displayProducts() {
 const shop = document.getElementById("shop-products");
 const featured = document.getElementById("featured-products");
 shop.innerHTML = "";
 featured.innerHTML = "";
 products.forEach(p=>{
   shop.innerHTML += productHTML(p);
 });
 products.slice(0,2).forEach(p=>{
   featured.innerHTML += productHTML(p);
 });
}

function productHTML(p){
 return `<div class="product">
   <img src="${p.img}">
   <h3>${p.name}</h3>
   <p>$${p.price}</p>
   <button onclick="addToCart(${p.id})">Add to Cart</button>
 </div>`;
}

function addToCart(id){
 const product = products.find(p=>p.id===id);
 cart.push(product);
 document.getElementById("cart-count").innerText = cart.length;
}

function openCart(){
 document.getElementById("cart-section").classList.toggle("hidden");
 renderCart();
}

function renderCart(){
 const container = document.getElementById("cart-items");
 container.innerHTML="";
 let total=0;
 cart.forEach((item,index)=>{
   total+=item.price;
   container.innerHTML+=`<p>${item.name} - $${item.price} <button onclick="removeItem(${index})">Remove</button></p>`;
 });
 document.getElementById("cart-total").innerText=total;
}

function removeItem(index){
 cart.splice(index,1);
 renderCart();
 document.getElementById("cart-count").innerText = cart.length;
}

function openCheckout(){
 document.getElementById("checkout").classList.remove("hidden");
}

function placeOrder(e){
 e.preventDefault();
 alert("Order placed successfully ☕");
 cart=[];
 renderCart();
}

function filterProducts(){
 const search=document.getElementById("search").value.toLowerCase();
 const category=document.getElementById("category").value;
 const shop=document.getElementById("shop-products");
 shop.innerHTML="";
 products.filter(p=>{
   return (category==="all"||p.category===category) &&
          p.name.toLowerCase().includes(search);
 }).forEach(p=> shop.innerHTML+=productHTML(p));
}

function scrollToShop(){
 document.getElementById("shop").scrollIntoView({behavior:"smooth"});
}

displayProducts();
