# Railway'e kurulum — VIBE Management (tek servis)

Repo: `FrhnYldzl/VIBE-Management` · dal: `main` · servis: `apps/server` (Fastify, `npm start`) · port: Railway `PORT` verir.
`railway.json` build/start/health'i tanımlar; Variables ve Volume elle girilir.

## 1. Proje ve servis
1. railway.com → **New Project → Deploy from GitHub repo** → `FrhnYldzl/VIBE-Management`, dal `main`.
2. Railway monorepo'yu görüp **üç servis** üretebilir (`@vibe/server`, `@vibe/api`, `@vibe/web`). Yalnız **`@vibe/server`** kalır;
   `@vibe/api` ve `@vibe/web` (Mr. F konsolu, v1 kapsamı dışı) servislerini silin. Root Directory boş (repo kökü), start `npm start`.
3. İlk deploy Variables girilmeden **kimlik yapılandırma hatası** verir (beklenen). Önce §2–3'ü tamamlayın.
4. Kök `package.json`'da `build` script'i **yoktur** (Mr. F konsolu `build:mrf`): Nixpacks `build` görürse `npm run build` çalıştırır ve
   `NODE_ENV=production` altında devDependency'siz ortamda `vite: not found` ile düşer (18.10 d680d78 deploy'u). Sunucu `tsx` ile derlemesiz çalışır.
5. Build: Nixpacks bağımlılıkları kendisi kurar; `railway.json`'da **buildCommand yok** (ikinci `npm ci` cache mount ile çakışıp
   `EBUSY … node_modules/.cache` / exit 240 veriyordu — 2026-10-18'de kaldırıldı). Sunucu `tsx` ile kaynaktan çalışır, derleme gerekmez.

## 2. Volume (paylaşımlı durum için)
Servis → **Volumes → Add Volume** → mount path: `/data`. (Yoksa durum çipleri ve Vibe oturumları her deploy'da sıfırlanır.)

## 3. Variables
Servis → **Variables → Raw Editor**, aşağıdakileri yapıştırıp değerleri doldurun:

```
NODE_ENV=production
DATA_PATH=/data/vibe.db
SESSION_SECRET=<uzun rastgele>
PASSWORD_USERS=<eposta1>:<hash1>,<eposta2>:<hash2>
ANTHROPIC_API_KEY=<sk-ant-...>            # Vibe stüdyosu; boşsa Vibe 503 döner, geri kalan çalışır. Takma ad: VIBE-MANAGEMENT (kullanımda)
```

İsteğe bağlı (geliştirici GitHub girişi):
```
GITHUB_CLIENT_ID=<...>
GITHUB_CLIENT_SECRET=<...>
ALLOWED_GITHUB_USERS=FrhnYldzl
```

Değer üretme (yerelde, proje kökünde):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

```bash
npm run auth:hash -- "<Ferhan parolası>"
```

```bash
npm run auth:hash -- "<Gülşah parolası>"
```

Her `auth:hash` çıktısının ilk satırı `scrypt~...~...` hash'idir → `PASSWORD_USERS=f.yildizli@jurishukuk.com:scrypt~...,gulsah@jurishukuk.com:scrypt~...`
(`~` ayraç: Raw Editor `$` işaretini bozuyordu.) **Kullanıcılar veritabanında yaşar**; `PASSWORD_USERS` yalnız ilk tohumdur — kullanıcı
DB'de varsa env değeri yok sayılır. Parola değiştirme: giriş → `/hesap`. Unutulan parola: Admin → Kullanıcılar → "Parola sıfırla".
Anthropic anahtarı değişken adı: `VIBE_MANAGEMENT` (alt çizgi) ya da `ANTHROPIC_API_KEY`.

## 3b. Google service account (Intake-lite · v0.5.1)
Intake-lite, Drive Data Room'u **service account** ile okur (kullanıcı OAuth'u yok; salt okunur). Bir kez kurulur.

1. [console.cloud.google.com](https://console.cloud.google.com) → proje oluştur (örn. `vibe-management`) → **APIs & Services → Library → Google Drive API → Enable**.
2. **IAM & Admin → Service Accounts → Create service account**: ad `vibe-intake`, rol gerekmez → Done.
3. Servis hesabına tıkla → **Keys → Add key → Create new key → JSON** → dosya iner (tek kopya; kaybolursa yeni anahtar üretilir).
4. JSON'u Railway'e tek satır olarak ekle. PowerShell'de:
   ```bash
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("$HOME\Downloads\vibe-management-xxxx.json")) | Set-Clipboard
   ```
   Railway → Variables → **`GOOGLE_SERVICE_ACCOUNT_JSON`** = panodaki base64 metin (ham JSON da kabul edilir; base64 Raw Editor'da güvenlidir).
5. Drive'da müvekkilin **Data Room kök klasörünü** (A–F klasörlerini içeren) servis hesabının e-postasıyla paylaş:
   `vibe-intake@<proje>.iam.gserviceaccount.com` → **Görüntüleyen**. Alt klasörler paylaşımı miras alır. Paylaşımlı Sürücü'de ise hesabı sürücüye "Görüntüleyen" ekle.
6. Deploy sonrası Admin → **Paneller & Senkron**: "Drive bağlantısı: Hazır" + SA e-postası görünür. Formu doldur → **Tara ve paneli üret**.
   Panel dosyaları Volume'de `/data/panels/` altında durur (`PANELS_DIR` ile değiştirilebilir); kayıt SQLite `panels` tablosunda.

Yerelde: `apps/server/.env` içine `GOOGLE_SERVICE_ACCOUNT_JSON=<base64>` yaz; health → `ortam.GOOGLE_SERVICE_ACCOUNT: true`.

## 4. Alan adı
Servis → **Settings → Networking → Generate Domain** (örn. `vibe-management.up.railway.app`). Özel alan adı: `vibe.jurishukuk.com` → CNAME.
GitHub OAuth kullanılacaksa OAuth App'teki callback: `https://<alan-adi>/auth/github/callback`.

## 5. Doğrulama
- `https://<alan-adi>/api/health` → `{"ok":true,"surum":"0.4.x","kimlik":"açık","db":"volume"}`
- `/` landing açık · `/app/` → `/login`'e yönlendirir · e-posta + parola ile giriş → Ana Merkez · `/admin/` → Yol Haritası.
- Admin → Sağlık: Servis OK · Veritabanı **volume** · Kimlik Açık · Vibe (anahtar girildiyse) Açık.

## 6. Sonraki deploy'lar
`main`'e her push otomatik deploy eder. Panel HTML'leri repoda (`npm run panels` sonrası commit). Sürüm `package.json` → health ve admin'de görünür.

## Sorun giderme
| Belirti | Sebep / çözüm |
|---|---|
| Deploy loglarında `SESSION_SECRET tanımlı değil` | §3 Variables eksik |
| `/api/health` `db: "yerel dosya"` | `DATA_PATH` yok ya da Volume mount edilmedi |
| Giriş sonrası tekrar `/login` | Çerez `Secure` — alan adı https olmalı (Railway domain https'tir); özel domain'de sertifika bekleyin |
| Vibe `503 ANTHROPIC_API_KEY` | anahtar girilmedi (v0.6.0'da zaten planlı) |
| Admin A3 "Drive bağlantısı: Kurulmadı" | `GOOGLE_SERVICE_ACCOUNT_JSON` yok ya da JSON bozuk (§3b) |
| Intake `502 Drive taraması başarısız … paylaşıldı mı?` | Kök klasör SA e-postasıyla paylaşılmadı, ya da link bir klasör değil (dosya/Doc linki) |
| Intake `503 Drive bağlı değil` | değişken sürece ulaşmadı → health `ortam.GOOGLE_SERVICE_ACCOUNT` kontrol |
