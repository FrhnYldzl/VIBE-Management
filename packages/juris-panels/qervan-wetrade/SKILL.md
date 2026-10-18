---
name: juris-kurumsal-panel
description: Juris Şirketler Hukuku ve Kurumsal Yönetim müvekkili için standart Kurumsal Yönetim Paneli artifact'ı üretir veya günceller; Drive Data Room linki ve hizmet planı verildiğinde kullan.
---
Bkz. README.md "Yeni müvekkil" ve veri sözleşmesi. Prosedür:
1. Drive kökünü ve alt klasörleri tara; çıktı dokümanlarını oku (iş modeli, risk formları, DD listeleri, tutanaklar).
2. Hizmet planı sayfasını oku; doküman kodları ve fonksiyon eşlemesini al; Drive'da klasörü olmayan başlıkları noFolder işaretle.
3. src/clients/<slug>.data.js oluştur — yalnızca veri blokları. Şablona dokunma.
4. node build.js <slug>; node tools/smoke-test.js dist/juris-panel-<slug>.html
5. Artifact olarak yayımla (ilk yayında icon: dashboard); Drive'a HTML değil link koy.
Kurallar: Drive esas, plan rehber · her panelde dayanak rozeti · jenerik "Müvekkil" yok · Finans'ta şirket + Konsolide · projeler ana faaliyetten ayrı · Hukuk'ta risk en sonda ("yapılmazsa").
