const t="https://api.themoviedb.org/3/discover/movie?sort_by-popularity.desc&api_key=b5e824a3d922f68ba211fcf6dbdcb6f5";let e,n,i,o;i=null===JSON.parse(localStorage.getItem("movie-queue"))?[]:JSON.parse(localStorage.getItem("movie-queue")),localStorage.setItem("movie-queue",JSON.stringify(i)),o=null===JSON.parse(localStorage.getItem("movie-watched"))?[]:JSON.parse(localStorage.getItem("movie-watched")),localStorage.setItem("movie-watched",JSON.stringify(o));const s=document.getElementById("myModal"),a=document.getElementById("modal-poster"),d=document.getElementById("modal-title"),l=document.getElementById("modal-vote"),c=document.getElementById("modal-popularity"),r=document.getElementById("modal-original-title"),u=document.getElementById("modal-genre"),m=document.getElementById("modal-overview"),g=document.getElementById("addToWatchedBtn"),p=document.getElementById("addToQueuBtn"),b=document.getElementsByClassName("close")[0];let v;function y(){s.style.display="none"}fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b5e824a3d922f68ba211fcf6dbdcb6f5").then((t=>t.json())).then((e=>{v=e.genres,x(t),w(e)})).catch((t=>{})),b.addEventListener("click",y),window.addEventListener("click",(function(t){t.target===s&&y()}));const h=document.getElementById("main"),f=document.getElementById("search-form"),L=document.getElementById("search-input"),E=document.querySelector(".loader-container");let I,S=1;const B=document.getElementById("prev"),k=document.getElementById("next");function x(t){I=t,h.classList.toggle("is-hidden"),E.classList.toggle("is-hidden"),fetch(t).then((t=>t.json())).then((t=>{console.log(t.results),0!==t.results.length?(w(t.results),S=t.page,h.classList.toggle("is-hidden"),E.classList.toggle("is-hidden"),function(){S<=1?(B&&B.classList.add("disabled"),k&&k.classList.remove("disabled")):S>=undefined?(B&&B.classList.remove("disabled"),k&&k.classList.add("disabled")):(B&&B.classList.remove("disabled"),k&&k.classList.remove("disabled"));B.addEventListener("click",(()=>{0})),k.addEventListener("click",(()=>{0}))}()):(h.classList.toggle("is-hidden"),E.classList.toggle("is-hidden"),h.innerHTML='<h1 class="no-results">No Results Found</h1>')}))}function w(t){h.innerHTML="",t.forEach((t=>{const{title:i,poster_path:o,release_date:g,genre_ids:p}=t,b=document.createElement("div");b.classList.add("movie");const y=p&&Array.isArray(v)?p.map((t=>{const e=v.find((e=>e.id===t));return e?e.name:""})).join(", "):"";b.innerHTML=`\n            <img src="${o?"https://image.tmdb.org/t/p/w500"+o:"http:/>/via.placeholder.com/1080x1500"}"\n                alt="${i}"/>\n            <div class="movie-info">\n                <h3>${i.toUpperCase()}</h3>\n                <div class="movie-details">\n                <div>${y} | ${g.slice(0,4)}</div>\n                </div>\n                  </div>\n                  `,b.addEventListener("click",(function(){!function(t){a.src=`https://image.tmdb.org/t/p/w500/${t.poster_path}`,d.textContent=t.title.toUpperCase(),l.innerHTML=`\n      <span class="vote-avg">${t.vote_average.toFixed(1)}</span>   /   `+t.vote_count,c.textContent=t.popularity.toFixed(1),r.textContent=t.original_title.toUpperCase();const i=t.genre_ids.map((t=>{const e=v.find((e=>e.id===t));return e?e.name:""})).join(", ");u.textContent=i,m.textContent=t.overview,s.style.display="block",n=t.id,e=t.title}(t)})),h.appendChild(b)}))}function N(t){let e=I.split("?"),n=e[1].split("&"),i=n[n.length-1].split("=");if("page"!=i[0]){x(I+"&page="+t)}else{i[1]=t.toString();let o=i.join("=");n[n.length-1]=o;let s=n.join("&");x(e[0]+"?"+s)}}x(t),f.addEventListener("submit",(e=>{e.preventDefault();const n=L.value;x(n?"https://api.themoviedb.org/3/search/movie?api_key=b5e824a3d922f68ba211fcf6dbdcb6f5&query="+n:t)})),B.addEventListener("click",(()=>{0})),k.addEventListener("click",(()=>{0})),g.addEventListener("click",(()=>{o.includes(n)?alert(`${e} has been watched already`):o.push(n),localStorage.setItem("movie-watched",JSON.stringify(o))})),p.addEventListener("click",(()=>{i.includes(n)?alert(`${e} has been added to the queue already`):i.push(n),localStorage.setItem("movie-queue",JSON.stringify(i))})),document.body.addEventListener("keydown",(t=>{"Escape"===t.code&&y()}));const _=document.querySelector(".pagination");function C(t){let e="";let n;t<4?(n=1,1!=t&&(e+='<button class="pagination-button previous-page" \n    type="submit" id="prev">&#11164</button>')):n=t>=18?16:t-2,n>1&&(e+='<button class="pagination-button previous-page" type="submit" id="prev">&#11164</button>',e+='<button class="pagination-button" type="submit">1</button>',n>2&&(e+='<button class="pagination-button" type="submit">...</button>'));for(let i=n;i<=20&&i<n+5;i++)e+=i===t?`<button class="pagination-button current-page" type="submit">${i}</button>`:`<button class="pagination-button" type="submit">${i}</button>`;n+5<=20&&(n+5<20&&(e+='<button class="pagination-button" type="submit">...</button>'),e+='<button class="pagination-button" type="submit">20</button>'),t<20&&(e+='<button class="pagination-button next-page" type="submit" id="next">&#11166</button>'),_.innerHTML=e}let $=1;C($),_.addEventListener("click",(t=>{const e=t.target;if(e.classList.contains("pagination-button")&&!e.id){const t=parseInt(e.textContent);isNaN(t)||($=t,C($),N($))}else e.classList.contains("previous-page")?$>1&&($--,C($),N($)):e.classList.contains("next-page")&&$<20&&($++,C($),N($))}));
//# sourceMappingURL=library.7c685c14.js.map
