
                    function triggerHomeBeamFade() {
                        document.querySelector('.home-featured-banner').setAttribute('data-player-mode', 'playback');
                        const vid = document.getElementById('homeBeam_heroInlineVideo');
                        if (vid) vid.style.transition = 'opacity .2s ease';
                        if (vid) vid.currentTime = 0; // Rewind to start immediately

                        const nav = null;
                        const heroElements = Array.from(document.getElementById('homeBeam_heroContentBlock').children).filter(el => el && el.tagName !== 'SCRIPT');
                        const customControls = document.getElementById('homeBeam_customVideoControls');
                        const bottomFade = document.getElementById('homeBeam_heroBottomFade');
                        
                        // Auto Fullscreen - MUST be synchronous with click event
                        const heroSection = document.querySelector('.home-featured-banner');
                        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                            if (heroSection.requestFullscreen) heroSection.requestFullscreen().catch(e => console.log(e));
                            else if (heroSection.webkitRequestFullscreen) heroSection.webkitRequestFullscreen();
                        }
                        
                        // GSAP Smooth Cinematic Fade Out
                        if (bottomFade) gsap.to(bottomFade, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
                        
                        gsap.to(heroElements, {
                            y: 30,
                            opacity: 0,
                            duration: 0.25,
                            stagger: 0.025,
                            ease: "power2.inOut",
                            onComplete: () => {
                                heroElements.forEach(el => el.style.pointerEvents = 'none');
                                
                                // Video smoothly becomes crisp, bright and unmuted
                                if (vid) {
                                    vid.currentTime = 0;
                                    vid.muted = false;
                                    vid.loop = false;
                                    vid.style.pointerEvents = 'auto';
                                    vid.style.zIndex = '10';
                                    gsap.to(vid, { filter: 'blur(0px) brightness(1)', scale: 1, duration: 0.2, overwrite: true, ease: "power2.out" });
                                    if (vid.paused) vid.play().catch(() => {});
                                }
                                
                                customControls.setAttribute('data-active', 'true');
                                customControls.style.pointerEvents = 'auto';
                                gsap.to(customControls, { opacity: 1, duration: 0.6 });
                                
                                document.body.style.overflow = 'hidden';
                            }
                        });
                    }

                    // Custom Video Controls & Smooth GSAP Hero Logic
                    document.addEventListener('DOMContentLoaded', () => {
                        const heroContent = document.getElementById('homeBeam_heroContentBlock');
                        const heroElements = heroContent ? Array.from(heroContent.children).filter(el => el && el.tagName !== 'SCRIPT') : [];
                        
                        // 1. Staggered reveal of hero elements using GSAP (matches homepage)
                        if (heroElements.length > 0) {
                            gsap.fromTo(heroElements, 
                                { y: 35, opacity: 0 },
                                { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "power3.out", delay: 0.15 }
                            );
                        }

                        // 2. Cinematic Parallax Scroll on Hero
                        if (typeof ScrollTrigger !== 'undefined') {
                            gsap.to("#homeBeam_heroContentBlock", {
                                scrollTrigger: {
                                    trigger: ".home-featured-banner",
                                    start: "top top",
                                    end: "bottom top",
                                    scrub: 0.5
                                },
                                y: 70,
                                opacity: 0,
                                ease: "none"
                            });
                        }

                        const vid = document.getElementById('homeBeam_heroInlineVideo');
                        if (vid) vid.style.transition = 'opacity .2s ease';
                        if (vid) {
                            vid.play().then(() => {
                                vid.style.opacity = '1';
                            }).catch(() => {});
                        }
                        const playPauseBtn = document.getElementById('homeBeam_customPlayPauseBtn');
                        const homeBeam_playIcon = document.getElementById('homeBeam_playIcon');
                        const homeBeam_pauseIcon = document.getElementById('homeBeam_pauseIcon');
                        const muteBtn = document.getElementById('homeBeam_customMuteBtn');
                        const homeBeam_muteIcon = document.getElementById('homeBeam_muteIcon');
                        const homeBeam_unmuteIcon = document.getElementById('homeBeam_unmuteIcon');
                        const progressBar = document.getElementById('homeBeam_customProgressBar');
                        const progressContainer = document.getElementById('homeBeam_customProgressBarContainer');
                        const customControls = document.getElementById('homeBeam_customVideoControls');
                        
                        const fullscreenBtn = document.getElementById('homeBeam_customFullscreenBtn');
                        const homeBeam_enterFullscreenIcon = document.getElementById('homeBeam_enterFullscreenIcon');
                        const homeBeam_exitFullscreenIcon = document.getElementById('homeBeam_exitFullscreenIcon');

                        let controlsTimeout;

                        function hideControls() {
                            if (customControls.getAttribute('data-active') !== 'true') return;
                            if (!vid.paused) {
                                customControls.style.opacity = '0';
                                document.querySelector('.home-featured-banner').style.cursor = 'none'; // Optional: hide cursor for true cinematic feel
                            }
                        }

                        function showControls() {
                            if (customControls.getAttribute('data-active') !== 'true') return;
                            customControls.style.opacity = '1';
                            document.querySelector('.home-featured-banner').style.cursor = 'default';
                            clearTimeout(controlsTimeout);
                            if (!vid.paused) {
                                controlsTimeout = setTimeout(hideControls, 2500);
                            }
                        }

                        // Trigger showControls on mouse movement over the hero area
                        document.querySelector('.home-featured-banner').addEventListener('mousemove', showControls);
                        document.querySelector('.home-featured-banner').addEventListener('click', showControls);

                        function togglePlayPause() {
                            if (customControls.getAttribute('data-active') === 'true') {
                                vid.paused ? vid.play() : vid.pause();
                            }
                        }

                        playPauseBtn.onclick = togglePlayPause;
                        vid.onclick = togglePlayPause; // Click screen to play/pause
                        // Touch taps use film coordinates, including the portrait fullscreen rotation.
                        const tapSurface = vid.closest('.case-hero');
                        let tapTimer = null, lastTap = null, touchStart = null;
                        tapSurface.addEventListener('pointerdown', e => {
                            if(e.pointerType === 'touch') touchStart = {x:e.clientX,y:e.clientY};
                        });
                        tapSurface.addEventListener('pointerup', e => {
                            if(e.pointerType !== 'touch' || tapSurface.dataset.playerMode !== 'playback') return;
                            if(e.target.closest('[id$="customVideoControls"],a,button,input')) return;
                            if(!touchStart || Math.hypot(e.clientX-touchStart.x,e.clientY-touchStart.y)>20) return;
                            const rect = tapSurface.getBoundingClientRect();
                            const rotated = Math.abs(new DOMMatrixReadOnly(getComputedStyle(vid).transform).b) > .5;
                            const fraction = rotated ? (e.clientY-rect.top)/rect.height : (e.clientX-rect.left)/rect.width;
                            const side = fraction < .4 ? -1 : fraction > .6 ? 1 : 0;
                            const now = performance.now();
                            if(lastTap && now-lastTap.time<300 && side && side===lastTap.side) {
                                clearTimeout(tapTimer); tapTimer=null; lastTap=null;
                                if(Number.isFinite(vid.duration)) vid.currentTime=Math.max(0,Math.min(vid.duration,vid.currentTime+side*5));
                                showControls();
                            } else {
                                clearTimeout(tapTimer);
                                lastTap={time:now,side};
                                tapTimer=setTimeout(()=>{lastTap=null;togglePlayPause();showControls();},300);
                            }
                        });
                        tapSurface.addEventListener('click', e => {
                            if(e.pointerType==='touch' && tapSurface.dataset.playerMode==='playback' && !e.target.closest('[id$="customVideoControls"],a,button,input')) {
                                e.preventDefault(); e.stopImmediatePropagation();
                            }
                        },true);


                        document.addEventListener('keydown', (e) => {
                            if (customControls.getAttribute('data-active') !== 'true') return;
                            if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
                            if (e.code === 'Space') {
                                e.preventDefault(); togglePlayPause();
                            } else if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
                                e.preventDefault();
                                if (!Number.isFinite(vid.duration)) return;
                                vid.currentTime = Math.max(0, Math.min(vid.duration, vid.currentTime + (e.code === 'ArrowRight' ? 5 : -5)));
                                showControls();
                            }
                        });
                        
                        const homeBeam_pauseOverlayText = document.getElementById('homeBeam_pauseOverlayText');
                        const homeBeam_pauseMessageTitle = document.getElementById('homeBeam_pauseMessageTitle');
                        const pauseMessages = {
                            ar: [
                                "لماذا توقفت؟",
                                "استراحة قصيرة؟",
                                "اللقطة القادمة أجمل!",
                                "نحن بانتظارك...",
                                "لحظة تأمل؟",
                                "القصة لم تنتهِ بعد",
                                "لا تتوقف هنا!"
                            ],
                            en: [
                                "Why did you stop?",
                                "A short break?",
                                "The next scene is even better!",
                                "We are waiting for you...",
                                "A moment of reflection?",
                                "The story hasn't ended yet",
                                "Don't stop here!"
                            ]
                        };

                        vid.addEventListener('play', () => { 
                            homeBeam_playIcon.style.display = 'none'; 
                            homeBeam_pauseIcon.style.display = 'block'; 
                            
                            if (customControls.getAttribute('data-active') === 'true') {
                                gsap.to(vid, { filter: 'blur(0px) brightness(1)', scale: 1, duration: 0.2, overwrite: true });
                                gsap.to(homeBeam_pauseOverlayText, { opacity: 0, duration: 0.18, overwrite: true });
                                
                                const nav = null;
                                const heroElements = Array.from(document.getElementById('homeBeam_heroContentBlock').children).filter(el => el && el.tagName !== 'SCRIPT');
                                const bottomFade = document.getElementById('homeBeam_heroBottomFade');
                                if (bottomFade) gsap.to(bottomFade, { opacity: 0, duration: 0.6 });

                                gsap.to(heroElements, {
                                    y: 30,
                                    opacity: 0,
                                    duration: 0.25,
                                    stagger: 0.02,
                                    ease: "power2.inOut",
                                    onComplete: () => {
                                        heroElements.forEach(el => el.style.pointerEvents = 'none');
                                    }
                                });

                                showControls(); 
                            } else {
                                gsap.to(vid, { filter: 'blur(10px) brightness(0.45)', scale: 1.06, duration: 0.2, overwrite: true });
                            }
                        });
                        
                        vid.addEventListener('pause', () => { 
                            if (customControls.getAttribute('data-active') === 'true') {
                                homeBeam_pauseIcon.style.display = 'none'; 
                                homeBeam_playIcon.style.display = 'block'; 
                                gsap.to(vid, { filter: 'blur(10px) brightness(0.6)', scale: 1.06, duration: 0.2, overwrite: true });
                                
                                // Select random message in current language
                                const currentLang = (document.documentElement.lang || 'ar').toLowerCase();
                                const msgList = pauseMessages[currentLang] || pauseMessages.ar;
                                const randomMsg = msgList[Math.floor(Math.random() * msgList.length)];
                                homeBeam_pauseMessageTitle.innerText = randomMsg;

                                gsap.to(homeBeam_pauseOverlayText, { opacity: 1, duration: 0.18, overwrite: true, ease: "power2.out" });
                                
                                const nav = null;
                                const heroElements = Array.from(document.getElementById('homeBeam_heroContentBlock').children).filter(el => el && el.tagName !== 'SCRIPT');
                                const bottomFade = document.getElementById('homeBeam_heroBottomFade');
                                if (bottomFade) gsap.to(bottomFade, { opacity: 1, duration: 0.8 });

                                gsap.set(heroElements, { opacity: 0, pointerEvents: 'none' });

                                showControls(); 
                            }
                        });
                        
                        muteBtn.onclick = () => { vid.muted = !vid.muted; showControls(); };
                        vid.addEventListener('volumechange', () => {
                            if(vid.muted || vid.volume === 0) { 
                                homeBeam_muteIcon.style.display = 'block'; 
                                homeBeam_unmuteIcon.style.display = 'none'; 
                                volumeBar.style.width = '0%';
                            } else { 
                                homeBeam_unmuteIcon.style.display = 'block'; 
                                homeBeam_muteIcon.style.display = 'none'; 
                                volumeBar.style.width = (vid.volume * 100) + '%';
                            }
                        });

                        const currentTimeEl = document.getElementById('homeBeam_customCurrentTime');
                        const durationTimeEl = document.getElementById('homeBeam_customDurationTime');

                        function formatTime(seconds) {
                            if (isNaN(seconds)) return "0:00";
                            const m = Math.floor(seconds / 60);
                            const s = Math.floor(seconds % 60);
                            return m + ":" + (s < 10 ? "0" + s : s);
                        }

                        vid.addEventListener('loadedmetadata', () => {
                            durationTimeEl.innerText = formatTime(vid.duration);
                        });

                        vid.addEventListener('timeupdate', () => {
                            if (!isDraggingProg) {
                                const percentage = (vid.currentTime / vid.duration) * 100;
                                progressBar.style.width = percentage + '%';
                            }
                            currentTimeEl.innerText = formatTime(vid.currentTime);
                        });

                        let isDraggingProg = false;
                        const homeBeam_progressTooltip = document.getElementById('homeBeam_progressTooltip');

                        function trackFraction(event, rect) {
                            const point = event.touches ? event.touches[0] : event;
                            const player = document.querySelector('.home-featured-banner');
                            const rotated = document.fullscreenElement === player && player.getAttribute('data-player-orientation') === 'landscape' && matchMedia('(max-width:700px) and (orientation:portrait)').matches;
                            return rotated ? (point.clientY - rect.top) / rect.height : (point.clientX - rect.left) / rect.width;
                        }
                        function updateTooltipPosition(e) {
                            const rect = progressContainer.getBoundingClientRect();
                            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                            if (clientX === undefined) return;
                            let pos = trackFraction(e, rect);
                            pos = Math.max(0, Math.min(1, pos));
                            const hoverTime = pos * vid.duration;
                            if (!isNaN(hoverTime)) {
                                homeBeam_progressTooltip.innerText = formatTime(hoverTime);
                                homeBeam_progressTooltip.style.left = (pos * 100) + '%';
                                homeBeam_progressTooltip.style.opacity = '1';
                            }
                        }

                        progressContainer.addEventListener('mousemove', (e) => {
                            if (!isDraggingProg) updateTooltipPosition(e);
                        });
                        progressContainer.addEventListener('mouseleave', () => {
                            if (!isDraggingProg) homeBeam_progressTooltip.style.opacity = '0';
                        });

                        function updateProgress(e) {
                            const rect = progressContainer.getBoundingClientRect();
                            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                            let pos = trackFraction(e, rect); // LTR logic
                            pos = Math.max(0, Math.min(1, pos));
                            progressBar.style.width = (pos * 100) + '%';
                            vid.currentTime = pos * vid.duration; 
                        }

                        progressContainer.addEventListener('mousedown', (e) => {
                            e.stopPropagation();
                            isDraggingProg = true;
                            updateProgress(e);
                            currentTimeEl.innerText = formatTime(vid.currentTime);
                            showControls();
                        });
                        progressContainer.addEventListener('touchstart', (e) => {
                            e.stopPropagation();
                            isDraggingProg = true;
                            updateProgress(e);
                            currentTimeEl.innerText = formatTime(vid.currentTime);
                            showControls();
                        }, {passive: false});

                        const volumeContainer = document.getElementById('homeBeam_customVolumeContainer');
                        const volumeBar = document.getElementById('homeBeam_customVolumeBar');
                        let isDraggingVol = false;

                        function updateVolume(e) {
                            const rect = volumeContainer.getBoundingClientRect();
                            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                            let pos = trackFraction(e, rect); // LTR logic
                            pos = Math.max(0, Math.min(1, pos));
                            volumeBar.style.width = (pos * 100) + '%';
                            vid.volume = pos;
                            vid.muted = (pos === 0);
                        }

                        volumeContainer.addEventListener('mousedown', (e) => {
                            e.stopPropagation();
                            isDraggingVol = true;
                            updateVolume(e);
                            showControls();
                        });
                        volumeContainer.addEventListener('touchstart', (e) => {
                            e.stopPropagation();
                            isDraggingVol = true;
                            updateVolume(e);
                            showControls();
                        }, {passive: false});

                        document.addEventListener('mousemove', (e) => {
                            if (isDraggingProg) {
                                updateProgress(e);
                                updateTooltipPosition(e);
                            }
                            if (isDraggingVol) updateVolume(e);
                        });
                        document.addEventListener('touchmove', (e) => {
                            if (isDraggingProg) {
                                updateProgress(e);
                                updateTooltipPosition(e);
                            }
                            if (isDraggingVol) updateVolume(e);
                        }, {passive: false});

                        document.addEventListener('mouseup', () => { 
                            isDraggingProg = false; 
                            isDraggingVol = false; 
                            homeBeam_progressTooltip.style.opacity = '0';
                        });
                        document.addEventListener('touchend', () => { 
                            isDraggingProg = false; 
                            isDraggingVol = false; 
                            homeBeam_progressTooltip.style.opacity = '0';
                        });

                        // Prevent buttons from triggering video pause when clicked
                        [playPauseBtn, muteBtn, fullscreenBtn].forEach(btn => {
                            btn.onmousedown = (e) => e.stopPropagation();
                            btn.ontouchstart = (e) => e.stopPropagation();
                            btn.onclick = (e) => {
                                e.stopPropagation();
                                if(btn === playPauseBtn) togglePlayPause();
                                if(btn === muteBtn) { vid.muted = !vid.muted; showControls(); }
                                if(btn === fullscreenBtn) toggleFullscreen();
                            };
                        });
                        
                        function toggleFullscreen() {
                            const heroSection = document.querySelector('.home-featured-banner');
                            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                                if (heroSection.requestFullscreen) heroSection.requestFullscreen();
                                else if (heroSection.webkitRequestFullscreen) heroSection.webkitRequestFullscreen();
                            } else {
                                if (document.exitFullscreen) document.exitFullscreen();
                                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                            }
                            showControls();
                        }

                        function lockFilmOrientation() {
                            document.querySelector('.home-featured-banner').setAttribute('data-player-orientation', 'landscape');
                            if (screen.orientation && screen.orientation.lock && matchMedia('(max-width: 900px)').matches) {
                                screen.orientation.lock('landscape-secondary').catch(() => {});
                            }
                        }
                        ['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
                            document.addEventListener(evt, () => {
                                if (document.fullscreenElement || document.webkitFullscreenElement) {
                                    lockFilmOrientation();
                                    homeBeam_enterFullscreenIcon.style.display = 'none';
                                    homeBeam_exitFullscreenIcon.style.display = 'block';
                                } else {
                                    if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
                                    document.querySelector('.home-featured-banner').removeAttribute('data-player-orientation');
                                    homeBeam_enterFullscreenIcon.style.display = 'block';
                                    homeBeam_exitFullscreenIcon.style.display = 'none';
                                    if (customControls.getAttribute('data-active') === 'true') {
                                        // Exiting fullscreen only changes the player size.
                                        // Preserve playback position, pause state and sound.
                                        document.body.style.overflow = '';
                                        showControls();
                                    }
                                }
                            });
                        });

                        function closeVideoMode() {
                            document.querySelector('.home-featured-banner').removeAttribute('data-player-mode');
                            gsap.killTweensOf(homeBeam_pauseOverlayText);
                            gsap.set(homeBeam_pauseOverlayText, {opacity: 0});
                            vid.muted = true;
                            vid.style.pointerEvents = 'none';
                            vid.style.zIndex = '0';
                            gsap.to(vid, { filter: 'blur(10px) brightness(0.45)', scale: 1.06, duration: 0.2, overwrite: true });
                            vid.play().catch(() => {});

                            customControls.setAttribute('data-active', 'false');
                            customControls.style.pointerEvents = 'none';
                            gsap.to(customControls, { opacity: 0, duration: 0.4 });
                            document.querySelector('.home-featured-banner').style.cursor = 'default';
                            document.body.style.overflow = ''; // Show page scrollbar again
                            clearTimeout(controlsTimeout);
                            
                            const bottomFade = document.getElementById('homeBeam_heroBottomFade');
                            if (bottomFade) gsap.to(bottomFade, { opacity: 1, duration: 1 });

                            // Exit fullscreen if active
                            if (document.fullscreenElement || document.webkitFullscreenElement) {
                                if (document.exitFullscreen) document.exitFullscreen();
                                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                            }
                            
                            const nav = null;
                            const heroElements = Array.from(document.getElementById('homeBeam_heroContentBlock').children).filter(el => el && el.tagName !== 'SCRIPT');
                            gsap.to(heroElements, {
                                y: 0,
                                opacity: 1,
                                duration: 1.2,
                                stagger: 0.1,
                                ease: "power3.out",
                                onComplete: () => {
                                    if (nav) nav.style.pointerEvents = 'auto';
                                    heroElements.forEach(el => el.style.pointerEvents = 'auto');
                                }
                            });
                        }
                    });
                
document.addEventListener('DOMContentLoaded', () => {
    const link = document.querySelector('.hero [data-i18n="text_203"]');
    link?.addEventListener('click', event => {
        event.preventDefault();
        const target = document.getElementById('portfolio');
        if (window.scrollToSiteWork) window.scrollToSiteWork(target);
        else window.scrollTo({top: target.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth'});
    });
});
