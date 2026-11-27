// ============================================================
// H&H — 定制选色单与参数详情弹窗 V2（曜石黑 × 香槟金）
// ============================================================

import { useState } from 'react';
import { getSwatchBannerStyle } from './swatchVisuals';
import { Check, Download, MapPin, Ruler, Sparkles, X } from 'lucide-react';
import { AIOC_SPEC, studioText, type StudioLanguage, type ColorFilmItem } from '../../config/colorStudio';

export interface ColorCardModalProps {
  open: boolean;
  swatch: ColorFilmItem;
  lang: StudioLanguage;
  isEmbed?: boolean;
  onClose: () => void;
}

function specification(swatch: ColorFilmItem, lang: StudioLanguage) {
  const t = studioText.bind(null, lang);
  return {
    name: t(swatch.name, swatch.nameEn),
    secondaryName: t(swatch.nameEn, swatch.name),
    finish: t(swatch.finishLabel, swatch.finishLabelEn),
    series: t(swatch.seriesName, swatch.seriesNameEn),
    description: t(swatch.tagline, swatch.taglineEn),
    model: t(AIOC_SPEC.modelName, AIOC_SPEC.modelNameEn),
    substrate: t(AIOC_SPEC.substrate, AIOC_SPEC.substrateEn),
    modelLabel: t('所属产品型号', 'Product Model'),
    substrateLabel: t('基材与膜厚', 'Substrate & Thickness'),
    finishLabel: t('表面工艺', 'Surface Finish'),
    rollLabel: t('整卷规格', 'Roll size'),
    note: t('屏幕显示仅供参考，建议在自然光下对比 H&H 实物色板后选色。',
      'For the final color, compare physical H&H swatches in daylight.'),
  };
}

function generateSwatchPosterPng(swatch: ColorFilmItem, lang: StudioLanguage, logo: HTMLImageElement): string | null {
  const spec = specification(swatch, lang);
  const t = studioText.bind(null, lang);
  const w = 900;
  const h = 1200;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#090a0e');
  bgGrad.addColorStop(0.55, '#0e1016');
  bgGrad.addColorStop(1, '#1a0a0d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  const barGrad = ctx.createLinearGradient(0, 0, w, 0);
  barGrad.addColorStop(0, '#5C1A1A');
  barGrad.addColorStop(0.5, '#e9481a');
  barGrad.addColorStop(1, '#5C1A1A');
  ctx.fillStyle = barGrad;
  ctx.fillRect(0, 0, w, 8);

  ctx.fillStyle = '#F7F3EB';
  ctx.font = 'bold 38px "HarmonyOS Sans SC", "PingFang SC", sans-serif';
  ctx.textAlign = 'left';
  if (logo.naturalWidth > 0) {
    ctx.drawImage(logo, 64, 37, 116, 116 * logo.naturalHeight / logo.naturalWidth);
  } else {
    ctx.fillText('H&H', 64, 86);
  }

  ctx.fillStyle = '#e9481a';
  ctx.font = '600 18px ui-monospace, SFMono-Regular, monospace';
  ctx.fillText(t('高定选色工坊 · 电子选色卡', 'ATELIER COLOR STUDIO · COLOR SPECIFICATION'), 64, 124, w - 128);

  ctx.strokeStyle = 'rgba(233, 72, 26, 0.65)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(w - 224, 56, 160, 50, 25);
  ctx.stroke();
  ctx.fillStyle = '#ffab81';
  ctx.font = 'bold 24px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(swatch.code, w - 144, 89);

  // 主流光质感展示块
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(64, 176, w - 128, 490, 28);
  ctx.clip();

  const filmGrad = ctx.createRadialGradient(
    w * 0.35,
    310,
    40,
    w * 0.5,
    430,
    460,
  );
  filmGrad.addColorStop(0, swatch.shiftHex || swatch.hex);
  filmGrad.addColorStop(0.55, swatch.hex);
  filmGrad.addColorStop(1, '#08090c');
  ctx.fillStyle = filmGrad;
  ctx.fillRect(64, 176, w - 128, 490);

  const sheen = ctx.createLinearGradient(120, 176, 680, 620);
  sheen.addColorStop(0, 'rgba(255,255,255,0)');
  sheen.addColorStop(0.45, 'rgba(255,255,255,0.26)');
  sheen.addColorStop(0.52, 'rgba(255,255,255,0.06)');
  sheen.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = sheen;
  ctx.fillRect(64, 176, w - 128, 490);

  ctx.fillStyle = 'rgba(9, 10, 14, 0.72)';
  ctx.fillRect(64, 594, w - 128, 72);
  ctx.fillStyle = '#F7F3EB';
  ctx.textAlign = 'left';
  ctx.font = '600 24px "HarmonyOS Sans SC", sans-serif';
  ctx.fillText(`${spec.series} · ${spec.finish}`, 96, 639, w - 340);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#e9481a';
  ctx.font = '500 22px ui-monospace, monospace';
  ctx.fillText(swatch.hex.toUpperCase(), w - 96, 639);
  ctx.restore();

  ctx.strokeStyle = 'rgba(233, 72, 26, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(64, 176, w - 128, 490, 28);
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#F7F3EB';
  ctx.font = 'bold 58px "HarmonyOS Sans SC", "PingFang SC", sans-serif';
  ctx.fillText(spec.name, 64, 756, w - 128);

  ctx.fillStyle = 'rgba(247, 243, 235, 0.55)';
  ctx.font = '500 26px system-ui, sans-serif';
  ctx.fillText(spec.secondaryName, 64, 804, w - 128);

  ctx.fillStyle = 'rgba(247, 243, 235, 0.78)';
  ctx.font = '400 24px "HarmonyOS Sans SC", sans-serif';
  ctx.fillText(spec.description, 64, 862, w - 128);

  const specs = [
    { k: spec.modelLabel, v: spec.model },
    { k: spec.substrateLabel, v: `${AIOC_SPEC.thickness} · ${spec.substrate}` },
    { k: spec.finishLabel, v: spec.finish },
    { k: spec.rollLabel, v: AIOC_SPEC.rollSize },
  ];

  const cardW = (w - 128 - 24) / 2;
  specs.forEach((s, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 64 + col * (cardW + 24);
    const y = 906 + row * 94;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.roundRect(x, y, cardW, 78, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(233, 72, 26, 0.22)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = 'rgba(247, 243, 235, 0.48)';
    ctx.font = '400 20px "HarmonyOS Sans SC", sans-serif';
    ctx.fillText(s.k, x + 22, y + 30, cardW - 44);

    ctx.fillStyle = '#F7F3EB';
    ctx.font = 'bold 24px "HarmonyOS Sans SC", sans-serif';
    ctx.fillText(s.v, x + 22, y + 62, cardW - 44);
  });

  ctx.fillStyle = 'rgba(247, 243, 235, 0.45)';
  ctx.font = '400 20px "HarmonyOS Sans SC", sans-serif';
  ctx.fillText(spec.note, 64, 1126, w - 128);

  ctx.fillStyle = '#e9481a';
  ctx.font = '600 22px system-ui, sans-serif';
  ctx.fillText('hhppf.com/color-studio', 64, 1162);

  return canvas.toDataURL('image/png');
}

export function ColorCardModal({
  open,
  swatch,
  lang,
  isEmbed = false,
  onClose,
}: ColorCardModalProps) {
  const [saved, setSaved] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  const t = studioText.bind(null, lang);
  const spec = specification(swatch, lang);

  if (!open) return null;

  const handleCloseAll = () => {
    setPosterUrl(null);
    onClose();
  };

  const handleSavePoster = async () => {
    const logo = document.querySelector<HTMLImageElement>('img[src$="/assets/hh-logo.png"]') || new Image();
    if (!logo.src) logo.src = '/assets/hh-logo.png';
    if (!logo.complete) await logo.decode().catch(() => {});
    const dataUrl = generateSwatchPosterPng(swatch, lang, logo);
    if (!dataUrl) return;

    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobileOrWeChat =
      isEmbed ||
      /MicroMessenger|miniProgram|iPhone|iPad|iPod|Android/i.test(ua) ||
      (typeof window !== 'undefined' && window.innerWidth < 768);

    // 微信 <web-view> 与移动端浏览器普遍拦截 dataURL <a download>，直接弹出可长按保存的高清大图
    if (isMobileOrWeChat) {
      setPosterUrl(dataUrl);
      return;
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `HH-${swatch.code}-${spec.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  const handleConfirmInMiniProgram = () => {
    const w = window as Window & {
      wx?: {
        miniProgram?: {
          postMessage?: (msg: { data: Record<string, string> }) => void;
          navigateTo?: (opts: { url: string }) => void;
        };
      };
    };
    w.wx?.miniProgram?.postMessage?.({
      data: {
        type: 'HH_COLOR_SELECTED',
        code: swatch.code,
        name: swatch.name,
        hex: swatch.hex,
      },
    });
    handleCloseAll();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/[0.88] p-0 md:p-4 animate-fade-in"
      onClick={handleCloseAll}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'zh' ? '定制选色单' : 'Bespoke Color Specification'}
        className="w-full max-w-lg max-h-[88dvh] flex flex-col rounded-t-3xl md:rounded-2xl bg-[#0c0d12] border border-[#e9481a]/30 text-[#F7F3EB] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        {posterUrl ? (
          <div className="flex flex-col flex-1 min-h-0 p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#ffab81]">
                {lang === 'zh' ? '长按下方选色卡保存至手机相册或转发好友' : 'Long-press image to save or share'}
              </span>
              <button
                type="button"
                onClick={() => setPosterUrl(null)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-xs text-[#F7F3EB]"
              >
                {lang === 'zh' ? '返回详情' : 'Back'}
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black/40 rounded-2xl p-2 border border-white/10">
              <img
                src={posterUrl}
                alt={`${swatch.code} ${spec.name}`}
                data-allow-save="true"
                className="max-h-[64dvh] w-auto rounded-xl shadow-2xl select-auto pointer-events-auto"
              />
            </div>
          </div>
        ) : (
          <>
            {/* 顶部流光质感头图 */}
            <div
              className="relative h-32 sm:h-36 p-4 sm:p-5 flex flex-col justify-between overflow-hidden flex-shrink-0"
              style={getSwatchBannerStyle(swatch)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-black/25 to-transparent" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/75 border border-[#e9481a]/40 text-[11px] font-mono text-[#ffab81]">
                  {swatch.code} · {lang === 'zh' ? swatch.finishLabel : swatch.finishLabelEn}
                </span>
                <button
                  type="button"
                  onClick={handleCloseAll}
                  className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 text-white flex items-center justify-center transition-colors"
                  aria-label={t('关闭', 'Close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F7F3EB] drop-shadow">
                  {lang === 'zh' ? swatch.name : swatch.nameEn}
                </h3>
                <p className="text-xs text-white/65 mt-0.5 font-mono truncate">
                  {lang === 'zh' ? swatch.nameEn : swatch.name}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-3.5 overflow-y-auto">
              <p className="text-sm text-white/75 leading-relaxed">
                {spec.description}
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                  <div className="text-[11px] text-white/45">
                    {spec.modelLabel}
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {spec.model}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                  <div className="text-[11px] text-white/45">
                    {spec.substrateLabel}
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {AIOC_SPEC.thickness} · {spec.substrate}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                  <div className="text-[11px] text-white/45">
                    {spec.finishLabel}
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {spec.finish}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-[#e9481a]/25 p-3">
                  <div className="text-[11px] text-white/45">
                    {spec.rollLabel}
                  </div>
                  <div className="text-sm font-semibold mt-0.5 flex items-center gap-1 text-[#ffab81]">
                    <Ruler className="w-3.5 h-3.5" />
                    {AIOC_SPEC.rollSize}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(lang === 'zh' ? AIOC_SPEC.features : AIOC_SPEC.featuresEn).map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/80"
                  >
                    <Sparkles className="w-3 h-3 text-[#ffab81]" />
                    {feat}
                  </span>
                ))}
              </div>

              <p className="text-xs text-white/45 leading-relaxed">
                {spec.note}
              </p>

              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleSavePoster}
                  className="flex-1 h-11 rounded-xl bg-[#e9481a] text-[#090A0D] hover:bg-[#ff9468] font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  {saved
                    ? t('已下载高清选色单', 'Color Card Saved')
                    : t('生成选色卡图片', 'Save Color Card')}
                </button>

                {isEmbed ? (
                  <button
                    type="button"
                    onClick={handleConfirmInMiniProgram}
                    className="flex-1 h-11 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {t('确认所选颜色', 'Confirm Color')}
                  </button>
                ) : (
                  <a
                    href={t('/index-zh.html#partner', '/#partner')}
                    className="flex-1 h-11 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {t('申领实物样品', 'Request a sample')}
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
