import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Car,
  Info,
  Loader2,
  Moon,
  Hand,
  Pause,
  Play,
  Undo2,
  Sparkles,
  Sun,
  Sunset,
} from 'lucide-react';
import {
  COLOR_STUDIO_SWATCHES,
  FINISH_FILTERS,
  AIOC_SPEC,
  LIGHTING_PRESETS,
  STUDIO_VEHICLES,
  findColorSwatchByCode,
  type ColorFilmItem,
  type FilmFinishType,
  type StudioLightingPreset,
  type StudioVehicleId,
  type StudioViewMode,
} from '../config/colorStudio';
import type { CarModelLoadStatus } from '../components/color-studio/ColorStudioCanvas';
import { SwatchFan } from '../components/color-studio/SwatchFan';
import './ColorStudioFanLayout.css';
import { ColorCatalogDrawer } from '../components/color-studio/ColorCatalogDrawer';
import { ColorCardModal } from '../components/color-studio/ColorCardModal';
import { cn } from '../lib/cn';

const ColorStudioCanvas = lazy(() => import('../components/color-studio/ColorStudioCanvas')
  .then(module => ({ default: module.ColorStudioCanvas })));

const VIEW_MODES: Array<{
  key: StudioViewMode;
  label: string;
  shortLabel: string;
  labelEn: string;
  labelRu: string;
  shortLabelRu: string;
}> = [
  { key: 'swatch', label: '流光样板', shortLabel: '样板', labelEn: 'Swatches', labelRu: 'Веер образцов', shortLabelRu: 'Веер' },
  { key: 'car', label: '实车整车', shortLabel: '整车', labelEn: 'Vehicle', labelRu: 'Автомобиль', shortLabelRu: 'Авто' },
  { key: 'closeup', label: '腰线近景', shortLabel: '近景', labelEn: 'Detail', labelRu: 'Деталь кузова', shortLabelRu: 'Деталь' },
  { key: 'macro', label: '微距肌理', shortLabel: '微距', labelEn: 'Macro', labelRu: 'Макрофактура', shortLabelRu: 'Макро' },
  { key: 'sphere', label: '光影球体', shortLabel: '球体', labelEn: 'Sphere', labelRu: 'Сфера', shortLabelRu: 'Сфера' },
];

type Language = 'zh' | 'en' | 'ru';

function initialLanguage(query: URLSearchParams): Language {
  const requested = query.get('lang');
  if (requested === 'en' || requested === 'zh' || requested === 'ru') return requested;
  if (document.referrer) {
    const from = new URL(document.referrer);
    if (from.origin === location.origin) {
      const home = from.pathname.match(/^\/index-(zh|ru)(?:\.html)?\/?$/);
      if (home) return home[1] as Language;
      if (from.pathname === '/' || from.pathname === '/index.html') return 'en';
      const fromLang = from.searchParams.get('lang');
      if (fromLang === 'en' || fromLang === 'zh' || fromLang === 'ru') return fromLang;
    }
  }
  try {
    const stored = localStorage.getItem('hhColorStudioLang');
    if (stored === 'en' || stored === 'zh' || stored === 'ru') return stored;
  } catch { /* Embedded browsers can disable storage. */ }
  return 'en';
}

export default function ColorStudioPage() {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'miniprogram';

  const initialSwatch = useMemo(
    () => findColorSwatchByCode(searchParams.get('code')),
    [],
  );

  const initialMode = useMemo<StudioViewMode>(() => {
    const raw = searchParams.get('mode');
    if (
      raw === 'car' ||
      raw === 'closeup' ||
      raw === 'macro' ||
      raw === 'sphere' ||
      raw === 'swatch'
    ) {
      return raw;
    }
    return 'swatch';
  }, []);

  const initialVehicle = useMemo<StudioVehicleId>(() => {
    const raw = searchParams.get('car');
    return raw === 'modely' ? 'modely' : 'model3';
  }, []);

  const [activeSwatch, setActiveSwatch] = useState<ColorFilmItem>(initialSwatch);
  const [viewMode, setViewMode] = useState<StudioViewMode>(initialMode);
  const [lightingPreset, setLightingPreset] =
    useState<StudioLightingPreset>(() => {
      const light = searchParams.get('light');
      return light === 'gallery' || light === 'sunset' ? light : 'studio';
    });
  const [railFinish, setRailFinish] = useState<'all' | FilmFinishType>(() => {
    const filter = searchParams.get('finish');
    return filter === initialSwatch.finish ? initialSwatch.finish : 'all';
  });
  const [vehicleId, setVehicleId] = useState<StudioVehicleId>(initialVehicle);
  const [lang, setLang] = useState<Language>(() => initialLanguage(searchParams));
  const tr = (zh: string, en: string, ru: string) => lang === 'zh' ? zh : lang === 'ru' ? ru : en;
  const selectedName = tr(activeSwatch.name, activeSwatch.nameEn, activeSwatch.nameRu);
  const alternateName = lang === 'en' ? activeSwatch.name : activeSwatch.nameEn;
  const alternateLang = lang === 'en' ? 'zh' : 'en';
  const homeUrl = lang === 'en' ? '/' : `/index-${lang}.html`;
  const productUrl = homeUrl + '#products';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = { en: 'Color Studio', zh: '高定选色工坊', ru: 'Студия цвета' }[lang] + ' | H&H Automotive Films';
  }, [lang]);

  function changeLanguage(next: Language) {
    setLang(next);
    try { localStorage.setItem('hhColorStudioLang', next); } catch { /* Keep the URL usable without storage. */ }
  }
  const [pickedUp, setPickedUp] = useState<boolean>(false);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const railRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [cardModalOpen, setCardModalOpen] = useState<boolean>(false);
  const [modelStatus, setModelStatus] = useState<CarModelLoadStatus>('idle');
  const [modelProgress, setModelProgress] = useState<number>(0);

  const railSwatches = useMemo(
    () =>
      railFinish === 'all'
        ? COLOR_STUDIO_SWATCHES
        : COLOR_STUDIO_SWATCHES.filter((s) => s.finish === railFinish),
    [railFinish],
  );

  const activeGlobalIndex = useMemo(() => {
    const idx = COLOR_STUDIO_SWATCHES.findIndex((s) => s.code === activeSwatch.code);
    return idx === -1 ? 0 : idx;
  }, [activeSwatch.code]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('code', activeSwatch.code);
    params.set('mode', viewMode);
    params.set('car', vehicleId);
    params.set('lang', lang);
    if (lightingPreset === 'studio') params.delete('light'); else params.set('light', lightingPreset);
    if (railFinish === 'all') params.delete('finish'); else params.set('finish', railFinish);
    const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', nextUrl);
  }, [activeSwatch.code, viewMode, vehicleId, lang, lightingPreset, railFinish]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => { if (preference.matches) setPlaying(false); };
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!rail || !chip) return;
    const parent = rail.getBoundingClientRect(), item = chip.getBoundingClientRect();
    if (item.left < parent.left || item.right > parent.right) {
      rail.scrollLeft += item.left - parent.left - (parent.width - item.width) / 2;
    }
  }, [activeSwatch.code, railFinish, viewMode]);

  function selectFromControls(swatch: ColorFilmItem) {
    if (viewMode === 'swatch') {
      setPlaying(false);
      setPickedUp(false);
      if (railFinish !== 'all' && swatch.finish !== railFinish) setRailFinish('all');
    }
    setActiveSwatch(swatch);
  }

  function selectFinish(finish: 'all' | FilmFinishType) {
    setRailFinish(finish);
    if (viewMode !== 'swatch') return;
    setPlaying(false);
    setPickedUp(false);
    if (finish !== 'all' && finish !== activeSwatch.finish) {
      const first = COLOR_STUDIO_SWATCHES.find(swatch => swatch.finish === finish);
      if (first) setActiveSwatch(first);
    }
  }

  const handleSelectSwatchByIndex = useCallback((idx: number) => {
    const len = COLOR_STUDIO_SWATCHES.length;
    const safeIdx = ((idx % len) + len) % len;
    setActiveSwatch(COLOR_STUDIO_SWATCHES[safeIdx]);
  }, []);

  const handleStepSwatch = useCallback(
    (delta: number) => {
      handleSelectSwatchByIndex(activeGlobalIndex + delta);
    },
    [activeGlobalIndex, handleSelectSwatchByIndex],
  );

  const handleModelStatusChange = useCallback(
    (status: CarModelLoadStatus, progress: number) => {
      setModelStatus(status);
      setModelProgress(progress);
    },
    [],
  );

  const handleChangeViewMode = (mode: StudioViewMode) => {
    setPickedUp(false);
    if (mode === 'swatch' && railFinish !== 'all' && activeSwatch.finish !== railFinish) {
      setRailFinish('all');
    }
    setViewMode(mode);
  };

  const renderLightIcon = (key: StudioLightingPreset) => {
    if (key === 'studio') return <Moon className="w-3 h-3" />;
    if (key === 'gallery') return <Sun className="w-3 h-3" />;
    return <Sunset className="w-3 h-3" />;
  };

  return (
    <div className={cn('relative w-full h-[100dvh] overflow-hidden bg-[#08090c] text-[#F7F3EB] select-none', viewMode === 'swatch' && 'studio-fan-page')}>
      {/* 2. 顶部高定建筑感导航栏 */}
      <header className="absolute top-0 left-0 right-0 z-20 px-3 py-3 md:px-6 md:py-4 flex items-center justify-between gap-1.5 md:gap-2 pointer-events-none">
        {/* 左侧：返回 + 品牌标识 */}
        <div className="flex items-center gap-1.5 md:gap-3 pointer-events-auto whitespace-nowrap min-w-0">
          {!isEmbed && (
            <a
              href={productUrl}
              aria-label={tr('返回官网', 'Back', 'К продукции H&H')}
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full bg-[#0a0b0f]/92 hover:bg-[#14161e] border border-white/12 text-xs text-white/80 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tr('返回', 'Back', 'Назад')}</span>
            </a>
          )}
          <a href={homeUrl} aria-label={tr('H&H 官网', 'H&H home', 'На главную H&H')} className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0a0b0f]/92 border border-white/10">
            <img src="/assets/hh-logo.png" alt="H&H" width="43" height="20" className="h-4 w-auto md:h-5" />
            <span className="hidden sm:inline-block w-px h-3 bg-[#e9481a]/35" />
            <span className="hidden sm:inline text-[11px] tracking-widest text-white/60">
              {tr('高定选色工坊', 'ATELIER STUDIO', 'СТУДИЯ ЦВЕТА')}
            </span>
          </a>
        </div>

        {/* 桌面端居中：5 大视角分段控制器 */}
        <nav
          aria-label={tr('展示模式', 'View mode', 'Режим просмотра')}
          className="hidden lg:inline-flex items-center p-1 rounded-full bg-[#090a0e]/92 border border-[#e9481a]/25 shadow-2xl pointer-events-auto"
        >
          {VIEW_MODES.map((m) => {
            const active = viewMode === m.key;
            return (
              <button
                key={m.key}
                aria-pressed={active}
                type="button"
                onClick={() => handleChangeViewMode(m.key)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                  active
                    ? 'bg-[#e9481a] text-[#090A0D] font-semibold shadow'
                    : 'text-white/70 hover:text-[#F7F3EB]',
                )}
              >
                {tr(m.label, m.labelEn, m.labelRu)}
              </button>
            );
          })}
        </nav>

        {/* 右侧：三档 HDR 灯光切换 + 语言 + 定制选色单 */}
        <div className="flex items-center gap-1 md:gap-2 pointer-events-auto flex-shrink-0">
          <div
            role="group"
            aria-label={tr('影棚光影切换', 'Studio Lighting', 'Освещение студии')}
            className="inline-flex items-center p-0.5 rounded-full bg-[#090a0e]/92 border border-white/12"
          >
            {LIGHTING_PRESETS.map((preset) => {
              const active = lightingPreset === preset.key;
              return (
                <button
                  key={preset.key}
                  aria-pressed={active}
                  type="button"
                  onClick={() => setLightingPreset(preset.key)}
                  title={tr(preset.label, preset.labelEn, preset.labelRu)}
                  className={cn(
                    'inline-flex items-center gap-1 px-1.5 sm:px-2 md:px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all whitespace-nowrap',
                    active
                      ? 'bg-white/15 text-[#ffab81] border border-[#e9481a]/45'
                      : 'text-white/55 hover:text-white border border-transparent',
                  )}
                >
                  {renderLightIcon(preset.key)}
                  <span className="hidden sm:inline">
                    {tr(preset.shortLabel, preset.shortLabelEn, preset.shortLabelRu)}
                  </span>
                </button>
              );
            })}
          </div>

          <select
            aria-label={tr('语言', 'Language', 'Язык')}
            value={lang}
            onChange={event => changeLanguage(event.target.value as Language)}
            className="studio-language w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#090a0e]/92 hover:bg-[#14161e] border border-white/15 text-[11px] font-mono font-semibold transition-colors"
          >
            <option value="en" lang="en">EN</option>
            <option value="zh" lang="zh">中</option>
            <option value="ru" lang="ru">RU</option>
          </select>

          <button
            type="button"
            onClick={() => setCardModalOpen(true)}
            className="h-8 w-8 sm:w-auto sm:px-3 md:h-9 md:px-3.5 rounded-full bg-[#090a0e]/92 hover:bg-[#171922] border border-[#e9481a]/55 text-[#ffab81] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap"
            aria-label={tr('定制选色单', 'Spec Card', 'Карточка цвета')}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {tr('定制选色单', 'Spec Card', 'Карточка цвета')}
            </span>
          </button>
        </div>
      </header>

      {viewMode === 'swatch' ? (
        <>
          <section className="studio-fan-toolbar" aria-label={tr('当前色卡', 'Current swatch', 'Текущий образец')}>
            <div className="studio-fan-identity">
              <div className="studio-fan-meta"><span>{activeSwatch.code}</span><span>{tr(activeSwatch.seriesName.split(' ')[0], activeSwatch.finishLabelEn, activeSwatch.finishLabelRu)}</span></div>
              <div className="studio-fan-title">
                <h1>{selectedName}</h1>
                <span lang={alternateLang}>{alternateName}</span>
              </div>
            </div>
            {pickedUp && (
              <div className="studio-fan-optics">
                <span>{tr('镜面清漆', 'Gloss', 'Глянец')} <b>{activeSwatch.optics.gloss}</b></span>
                <span>{tr('金属微粒', 'Flake', 'Зерно')} <b>{activeSwatch.optics.metallic}</b></span>
                <span>{tr('折光幻彩', 'Shift', 'Перелив')} <b>{activeSwatch.optics.shift}</b></span>
              </div>
            )}
            <div className="studio-fan-actions">
              <button type="button" className="fan-play" disabled={pickedUp} aria-label={playing ? tr('暂停轮播', 'Pause playback', 'Приостановить показ') : tr('开始轮播', 'Start playback', 'Включить показ')} title={playing ? tr('暂停轮播', 'Pause', 'Пауза') : tr('开始轮播', 'Play', 'Пуск')} onClick={() => setPlaying(on => !on)}>
                {playing && !pickedUp ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button type="button" className="fan-handle" aria-pressed={pickedUp} onClick={() => setPickedUp(on => !on)}>
                {pickedUp ? <Undo2 size={15} /> : <Hand size={15} />}
                {pickedUp ? tr('放回色卡', 'Return', 'Вернуть') : tr('拿起色卡', 'Pick up', 'Взять')}
              </button>
              <button type="button" className="fan-vehicle" onClick={() => handleChangeViewMode('car')}>
                <Car size={15} />{tr('装车预览', 'On car', 'На авто')}
              </button>
            </div>
          </section>
          <main className="studio-fan-stage" aria-label={tr('流光样板', 'Swatch gallery', 'Веер образцов')}>
            <SwatchFan swatches={railSwatches} activeSwatch={activeSwatch} lightingPreset={lightingPreset}
              lang={lang} pickedUp={pickedUp} paused={!playing || drawerOpen || cardModalOpen}
              onSelect={setActiveSwatch} onPickedUpChange={setPickedUp} />
          </main>
        </>
      ) : (
        <div className="absolute inset-0">
          <Suspense fallback={<div className="grid h-full place-items-center"><Loader2 aria-label={tr('载入 3D 展台', 'Loading 3D studio', 'Загрузка 3D-студии')} className="text-[#e9481a] animate-spin" /></div>}>
            <ColorStudioCanvas lang={lang} activeSwatch={activeSwatch} viewMode={viewMode} lightingPreset={lightingPreset}
              vehicleId={vehicleId} onStepSwatch={handleStepSwatch} onModelStatusChange={handleModelStatusChange} />
          </Suspense>
        </div>
      )}

      {/* 3. 左侧高定色号铭牌卡（桌面端详细光学参数 / 移动端精简浮层） */}
      {viewMode !== 'swatch' && <aside className="absolute top-14 left-3.5 md:top-20 md:left-6 z-20 pointer-events-auto max-w-[74vw] md:w-72">
        <div className="rounded-2xl bg-[#090a0e]/92 border border-[#e9481a]/25 p-3 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* 编号顶标 */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono tracking-[0.16em] text-[#e9481a]">
            <span>
              {activeSwatch.code} ·{' '}
              {String(activeGlobalIndex + 1).padStart(2, '0')} /{' '}
              {String(COLOR_STUDIO_SWATCHES.length).padStart(2, '0')}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white/70 tracking-normal">
              {AIOC_SPEC.thickness} TPU
            </span>
          </div>

          {/* 主副标题 */}
          <div className="mt-1.5 md:mt-2 flex items-center gap-2.5">
            <div
              className="w-7 h-7 md:hidden rounded-full border border-white/25 flex-shrink-0"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${activeSwatch.shiftHex || activeSwatch.hex}, ${activeSwatch.hex} 75%)`,
              }}
            />
            <div className="min-w-0">
              <h1 className="text-base md:text-2xl font-display font-bold tracking-wide text-[#F7F3EB] truncate">
                {selectedName}
              </h1>
              <p className="text-[11px] text-white/50 font-mono truncate">
                {alternateName} ·{' '}
                {tr(activeSwatch.finishLabel, activeSwatch.finishLabelEn, activeSwatch.finishLabelRu)}
              </p>
            </div>
          </div>

          {/* 桌面端：质感短评 + 3 项光学指标进度条 */}
          <div className="hidden md:block mt-3 pt-3 border-t border-white/10 space-y-2.5">
            <p className="text-xs text-white/70 leading-relaxed">
              {tr(activeSwatch.tagline, activeSwatch.taglineEn, activeSwatch.taglineRu)}
            </p>

            <div className="space-y-1.5 pt-1">
              {[
                {
                  k: tr('镜面清漆', 'Clearcoat Gloss', 'Блеск лака'),
                  v: activeSwatch.optics.gloss,
                },
                {
                  k: tr('金属微粒', 'Metallic Flake', 'Зерно'),
                  v: activeSwatch.optics.metallic,
                },
                {
                  k: tr('折光幻彩', 'Color Shift', 'Перелив'),
                  v: activeSwatch.optics.shift,
                },
              ].map((metric) => (
                <div key={metric.k} className="flex items-center gap-2 text-[11px]">
                  <span className="w-16 text-white/50 flex-shrink-0">{metric.k}</span>
                  <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#e9481a] to-[#ffab81] transition-all duration-500"
                      style={{ width: `${metric.v}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-mono text-white/70">
                    {metric.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 快捷动作：装车实看 / 双车型切换（Model 3 焕新版 / Model Y 焕新版） */}
          <div className="mt-2.5 md:mt-3.5 pt-2.5 md:pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            {viewMode !== 'car' && viewMode !== 'closeup' ? (
              <button
                type="button"
                onClick={() => handleChangeViewMode('car')}
                className="w-full h-8 md:h-9 rounded-xl bg-white/10 hover:bg-[#e9481a] hover:text-[#090A0D] border border-white/15 hover:border-[#e9481a] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Car className="w-3.5 h-3.5" />
                <span>{tr('装车实看 3D 效果', 'Preview on 3D Car', 'На 3D-модели')}</span>
              </button>
            ) : (
              <div
                role="group"
                aria-label={tr('展车车型切换', 'Vehicle Selector', 'Выбор модели')}
                className="w-full grid grid-cols-2 p-0.5 rounded-xl bg-black/50 border border-white/12"
              >
                {STUDIO_VEHICLES.map((vehicle) => {
                  const active = vehicleId === vehicle.id;
                  return (
                    <button
                      key={vehicle.id}
                      aria-pressed={active}
                      type="button"
                      onClick={() => setVehicleId(vehicle.id)}
                      className={cn(
                        'py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap',
                        active
                          ? 'bg-[#e9481a] text-[#090A0D] font-semibold shadow'
                          : 'text-white/65 hover:text-white',
                      )}
                    >
                      {tr(vehicle.name, vehicle.shortName, vehicle.shortName)}
                    </button>
                  );
                })}
              </div>
            )}

            {(viewMode === 'car' || viewMode === 'closeup') &&
              modelStatus === 'loading' && (
                <div className="w-full flex items-center justify-center gap-1.5 text-[11px] text-[#ffab81] py-0.5">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>
                    {tr('加载', 'Loading', 'Загрузка')} {vehicleId === 'modely' ? 'Model Y' : 'Model 3'} · {modelProgress}%
                  </span>
                </div>
              )}

            {(viewMode === 'car' || viewMode === 'closeup') &&
              modelStatus === 'error' && (
                <div className="w-full text-[11px] text-red-300 text-center">
                  {tr('3D 车模加载失败，请刷新重试', 'Failed to load car model', 'Не удалось загрузить модель. Обновите страницу.')}
                </div>
              )}
          </div>
        </div>
      </aside>}

      {/* 4. 底部一体式控制台（移动端模式切换 + 高定流光色珠胶片轨） */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3.5 pt-2 md:px-6 md:pb-5 flex flex-col items-center gap-2 pointer-events-none bg-gradient-to-t from-black/85 via-black/45 to-transparent">
        {viewMode === 'swatch' && (
          <p className="studio-fan-hint">
            {pickedUp
              ? tr('拖动色卡看折光 · 双击放回', 'Drag to tilt · Double-tap to return', 'Поворачивайте образец · Двойное нажатие вернёт его на место')
              : tr('滑动切色 · 双击拿起色卡', 'Swipe to browse · Double-tap to pick up', 'Листайте в стороны · Двойное нажатие поднимет образец')}
          </p>
        )}
        {/* 小屏模式切换器 */}
        <nav
          aria-label={tr('展示模式切换', 'Switch view', 'Выбрать режим')}
          className="lg:hidden inline-flex items-center p-1 rounded-full bg-[#090a0e]/92 border border-[#e9481a]/25 pointer-events-auto max-w-full overflow-x-auto no-scrollbar"
        >
          {VIEW_MODES.map((m) => {
            const active = viewMode === m.key;
            return (
              <button
                key={m.key}
                aria-pressed={active}
                type="button"
                onClick={() => handleChangeViewMode(m.key)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                  active
                    ? 'bg-[#e9481a] text-[#090A0D] font-semibold'
                    : 'text-white/70 hover:text-white',
                )}
              >
                {tr(m.shortLabel, m.labelEn, m.shortLabelRu)}
              </button>
            );
          })}
        </nav>

        {/* 高定「流光色珠胶片轨」面板 */}
        <div className="w-full max-w-4xl rounded-2xl bg-[#090a0e]/92 border border-white/12 px-3 py-2.5 md:px-4 md:py-3 shadow-2xl pointer-events-auto">
          {/* 轨道顶排：工艺标签 + 操作指引 + 全系色谱典藏入口 */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {FINISH_FILTERS.map((f) => {
                const active = railFinish === f.key;
                return (
                  <button
                    key={f.key}
                    aria-pressed={active}
                    type="button"
                    onClick={() => selectFinish(f.key)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all',
                      active
                        ? 'bg-white/14 text-[#ffab81] border border-[#e9481a]/45'
                        : 'text-white/55 hover:text-white border border-transparent',
                    )}
                  >
                    {tr(f.label, f.labelEn, f.labelRu)}
                  </button>
                );
              })}
            </div>

            {viewMode !== 'swatch' && <p className="hidden lg:block text-[11px] text-white/40 truncate">
              {tr('拖动 360° 旋转 · 滚轮或双指缩放漆面细节', 'Drag to orbit 360° · Pinch or scroll to zoom', 'Вращайте на 360° · Приближайте колёсиком или двумя пальцами')}
            </p>}

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e9481a]/15 hover:bg-[#e9481a]/25 border border-[#e9481a]/40 text-[11px] font-medium text-[#ffab81] whitespace-nowrap transition-colors flex-shrink-0"
            >
              <Sparkles className="w-3 h-3" />
              <span>{tr('全系色谱典藏', 'Archive', 'Каталог')}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* 轨道底排：横向立体流光色珠选择轨 */}
          <div ref={railRef} className="mt-2.5 flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 no-scrollbar">
            {railSwatches.map((swatch) => {
              const selected = swatch.code === activeSwatch.code;
              const shiftTone = swatch.shiftHex || swatch.hex;
              return (
                <button
                  key={swatch.code}
                  title={tr(swatch.name, swatch.nameEn, swatch.nameRu)}
                  aria-label={tr(swatch.name, swatch.nameEn, swatch.nameRu) + ' · ' + swatch.code}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectFromControls(swatch)}
                  className={cn(
                    'group flex flex-col items-center gap-1 px-1.5 py-1 rounded-xl transition-all flex-shrink-0 min-w-[54px] md:min-w-[60px]',
                    selected
                      ? 'bg-white/[0.08]'
                      : 'hover:bg-white/[0.04]',
                  )}
                >
                  <span
                    className={cn(
                      'w-8 h-8 md:w-9 md:h-9 rounded-full relative transition-transform duration-200',
                      selected
                        ? 'scale-110 ring-2 ring-[#e9481a] ring-offset-2 ring-offset-[#090a0e]'
                        : 'group-hover:scale-105 ring-1 ring-white/20',
                    )}
                    style={{
                      background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5) 0%, ${shiftTone} 28%, ${swatch.hex} 72%, #050608 100%)`,
                      boxShadow: 'inset -3px -4px 8px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span className="absolute top-1 left-1.5 w-2.5 h-1 rounded-full bg-white/60 -rotate-[25deg] pointer-events-none" />
                  </span>
                  <span
                    className={cn(
                      'text-[10px] leading-tight truncate max-w-[54px] md:max-w-[60px]',
                      selected ? 'text-[#ffab81] font-semibold' : 'text-white/60',
                    )}
                  >
                    {lang === 'zh' ? swatch.name : swatch.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>

      {/* 5. 全系色谱典藏画廊弹窗 */}
      <ColorCatalogDrawer
        open={drawerOpen}
        activeSwatch={activeSwatch}
        lang={lang}
        onClose={() => setDrawerOpen(false)}
        onSelectSwatch={selectFromControls}
      />

      {/* 6. 定制选色单与海报生成弹窗 */}
      <ColorCardModal
        open={cardModalOpen}
        swatch={activeSwatch}
        lang={lang}
        isEmbed={isEmbed}
        onClose={() => setCardModalOpen(false)}
      />
    </div>
  );
}
