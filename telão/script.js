// 🔥 IMPORTS FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔑 SUA CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAn3iARpLLGTW-GP0UgpGnzAVlYXA7k1Nk",
  authDomain: "english-mac.firebaseapp.com",
  databaseURL: "https://english-mac-default-rtdb.firebaseio.com",
  projectId: "english-mac",
  storageBucket: "english-mac.appspot.com",
  messagingSenderId: "123456789", // pode ajustar depois
  appId: "1:123456789:web:abc123" // pode ajustar depois
};

// 🚀 INICIAR FIREBASE
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==========================
// 📤 ENVIAR (FORMULÁRIO)
// ==========================
window.enviar = function () {
    const nomeInput = document.getElementById("nome");
    const palavraInput = document.getElementById("palavra");

    if (!nomeInput || !palavraInput) return;

    const nome = nomeInput.value.trim();
    const palavra = palavraInput.value.trim();

    if (!nome || !palavra) {
        alert("Fill all fields!");
        return;
    }

    push(ref(db, "palavras"), {
        nome: nome,
        palavra: palavra,
        time: Date.now()
    });

    nomeInput.value = "";
    palavraInput.value = "";
};

// ==========================
// ☁️ TELÃO (TEMPO REAL)
// ==========================
const telao = document.getElementById("telao");

if (telao) {
    const palavrasRef = ref(db, "palavras");

    onChildAdded(palavrasRef, (snapshot) => {
        const data = snapshot.val();
        criarNuvem(data.nome, data.palavra);
    });
}

// ==========================
// ☁️ CRIAR NUVEM
// ==========================
function criarNuvem(nome, palavra) {
    const nuvem = document.createElement("div");
    nuvem.className = "nuvem";

    nuvem.innerText = `${nome}: ${palavra}`;

    nuvem.style.left = Math.random() * 70 + "%";
    nuvem.style.top = "100%";

    document.body.appendChild(nuvem);

    // 💥 explode após 15s
    setTimeout(() => {
        nuvem.classList.add("explodir");
    }, 15000);

    // remove depois
    setTimeout(() => {
        nuvem.remove();
    }, 15500);
}