# Advertisements

Ky projekt përmban një video dhe disa reklama që luhen përgjatë saj. Mësimi kryesor i saj është përdorimi i një Hash Tabele për të kontrolluar se a duhet të luhet një reklamë në një sekond të caktuar.  
  
Mund të vërejmë dallimin mes *main.js* dhe *main2.js*, ku e para shfrytëzon kërkim linear dhe e dyta thjesht një Hash Tabelë. Reklamat kontrollohen cdo ~250ms (e caktuar nga Browseri), dhe qartazi `k` operacione cdo 250ms nuk është performancë e mirë (ku `k` është numri i reklamave). Kur e zëvendësojmë vargun me Hash Tabelë mjafton 1 kontrollim cdo 250ms.