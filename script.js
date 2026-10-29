/* ===== A. PENGATURAN: UBAH BAGIAN INI SESUAI VERSIMU ===== */
const CONFIG = {
  targetDate: "2026-12-02T00:00:00", // tanggal & jam ulang tahun
  introText: "Dibuat hanya untukmu cantikk.",
  letter: [
    "💕happy birthday, sayangku 💕",

    "Hari ini hari yang sangat spesial karena kamu lahir di dunia ini, banyak hal baik datang ke hidupmu, segala yang kamu impikan perlahan tercapai, dan kamu selalu punya alasan untuk bahagia, bahkan di hari-hari yang berat sekalipun.",

    "terima kasih sudah hadir dan menjadi bagian yang begitu berarti dalam hidupku. mungkin aku belum selalu pandai menyampaikan isi hatiku, tetapi ada banyak hal tentang kamu yang selalu kusyukuri, termasuk kesempatan untuk mengenalmu sedekat ini.",

    "aku tahu seiring waktu kita akan terus bertumbuh, bertemu hal-hal baru, dan mengalami banyak perubahan. tapi aku berharap, di tengah semua itu, kita tetap punya alasan untuk saling memahami, saling menguatkan, dan memilih satu sama lain.",

    "jangan terlalu keras sama diri sendiri, yaa, sayang. kamu layak bahagia, layak dicintai dengan tulus,  layak mendapatkan banyak hal baik dalam hidupmu dan semoga aku masih bisa menjadi bagian dari banyak kebahagiaan yang akan kamu temui nantinya.",

    "sekali lagi, happy birthday, perempuan kesayanganku. semoga dunia selalu punya cara untuk membuatmu tersenyum. i love you 💕",
  ],
  photos: [
    "foto/a.jpg",
    "foto/b.jpg",
    "foto/c.jpg",
    "foto/d.jpg",
    "foto/f1.jpg",
    "foto/2.jpg",
    "foto/3.jpg",
    "foto/5.jpg",
    "foto/6.jpg",
    "foto/8.jpg",
    "foto/10.jpg",
    "foto/11.jpg",
  ], // isi dengan alamat foto, mis. ["foto/1.jpg","foto/2.jpg"]
  videoSrc: "vid.mp4", // mis. "video/pesan.mp4"
  musicSrc:
    "Virgoun - Surat Cinta Untuk Starla A Love Letter To Starla (Official Lyric Video).mp3", // mis. "musik/lagu.mp3" (kosong = tombol musik tidak muncul)
  wishes:
    "Semoga panjang umur, sehat selalu, dan bahagia. Terima kasih sudah menjadi bagian terbaik dalam hidupku. 💗",
  closing:
    "Aku tidak tahu saat ini kita masih sama seperti dulu atau tidak, jadi aku cuma mau mengucapkan, Terima kasih cantik sudah menjadi bagian dari hidupku. forever yours. 💗",
  finalTitles: ["Happy Birthday", "With All My Love", "Always & Forever"],
};

/* ===== B. ALAT BANTU ===== */
const $ = (s) => document.querySelector(s);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
let cur = -1,
  timers = [];

/* ===== C. PINDAH ADEGAN ===== */
const enter = {
  2: () => timers.push(setTimeout(() => cur === 2 && show(3), 5000)),
  3: typeLetter,
  7: cycleTitles,
};
function show(i) {
  timers.forEach(clearTimeout);
  timers = [];
  document
    .querySelectorAll(".scene")
    .forEach((s, n) => s.classList.toggle("on", n === i));
  cur = i;
  if (i !== 5) $("#vid") && $("#vid").pause();
  enter[i] && enter[i]();
}

/* ===== D. HITUNG MUNDUR (tambahkan ?demo di alamat untuk mencoba 8 detik) ===== */
const target = location.search.includes("demo")
  ? Date.now() + 8000
  : new Date(CONFIG.targetDate).getTime();
const boxes = document.querySelectorAll(".box b");
const cd = setInterval(tick, 1000);
tick();
function tick() {
  const d = Math.max(0, target - Date.now());
  [d / 864e5, (d / 36e5) % 24, (d / 6e4) % 60, (d / 1e3) % 60].forEach(
    (n, i) => (boxes[i].textContent = String(Math.floor(n)).padStart(2, "0")),
  );
  if (d === 0) {
    clearInterval(cd);
    $("#wait").hidden = true;
    $("#open").hidden = false;
  }
}
$("#open").onclick = () => {
  startMusic();
  show(1);
};
$("#gift").onclick = () => show(2);

/* ===== E. SURAT DENGAN EFEK KETIK ===== */
async function typeLetter() {
  const box = $("#letter"),
    token = ++typeLetter.t;
  box.innerHTML = "";
  $("#toMem").hidden = true;
  for (const para of CONFIG.letter) {
    const p = document.createElement("p");
    box.appendChild(p);
    for (const w of para.split(" ")) {
      if (token !== typeLetter.t) return;
      p.textContent += w + " ";
      await sleep(reduce ? 0 : 70);
    }
  }
  $("#toMem").hidden = false;
}
typeLetter.t = 0;
$("#toMem").onclick = () => show(4);

/* ===== F. POLAROID & GALERI ===== */
function pol(i) {
  const d = document.createElement("div");
  d.className = "pol";
  d.style.setProperty("--r", (i % 2 ? 1 : -1) * (2 + (i % 3) * 1.5) + "deg");
  const src = CONFIG.photos[i % (CONFIG.photos.length || 1)];
  d.innerHTML = src
    ? `<img src="${src}" alt="Foto kenangan ${i + 1}" loading="lazy">`
    : "<i>💗</i>";
  return d;
}
const total = Math.max(12, CONFIG.photos.length);
for (let i = 0; i < total; i++) $("#grid").appendChild(pol(i));
[
  ["top:6%;left:5%"],
  ["top:10%;right:5%"],
  ["bottom:12%;left:6%"],
  ["bottom:8%;right:6%"],
].forEach((p, i) => {
  const c = pol(i);
  c.classList.add("corner");
  c.style.cssText += ";" + p[0];
  $("#s2").appendChild(c);
});
$("#introSub").textContent = CONFIG.introText;
$("#toVid").onclick = () => show(5);

/* ===== G. PEMUTAR VIDEO ===== */
const pl = $("#player");
if (CONFIG.videoSrc) {
  pl.innerHTML = `<video id="vid" src="${CONFIG.videoSrc}" playsinline preload="metadata"></video>
  <div class="ctrl"><button id="pp" aria-label="Putar">▶</button><span id="tm">0:00 / 0:00</span>
  <input type="range" id="seek" min="0" max="100" value="0" aria-label="Posisi video"><button id="fs" aria-label="Layar penuh">⛶</button></div>`;
  const v = $("#vid"),
    f = (t) =>
      isFinite(t)
        ? Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0")
        : "0:00";
  $("#pp").onclick = () => (v.paused ? v.play() : v.pause());
  v.onplay = () => ($("#pp").textContent = "❚❚");
  v.onpause = () => ($("#pp").textContent = "▶");
  v.ontimeupdate = () => {
    $("#seek").value = (v.currentTime / v.duration) * 100 || 0;
    $("#tm").textContent = f(v.currentTime) + " / " + f(v.duration);
  };
  $("#seek").oninput = (e) =>
    (v.currentTime = (e.target.value / 100) * v.duration);
  $("#fs").onclick = () => pl.requestFullscreen && pl.requestFullscreen();
} else
  pl.innerHTML =
    '<p class="note">Video belum diatur. Isi <b>videoSrc</b> di bagian CONFIG.</p>';
$("#toWish").onclick = () => show(6);

/* ===== H. UCAPAN & PENUTUP ===== */
$("#wishes").textContent = CONFIG.wishes;
$("#closing").textContent = CONFIG.closing;
$("#toEnd").onclick = () => show(7);
$("#replay").onclick = () => location.reload();
function cycleTitles() {
  let i = 0;
  const el = $("#final");
  const set = () => {
    el.style.opacity = 0;
    timers.push(
      setTimeout(() => {
        el.textContent = CONFIG.finalTitles[i++ % CONFIG.finalTitles.length];
        el.style.opacity = 1;
      }, 600),
    );
  };
  set();
  const iv = setInterval(set, 3200);
  timers.push(iv);
}

/* ===== I. MUSIK (tombol hanya muncul jika musicSrc diisi) ===== */
let audio;
if (CONFIG.musicSrc) {
  audio = new Audio(CONFIG.musicSrc);
  audio.loop = true;
  $("#mus").hidden = false;
  $("#mus").onclick = () =>
    audio.paused ? startMusic() : (audio.pause(), setMus(false));
}
function startMusic() {
  audio &&
    audio
      .play()
      .then(() => setMus(true))
      .catch(() => {});
}
function setMus(on) {
  $("#mus").setAttribute("aria-pressed", on);
  $("#mus").style.opacity = on ? 1 : 0.6;
}

/* ===== J. LATAR: BINTANG & KELOPAK ===== */
const cv = $("#fx"),
  g = cv.getContext("2d");
let W,
  H,
  items = [];
function size() {
  W = cv.width = innerWidth;
  H = cv.height = innerHeight;
}
addEventListener("resize", size);
size();
for (let i = 0; i < 140; i++)
  items.push({
    k: "s",
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.4 + 0.3,
    p: Math.random() * 6,
  });
for (let i = 0; i < 18; i++)
  items.push({
    k: "p",
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 5 + 3,
    v: Math.random() * 0.0006 + 0.0002,
    p: Math.random() * 6,
  });
function draw(t) {
  g.clearRect(0, 0, W, H);
  for (const o of items) {
    if (o.k === "s") {
      g.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t / 1400 + o.p));
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(o.x * W, o.y * H, o.r, 0, 7);
      g.fill();
    } else {
      if (!reduce) {
        o.y += o.v * 16;
        o.x += Math.sin(t / 1800 + o.p) * 0.0004;
        if (o.y > 1.05) {
          o.y = -0.05;
          o.x = Math.random();
        }
      }
      g.globalAlpha = 0.5;
      g.fillStyle = "#f7a8c4";
      g.beginPath();
      g.ellipse(o.x * W, o.y * H, o.r, o.r * 0.6, t / 900 + o.p, 0, 7);
      g.fill();
    }
  }
  if (!reduce) requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

show(0);
