#!/usr/bin/env python3
"""src/ altındaki modülleri tek dosyalık dist/juris-panel-zyrone.html'e birleştirir."""
import re, pathlib
root = pathlib.Path(__file__).parent
src = root / "src"
html = (src / "index.html").read_text(encoding="utf8")
css = (src / "styles.css").read_text(encoding="utf8")
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "</style>")
scripts = re.findall(r'<script src="(js/[^"]+)"></script>\n', html)
bundle = "".join((src / s).read_text(encoding="utf8") for s in scripts)
html = re.sub(r'(<script src="js/[^"]+"></script>\n)+', lambda m: "<script>\n" + bundle + "</script>\n", html)
out = root / "dist" / "juris-panel-zyrone.html"
out.write_text(html, encoding="utf8")
print("yazıldı:", out, len(html), "bayt")
