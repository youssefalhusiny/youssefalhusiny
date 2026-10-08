(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.InquiryPayload=api;})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function phone(value){let v=String(value).replace(/[\s().-]/g,'');if(v.startsWith('00'))v='+'+v.slice(2);return /^\+[1-9]\d{7,14}$/.test(v)?v:'';}
function build(values){
  const name=String(values.name||'').trim(), email=String(values.email||'').trim(), clientPhone=phone(values.phone), topic=String(values.topic||'').trim();
  if(!name||name.length>200||email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!clientPhone||!topic||topic.length>6000)throw Error('invalid_inquiry');
  if(!/^[a-zA-Z0-9_-]{16,80}$/.test(values.submissionId||''))throw Error('invalid_id');
  const paragraphs=[`مرحبًا ${name}،`,'وصلني طلبك، شكرًا لتواصلك وثقتك.','سأراجع التفاصيل وأتواصل معك بشأن الخطوات التالية.','مع خالص التحية،\nيوسف الحسيني'];
  const text=paragraphs.join('\n\n');
  const html='<div dir="rtl" lang="ar" style="font-family:Arial,sans-serif;line-height:1.8">'+paragraphs.map(p=>'<p>'+escape(p).replace(/\n/g,'<br>')+'</p>').join('')+'</div>';
  return {eventType:'contact_inquiry',schemaVersion:'1',submissionId:values.submissionId,submittedAt:new Date().toISOString(),clientName:name,clientEmail:email,clientPhone,projectTopic:topic,acknowledgementTo:email,acknowledgementSubject:'تم استلام طلبك — يوسف الحسيني',acknowledgementText:text,acknowledgementHtml:html,whatsappAcknowledgementTo:clientPhone,whatsappAcknowledgementText:text,whatsappTemplateName:'project_request_received',whatsappTemplateLanguage:'ar',whatsappTemplateParameters:JSON.stringify([name])};
}
return {build,phone};
});
