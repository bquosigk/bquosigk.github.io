(function(){var t=document.getElementById('dtab');if(!t)return;var tb=t.tBodies[0],q=document.getElementById('dq'),ty=document.getElementById('dtype'),mn=document.getElementById('dmin'),ct=document.getElementById('dcount');
var rows=null,key='amount',dir=-1,LIMIT=500;var f=function(v){return '$'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
function draw(){if(!rows)return;var s=(q.value||'').toLowerCase(),T=ty.value,m=parseFloat(mn.value)||-Infinity;
var r=rows.filter(function(x){return (!T||x.type===T)&&x.amount>=m&&(!s||(x.name+' '+x.employer+' '+x.occupation+' '+x.city+' '+x.state).toLowerCase().indexOf(s)>=0);});
r.sort(function(a,b){var A=a[key],B=b[key];return (A<B?-1:A>B?1:0)*dir;});var sum=r.reduce(function(a,x){return a+x.amount;},0);
tb.innerHTML=r.slice(0,LIMIT).map(function(x){return '<tr><td>'+esc(x.name)+'</td><td class="num">'+f(x.amount)+'</td><td class="num">'+x.count+'</td><td>'+esc(x.date)+'</td><td>'+esc(x.type)+'</td><td>'+esc(x.employer)+(x.employer&&x.occupation?' / ':'')+esc(x.occupation)+'</td><td>'+esc(x.city)+(x.city?', ':'')+esc(x.state)+'</td></tr>';}).join('');
ct.textContent=r.length.toLocaleString()+' matching donors, together giving '+f(Math.round(sum*100)/100)+(r.length>LIMIT?' (showing first '+LIMIT+'; refine the search to see more)':'');}
[q,ty,mn].forEach(function(e){e.addEventListener('input',draw);});
t.querySelectorAll('th button').forEach(function(b){b.addEventListener('click',function(){var k=b.getAttribute('data-k');dir=(k===key)?-dir:(k==='amount'||k==='date'||k==='count'?-1:1);key=k;t.querySelectorAll('th').forEach(function(h){h.removeAttribute('aria-sort');});b.parentNode.setAttribute('aria-sort',dir>0?'ascending':'descending');draw();});});
fetch(t.getAttribute('data-src')).then(function(r){return r.json();}).then(function(d){rows=d.rows.map(function(a){var o={};d.f.forEach(function(k,i){o[k]=a[i];});return o;});draw();}).catch(function(){ct.textContent='Could not load the full table; the 50 largest donors are shown.';});})();
