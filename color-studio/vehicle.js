import { swatches } from './catalog.js';

const strings = {
  en: {
    title: 'Vehicle preview', back: 'Color Studio', color: 'Film color', view: 'View',
    car: 'Full vehicle', closeup: 'Close-up', macro: 'Material detail', sphere: 'Paint sphere',
    vehicle: 'Vehicle', lighting: 'Lighting', studio: 'Studio', gallery: 'Daylight', sunset: 'Sunset',
    gesture: 'Drag to rotate · Scroll or pinch to zoom', previous: 'Previous color', next: 'Next color',
    note: 'Screen colors are approximate. Use a physical sample for final selection.', credits: '3D model credits',
    retry: 'Try again', language: 'Language', loading: 'Loading model', preparing: 'Preparing preview',
    libraryError: 'The 3D viewer could not be loaded. Check your connection and try again.',
    graphicsError: '3D graphics are unavailable in this browser. You can still explore every color in Color Studio.',
    modelError: 'This vehicle could not be loaded. Try again or choose another vehicle.', preview: 'Interactive 3D preview',
  },
  zh: {
    title: '装车预览', back: '返回色卡', color: '车衣颜色', view: '视图',
    car: '整车', closeup: '车身近景', macro: '漆面微距', sphere: '光影球',
    vehicle: '车型', lighting: '灯光', studio: '影棚', gallery: '日光', sunset: '落日',
    gesture: '拖动旋转 · 滚轮或双指缩放', previous: '上一个颜色', next: '下一个颜色',
    note: '屏幕显示有色差，选色请以实物色样为准。', credits: '3D 模型来源',
    retry: '重试', language: '语言', loading: '正在加载车型', preparing: '正在准备预览',
    libraryError: '3D 查看器加载失败，请检查网络后重试。',
    graphicsError: '当前浏览器暂时无法显示 3D 画面。你仍可返回色卡浏览所有颜色。',
    modelError: '当前车型加载失败，请重试或选择其他车型。', preview: '交互式 3D 装车预览',
  },
  ru: {
    title: 'Примерка цвета', back: 'К образцам', color: 'Цвет плёнки', view: 'Режим просмотра',
    car: 'Автомобиль', closeup: 'Крупный план', macro: 'Фактура', sphere: 'Сфера',
    vehicle: 'Модель', lighting: 'Освещение', studio: 'Студия', gallery: 'Дневной свет', sunset: 'Закат',
    gesture: 'Перетащите для поворота · Меняйте масштаб колёсиком или двумя пальцами',
    previous: 'Предыдущий цвет', next: 'Следующий цвет',
    note: 'Цвет на экране может отличаться. Для окончательного выбора используйте физический образец.',
    credits: 'Авторы 3D-моделей', retry: 'Повторить', language: 'Язык', loading: 'Загрузка модели',
    preparing: 'Подготовка просмотра', libraryError: 'Не удалось загрузить 3D-просмотр. Проверьте соединение и повторите попытку.',
    graphicsError: 'В этом браузере недоступна 3D-графика. Все цвета можно посмотреть в каталоге образцов.',
    modelError: 'Не удалось загрузить автомобиль. Повторите попытку или выберите другую модель.',
    preview: 'Интерактивная 3D-примерка',
  },
};
const $ = id => document.getElementById(id);
const initial = new URLSearchParams(location.search);
const pick = (key, options, fallback) => options.includes(initial.get(key)) ? initial.get(key) : fallback;
const state = {
  lang: pick('lang', ['en','zh','ru'], 'en'),
  index: swatches.findIndex(item => item.code === (initial.get('code') || 'TPU-010S').toUpperCase()),
  view: pick('view', ['car','closeup','macro','sphere'], 'car'),
  model: pick('model', ['model3','modely'], 'model3'),
  light: pick('light', ['studio','gallery','sunset'], 'studio'),
};
if (state.index < 0) state.index = swatches.findIndex(item => item.code === 'TPU-010S');
const vehicleView = () => state.view === 'car' || state.view === 'closeup';
let viewer, generation = 0, engine = 'loading', modelStatus = 'idle', progress = 0;
let importFailed = false;
const t = key => strings[state.lang][key];

function updateStatus() {
  const failure = engine === 'libraryError' || engine === 'graphicsError' ? engine
    : vehicleView() && modelStatus === 'error' ? 'modelError' : '';
  $('stage').dataset.status = failure || (engine === 'loading' ? 'loading' : vehicleView() ? modelStatus : 'ready');
  $('notice').hidden = !failure;
  $('notice-text').textContent = failure ? t(failure) : '';
  $('gesture').hidden = Boolean(failure);
  const message = failure ? '' : engine === 'loading' ? t('preparing')
    : vehicleView() && modelStatus === 'loading' ? t('loading') + (progress ? ' · ' + progress + '%' : '…') : '';
  if ($('live').textContent !== message) $('live').textContent = message;
}

function updateSelection() {
  const item = swatches[state.index];
  $('code').textContent = item.code;
  $('name').textContent = item.name[state.lang];
  $('color').value = item.code;
  $('chip').style.backgroundColor = item.hex;
  $('count').textContent = (state.index + 1) + ' / ' + swatches.length;
  const back = new URL('./', location.href);
  back.search = new URLSearchParams({lang: state.lang, code: item.code}).toString();
  $('back').href = back.href;
  $('fallback-back').href = back.href;
  const url = new URL(location.href);
  for (const [key,value] of Object.entries({lang: state.lang, code: item.code, view: state.view, model: state.model, light: state.light})) {
    url.searchParams.set(key, value);
  }
  history.replaceState(null, '', url.href);
  for (const key of ['view','model','light']) {
    for (const el of document.querySelectorAll('button[data-'+key+']')) el.setAttribute('aria-pressed', String(el.dataset[key] === state[key]));
  }
  $('vehicle-group').disabled = !vehicleView();
  updateStatus();
  if (viewer) viewer.render({
    activeSwatch: item, viewMode: state.view, lightingPreset: state.light, vehicleId: state.model,
    onStepSwatch: stepColor, onModelStatusChange: onModelStatus,
  });
}

function updateLanguage() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : state.lang;
  document.title = t('title') + ' | H&H Automotive Films';
  $('language').value = state.lang;
  $('language').setAttribute('aria-label', t('language'));
  $('stage').setAttribute('aria-label', t('preview'));
  $('previous').setAttribute('aria-label', t('previous'));
  $('next').setAttribute('aria-label', t('next'));
  $('home').href = state.lang === 'zh' ? '/index-zh.html' : state.lang === 'ru' ? '/index-ru.html' : '/';
  document.querySelectorAll('[data-label]').forEach(el => { el.textContent = t(el.dataset.label); });
  $('color').replaceChildren(...swatches.map(item => new Option(item.name[state.lang] + ' · ' + item.code, item.code)));
  updateSelection();
}

function stepColor(delta) {
  state.index = (state.index + delta + swatches.length) % swatches.length;
  updateSelection();
}
function onModelStatus(status, value) {
  modelStatus = status;
  progress = value;
  updateStatus();
}
function stopViewer() {
  generation++;
  viewer?.destroy();
  viewer = null;
}
async function startViewer() {
  stopViewer();
  const token = generation;
  engine = 'loading';
  modelStatus = 'idle';
  progress = 0;
  updateStatus();
  if (!window.WebGL2RenderingContext) {
    engine = 'graphicsError';
    updateStatus();
    return;
  }
  let mount;
  try {
    // Native modules cache evaluation failures. A failed download can be retried
    // independently, without reloading the chosen color or language.
    ({mount} = importFailed
      ? await import('./vehicle-renderer.js?retry=' + Date.now())
      : await import('./vehicle-renderer.js'));
    importFailed = false;
  } catch {
    if (token !== generation) return;
    importFailed = true;
    engine = 'libraryError';
    updateStatus();
    return;
  }
  if (token !== generation) return;
  const unavailable = () => {
    if (generation !== token) return;
    engine = 'graphicsError';
    updateStatus();
    queueMicrotask(() => { if (generation === token) stopViewer(); });
  };
  try {
    viewer = mount($('canvas-host'), unavailable);
    engine = 'ready';
    updateSelection();
  } catch {
    unavailable();
  }
}

$('language').addEventListener('change', e => { state.lang = e.target.value; updateLanguage(); });
$('color').addEventListener('change', e => { state.index = swatches.findIndex(item => item.code === e.target.value); updateSelection(); });
$('previous').addEventListener('click', () => stepColor(-1));
$('next').addEventListener('click', () => stepColor(1));
$('controls').addEventListener('click', e => {
  const button = e.target.closest('button');
  if (!button) return;
  for (const key of ['view','model','light']) {
    const value = button.dataset[key];
    if (!value || value === state[key]) continue;
    if (key === 'model') { modelStatus = 'loading'; progress = 0; }
    state[key] = value;
    updateSelection();
  }
});
$('retry').addEventListener('click', startViewer);
window.addEventListener('pagehide', stopViewer);
window.addEventListener('pageshow', e => { if (e.persisted) startViewer(); });
updateLanguage();
startViewer();
