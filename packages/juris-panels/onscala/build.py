import pathlib
S=pathlib.Path(__file__).parent/'src'
r=lambda n:(S/n).read_text(encoding='utf-8')
out=r('head.html')+'\n<script>\n'+'\n'.join(r(n) for n in ['data.js','helpers.js','core.js','assess.js','router.js'])+'\n</script>\n\n</body></html>\n'
pathlib.Path(__file__).with_name('juris-panel-onscala.html').write_text(out,encoding='utf-8')
print('built',len(out))
