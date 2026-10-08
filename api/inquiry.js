const {build}=require('../lib/inquiry-payload.js');
const HOOK='https://hook.us2.make.com/xnsgngx4heav24xjbzrfuti290p1bwtx';
module.exports=async function inquiry(req,res){
  res.setHeader('Cache-Control','no-store');
  const send=(code,result)=>res.status(code).json(result);
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(405,{error:'method_not_allowed'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(415,{error:'json_required'});
  let payload;
  try{
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
    if(!body||typeof body!=='object'||Array.isArray(body)||body.website)throw Error('invalid_request');
    if(JSON.stringify(body).length>24000)return send(413,{error:'request_too_large'});
    payload=build({name:body.clientName,email:body.clientEmail,phone:body.clientPhone,topic:body.projectTopic,submissionId:body.submissionId});
  }catch(_){return send(400,{error:'invalid_inquiry'});}
  const data=new FormData();for(const [key,value]of Object.entries(payload))data.set(key,value);
  try{const response=await fetch(HOOK,{method:'POST',body:data,redirect:'error',signal:AbortSignal.timeout(18000)});
    if(!response.ok)return send(502,{error:'make_rejected'});
    return send(202,{accepted:true,submissionId:payload.submissionId,deliveryStatus:'queued'});
  }catch(_){return send(502,{error:'delivery_unconfirmed'});}
};
