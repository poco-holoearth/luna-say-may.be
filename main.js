// YouTube IFrame API
let ytPlayer;
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('ytplayer', {
        events: {
            'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
    try {
        event.target.mute();
        event.target.playVideo();
    } catch (e) { }
    updateMuteButton();
}
function updateMuteButton() {
    if (!ytPlayer) return;
    const btn = document.getElementById('mute-toggle');
    if (ytPlayer.isMuted()) {
        btn.textContent = '🔊';
        btn.setAttribute('aria-label', 'ミュート解除');
    } else {
        btn.textContent = '🔇';
        btn.setAttribute('aria-label', 'ミュート');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observerで動的にセクションを表示
    const sections = document.querySelectorAll('.section');
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));
    // ミュートボタン
    const btn = document.getElementById('mute-toggle');
    btn.addEventListener('click', function () {
        if (!ytPlayer) return;
        if (ytPlayer.isMuted()) {
            ytPlayer.unMute();
        } else {
            ytPlayer.mute();
        }
        updateMuteButton();
    });
    // SNSシェアボタン
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Luna say maybe非公式ファンサイト\n#月村手毬 #学園アイドルマスター\n');
    document.getElementById('share-x').onclick = function () {
        window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };
    document.getElementById('share-copy').onclick = function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
            const msg = document.getElementById('copy-msg');
            msg.textContent = 'コピーしました！';
            msg.classList.add('visible');
            setTimeout(() => {
                msg.classList.remove('visible');
                msg.textContent = '';
            }, 1500);
        });
    };
});
