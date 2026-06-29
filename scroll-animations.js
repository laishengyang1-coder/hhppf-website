/**
 * H&H Website Scroll Animations
 * 轻量、克制的滚动动效系统
 */

(function() {
  'use strict';

  // 检测用户是否偏好减少动画
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
    return;
  }

  // ==================== 导航栏滚动效果 ====================
  const header = document.querySelector('.site-header');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // ==================== Intersection Observer 滚动触发动画 ====================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: [0, 0.1, 0.2, 0.3]
  };

  // 添加动画类到元素
  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
        entry.target.classList.add('is-visible');

        // 如果有 stagger 子元素，依次触发
        const staggerChildren = entry.target.querySelectorAll('.stagger-child');
        if (staggerChildren.length > 0) {
          staggerChildren.forEach((child, index) => {
            child.style.animationDelay = `${index * 80}ms`;
            child.classList.add('is-visible');
          });
        }
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // 观察需要动画的元素
  function initScrollAnimations() {
    // Section 标题和内容
    const fadeUpElements = document.querySelectorAll(`
      .intro-band .section-kicker,
      .intro-band h2,
      .intro-band .intro-copy,
      .strength .section-kicker,
      .strength .split-heading h2,
      .strength .split-heading > p,
      .products .section-kicker,
      .products .split-left h2,
      .products .split-right p,
      .products .product-tags,
      .color-system .section-kicker,
      .color-system-heading h2,
      .color-system-heading p:last-child,
      .applications .section-kicker,
      .applications .split-heading h2,
      .applications .split-heading > p,
      .partner .section-kicker,
      .partner h2,
      .partner > div > p,
      .partner-tags,
      .partner-actions
    `);

    fadeUpElements.forEach(el => {
      el.classList.add('fade-up-element');
      observer.observe(el);
    });

    // Stagger 容器 - 产品卡片
    const productCards = document.querySelectorAll('.product-grid');
    productCards.forEach(container => {
      container.classList.add('stagger-container');
      const cards = container.querySelectorAll('.product-card');
      cards.forEach(card => card.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Stagger 容器 - 数据统计卡片
    const statGrids = document.querySelectorAll('.stat-grid');
    statGrids.forEach(container => {
      container.classList.add('stagger-container');
      const stats = container.querySelectorAll('article');
      stats.forEach(stat => stat.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Stagger 容器 - 应用场景图片
    const applicationGrids = document.querySelectorAll('.application-grid');
    applicationGrids.forEach(container => {
      container.classList.add('stagger-container');
      const figures = container.querySelectorAll('figure');
      figures.forEach(fig => fig.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Stagger 容器 - 故事柱子
    const storyPillars = document.querySelectorAll('.story-pillars');
    storyPillars.forEach(container => {
      container.classList.add('stagger-container');
      const articles = container.querySelectorAll('article');
      articles.forEach(article => article.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Stagger 容器 - 能力展示
    const capabilityRows = document.querySelectorAll('.capability-row');
    capabilityRows.forEach(container => {
      container.classList.add('stagger-container');
      const articles = container.querySelectorAll('article');
      articles.forEach(article => article.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Stagger 容器 - 认证卡片
    const certificationGrids = document.querySelectorAll('.certification-grid');
    certificationGrids.forEach(container => {
      container.classList.add('stagger-container');
      const certCards = container.querySelectorAll('.cert-card');
      certCards.forEach(card => card.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Quality system heading and note
    const qualityHeading = document.querySelectorAll('.quality-heading, .quality-note');
    qualityHeading.forEach(el => {
      el.classList.add('fade-up-element');
      observer.observe(el);
    });

    // 图片 scale-in 效果
    const scaleImages = document.querySelectorAll(`
      .strength-layout > img,
      .product-card img,
      .application-grid img,
      .capability-row img
    `);

    scaleImages.forEach(img => {
      img.classList.add('scale-in-element');
      observer.observe(img);
    });

    // Hero metrics 卡片
    const heroMetrics = document.querySelectorAll('.hero-metrics');
    heroMetrics.forEach(container => {
      container.classList.add('stagger-container');
      const spans = container.querySelectorAll('span');
      spans.forEach(span => span.classList.add('stagger-child'));
      observer.observe(container);
    });

    // Product series 和 CTA
    const productSeries = document.querySelectorAll('.product-series, .product-cta');
    productSeries.forEach(el => {
      el.classList.add('fade-up-element');
      observer.observe(el);
    });

    // Color board
    const colorBoards = document.querySelectorAll('.color-board');
    colorBoards.forEach(board => {
      board.classList.add('fade-up-element');
      observer.observe(board);
    });
  }

  // ==================== Hero Parallax 效果 ====================
  function initParallax() {
    const heroSection = document.querySelector('.hero');
    const orangeBlock = document.querySelector('.hero-orange-block');
    const ringOne = document.querySelector('.hero-ring-one');
    const ringTwo = document.querySelector('.hero-ring-two');
    const visualCards = document.querySelectorAll('.visual-card');

    if (!heroSection || !orangeBlock) return;

    let scrollY = 0;
    let rafId = null;

    function updateParallax() {
      scrollY = window.scrollY;

      // 只在 hero 区域内应用 parallax
      const heroHeight = heroSection.offsetHeight;
      if (scrollY > heroHeight) return;

      // 橙色块轻微向右移动
      const blockOffset = scrollY * 0.15;
      orangeBlock.style.transform = `translateX(${blockOffset}px)`;

      // 圆环轻微移动（不同速率）
      if (ringOne) {
        ringOne.style.transform = `translate(${scrollY * 0.08}px, ${scrollY * 0.12}px)`;
      }
      if (ringTwo) {
        ringTwo.style.transform = `translate(${scrollY * -0.06}px, ${scrollY * 0.1}px)`;
      }

      // 视觉卡片轻微向上浮动
      visualCards.forEach((card, index) => {
        const offset = scrollY * (0.18 + index * 0.05);
        card.style.transform = `${card.style.transform.replace(/translateY\([^)]*\)/g, '')} translateY(${-offset}px)`;
      });
    }

    window.addEventListener('scroll', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    }, { passive: true });
  }

  // ==================== 图片 Mask Reveal 效果（已注释，避免影响显示） ====================
  /*
  function initMaskReveal() {
    const images = document.querySelectorAll('.application-grid img, .product-card img');

    images.forEach(img => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mask-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      observer.observe(img);
    });
  }
  */

  // ==================== 初始化 ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initParallax();
      // initMaskReveal(); // 已注释，避免影响图片显示
    });
  } else {
    initScrollAnimations();
    initParallax();
    // initMaskReveal(); // 已注释，避免影响图片显示
  }

})();
