// Native controls own touch gestures on phones and tablets.
window.useNativeProjectPlayer = matchMedia('(any-pointer: coarse)').matches;
window.startNativeProjectVideo = function () {
    const hero = document.querySelector('.case-hero');
    const video = document.getElementById('heroInlineVideo');
    hero.dataset.playerMode = 'playback';
    hero.classList.add('native-player');
    video.controls = true;
    video.loop = false;
    video.muted = false;
    video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:1;z-index:10;filter:none;transform:none;pointer-events:auto';
    // Invoke play inside the user gesture, before animations or asynchronous work.
    video.play().catch(() => { video.controls = true; });
};
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video[data-lazy-video]');
    const load = video => {
        if (video.dataset.src) { video.src = video.dataset.src; delete video.dataset.src; }
        video.querySelectorAll('source[data-src]').forEach(source => {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
        });
        video.load();
        video.play().catch(() => {});
    };
    if (!('IntersectionObserver' in window)) { videos.forEach(load); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { load(entry.target); observer.unobserve(entry.target); }
    }), {rootMargin: '150px'});
    videos.forEach(video => observer.observe(video));
});
