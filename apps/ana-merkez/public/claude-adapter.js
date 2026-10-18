/* claude-adapter.js — claude.ai dışında çalışırken window.claude.use("sample") şimi.
   Sayfadaki kod değişmez; istekler yerel sunucudaki /api/sample uç noktasına gider,
   sunucu Anthropic Messages API'yi çağırır ve yanıtı akış (SSE) olarak döner. */
(function(){
  if (window.claude && window.claude.use) return; // claude.ai içindeysek gerçek runtime kullanılır
  async function sample(input, opts){
    opts = opts || {};
    const messages = typeof input === "string" ? [{role:"user",content:input}] : input;
    const body = { messages, modelTier: opts.modelTier || "default", model: opts.model, effort: opts.effort, maxTokens: opts.maxTokens };
    let truncated = false;
    // görseller: base64 olarak ekle
    if (opts.images){
      const list = Array.from(opts.images.length!=null && !(opts.images instanceof Blob) ? opts.images : [opts.images]);
      body.images = await Promise.all(list.map(b => new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res({media_type:b.type,data:String(r.result).split(",")[1]});r.onerror=rej;r.readAsDataURL(b);})));
    }
    const res = await fetch("/api/sample", { method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify(body), signal: opts.signal });
    if (!res.ok) throw { code: res.status===429 ? "rate_limited" : "upstream_error", message: await res.text() };
    const reader = res.body.getReader(); const dec = new TextDecoder(); let text = "", buf = "";
    try {
      for(;;){
        const {value, done} = await reader.read(); if (done) break;
        buf += dec.decode(value, {stream:true});
        const lines = buf.split("\n"); buf = lines.pop();
        for (const l of lines){ if(!l.startsWith("data: ")) continue; const d = l.slice(6); if (d==="[DONE]") continue;
          try { const ev = JSON.parse(d); if (ev.delta){ text += ev.delta; opts.onText && opts.onText({text, delta: ev.delta}); } if (ev.truncated) truncated = true; if (ev.error) throw {code:"upstream_error", message:ev.error, text}; } catch(e){ if(e.code) throw e; } }
      }
    } catch(e){ if (e.name==="AbortError") throw {code:"cancelled", message:"aborted", text}; throw e; }
    if (!text) throw { code:"empty_completion", message:"empty" };
    return { text, truncated, modelTierApplied: body.modelTier };
  }
  sample.json = async (i,o)=>{ const {text}=await sample(i,o); const m=text.match(/[\[{][\s\S]*[\]}]/); return JSON.parse(m?m[0]:text); };
  sample.limits = async ()=>({ maxPromptBytes: 262144, images:{ maxCount: 10, maxInputBytes: 20*1024*1024, mediaTypes:["image/jpeg","image/png","image/webp","image/gif"] } });
  window.claude = { use: async (name) => name==="sample" ? sample : null };
})();
