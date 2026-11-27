import { getSwatchOrbVisual } from './swatchVisuals';
// ============================================================
// H&H — 全系色谱典藏画廊弹窗 V2（曜石黑 × 香槟金高定 UI）
// 色系家族筛选 + 工艺过滤 + 搜索 + 立体双曲流光漆面圆穹预览卡
// ============================================================

import { useMemo, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Check, Search, Sparkles, X } from 'lucide-react';
import {
  COLOR_STUDIO_SWATCHES,
  FINISH_FILTERS,
  HUE_GROUPS,
  matchesHueGroup,
  type ColorFilmItem,
  type ColorHueGroup,
  type FilmFinishType,
} from '../../config/colorStudio';
import { studioText, type StudioLanguage } from '../../config/colorStudio';
import { cn } from '../../lib/cn';

export interface ColorCatalogDrawerProps {
  open: boolean;
  activeSwatch: ColorFilmItem;
  lang: StudioLanguage;
  onClose: () => void;
  onSelectSwatch: (swatch: ColorFilmItem) => void;
}

export function ColorCatalogDrawer({
  open,
  activeSwatch,
  lang,
  onClose,
  onSelectSwatch,
}: ColorCatalogDrawerProps) {
  const t = studioText.bind(null, lang);
  const [query, setQuery] = useState('');
  const [finishFilter, setFinishFilter] = useState<'all' | FilmFinishType>('all');
  const [hueGroup, setHueGroup] = useState<ColorHueGroup>('all');

  const [spectrumPosition, setSpectrumPosition] = useState<number | null>(null);
  const neutralEnd = 0.13;
  const spectrumHue = spectrumPosition !== null && spectrumPosition > neutralEnd
    ? Math.round(360 * (spectrumPosition - neutralEnd) / (1 - neutralEnd)) % 360
    : null;

  function selectPosition(ratio: number) {
    setHueGroup('all');
    setSpectrumPosition(Math.max(0, Math.min(1, ratio)));
  }

  function selectPointerPosition(event: PointerEvent<HTMLDivElement>) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    selectPosition((event.clientX - left) / Math.max(1, width));
  }

  function handleSpectrumKey(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 0.1 : 0.01;
    const position = spectrumPosition ?? 0;
    switch (event.key) {
      case 'Home': selectPosition(0); break;
      case 'End': selectPosition(1); break;
      case 'ArrowRight': case 'ArrowUp': selectPosition(position + step); break;
      case 'ArrowLeft': case 'ArrowDown': selectPosition(position - step); break;
      default: return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  const countsByFinish = useMemo(
    () => ({
      all: COLOR_STUDIO_SWATCHES.length,
      crystal: COLOR_STUDIO_SWATCHES.filter((s) => s.finish === 'crystal').length,
      metallic: COLOR_STUDIO_SWATCHES.filter((s) => s.finish === 'metallic').length,
      pearlescent: COLOR_STUDIO_SWATCHES.filter((s) => s.finish === 'pearlescent').length,
      chameleon: COLOR_STUDIO_SWATCHES.filter((s) => s.finish === 'chameleon').length,
      special: COLOR_STUDIO_SWATCHES.filter((s) => s.finish === 'special').length,
    }),
    [],
  );

  const filteredSwatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COLOR_STUDIO_SWATCHES.filter((item) => {
      if (finishFilter !== 'all' && item.finish !== finishFilter) return false;
      if (spectrumPosition !== null) {
        if (spectrumHue === null) {
          if (!item.isNeutral) return false;
        } else {
          const distance = Math.abs(item.hue - spectrumHue);
          if (item.isNeutral || Math.min(distance, 360 - distance) > 26) return false;
        }
      } else if (!matchesHueGroup(item, hueGroup)) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        [item.seriesName, item.seriesNameEn].some(name => name.toLowerCase().includes(q)) ||
        item.code.toLowerCase().includes(q) ||
        item.finishLabel.toLowerCase().includes(q) ||
        item.finishLabelEn.toLowerCase().includes(q)
      );
    });
  }, [query, finishFilter, hueGroup, spectrumPosition, spectrumHue]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-lg animate-fade-in p-0 md:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('H&H 全系色谱典藏', 'H&H Color Archive')}
        className="w-full max-w-4xl h-[88dvh] md:h-[84dvh] rounded-t-3xl md:rounded-2xl bg-[#0a0b0f]/95 border border-[#e9481a]/25 shadow-[0_32px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-[#F7F3EB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部高定标题栏 */}
        <div className="pt-3.5 pb-4 px-5 md:px-7 border-b border-white/10 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-3 md:hidden" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#ffab81]">
                {t(
                  `H&H 色彩工坊 · ${COLOR_STUDIO_SWATCHES.length} 款色号`,
                  `H&H ATELIER ARCHIVE · ${COLOR_STUDIO_SWATCHES.length} BESPOKE SHADES`,
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold tracking-wide mt-1">
                {t('H&H 全系色谱典藏', 'H&H Color Archive')}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-xs font-medium text-[#F7F3EB] transition-colors whitespace-nowrap"
            >
              {t('收起', 'Close')}
            </button>
          </div>

          {/* 搜索框 + 工艺过滤 */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#ffab81]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={t('搜索色谱', 'Search colors')}
                placeholder={
                  t(
                    `搜索 ${COLOR_STUDIO_SWATCHES.length} 款 2026 官方色号（色名 / TPU-003S / 工艺）`,
                    `Search ${COLOR_STUDIO_SWATCHES.length} shades by name, code, or finish...`,
                  )
                }
                className="w-full h-10 pl-10 pr-9 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-[#F7F3EB] placeholder:text-white/35 focus:outline-none focus:border-[#e9481a]/65"
                style={{ color: '#F7F3EB' }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                  aria-label={t('清空搜索', 'Clear search')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {FINISH_FILTERS.map((f) => {
                const active = finishFilter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFinishFilter(f.key)}
                    className={cn(
                      'px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border',
                      active
                        ? 'bg-[#e9481a] text-[#090A0D] border-[#e9481a] font-semibold'
                        : 'bg-white/[0.04] text-white/70 border-white/10 hover:border-white/25 hover:text-white',
                    )}
                  >
                    {t(f.label, f.labelEn)}{' '}
                    <span className={active ? 'opacity-75' : 'opacity-45'}>
                      {countsByFinish[f.key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 连续彩虹光谱条：按颜色浏览 */}
          <div className="mt-3.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-white/60">
                {t('按颜色浏览（拖动或点击色谱精准筛选）', 'Browse by Color Spectrum')}
              </span>
              {spectrumPosition !== null && (
                <button
                  type="button"
                  onClick={() => setSpectrumPosition(null)}
                  className="text-[#ffab81] hover:text-[#ffd1b9] font-medium transition-colors"
                >
                  {t('清除色谱筛选', 'Clear spectrum')}
                </button>
              )}
            </div>
            <div
              role="slider"
              aria-label={t('按颜色浏览彩虹色谱条', 'Color spectrum slider')}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((spectrumPosition ?? 0) * 100)}
              aria-valuetext={spectrumPosition === null ? t('全部颜色', 'All colors') :
                spectrumHue === null ? t('黑白灰', 'Neutral colors') : `${spectrumHue}°`}
              tabIndex={0}
              onKeyDown={handleSpectrumKey}
              onPointerDown={event => {
                if (!event.isPrimary || event.button !== 0) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                selectPointerPosition(event);
              }}
              onPointerMove={event => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) selectPointerPosition(event);
              }}
              className="relative h-8 md:h-9 w-full rounded-xl overflow-hidden cursor-ew-resize touch-none border border-white/15 shadow-inner select-none"
              style={{
                background:
                  'linear-gradient(90deg, #111216 0%, #7d828a 6.5%, #eef0f3 12.6%, #ff2a2a 13%, #ff8c00 26%, #ffe600 39%, #22dd44 52%, #00d4ff 65%, #2b55ff 78%, #9b30ff 90%, #ff2a9d 100%)',
              }}
            >
              {/* 黑白灰与彩色分界微线 */}
              <div className="absolute top-0 bottom-0 left-[13%] w-px bg-black/50 pointer-events-none" />
              {spectrumPosition !== null && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.65),0_4px_12px_rgba(0,0,0,0.6)] pointer-events-none"
                  style={{
                    left: `${(spectrumPosition * 100).toFixed(1)}%`,
                    backgroundColor:
                      spectrumHue === null
                        ? '#8d95a0'
                        : `hsl(${spectrumHue} 90% 55%)`,
                  }}
                />
              )}
            </div>
          </div>

          {/* 七大高定色系家族快捷胶囊 */}
          <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {HUE_GROUPS.map((group) => {
              const active = spectrumPosition === null && hueGroup === group.key;
              return (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => {
                    setSpectrumPosition(null);
                    setHueGroup(group.key);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all',
                    active
                      ? 'bg-white/[0.12] border-[#e9481a] text-[#F7F3EB]'
                      : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white/90 hover:border-white/25',
                  )}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/30 flex-shrink-0"
                    style={{ backgroundColor: group.dotColor }}
                  />
                  <span>{t(group.label, group.labelEn)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 暗金高定材质卡画廊 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {filteredSwatches.length === 0 ? (
            <div className="h-52 flex flex-col items-center justify-center text-white/50 text-sm">
              <Sparkles className="w-6 h-6 mb-2 text-[#ffab81]/70" />
              <p>{t('当前筛选下暂无匹配色号', 'No matching colors found')}</p>
              <button
                type="button"
                onClick={() => {
                  setSpectrumPosition(null);
                  setQuery('');
                  setFinishFilter('all');
                  setHueGroup('all');
                }}
                className="mt-3 px-4 py-1.5 rounded-full border border-[#e9481a]/40 text-xs text-[#ffab81] hover:bg-[#e9481a]/10"
              >
                {t('重置筛选条件', 'Reset filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filteredSwatches.map((swatch) => {
                const selected = swatch.code === activeSwatch.code;
                const shiftTone = swatch.shiftHex || swatch.hex;
                const orb = getSwatchOrbVisual(swatch, 'drawer');
                return (
                  <button
                    key={swatch.code}
                    type="button"
                    onClick={() => {
                      onSelectSwatch(swatch);
                      onClose();
                    }}
                    className={cn(
                      'group text-left rounded-2xl p-2.5 transition-all border bg-[#111319] hover:bg-[#161922]',
                      selected
                        ? 'border-[#e9481a] ring-1 ring-[#e9481a]/50 shadow-[0_0_24px_rgba(233,72,26,0.16)]'
                        : 'border-white/10 hover:border-[#e9481a]/45',
                    )}
                  >
                    {/* 暗黑影棚壁龛 + 立体流光漆面圆穹 */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-b from-[#07080b] via-[#0e1016] to-[#141720] border border-white/[0.06] flex items-center justify-center">
                      {/* 顶部微弱环境光晕 */}
                      <div
                        className="absolute inset-0 opacity-20 blur-xl pointer-events-none transition-opacity group-hover:opacity-35"
                        style={{
                          background: `radial-gradient(circle at 50% 45%, ${shiftTone}, transparent 72%)`,
                        }}
                      />

                      {/* 立体双曲流光漆面圆穹 */}
                      <div
                        className="relative w-16 h-16 md:w-[74px] md:h-[74px] rounded-full overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
                        style={orb.style}
                      >
                        {/* 按工艺呈现对应高光：超哑无亮斑、丝缎柔光、碳纤半光、高光锐利灯带 */}
                        {orb.specular !== 'none' && (
                          <div
                            className={cn(
                              'absolute rounded-full -rotate-[25deg] pointer-events-none',
                              orb.specular === 'satin'
                                ? 'top-2 left-2.5 w-9 h-4 bg-white/[0.24] blur-[4px]'
                                : orb.specular === 'carbon'
                                  ? 'top-2 left-3 w-7 h-2.5 bg-white/[0.32] blur-[1.5px]'
                                  : 'top-2 left-3 w-7 h-2.5 bg-white/55 blur-[1px]',
                            )}
                          />
                        )}
                        <div className="absolute inset-0 rounded-full border border-white/15 pointer-events-none" />
                      </div>

                      {/* 编号角标 */}
                      <span className="absolute top-2 left-2.5 text-[10px] font-mono tracking-wider text-[#ffab81]">
                        {swatch.code}
                      </span>

                      {swatch.isNew && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#e9481a]/20 border border-[#e9481a]/45 text-[9px] font-semibold text-[#ffab81]">
                          {t('新品', 'NEW')}
                        </span>
                      )}

                      {selected && (
                        <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#e9481a] text-[#090A0D] flex items-center justify-center shadow">
                          <Check className="w-3 h-3 stroke-[2.6]" />
                        </span>
                      )}
                    </div>

                    {/* 底部铭牌文字区 */}
                    <div className="pt-2.5 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#F7F3EB] truncate">
                          {t(swatch.name, swatch.nameEn)}
                        </span>
                        <span className="text-[10px] text-white/45 whitespace-nowrap">
                          {t(swatch.finishLabel, swatch.finishLabelEn)}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/40 truncate mt-0.5 font-mono">
                        {t(swatch.nameEn, swatch.name)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
