import { swatches } from './catalog.js';

const copy = {
  en: {
    title:'Color Studio', products:'Film portfolio', vehicle:'View on car', studio:'Studio', gallery:'Daylight', sunset:'Sunset', catalog:'Color library',
    lift:'Pick up', dock:'Put back', share:'Share color', home:'H&H home', language:'Language', lighting:'Lighting', book:'Film samples',
    previous:'Previous color', next:'Next color', pause:'Pause autoplay', play:'Start autoplay', close:'Close', strip:'Nearby colors', all:'All finishes', filter:'Filter by finish',
    query:'Search name or code', results:'colors', noResults:'No matching colors', copied:'Color link copied', url:'Color link',
    hint:'Swipe to browse · Double-tap a sample to pick it up', inspect:'Drag to rotate · Double-tap to put it back',
    disclaimer:'Screen colors are approximate. Use a physical sample for final selection.',
    crystal:'Crystal', metallic:'Metallic', pearlescent:'Pearlescent', chameleon:'Color shift', special:'Special finish',
  },
  zh: {
    title:'电子色卡', products:'产品系列', vehicle:'装车预览', studio:'摄影棚', gallery:'日光', sunset:'夕照', catalog:'全部色谱',
    lift:'拿起色卡', dock:'放回色卡', share:'分享色卡', home:'返回 H&H 官网', language:'语言', lighting:'光照', book:'漆膜色卡',
    previous:'上一色', next:'下一色', pause:'暂停轮播', play:'开始轮播', close:'关闭', strip:'相邻色卡', all:'全部工艺', filter:'按工艺筛选',
    query:'搜索色名或编号', results:'个颜色', noResults:'没有找到匹配的颜色', copied:'色卡链接已复制', url:'色卡链接',
    hint:'左右滑动选色 · 双击任一张色卡拿起', inspect:'拖动转面看光泽 · 双击放回色卡',
    disclaimer:'屏幕颜色仅供参考，最终选色请以实物色卡为准。',
    crystal:'水晶', metallic:'金属', pearlescent:'珠光', chameleon:'变色龙', special:'特殊工艺',
  },
  ru: {
    title:'Студия цвета', products:'Продукция', vehicle:'На автомобиле', studio:'Студия', gallery:'Дневной свет', sunset:'Закат', catalog:'Каталог цветов',
    lift:'Взять образец', dock:'Вернуть', share:'Поделиться цветом', home:'На главную H&H', language:'Язык', lighting:'Освещение', book:'Образцы плёнки',
    previous:'Предыдущий цвет', next:'Следующий цвет', pause:'Остановить показ', play:'Включить показ', close:'Закрыть', strip:'Соседние цвета', all:'Все покрытия', filter:'Фильтр по покрытию',
    query:'Название или код', results:'цветов', noResults:'Совпадений нет', copied:'Ссылка на цвет скопирована', url:'Ссылка на цвет',
    hint:'Листайте в стороны · Дважды нажмите на образец, чтобы взять его', inspect:'Поворачивайте образец пальцем · Двойное нажатие вернёт его на место',
    disclaimer:'Цвет на экране приблизителен. Для окончательного выбора воспользуйтесь физическим образцом.',
    crystal:'Кристалл', metallic:'Металлик', pearlescent:'Перламутр', chameleon:'Хамелеон', special:'Особое покрытие',
  },
};
const $ = selector => document.querySelector(selector);
const fan = $('#fan'), cards = $('#cards'), drawer = $('#catalog'), shareDialog = $('#share-dialog');
const url = new URL(location.href);
const finishes = [...new Set(swatches.map(s => s.finish))];
const positions = new Map(swatches.map((s, i) => [s.code, i]));
const validLang = l => Object.hasOwn(copy, l);
function initialLang() {
  const requested = url.searchParams.get('lang');
  if (validLang(requested)) return requested;
  if (document.referrer) {
    const from = new URL(document.referrer);
    if (from.origin === location.origin) {
      const match = from.pathname.match(/^\/index-(zh|ru)(?:\.html)?\/?$/);
      if (match) return match[1];
      if (from.pathname === '/' || from.pathname === '/index.html') return 'en';
      if (validLang(from.searchParams.get('lang'))) return from.searchParams.get('lang');
    }
  }
  try {
    const stored = localStorage.getItem('hhColorStudioLang');
    if (validLang(stored)) return stored;
  } catch {}
  return 'en';
}
let lang = initialLang();
const t = key => copy[lang][key] || key;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let playing = !reducedMotion.matches, picked = false, pointer = null, pendingTap = null;
let timer, tapTimer, settleTimer, dragFrame, resizeFrame, firstTurn = true;
let tx = 0, ty = 0, lastDouble = -Infinity;
let light = ['studio','gallery','sunset'].includes(url.searchParams.get('light')) ? url.searchParams.get('light') : 'studio';
let finish = finishes.includes(url.searchParams.get('finish')) ? url.searchParams.get('finish') : 'all';
const byFinish = () => finish === 'all' ? swatches : swatches.filter(s => s.finish === finish);
const preferred = swatches.find(s => s.code === (url.searchParams.get('code') || 'TPU-010S').toUpperCase());
if (preferred && url.searchParams.has('code') && finish !== 'all' && preferred.finish !== finish) finish = 'all';
let list = byFinish(), cursor = Math.max(0, list.indexOf(preferred)), cardHeight = 0, stepWidth = 1;
const wrap = (n, length) => ((n % length) + length) % length;
const limit = (x, min, max) => Math.max(min, Math.min(max, x));
const active = () => list[wrap(cursor, list.length)];
const number = s => String(positions.get(s.code) + 1).padStart(2, '0');
const title = s => s.name[lang] || s.name.en;
const newEl = (tag, cls) => { const el = document.createElement(tag); if (cls) el.className = cls; return el; };
const span = (cls, text) => { const el = newEl('span', cls); el.textContent = text; return el; };
const storedSlots = new Map();

function replaceUrl() {
  url.searchParams.set('lang',lang);
  url.searchParams.set('code',active().code);
  if (light !== 'studio') url.searchParams.set('light',light); else url.searchParams.delete('light');
  if (finish !== 'all') url.searchParams.set('finish',finish); else url.searchParams.delete('finish');
  $('#vehicle').href='./vehicle.html?'+ new URLSearchParams({lang,code:active().code});
  history.replaceState(null,'',url);
}
function lighting() {
  fan.dataset.lighting = light;
  document.querySelectorAll('.fan-paint').forEach(el => el.dataset.light = light);
  document.querySelectorAll('button[data-light]').forEach(el => el.setAttribute('aria-pressed',el.dataset.light === light));
}
function restart(delay = 3200) {
  clearTimeout(timer);
  if (playing && !picked && !pointer && !document.hidden && !drawer.open && !shareDialog.open && list.length>1) {
    timer = setTimeout(() => { firstTurn=false; move(1); },delay);
  }
}
function clearTap() { clearTimeout(tapTimer); pendingTap = null; }
function mix(a,b,weight) {
  const channel = i => Math.round(parseInt(a.slice(i,i+2),16)*(1-weight)+parseInt(b.slice(i,i+2),16)*weight).toString(16).padStart(2,'0');
  return '#'+channel(1)+channel(3)+channel(5);
}
function ink(hex) {
  const rgb = [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
  return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]>.21?'#171615':'#fffaf5';
}
function paint(s) {
  const el = newEl('span','fan-paint'), base = s.hex;
  const black = s.code==='TPU-002S' || s.code==='TPU-035S';
  const stops = black || !s.stops?.length ? [base,base,base,base] : s.stops;
  const carbon = s.code.endsWith('FP') || s.code==='TPU-CF', metal = s.finish==='metallic' || s.code.endsWith('A');
  const pearl = s.finish==='pearlescent', shift = s.finish==='chameleon' || (s.finish==='special' && !metal && !carbon);
  el.dataset.coat = carbon?'carbon':s.roughness>=.4?'matte':s.roughness>=.24?'satin':'gloss';
  if (metal || pearl || shift) el.dataset.grain = metal?'metal':'pearl';
  el.dataset.light = light;
  const values = {
    light:mix(base,stops[0],metal ? .37:.49),base:mix(base,stops[1],metal ? .12:.2),
    mid:mix(base,stops[2],metal ? .26:.45),dark:mix(mix(base,stops[3],metal ? .46:.67),'#04070a',black ? .26:.18),
    shift:mix(s.shiftHex || base,stops[0],shift ? .56:.3),flop:shift ? .47:pearl ? .27:0,
    specular:black ? .67:carbon ? .58:metal ? .87:.96,
  };
  for (const [key,value] of Object.entries(values)) el.style.setProperty('--paint-'+key,value);
  if (carbon) el.style.setProperty('--paint-pattern',`url("./paint/${s.code.toLowerCase()}.webp")`);
  el.append(span('fan-paint__pigment',''),span('fan-paint__reflection',''));
  return el;
}
function makeSlot(s) {
  const slot = newEl('div','swatch-fan__slot'), button = newEl('button','swatch-fan__card'), surface = newEl('span','swatch-fan__surface');
  const caption = newEl('span','swatch-fan__caption'), name = newEl('strong'), id = newEl('small');
  name.textContent = title(s); id.textContent=s.code;caption.append(name,id);
  button.type='button';button.dataset.fanCode=s.code;button.setAttribute('aria-label',title(s)+' · '+s.code);
  surface.setAttribute('aria-hidden','true');surface.append(paint(s),span('swatch-fan__arc',''),span('swatch-fan__brand','H&H'),span('swatch-fan__number',number(s)),caption);
  button.append(surface);slot.append(button);
  const tones = ['TPU-002S','TPU-035S'].includes(s.code) ? [] : s.stops || [];
  slot.style.setProperty('--ink-top',ink(mix(s.hex,tones[0]||s.hex,.43)));
  slot.style.setProperty('--ink-bottom',ink(mix(s.hex,tones[3]||s.hex,.63)));
  return slot;
}
function layout() {
  const box=fan.getBoundingClientRect();
  cardHeight=Math.min(box.height*.77,box.width*(box.width<box.height ? .83 : .54));
  const width=cardHeight*.46;
  stepWidth=Math.max(46,Math.sin(Math.PI/12)*cardHeight*1.94);
  const vars={'--card-h':cardHeight,'--card-w':width,'--fan-top':(box.height-cardHeight)*.36,'--pivot':cardHeight*2.35,'--ridge':cardHeight*1.86};
  for(const [key,v] of Object.entries(vars))fan.style.setProperty(key,v+'px');
  drawCards(0);
}
function drawCards(delta) {
  const reach=list.length===1?0:Math.min(6,Math.max(3,Math.ceil(fan.clientWidth/(stepWidth*1.4))+1));
  const next = new Set();
  fan.style.setProperty('--turn-time',Math.abs(delta)<=1?'1730ms':'480ms');
  fan.style.setProperty('--turn-ease',Math.abs(delta)<=1?'cubic-bezier(.81,0,.22,.99)':'cubic-bezier(.2,.74,.24,1)');
  for(let offset=-reach;offset<=reach;offset++){
    const pos=cursor+offset,s=list[wrap(pos,list.length)];
    let el=storedSlots.get(pos);
    if(el?.firstChild.dataset.fanCode!==s.code){el?.remove();storedSlots.delete(pos);el=null;}
    if(!el){el=makeSlot(s);storedSlots.set(pos,el);cards.append(el);}
    next.add(pos);
    const center=offset===0;
    el.dataset.center=String(center);
    el.style.zIndex=picked&&center?50:20-offset;
    el.style.setProperty('--turn-delay',Math.abs(delta)===1?limit(150+Math.sign(delta)*offset*50,0,300)+'ms':'0ms');
    el.style.setProperty('--slot-angle',-offset*15+'deg');
    el.style.setProperty('--fan-reflection',`var(--inspection-reflection, ${limit(-offset*11,-32,32)}%)`);
    const button=el.firstChild;
    button.tabIndex=-1;
    button.setAttribute('aria-pressed',center);
  }
  for(const [key,el] of storedSlots)if(!next.has(key)){el.remove();storedSlots.delete(key);}
}
function clearSlots(){storedSlots.clear();cards.replaceChildren();}
function swatchBackground(s){
  if(s.code.endsWith('FP')||s.code==='TPU-CF') return `center / cover url("./paint/${s.code.toLowerCase()}.webp")`;
  if(s.shiftHex) return `linear-gradient(116deg,${s.hex} 15%,${s.shiftHex})`;
  return `linear-gradient(118deg,${mix(s.hex,'#ffffff',.15)},${s.hex} 53%,${mix(s.hex,'#151411',.12)})`;
}
function strip() {
  const frag=document.createDocumentFragment(),n=Math.min(13,list.length),offset=-Math.floor(n/2);
  for(let i=0;i<n;i++){
    const s=list[wrap(cursor+offset+i,list.length)],b=newEl('button','chip');
    b.type='button';b.dataset.code=s.code;b.title=title(s)+' · '+s.code;b.setAttribute('aria-label',b.title);
    b.setAttribute('aria-pressed',s===active());b.style.background=swatchBackground(s);frag.append(b);
  }
  const stripEl=$('#strip');stripEl.replaceChildren(frag);
  const selected=stripEl.querySelector('[aria-pressed=true]');
  if(selected && stripEl.scrollWidth>stripEl.clientWidth) stripEl.scrollLeft=selected.offsetLeft-stripEl.offsetLeft-(stripEl.clientWidth-selected.offsetWidth)/2;
}
function controls() {
  $('#play').setAttribute('aria-label', t(playing?'pause':'play'));$('#play').title=t(playing?'pause':'play');
  $('#play use').setAttribute('href',playing?'#pause-icon':'#play-icon');
  $('#lift span').textContent=t(picked?'dock':'lift');$('#lift').setAttribute('aria-pressed',picked);
  $('#hint').textContent=t(picked?'inspect':'hint');
  $('#prev').disabled = $('#next').disabled = $('#play').disabled = list.length<2;
}
function sync(delta=0) {
  const s=active();
  $('#swatch-name').textContent=title(s);$('#code').textContent=s.code;$('#ink-chip').style.background=s.hex;
  $('#finish-name').textContent=t(s.finish);
  $('#index').textContent=(wrap(cursor,list.length)+1)+' / '+list.length;
  drawCards(delta);strip();controls();replaceUrl();
}
function move(delta,hold=3200) {
  if(!delta||list.length<2)return;
  clearTap();if(picked)setPicked(false);
  cursor+=delta;sync(delta);restart(hold);
}
function select(code, hold=5200) {
  const i=list.findIndex(s=>s.code===code);
  if(i<0)return;
  const diff=wrap(i-wrap(cursor,list.length)+Math.floor(list.length/2),list.length)-Math.floor(list.length/2);
  if(diff)move(diff,hold);else restart(hold);
}
function setPicked(value) {
  picked=value;clearTap();tx=ty=0;fan.dataset.pickedUp=String(value);
  for(const prop of ['--tilt-x','--tilt-y','--inspection-reflection'])fan.style.removeProperty(prop);
  const center=cards.querySelector('[data-center=true]');if(center)center.style.zIndex=picked?50:20;
  controls();restart(5200);
}
function toggleSample(code) { if(!picked)select(code);setPicked(!picked);lastDouble=performance.now(); }
function describeControl(selector,key) {
  const el=$(selector);
  el.setAttribute('aria-label',t(key));
  if(el.tagName==='BUTTON') el.title=t(key);
}
function fillFinishes() {
  for(const el of [$('#finish'),$('#catalog-finish')]){
    el.replaceChildren(...['all',...finishes].map(key=>new Option(t(key),key)));
    el.value=finish;
  }
}
function translate() {
  document.documentElement.lang=lang;document.title=t('title')+' | H&H Automotive Films';
  $('#home').href=lang==='en'?'/':`/index-${lang}.html`;$('#products').href=$('#home').href+'#products';$('#lang').value=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  for(const [selector,key] of Object.entries({'#home':'home','#lang':'language','.light-list':'lighting','#prev':'previous','#next':'next','#fan':'book','#share':'share','#share-url':'url','#strip':'strip','#finish':'filter','#catalog-finish':'filter','#catalog-close':'close','#share-close':'close','#query':'query'}))describeControl(selector,key);
  $('#query').placeholder=t('query');
  fillFinishes();clearSlots();sync();lighting();
}
function applyFinish(value) {
  const keep=active().code;
  if(picked)setPicked(false);
  clearTap();finish=value;
  list=byFinish();cursor=Math.max(0,list.findIndex(s=>s.code===keep));
  $('#finish').value=$('#catalog-finish').value=finish;
  clearSlots();sync();if(drawer.open)showResults();restart(5200);
}
function searchKey(value) {return value.normalize('NFKC').toLocaleLowerCase().trim().replace(/[\s_‐‑–—-]+/g,'');}
function showResults() {
  const q=searchKey($('#query').value);
  const hits=q?list.filter(s=>[s.code,...Object.values(s.name)].some(v=>searchKey(v).includes(q))):list;
  const frag=document.createDocumentFragment();
  for(const s of hits){
    const b=newEl('button','result'),tone=newEl('span','result-color'),name=newEl('strong'),id=newEl('small');
    tone.style.background=swatchBackground(s);name.textContent=title(s);id.textContent=s.code;
    b.type='button';b.dataset.code=s.code;b.setAttribute('aria-pressed',s===active());b.append(tone,name,id);frag.append(b);
  }
  $('#results').replaceChildren(frag);
  $('#result-count').textContent=hits.length ? (lang==='ru'?'Найдено: '+hits.length:hits.length+' '+(lang==='en'&&hits.length===1?'color':t('results'))) : t('noResults');
}
function openCatalog() {
  clearTap();clearTimeout(timer);$('#query').value='';showResults();drawer.showModal();$('#query').focus({preventScroll:true});
}
$('#catalog-open').addEventListener('click',openCatalog);
$('#catalog-close').addEventListener('click',()=>drawer.close());
$('#share-close').addEventListener('click',()=>shareDialog.close());
for(const dialog of [drawer,shareDialog]){
  dialog.addEventListener('close',()=>restart(5200));
  dialog.addEventListener('click',e=>{
    if(e.target!==dialog)return;
    const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
  });
}
$('#query').addEventListener('input',showResults);
$('#results').addEventListener('click',e=>{
  const code=e.target.closest('[data-code]')?.dataset.code;
  if(code){if(picked)setPicked(false);select(code);drawer.close();}
});
for(const filter of [$('#finish'),$('#catalog-finish')])filter.addEventListener('change',()=>applyFinish(filter.value));
$('#strip').addEventListener('click',e=>{const s=e.target.closest('[data-code]');if(s)select(s.dataset.code);});
$('#lang').addEventListener('change',e=>{
  lang=e.target.value;try{localStorage.setItem('hhColorStudioLang',lang);}catch{}
  clearTap();translate();restart(5200);
});
$('.light-list').addEventListener('click',e=>{
  const b=e.target.closest('[data-light]');if(!b)return;
  light=b.dataset.light;lighting();replaceUrl();restart(5200);
});
$('#prev').addEventListener('click',()=>move(-1,5200));$('#next').addEventListener('click',()=>move(1,5200));
$('#lift').addEventListener('click',()=>toggleSample(active().code));
$('#play').addEventListener('click',()=>{
  if(picked)setPicked(false);
  playing=!playing;controls();restart(firstTurn?1200:3200);
});
$('#share').addEventListener('click',async()=>{
  const link=location.href;
  try {
    await navigator.clipboard.writeText(link);
    $('#status').textContent=t('copied');$('#share').title=t('copied');$('#share').classList.add('copied');
    setTimeout(()=>{$('#status').textContent='';$('#share').title=t('share');$('#share').classList.remove('copied');},2200);
  } catch {
    clearTimeout(timer);$('#share-url').value=link;shareDialog.showModal();$('#share-url').select();
  }
});
function onTap(code,x,y) {
  const now=performance.now();
  if(pendingTap && now-pendingTap.time<375 && Math.hypot(x-pendingTap.x,y-pendingTap.y)<28) {
    const s=pendingTap.code;clearTap();toggleSample(s);return;
  }
  if(!code)return;
  clearTap();pendingTap={code,x,y,time:now};
  tapTimer=setTimeout(()=>{pendingTap=null;if(!picked)select(code);},375);
}
fan.addEventListener('pointerdown',e=>{
  if(pointer||!e.isPrimary||e.button!==0)return;
  const hit=e.target.closest('[data-fan-code]');
  pointer={id:e.pointerId,x:e.clientX,y:e.clientY,code:hit?.dataset.fanCode,tx,ty,moved:false};
  clearTimeout(timer);fan.setPointerCapture(e.pointerId);
});
function renderDrag() {
  dragFrame=0;
  if(!pointer || !pointer.moved)return;
  const {dx,dy}=pointer;
  if(picked) {
    tx=limit(pointer.tx-dy/cardHeight*67,-26,26);ty=limit(pointer.ty+dx/(cardHeight*.46)*64,-47,47);
    fan.style.setProperty('--tilt-x',tx+'deg');fan.style.setProperty('--tilt-y',ty+'deg');fan.style.setProperty('--inspection-reflection',limit(ty*.65-tx*.35,-35,35)+'%');
  } else {
    fan.style.setProperty('--drag-angle',limit(dx/stepWidth,-2,2)*15+'deg');
    fan.style.setProperty('--flex',limit(-dy/cardHeight*29,-10,10)+'deg');
  }
}
fan.addEventListener('pointermove',e=>{
  if(!pointer||e.pointerId!==pointer.id)return;
  const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;
  if(!pointer.moved) {
    if(Math.hypot(dx,dy)<7)return;
    pointer.moved=true;clearTap();
    if(!picked){
      const elements=[...storedSlots.values()];
      const angles=elements.map(el=>{
        const m=new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return Math.atan2(m.b,m.a)*180/Math.PI;
      });
      elements.forEach((el,i)=>el.style.setProperty('--grip-angle',angles[i]+'deg'));
    }
    fan.dataset.dragging='true';
  }
  pointer.dx=dx;pointer.dy=dy;
  if(!dragFrame)dragFrame=requestAnimationFrame(renderDrag);
});
function release(e,cancel=false) {
  if(!pointer||e.pointerId!==pointer.id)return;
  const gesture=pointer;
  if(dragFrame){cancelAnimationFrame(dragFrame);renderDrag();}
  pointer=null;
  if(fan.hasPointerCapture(e.pointerId))fan.releasePointerCapture(e.pointerId);
  if(gesture.moved){
    fan.dataset.settling='true';clearTimeout(settleTimer);settleTimer=setTimeout(()=>{delete fan.dataset.settling;},400);
    delete fan.dataset.dragging;
    storedSlots.forEach(el=>el.style.removeProperty('--grip-angle'));
    fan.style.removeProperty('--drag-angle');fan.style.removeProperty('--flex');
    if(!cancel&&!picked&&Math.abs(gesture.dx/stepWidth)>.16){move(Math.sign(gesture.dx)*limit(Math.round(Math.abs(gesture.dx/stepWidth)),1,2),5200);}
  } else if(!cancel)onTap(gesture.code,e.clientX,e.clientY);
  if(cancel)clearTap();
  restart(5200);
}
fan.addEventListener('pointerup',release);
fan.addEventListener('pointercancel',e=>release(e,true));
fan.addEventListener('lostpointercapture',e=>release(e,true));
fan.addEventListener('dblclick',e=>{
  if(performance.now()-lastDouble<180)return;
  const b=e.target.closest('[data-fan-code]');if(b){clearTap();toggleSample(b.dataset.fanCode);}
});
fan.addEventListener('click',e=>{
  if(e.detail===0){const b=e.target.closest('button');if(b)toggleSample(b.dataset.fanCode);}
});
document.addEventListener('keydown',e=>{
  if(e.defaultPrevented||e.metaKey||e.altKey||e.ctrlKey||drawer.open||shareDialog.open)return;
  if(e.key==='Escape'&&picked){setPicked(false);return;}
  if(e.target.closest('input,select,textarea'))return;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
    e.preventDefault();move(e.key==='ArrowRight'?1:-1,5200);
  } else if((e.key==='Enter'||e.key===' ')&&e.target===fan){
    e.preventDefault();if(!e.repeat)toggleSample(active().code);
  }
});
reducedMotion.addEventListener('change',e=>{if(e.matches){playing=false;controls();restart();}});
document.addEventListener('visibilitychange',()=>restart());
const resize=new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(layout);});
resize.observe(fan);translate();layout();restart(1200);
