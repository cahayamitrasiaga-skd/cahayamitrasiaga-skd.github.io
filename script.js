
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

function hitungAngsuran() {

    // Mengambil nilai dari formulir
    const pinjaman = Number(
        document.getElementById(
            "jumlahPinjaman"
        ).value
    );

    const bulan = Number(
        document.getElementById(
            "jangkaWaktu"
        ).value
    );

    const bunga = Number(
        document.getElementById(
            "bungaPinjaman"
        ).value
    );

    const hasil = document.getElementById(
        "hasilSimulasi"
    );

    // Memeriksa data yang dimasukkan
    if (
        !Number.isFinite(pinjaman) ||
        pinjaman <= 0 ||
        !Number.isInteger(bulan) ||
        bulan <= 0 ||
        !Number.isFinite(bunga) ||
        bunga < 0
    ) {
        hasil.textContent =
            "Masukkan data pinjaman yang valid.";
        return;
    }

    // Menghitung bunga flat
    const angsuranPokok = pinjaman / bulan;

    const bungaBulanan =
        pinjaman * bunga / 100;

    const totalAngsuran =
        angsuranPokok + bungaBulanan;

    const totalPembayaran =
        totalAngsuran * bulan;

    // Menampilkan hasil
    hasil.innerHTML = `
        <h3>Hasil Simulasi</h3>

        <p>
            Angsuran Pokok:
            <strong>
                ${formatRupiah(angsuranPokok)}
            </strong>
        </p>

        <p>
            Bunga per Bulan:
            <strong>
                ${formatRupiah(bungaBulanan)}
            </strong>
        </p>

        <p>
            Angsuran per Bulan:
            <strong>
                ${formatRupiah(totalAngsuran)}
            </strong>
        </p>

    `;
}

// ==================================
// PERTEMUAN 4 - MENU HAMBURGER
// ==================================

const tombolMenu =
    document.getElementById("menuToggle");

const menuNavigasi =
    document.getElementById("menuNavigasi");

// Buka dan tutup menu
tombolMenu.addEventListener("click", function () {

    const terbuka =
        menuNavigasi.classList.toggle("aktif");

    tombolMenu.setAttribute(
        "aria-expanded",
        String(terbuka)
    );

    tombolMenu.setAttribute(
        "aria-label",
        terbuka ? "Tutup menu navigasi"
                : "Buka menu navigasi"
    );

    tombolMenu.textContent =
        terbuka ? "✕" : "☰";

});

// Tutup menu setelah memilih halaman
const semuaLink =
    menuNavigasi.querySelectorAll("a");

semuaLink.forEach(function (link) {

    link.addEventListener("click", function () {

        menuNavigasi.classList.remove("aktif");

        tombolMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        tombolMenu.setAttribute(
            "aria-label",
            "Buka menu navigasi"
        );

        tombolMenu.textContent = "☰";

    });

});

// ==================================
// PERTEMUAN 5 - FORMULIR KONTAK
// ==================================

// GANTI dengan nomor WhatsApp resmi koperasi
// Format: 62 + nomor tanpa angka 0 di depan
const nomorAdmin = "6285190657257";

const formKontak =
    document.getElementById("formKontak");

formKontak.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nama =
            document.getElementById(
                "namaKontak"
            ).value.trim();

        const telepon =
            document.getElementById(
                "teleponKontak"
            ).value.trim();

        const pesan =
            document.getElementById(
                "pesanKontak"
            ).value.trim();

        const status =
            document.getElementById(
                "statusKontak"
            );

        if (!nama || !telepon || !pesan) {
            status.textContent =
                "Mohon lengkapi formulir.";
            return;
        }

        // Pesan yang akan ditampilkan
        // di WhatsApp
        const isiPesan =
            "Halo Admin Koperasi,\n\n" +
            "Nama: " + nama + "\n" +
            "WhatsApp: " + telepon + "\n" +
            "Pesan: " + pesan;

        const url =
            "https://wa.me/" +
            nomorAdmin +
            "?text=" +
            encodeURIComponent(isiPesan);

        status.textContent =
            "Membuka WhatsApp...";

        window.location.href = url;
    }
);
