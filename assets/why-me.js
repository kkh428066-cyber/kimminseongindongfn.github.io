(() => {
  const root = document.getElementById('whyme');
  if (!root) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const years = root.querySelector('.wm-years');
  const months = root.querySelector('.wm-months');
  const intro = root.querySelector('.wm-intro');
  let frame = 0;
  let animations = [];
  function play() {
    cancelAnimationFrame(frame);
    animations.forEach(a => a.cancel());
    animations = [];
    years.textContent = '2'; months.textContent = '6';
    if (reduced.matches) return;
    root.querySelectorAll('.wm-line>*').forEach((line, i) => {
      animations.push(line.animate([
        {transform:'translateY(110%)',opacity:0},
        {transform:'translateY(0)',opacity:1}
      ], {duration:1000,delay:i*230,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
    });
    animations.push(root.querySelector('.wm-tenure').animate([
      {transform:'translateY(25px) scale(.94)',opacity:0},
      {transform:'translateY(0) scale(1)',opacity:1}
    ], {duration:1000,easing:'cubic-bezier(.16,1,.3,1)'}));
    animations.push(root.querySelector('.wm-tenure-rule').animate([
      {transform:'scaleX(0)'},{transform:'scaleX(1)'}
    ], {duration:1600,easing:'cubic-bezier(.22,1,.36,1)'}));
    animations.push(root.querySelector('.wm-line em').animate([
      {color:'#777'},{color:'#fff'}
    ], {duration:900,delay:650,fill:'forwards'}));
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1,(now-start)/1500);
      const total = Math.round(30*(1-Math.pow(1-p,3)));
      years.textContent = String(Math.floor(total/12));
      months.textContent = String(total%12);
      if (p<1) frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
  }
  root.querySelector('.wm-replay').addEventListener('click',play);
  reduced.addEventListener('change', () => { if (reduced.matches) play(); });
  const observer = new IntersectionObserver(entries => {
    if(entries.some(entry => entry.isIntersecting)) {play();observer.disconnect();}
  }, {threshold:.15});
  observer.observe(intro);
})();
