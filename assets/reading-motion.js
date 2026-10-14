(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const definitions = [
    ['.workshop','ZARA · 함께 배운 매장 운영'],
    ['.experience-workmap-intro','ZARA · 업무 흐름과 실무 역할'],
    ['.field-hero','01 · 영업의 시선으로 매장 방문'],
    ['.field-visit','01 · 두 매장의 현장 기록'],
    ['.compare-section','01 · 같은 브랜드, 다른 고객'],
    ['.interview-intro','인터뷰 · 다섯 가지 질문'],
    ...Array.from(document.querySelectorAll('.interview-scene'), (el,i) => ['#'+el.id,`인터뷰 ${i+1} · ${['고객','본사 소통','상품 공급','재고 이동','진열 기준'][i]}`]),
    ['.findings','04 · 현장에서 확인한 세 가지'],
    ['#researchToAction','현장 조사에서 예방·대응 보고서로'],
    ['.premortem-opening','프리모텀 · 가정에서 대응으로'],
    ...Array.from(document.querySelectorAll('.risk-case'), (el,i) => ['#'+el.id,`리스크 ${i+1} · ${['결품','채널별 판매 방식','정보 전달','재고 불균형','신규 고객'][i]}`]),
    ['#project02','02 · Inventory Response Simulator'],
    ['#project03','03 · Sales & Inventory Dashboard'],
    ['#monthlyReport','03 · 월별 매장 운영 보고서'],
    ['#project04','04 · Musinsa Standard Womens'],
    ['#whyme','WHY ME · SPA 경험이 경쟁력이 되는 시점']
  ];
  const chapters = definitions.map(([selector,label],i) => {
    const element=document.querySelector(selector);
    if(!element) return null;
    if(!element.id) element.id=`reading-chapter-${i+1}`;
    element.classList.add('story-chapter');
    return {element,label};
  }).filter(Boolean);
  if(!chapters.length) return;

  const dock=document.createElement('nav');
  dock.className='reading-dock';
  dock.setAttribute('aria-label','포트폴리오 읽기 진행과 장 이동');
  dock.hidden=true;
  dock.innerHTML=`<div class="reading-menu" id="readingMenu" hidden></div>
    <div class="reading-controls"><span class="reading-position"></span>
    <button class="reading-current" type="button" aria-controls="readingMenu" aria-expanded="false"><strong></strong><small>목차 열기</small></button>
    <button class="reading-arrow reading-prev" type="button" aria-label="이전 장으로 이동">↑</button>
    <button class="reading-arrow reading-next" type="button" aria-label="다음 장으로 이동">↓</button></div>
    <div class="reading-meter" role="progressbar" aria-label="현재 장 읽기 진행률" aria-valuemin="0" aria-valuemax="100"><i></i></div>`;
  document.body.append(dock);
  const menu=dock.querySelector('.reading-menu'), toggle=dock.querySelector('.reading-current');
  const prev=dock.querySelector('.reading-prev'), next=dock.querySelector('.reading-next');
  const meter=dock.querySelector('.reading-meter'), fill=meter.firstElementChild;
  let current=0, pending=false;
  function closeMenu(){ menu.hidden=true; toggle.setAttribute('aria-expanded','false'); }
  function go(index){
    const chapter=chapters[index];
    if(!chapter) return;
    closeMenu();
    chapter.element.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  }
  const links=chapters.map((chapter,index)=>{
    const link=document.createElement('a');
    link.href='#'+chapter.element.id;
    const number=document.createElement('span');
    number.textContent=String(index+1).padStart(2,'0');
    link.append(number,document.createTextNode(chapter.label));
    link.addEventListener('click',event=>{event.preventDefault();go(index);toggle.focus({preventScroll:true});});
    menu.append(link);
    return link;
  });
  toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));});
  dock.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();toggle.focus({preventScroll:true});}});
  prev.addEventListener('click',()=>go(current-1));
  next.addEventListener('click',()=>go(current+1));
  document.querySelectorAll('.scene-next').forEach((node,index)=>{
    const scenes=Array.from(document.querySelectorAll('.interview-scene'));
    const target=scenes[index+1] || document.querySelector('.findings');
    if(!target) return;
    const link=document.createElement('a');
    link.className='story-next'; link.href='#'+target.id; link.textContent=node.textContent.replace(/↓/g,'').trim();
    link.addEventListener('click',event=>{event.preventDefault();target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});});
    node.replaceChildren(link);
  });
  const riskLinks=Array.from(document.querySelectorAll('.risk-reading-index a'));
  function update(){
    pending=false;
    const tops=chapters.map(c=>c.element.getBoundingClientRect().top+scrollY);
    const line=scrollY+innerHeight*.3;
    current=0;
    tops.forEach((top,i)=>{if(top<=line)current=i;});
    dock.hidden=line<tops[0];
    if(dock.hidden)closeMenu();
    const end=tops[current+1] || document.documentElement.scrollHeight;
    const progress=Math.max(0,Math.min(1,(line-tops[current])/Math.max(1,end-tops[current])));
    fill.style.transform=`scaleX(${progress})`;
    meter.setAttribute('aria-valuenow',String(Math.round(progress*100)));
    dock.querySelector('.reading-position').textContent=`${String(current+1).padStart(2,'0')} / ${chapters.length}`;
    toggle.querySelector('strong').textContent=chapters[current].label;
    const phases=chapters[current].element.querySelectorAll('.risk-basis,.risk-variable-grid,.risk-decision,.risk-response-grid,.risk-review');
    let phase='목차 열기';
    phases.forEach((el,i)=>{if(el.getBoundingClientRect().top<innerHeight*.5)phase=['현장 근거','변수 확인','판단 기준','사전 예방 · 발생 시 대응','결과 확인'][i]+' · 목차 열기';});
    toggle.querySelector('small').textContent=phase;
    prev.disabled=current===0; next.disabled=current===chapters.length-1;
    chapters.forEach((c,i)=>{
      c.element.classList.toggle('is-reading',i===current);
      if(i===current)links[i].setAttribute('aria-current','step');else links[i].removeAttribute('aria-current');
    });
    riskLinks.forEach(link=>{if(link.hash==='#'+chapters[current].element.id)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
  addEventListener('scroll',schedule,{passive:true}); addEventListener('resize',schedule); addEventListener('load',schedule);
  if('ResizeObserver' in window)new ResizeObserver(schedule).observe(document.body);
  update();

  // Animate readable blocks as they enter; the full text always remains in the document.
  const selectors=['.workshop-header','.workshop-photo','.experience-workmap-intro','.experience-column-header','.job-card',
    '.field-hero-copy','.field-intro-grid','.field-stat','.field-visit-head','.store-card','.compare-title','.compare-item',
    '.interview-intro','.scene-heading','.scene-answer','.scene-takeaway','.premortem-opening',
    '.finding','.research-bridge-copy > .eyebrow','.research-bridge-copy > h3','.research-bridge-description','.research-bridge-flow > li',
    '.risk-case-heading','.risk-basis','.risk-cause','.risk-variable-grid > div','.risk-decision',
    '.risk-response-grid > section','.risk-review','.risk-conclusion','.project-topline',
    '.operation-story > section','.operation-learning','.report-metrics > *','.report-findings > *'];
  const targets=Array.from(document.querySelectorAll(selectors.join(',')));
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      observer.unobserve(entry.target);
      if(reduced.matches || !entry.target.animate)return;
      const siblings=Array.from(entry.target.parentElement.children);
      const delay=Math.min(siblings.indexOf(entry.target),3)*70;
      entry.target.animate([{opacity:0,transform:'translateY(36px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:800,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    });
  },{threshold:.08,rootMargin:'0px 0px -5% 0px'});
  targets.forEach(node=>observer.observe(node));
})();
