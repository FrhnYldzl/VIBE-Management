// Kullanım: npm run auth:hash -- <parola>   → PASSWORD_USERS için "kullanici:scrypt$salt$hash" parçası
import { hashPassword } from "./auth.ts";

const pw = process.argv[2];
if (!pw) { console.error("Kullanım: npm run auth:hash -- <parola>"); process.exit(1); }
const h = hashPassword(pw);
console.log(h);
console.log("\nRailway Variables → PASSWORD_USERS=<eposta>:" + h + "   (birden fazla kullanıcı virgülle)");
