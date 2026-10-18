(function(){var go=function(e){var v=e.target.value;if(v&&v!==location.pathname)location.href=v;};
['js-state','js-election','js-county'].forEach(function(i){var e=document.getElementById(i);if(e)e.onchange=go;});
var r=document.getElementById('js-race'),l=document.getElementById('js-racel');if(!r)return;var items=[];
document.querySelectorAll('a.mini, .mini > a.mo').forEach(function(a){var o=a.classList.contains('mo')?a:a.querySelector('.mo');items.push([a.getAttribute('href'),o?o.textContent:a.textContent]);});
document.querySelectorAll('section.race[id]').forEach(function(x){var h=x.querySelector('h2');items.push(['#'+x.id,h?h.firstChild.textContent:x.id]);});
if(items.length<2)return;var o0=document.createElement('option');o0.value='';o0.textContent='Jump to a race…';r.appendChild(o0);
items.forEach(function(i){var o=document.createElement('option');o.value=i[0];o.textContent=i[1];r.appendChild(o);});
l.hidden=false;r.onchange=function(){var v=r.value;if(!v)return;if(v[0]==='#'){location.hash=v;}else location.href=v;};})();
