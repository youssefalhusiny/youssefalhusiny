(() => {
  'use strict';
  const form=document.getElementById('inquiryForm');
  if(!form)return;
  const button=form.querySelector('button[type="submit"]'), status=document.getElementById('inquiryStatus');

  const phoneInput=document.getElementById('userPhone');
  let countryTouched=false;
  phoneInput.addEventListener('input',()=>{countryTouched=true;});
  const phoneWidget=typeof window.intlTelInput==='function'?window.intlTelInput(phoneInput,{
    separateDialCode:true,
    countrySelectorMode:"DROPDOWN",
    countryNameLocale:document.documentElement.lang==='en'?'en':'ar',
    uiTranslations:{searchPlaceholder:'ابحث عن بلد',searchEmptyState:'لا توجد نتائج',countryListAriaLabel:'قائمة البلدان',noCountrySelected:'اختر البلد',clearSearchAriaLabel:'مسح البحث',closeCountrySelectorAriaLabel:'إغلاق'},
    initialCountryLookup:async()=>{
      if(countryTouched)throw Error('country_unknown');
      for(const language of navigator.languages||[navigator.language]){
        try{const region=new Intl.Locale(language).region;if(region&&/^[A-Z]{2}$/.test(region))return region.toLowerCase();}catch(_){}
      }
      const regions={'Africa/Cairo':'eg','Asia/Riyadh':'sa','Asia/Dubai':'ae','Asia/Kuwait':'kw','Asia/Qatar':'qa','Asia/Bahrain':'bh','Asia/Muscat':'om','Asia/Amman':'jo','Asia/Beirut':'lb','Asia/Baghdad':'iq','Africa/Casablanca':'ma','Africa/Algiers':'dz','Africa/Tunis':'tn','Europe/London':'gb','Europe/Paris':'fr','Europe/Berlin':'de','Asia/Kolkata':'in','Asia/Tokyo':'jp'};
      const region=regions[Intl.DateTimeFormat().resolvedOptions().timeZone];
      if(!region)throw Error('country_unknown');return region;
    }
  }):null;
  // Let the country list scroll natively instead of bubbling to the page's Lenis listener.
  form.querySelectorAll('.iti__country-selector').forEach(selector=>{
    selector.setAttribute('data-lenis-prevent','');
    selector.addEventListener('wheel',event=>event.stopPropagation(),{passive:true});
    selector.addEventListener('touchmove',event=>event.stopPropagation(),{passive:true});
  });
  phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');});

  let completed=false, pending=false;
  const newId=()=>typeof crypto.randomUUID==='function'?crypto.randomUUID():'inquiry-'+Date.now()+'-'+Array.from(crypto.getRandomValues(new Uint8Array(12)),b=>b.toString(16).padStart(2,'0')).join('');
  let submissionId=newId();
  const ar=()=>document.documentElement.lang!=='en';
  let feedbackState='idle', submittedEmail='';
  const label=button.querySelector('.inquiry-submit-label');
  const copy={
    ar:{idle:'إرسال الطلب',sending:'جارٍ الإرسال…',sent:'تم إرسال الطلب',pending:'نرسل طلبك الآن. ستصلك رسالة على بريدك توضّح الخطوات التالية.',title:'تم استلام طلبك بنجاح',email:'ستصلك رسالة تأكيد على',hint:'راجع البريد الوارد، ومجلد الرسائل غير المرغوب فيها إذا لم تجدها.',steps:['المكالمة الاستكشافية','تحديد نطاق العمل','خطة التنفيذ'],notes:['نحدد موعدًا لمناقشة فكرتك','نراجع المتطلبات والأهداف','نتفق على الخطوات والجدول الزمني']},
    en:{idle:'Send request',sending:'Sending…',sent:'Request sent',pending:'We’re sending your request. You’ll receive an email with the next steps.',title:'Your request has been received',email:'A confirmation email will arrive at',hint:'Check your inbox, and your spam folder if you don’t see it.',steps:['Discovery call','Project scope','Execution plan'],notes:['Schedule a call to discuss your idea','Review requirements and goals','Agree on next steps and timing']}
  };
  function renderFeedback(state){
    feedbackState=state;form.dataset.state=state;form.setAttribute('aria-busy',String(state==='sending'));button.dataset.state=state;status.dataset.state=state;status.dataset.error='false';
    const text=copy[ar()?'ar':'en'];label.textContent=text[state==='success'?'sent':state==='sending'?'sending':'idle'];
    status.replaceChildren();
    if(state==='idle')return;
    if(state==='sending'){
      const icon=document.createElement('div');icon.className='inquiry-loading-mark';icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><rect x="6" y="12" width="36" height="25" rx="3"/><path d="m6 14 18 13 18-13"/></svg>';
      const title=document.createElement('h3');title.textContent=text.sending;
      const message=document.createElement('p');message.textContent=text.pending;status.append(icon,title,message);return;
    }
    const mark=document.createElement('div');mark.className='inquiry-confirmation-mark';mark.setAttribute('aria-hidden','true');mark.innerHTML='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="16" cy="16" r="14"/><path d="m10 16 4 4 8-9"/></svg>';
    const title=document.createElement('h3');title.textContent=text.title;
    const emailLine=document.createElement('p');emailLine.append(text.email+' ');
    const email=document.createElement('strong');email.dir='ltr';email.textContent=submittedEmail;emailLine.appendChild(email);
    const steps=document.createElement('ol');steps.className='inquiry-next-steps';
    text.steps.forEach((step,index)=>{const item=document.createElement('li');const name=document.createElement('h4');name.textContent=step;const note=document.createElement('p');note.textContent=text.notes[index];item.append(name,note);steps.appendChild(item)});
    const hint=document.createElement('p');hint.className='inquiry-email-hint';hint.textContent=text.hint;
    status.append(mark,title,emailLine,steps,hint);
  }
  const motionReduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  async function transitionFeedback(state){
    const previous=state==='sending'?form.querySelector('.inquiry-fields'):status;
    if(state==='sending')form.style.setProperty('--inquiry-state-height',Math.max(380,form.offsetHeight)+'px');
    if(!motionReduced())await previous.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-8px)'}],{duration:state==='sending'?450:400,easing:'cubic-bezier(.4,0,.2,1)'}).finished.catch(()=>{});
    renderFeedback(state);
    if(!motionReduced())await status.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,easing:'cubic-bezier(.16,1,.3,1)'}).finished.catch(()=>{});
  }
  new MutationObserver(()=>{if(feedbackState==='sending'||feedbackState==='success')renderFeedback(feedbackState)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  function report(text,error=false){feedbackState='idle';form.dataset.state='idle';form.removeAttribute('aria-busy');form.style.removeProperty('--inquiry-state-height');button.dataset.state='idle';label.textContent=copy[ar()?'ar':'en'].idle;status.dataset.state=error?'error':'idle';status.textContent=text;status.dataset.error=String(error);}
  form.addEventListener('input',()=>{document.getElementById('userPhone').setCustomValidity('');if(completed){completed=false;submissionId=newId();button.disabled=false;report('');}});
  async function request(url,options){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);try{return await fetch(url,{...options,signal:controller.signal});}finally{clearTimeout(timer);}}
  async function direct(payload){const data=new FormData();for(const [key,value]of Object.entries(payload))data.set(key,value);const response=await request('https://hook.us2.make.com/xnsgngx4heav24xjbzrfuti290p1bwtx',{method:'POST',body:data});if(!response.ok)throw Error('send_failed');}
  async function send(payload){
    if(location.protocol==='file:')return direct(payload);
    const response=await request('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if([404,405,501].includes(response.status))return direct(payload);
    const result=await response.json();if(!response.ok||!result.accepted)throw Error(result.error||'send_failed');
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(pending||completed)return;
    const phone=document.getElementById('userPhone');
    let internationalPhone=InquiryPayload.phone(phone.value), validPhone=Boolean(internationalPhone);
    if(phoneWidget){
      try{await phoneWidget.promise;}catch(_){/* Manual country selection remains available. */}
      if(pending||completed)return;
      try{internationalPhone=phoneWidget.getNumber();validPhone=phoneWidget.isValidNumber()&&Boolean(InquiryPayload.phone(internationalPhone));}catch(_){validPhone=false;}
    }
    phone.setCustomValidity(validPhone?'':ar()?'اختر البلد وأدخل رقم هاتف صحيحًا.':'Select your country and enter a valid phone number.');
    if(!form.reportValidity())return;
    if(document.getElementById('inquiryWebsite').value)return;
    const site=location.protocol==='file:'?form.dataset.publicSiteUrl:location.href;
    let payload;
    try{payload=InquiryPayload.build({name:document.getElementById('userName').value,email:document.getElementById('userEmail').value,phone:internationalPhone,topic:document.getElementById('projectTopic').value,submissionId});}
    catch(_){report(ar()?'تعذّر تجهيز الطلب. افتح النموذج من رابط الموقع المنشور وتحقق من البيانات.':'Open the form from the published website and check your details.',true);return;}
    submittedEmail=payload.clientEmail;
    pending=true;button.disabled=true;button.setAttribute('aria-busy','true');
    const sendingReady=transitionFeedback('sending');
    const delivery=send(payload);
    try{await Promise.all([delivery,sendingReady]);
      if(!motionReduced())await new Promise(resolve=>setTimeout(resolve,1100));
      completed=true;await transitionFeedback('success');
    }catch(error){await sendingReady;report(error.name==='AbortError'||error.message==='delivery_unconfirmed'?(ar()?'لم يصل تأكيد الاستلام بعد. تحقق من الاستلام قبل إعادة الإرسال.':'Receipt is not confirmed. Check before resubmitting.'):(ar()?'تعذّر إرسال الطلب. يرجى المحاولة لاحقًا.':'Your request could not be sent. Please try again later.'),true);}
    finally{pending=false;button.disabled=completed;button.removeAttribute('aria-busy');}
  });
})();
