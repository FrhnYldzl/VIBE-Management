import { describe, expect, it } from "vitest";
import { fileIdFromUrl, folderIdFromUrl, matchScore, scanClient, driveFilesFromReport, loadClientData } from "./index.mjs";
import { join } from "node:path";

describe("drive-sync", () => {
  it("url → id", () => {
    expect(folderIdFromUrl("https://drive.google.com/drive/folders/1o_mTaK-m94G_dP_iaRal6RKCiTxXWqAg")).toBe("1o_mTaK-m94G_dP_iaRal6RKCiTxXWqAg");
    expect(fileIdFromUrl("https://docs.google.com/document/d/1GryaA3di1lj6ATcyiVDS_GilN7rCQChRWeEAOMKIEVE/edit")).toBe("1GryaA3di1lj6ATcyiVDS_GilN7rCQChRWeEAOMKIEVE");
    expect(folderIdFromUrl(undefined)).toBeNull();
  });
  it("eşleştirme: kod ve başlık", () => {
    expect(matchScore({ no: "A.1", t: "İş Modeli Dokümanı" }, "A.1 İş Modeli – Kanvas v2.docx")).toBeGreaterThanOrEqual(0.95);
    expect(matchScore({ no: "—", t: "Pay Sahipleri Sözleşmesi taslağı" }, "Pay Sahipleri Sözleşmesi (SHA) - taslak.pdf")).toBeGreaterThanOrEqual(0.5);
    expect(matchScore({ no: "—", t: "Bordro ve SGK dosyaları" }, "Fatura_2026_03.pdf")).toBe(0);
  });
  it("gerçek müvekkil verisi yüklenir", () => {
    const d = loadClientData(join(import.meta.dirname, "..", "juris-panel-kit", "src", "clients", "qervan.data.js"));
    expect(d.CLIENT.id).toBe("qervan-wetrade"); expect(d.DATAROOM.length).toBeGreaterThan(3);
  });
  it("tarama: öneri üretir", async () => {
    const data = { CLIENT: { id: "t", name: "T", driveRoot: "https://drive.google.com/drive/folders/ROOT0000000" }, DATAROOM: [{
      id: "A", title: "A. Strateji", url: "https://drive.google.com/drive/folders/SEC0000000A", items: [
        { id: "A1", title: "A.1. İş Modeli", fn: "PLAN", url: "https://drive.google.com/drive/folders/ITEM000000A1", empty: true,
          docs: [{ no: "A.1", t: "İş Modeli Dokümanı", owner: "Juris", status: "pending" }, { no: "—", t: "Soru Seti", owner: "Juris", status: "done" }] },
        { id: "A2", title: "A.2. İş Planı", fn: "PLAN", url: "https://drive.google.com/drive/folders/ITEM000000A2", docs: [{ no: "5", t: "İş Planı", owner: "Müvekkil", status: "done" }] },
      ] }] };
    const drive = { async list(id) {
      if (id === "ITEM000000A1") return [{ id: "f1", name: "A.1 İş Modeli Kanvas.docx", mimeType: "x", folder: false, link: "L1", modified: "2026-10-01" }, { id: "sub", name: "Ekler", folder: true, mimeType: "application/vnd.google-apps.folder", link: "LS" }];
      if (id === "sub") return [{ id: "f2", name: "Soru seti cevaplari.pdf", folder: false, mimeType: "x", link: "L2", modified: "2026-10-02" }];
      if (id === "ITEM000000A2") return [];
      if (id === "SEC0000000A") return [{ id: "x", name: "A.1 İş Modeli", folder: true, mimeType: "application/vnd.google-apps.folder" }];
      throw new Error("404");
    } };
    const r = await scanClient(drive, data, {});
    expect(r.totals.files).toBe(2);
    expect(r.items[0].files.find((f) => f.via === "Ekler")).toBeTruthy();
    const p = r.proposals.find((x) => x.key === "A1:0"); expect(p).toMatchObject({ from: "pending", to: "review" });
    expect(r.proposals.some((x) => x.info && x.item === "A1")).toBe(true); // empty:true ama dosya var
    expect(r.proposals.some((x) => x.info && x.item === "A2")).toBe(true); // boş ama done
    expect(driveFilesFromReport(r).A1.length).toBe(2);
    // mevcut override 'review' ise yeniden önerilmez
    const r2 = await scanClient(drive, data, { "A1:0": "review" });
    expect(r2.proposals.find((x) => x.key === "A1:0")).toBeUndefined();
  });
});
