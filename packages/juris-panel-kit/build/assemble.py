import re, sys, pathlib
base = pathlib.Path(__file__).resolve().parent.parent
master = (base/"juris-kurumsal-yonetim-paneli_master.html").read_text(encoding="utf-8").split("\n")
L = lambda a,b: master[a-1:b]  # inclusive 1-based

def expand_keep(text):
    out=[]
    for line in text.split("\n"):
        m=re.match(r"//@@KEEP (\d+)(?:-(\d+))?$", line.strip())
        if m:
            a=int(m.group(1)); b=int(m.group(2) or a)
            out.extend(L(a,b))
        else:
            out.append(line)
    return out

cfg = (base/"build/block_config.js").read_text(encoding="utf-8").rstrip("\n").split("\n")
assess = expand_keep((base/"build/block_assess.js").read_text(encoding="utf-8").rstrip("\n"))
views = (base/"build/block_views.js").read_text(encoding="utf-8").rstrip("\n").split("\n")

head = L(1,292)
head[2] = head[2].replace("Juris Kurumsal Yönetim Paneli – Zyrone","Juris Kurumsal Yönetim Paneli – Meown AI")
mid1 = L(474,556)
# default entity
mid1 = [l.replace('assessEnt="Dynamics"','assessEnt="Meown"').replace('||"Dynamics"','||"Meown"').replace("veri (Zyrone)","veri (Meown)") for l in mid1]
mid2 = L(647,653)
tail = L(759,len(master))
tail_s = "\n".join(tail)
rep = [
 ('const months=["Nis 26","May","Haz","Tem","Ağu","Eyl","Eki 26"]; const counts=[1,0,0,0,0,1,0];','const months=["Ağu 26","Eyl","Eki 26"]; const counts=[5,3,1];'),
 ('/DD|bütçe|reorganiz|Tesis|denetim/i','/DD|bütçe|SHA|marka|KVKK|sözleşme|FM/i'),
 ('<div class="tile accent"><div class="l">Tüzel kişilik</div><div class="v num">2</div><div class="d" style="color:rgba(255,255,255,.65)">Dynamics A.Ş. · Tactics</div></div><div class="tile"><div class="l">DD süresi</div><div class="v num">6<small>+ ay</small></div><div class="d">08.04.2026 → açık</div></div><div class="tile"><div class="l">Danışmanlık bedeli</div><div class="v num">65<small>k TL/ay</small></div><div class="d">01.04 – 31.12.2026</div></div><div class="tile"><div class="l">Teminat mektubu</div><div class="v num">2<small>+</small></div><div class="d">Teknopark · Roketsan – tutar yok</div></div><div class="tile"><div class="l">Finansal belge (Drive)</div><div class="v num">0</div><div class="d">BDR 2024–2025 talep edildi</div></div><div class="tile"><div class="l">Açık uyuşmazlık</div><div class="v num">4</div><div class="d">Havelsan · EGM · iş · marka</div></div>',
  '<div class="tile accent"><div class="l">Tüzel kişilik</div><div class="v num">1</div><div class="d" style="color:rgba(255,255,255,.65)">MEOWNAI Teknoloji A.Ş. · kuruluş 03.07.2026</div></div><div class="tile"><div class="l">Sermaye</div><div class="v num">335<small>k TL</small></div><div class="d">A %98 · B %2 · ödeme teyidi yok</div></div><div class="tile"><div class="l">Danışmanlık bedeli</div><div class="v num">45<small>k TL/ay</small></div><div class="d">01.10.2026 → 1 yıl · + %3 EK-1</div></div><div class="tile"><div class="l">DD süresi</div><div class="v num">3<small> hafta</small></div><div class="d">28.09.2026 → açık · 1/14 belge</div></div><div class="tile"><div class="l">Finansal belge (Drive)</div><div class="v num">0</div><div class="d">ilk hesap dönemi · mizan talep edildi</div></div><div class="tile"><div class="l">Açık dosya</div><div class="v num">3</div><div class="d">bilgisayar iadesi · pay yapısı · FM devri</div></div>'),
 ('<div class="d">Dynamics + Tactics · Data Room boş</div>','<div class="d">9 başlık · 1/14 talep edilen belge</div>'),
 ('<div class="d">DD · ortaklık · grup yapısı · FM</div>','<div class="d">pay yapısı · FM devri · marka · KVKK</div>'),
 ('e==="Tactics"?"var(--red-ink)":"var(--navy)"','"var(--navy)"'),
 ('Toplantı ritmi · ay bazında toplantı kaydı (aksiyon maili: yalnızca Eylül)','Toplantı ritmi · ay bazında takvim toplantısı (yazılı çıktı: yalnızca 28.09)'),
 ("2026'da 2 toplantı (Nisan, Eylül); 13.10 iptal. Teklifteki aylık YK toplantısı ritmi kurulmalı.","Ağu–Eki 2026'da 9 takvim toplantısı; yalnızca 28.09 mülakatının yazılı çıktısı var. Aylık yönetim toplantısı + tutanak ritmi kurulmalı."),
]
for a,b in rep:
    assert a in tail_s, "missing: "+a[:60]
    tail_s = tail_s.replace(a,b)
tail = tail_s.split("\n")

out = head + cfg + mid1 + assess + mid2 + views + tail
txt = "\n".join(out)
for bad in ["Zyrone","Dynamics","Tactics","Havelsan","Roketsan","Ayşenur","Enes Alt"]:
    n = txt.count(bad)
    if n: print("WARN leftover", bad, n, [i+1 for i,l in enumerate(out) if bad in l][:10])
(base/"juris-panel-meown.html").write_text(txt, encoding="utf-8")
print("lines", len(out), "bytes", len(txt.encode()))
txt = txt.replace('Zyrone hedefleri iletilmedi','Meown hedefleri iletilmedi').replace('if(!DD[ent])ent="Dynamics"','if(!DD[ent])ent="Meown"')
(base/"juris-panel-meown.html").write_text(txt, encoding="utf-8")
print("patched")
