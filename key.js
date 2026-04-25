export async function onRequest(context) {
    // Pengaturan waktu (5 hari dalam milidetik)
    const durasiHari = 5;
    const intervalMs = durasiHari * 24 * 60 * 60 * 1000;
    
    // Angka periode (akan berubah setiap 5 hari sekali)
    const periodeSekarang = Math.floor(Date.now() / intervalMs);
    
    // SEED: Ganti tulisan di bawah ini dengan kata rahasiamu sendiri agar tidak mudah ditebak
    const kataRahasia = "FADHEN_SECRET_SALT_123"; 
    
    // Proses pembuatan Hash (Random String)
    const inputString = kataRahasia + periodeSekarang;
    const msgUint8 = new TextEncoder().encode(inputString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Mengubah hash menjadi kode unik 7 karakter
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const finalKey = "KEY" + hashHex.substring(0, 7);

    // Mengirimkan hasil ke website dan Roblox
    return new Response(finalKey, {
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*", // WAJIB: Agar bisa dibaca Roblox
            "Cache-Control": "no-cache"        // Agar key selalu fresh
        }
    });
}
