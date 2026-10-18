# Railway'e kurulum — VIBE Management (tek servis)

Repo: `FrhnYldzl/VIBE-Management` · dal: `main` · servis: `apps/server` (Fastify, `npm start`) · port: Railway `PORT` verir.
`railway.json` build/start/health'i tanımlar; Variables ve Volume elle girilir.

## 1. Proje ve servis
1. railway.com → **New Project → Deploy from GitHub repo** → `FrhnYldzl/VIBE-Management`, dal `main`.
2. İlk deploy başlar; Variables girilmeden **kimlik yapılandırma hatası** verir (beklenen). Önce §2'yi tamamlayın.

## 2. Volume (paylaşımlı durum için)
Servis → **Volumes → Add Volume** → mount path: `/data`. (Yoksa durum çipleri ve Vibe oturumları her deploy'da sıfırlanır.)

## 3. Variables
Servis → **Variables → Raw Editor**, aşağıdakileri yapıştırıp değerleri doldurun:

```
NODE_ENV=production
DATA_PATH=/data/vibe.db
SESSION_SECRET=<uzun rastgele>
PASSWORD_USERS=<eposta1>:<hash1>,<eposta2>:<hash2>
ANTHROPIC_API_KEY=<sk-ant-...>            # Vibe stüdyosu; boşsa Vibe 503 döner, geri kalan çalışır
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

Her `auth:hash` çıktısının ilk satırı `scrypt$...` hash'idir → `PASSWORD_USERS=f.yildizli@jurishukuk.com:scrypt$...,gulsah@jurishukuk.com:scrypt$...`

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
