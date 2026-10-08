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
  phoneInput.addEventListener('countrychange',()=>{phoneInput.setCustomValidity('');});

  let completed=false, pending=false;
  const newId=()=>typeof crypto.randomUUID==='function'?crypto.randomUUID():'inquiry-'+Date.now()+'-'+Array.from(crypto.getRandomValues(new Uint8Array(12)),b=>b.toString(16).padStart(2,'0')).join('');
  let submissionId=newId();
  const ar=()=>document.documentElement.lang!=='en';
  function report(text,error=false){status.textContent=text;status.dataset.error=String(error);}
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
    phone.setCustomValidity(validPhone?'':ar()?'اختر البلد وأدخل رقم واتساب صحيحًا.':'Select your country and enter a valid WhatsApp number.');
    if(!form.reportValidity())return;
    if(document.getElementById('inquiryWebsite').value)return;
    const site=location.protocol==='file:'?form.dataset.publicSiteUrl:location.href;
    let payload;
    try{payload=InquiryPayload.build({name:document.getElementById('userName').value,email:document.getElementById('userEmail').value,phone:internationalPhone,topic:document.getElementById('projectTopic').value,submissionId});}
    catch(_){report(ar()?'تعذّر تجهيز الطلب. افتح النموذج من رابط الموقع المنشور وتحقق من البيانات.':'Open the form from the published website and check your details.',true);return;}
    pending=true;button.disabled=true;button.setAttribute('aria-busy','true');
    report(ar()?'جارٍ إرسال طلبك…':'Sending your request…');
    try{await send(payload);completed=true;report(ar()?'تم استلام طلبك. سأتواصل معك بشأن الخطوات التالية.':'Your request has been received. I will contact you about the next steps.');
    }catch(error){report(error.name==='AbortError'||error.message==='delivery_unconfirmed'?(ar()?'لم يصل تأكيد الاستلام بعد. تحقق من الاستلام قبل إعادة الإرسال.':'Receipt is not confirmed. Check before resubmitting.'):(ar()?'تعذّر إرسال الطلب. يرجى المحاولة لاحقًا.':'Your request could not be sent. Please try again later.'),true);}
    finally{pending=false;button.disabled=completed;button.removeAttribute('aria-busy');}
  });
})();
