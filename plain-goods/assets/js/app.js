(function(){
var cart={},filter="All";
try{cart=JSON.parse(localStorage.getItem("pg-cart")||"{}")||{}}catch(e){cart={}}
function save(){try{localStorage.setItem("pg-cart",JSON.stringify(cart))}catch(e){}}
function $(i){return document.getElementById(i)}
function money(n){return CUR+n.toLocaleString("en-IN")}
function byId(id){return PRODUCTS.filter(function(p){return p.id==id})[0]}

function art(p){
 if(p.img)return '<img src="'+p.img+'" alt="'+p.name+'" style="width:100%;height:100%;object-fit:cover;display:block">';
 var a=p.c[0],b=p.c[1],sh='<rect y="76" width="100" height="24" fill="#000" opacity=".1"/>',o="";
 var hl='fill="#fff" opacity=".28"',dk='fill="#000" opacity=".22"';
 if(p.type=="mug")o='<ellipse cx="47" cy="77" rx="24" ry="3" '+dk+'/><path d="M64 42h6a9 9 0 0 1 0 18h-6" fill="none" stroke="'+b+'" stroke-width="5"/><rect x="30" y="34" width="34" height="42" rx="5" fill="'+b+'"/><ellipse cx="47" cy="34" rx="17" ry="4" fill="'+b+'"/><ellipse cx="47" cy="34" rx="14" ry="2.8" '+dk+'/><rect x="34" y="40" width="4" height="30" rx="2" '+hl+'/>';
 if(p.type=="bowl")o='<ellipse cx="50" cy="77" rx="30" ry="3" '+dk+'/><path d="M16 44h68c0 20-14 32-34 32S16 64 16 44z" fill="'+b+'"/><ellipse cx="50" cy="44" rx="34" ry="6" fill="'+b+'"/><ellipse cx="50" cy="44" rx="31" ry="4.4" '+dk+'/><path d="M24 52q4 12 14 18" fill="none" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round"/>';
 if(p.type=="vase")o='<path d="M50 24V8" stroke="#101820" stroke-width="1.6"/><circle cx="50" cy="7" r="4" fill="#101820"/><ellipse cx="50" cy="77" rx="22" ry="3" '+dk+'/><path d="M43 24h14v12c0 8 15 12 15 28 0 10-7 12-22 12s-22-2-22-12c0-16 15-20 15-28z" fill="'+b+'"/><ellipse cx="50" cy="24" rx="7" ry="2" '+dk+'/><path d="M33 58q-2 8 2 14" fill="none" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round"/>';
 if(p.type=="plate")o='<ellipse cx="50" cy="77" rx="38" ry="4" '+dk+'/><ellipse cx="50" cy="66" rx="38" ry="10" fill="'+b+'"/><ellipse cx="50" cy="65" rx="27" ry="6.5" fill="#000" opacity=".1"/><ellipse cx="50" cy="65" rx="27" ry="6.5" fill="none" stroke="'+a+'" stroke-width="1.2" opacity=".7"/>';
 if(p.type=="throw")o='<ellipse cx="50" cy="77" rx="38" ry="3" '+dk+'/><rect x="14" y="60" width="72" height="16" rx="2" fill="'+b+'"/><rect x="14" y="66" width="72" height="3" fill="'+a+'"/><rect x="18" y="44" width="64" height="16" rx="2" fill="'+b+'"/><rect x="18" y="50" width="64" height="3" fill="'+a+'"/><rect x="22" y="28" width="56" height="16" rx="2" fill="'+b+'"/><rect x="22" y="34" width="56" height="3" fill="'+a+'"/><path d="M86 62v12M83 62v12M80 46v12" stroke="'+b+'" stroke-width="1.2"/>';
 if(p.type=="cushion")o='<ellipse cx="50" cy="78" rx="30" ry="3" '+dk+'/><rect x="20" y="26" width="60" height="50" rx="16" fill="'+b+'"/><rect x="20" y="26" width="60" height="50" rx="16" fill="none" stroke="#000" stroke-width="1.4" opacity=".18"/><path d="M30 34q20 14 40 0M30 68q20-14 40 0" fill="none" stroke="#fff" stroke-width="1.6" opacity=".3"/>';
 if(p.type=="board")o='<ellipse cx="50" cy="80" rx="18" ry="3" '+dk+'/><rect x="34" y="10" width="32" height="68" rx="8" fill="'+b+'"/><circle cx="50" cy="20" r="3.5" fill="'+a+'"/><path d="M42 32v38M50 34v36M58 32v38" stroke="#000" stroke-width="1" opacity=".14"/>';
 return '<svg viewBox="0 0 100 100" role="img" aria-label="'+p.name+'" preserveAspectRatio="xMidYMid slice"><rect width="100" height="100" fill="'+a+'"/>'+sh+o+'</svg>';
}

function renderMega(){
 $("megaGrid").innerHTML=PRODUCTS.slice(0,4).map(function(p){
  return '<a href="#shop" data-open="'+p.id+'"><div class="thumb">'+art(p)+'</div><span>'+p.name+'</span><small>'+money(p.price)+'</small></a>';
 }).join("");
}
function renderFilters(){
 var cats=["All"].concat(PRODUCTS.map(function(p){return p.cat}).filter(function(c,i,a){return a.indexOf(c)==i}));
 $("filters").innerHTML=cats.map(function(c){return '<button data-f="'+c+'" aria-pressed="'+(c==filter)+'">'+c+'</button>'}).join("");
}
function renderGrid(){
 $("grid").innerHTML=PRODUCTS.filter(function(p){return filter=="All"||p.cat==filter}).map(function(p){
  return '<button class="card" data-open="'+p.id+'"><div class="thumb">'+art(p)+'</div><h3>'+p.name+'</h3><p>'+money(p.price)+'</p></button>';
 }).join("");
}
function renderCart(){
 var ids=Object.keys(cart).filter(function(k){return cart[k]>0}),t=0,n=0;
 $("items").innerHTML=ids.length?ids.map(function(k){
  var p=byId(k),q=cart[k];t+=p.price*q;n+=q;
  return '<div class="line"><div class="thumb">'+art(p)+'</div><div><b>'+p.name+'</b><div class="qty"><button data-dec="'+k+'" aria-label="Decrease">-</button><span>'+q+'</span><button data-inc="'+k+'" aria-label="Increase">+</button></div></div><div><b>'+money(p.price*q)+'</b><br><button class="rm" data-rm="'+k+'">Remove</button></div></div>';
 }).join(""):'<p class="empty">Your cart is empty.</p>';
 $("total").textContent=money(t);
 $("cartCount").textContent=n;
 $("checkout").disabled=!ids.length;
 $("checkout").style.opacity=ids.length?1:.4;
}
function add(id){cart[id]=(cart[id]||0)+1;save();renderCart()}

var lastFocus=null;
function closeAll(){
 ["drawer","modal","scrim"].forEach(function(i){$(i).classList.remove("open")});
 $("drawer").setAttribute("aria-hidden","true");
 $("mega").classList.remove("open");$("shopMenu").setAttribute("aria-expanded","false");
 if(lastFocus){lastFocus.focus();lastFocus=null}
}
function openCart(){lastFocus=document.activeElement;closeAll();lastFocus=document.activeElement;$("drawer").classList.add("open");$("drawer").setAttribute("aria-hidden","false");$("scrim").classList.add("open");$("closeCart").focus()}
function openModal(html){lastFocus=document.activeElement;$("modalBody").innerHTML=html;$("modal").classList.add("open");$("scrim").classList.add("open");$("closeModal").focus()}
function openProduct(id){
 var p=byId(id);
 $("mega").classList.remove("open");
 openModal('<div class="pd"><div class="thumb">'+art(p)+'</div><div class="info"><h2>'+p.name+'</h2><div class="price">'+money(p.price)+'</div><p>'+p.d+'</p><button class="btn block" data-add="'+p.id+'">Add to cart</button></div></div>');
}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove("show")},2600)}

document.addEventListener("click",function(e){
 var t=e.target.closest("[data-open],[data-add],[data-inc],[data-dec],[data-rm],[data-f]");
 if(t){
  if(t.dataset.open){e.preventDefault();openProduct(t.dataset.open)}
  else if(t.dataset.add){add(t.dataset.add);toast("Added to cart");closeAll();openCart()}
  else if(t.dataset.inc){add(t.dataset.inc)}
  else if(t.dataset.dec){cart[t.dataset.dec]=Math.max(0,(cart[t.dataset.dec]||0)-1);save();renderCart()}
  else if(t.dataset.rm){delete cart[t.dataset.rm];save();renderCart()}
  else if(t.dataset.f){filter=t.dataset.f;renderFilters();renderGrid()}
  return;
 }
 if(e.target.closest("#cartBtn")){openCart();return}
 if(e.target.closest("#closeCart,#closeModal")||e.target.id=="scrim"){closeAll();return}
 if(e.target.closest("#shopMenu")){var m=$("mega"),o=!m.classList.contains("open");m.classList.toggle("open",o);$("shopMenu").setAttribute("aria-expanded",o);return}
 if(e.target.closest("#menuToggle")){var n=$("nav"),ot=!n.classList.contains("open");n.classList.toggle("open",ot);$("menuToggle").setAttribute("aria-expanded",ot);return}
 if(e.target.closest("#checkout")){toast("Checkout is not connected yet. Add a payment provider to take orders.");return}
 if(!e.target.closest("header")){$("mega").classList.remove("open");$("shopMenu").setAttribute("aria-expanded","false")}
 if(e.target.closest("nav a")){$("nav").classList.remove("open")}
});
document.addEventListener("keydown",function(e){if(e.key=="Escape")closeAll()});

$("yr").textContent=new Date().getFullYear();
renderMega();renderFilters();renderGrid();renderCart();
})();
