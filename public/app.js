/* Portal do Paciente — Clínica VidaPlena (LAB DE TREINO)
   ⚠️ FALHA 07 plantada: chave da assistente virtual exposta no front.
   Qualquer visitante lê isso no F12. (TODO: mover para o servidor) */
const VIDA_AI_KEY = "sk-proj-EXEMPLO0NAO0E0REAL0AAAAAAAAAAAAAAAAAAAAAAAAAAAA";

let token = localStorage.getItem('token');
let paciente = null;

function mostrarCodigo() { document.getElementById('boxLogin').style.display = 'none'; document.getElementById('boxCodigo').style.display = 'block'; }
function mostrarLogin() { document.getElementById('boxCodigo').style.display = 'none'; document.getElementById('boxLogin').style.display = 'block'; }

async function entrar() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, senha }) });
  const d = await r.json();
  if (!d.token) return alert(d.erro || 'Falha no login');
  token = d.token; localStorage.setItem('token', token); localStorage.setItem('nome', d.nome);
  abrirPainel(d.nome);
}

async function entrarCodigo() {
  const email = document.getElementById('emailCod').value;
  const codigo = document.getElementById('codigo').value;
  const r = await fetch('/api/login/codigo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, codigo }) });
  const d = await r.json();
  if (!d.token) return alert(d.erro || 'Código inválido');
  token = d.token; localStorage.setItem('token', token); localStorage.setItem('nome', d.nome);
  abrirPainel(d.nome);
}

function sair() { localStorage.removeItem('token'); localStorage.removeItem('nome'); location.href = '/'; }

function aba(qual) {
  ['consultas', 'exames', 'dados'].forEach(x => {
    document.getElementById('tab-' + x).classList.toggle('on', x === qual);
    document.getElementById('v' + x.charAt(0).toUpperCase() + x.slice(1)).style.display = x === qual ? 'block' : 'none';
  });
}

async function abrirPainel(nome) {
  document.getElementById('boxLogin').style.display = 'none';
  document.getElementById('boxCodigo').style.display = 'none';
  document.getElementById('painel').style.display = 'block';
  document.getElementById('bSair').style.display = 'inline-block';
  document.getElementById('nomePaciente').textContent = nome;

  const r = await fetch('/api/agendamentos?token=' + token);
  const ags = await r.json();
  if (!Array.isArray(ags)) { alert('Sessão expirada'); sair(); return; }
  document.getElementById('resumo').textContent = ags.length + ' agendamento(s) · ' + ags.filter(a => a.status === 'confirmada').length + ' confirmado(s)';

  document.getElementById('vConsultas').innerHTML = ags.map(a =>
    '<div class="ag"><div><b>' + a.especialidade + ' — ' + a.medico + '</b>' +
    '<div class="meta">' + a.data + '<span class="pill ' + (a.status === 'confirmada' ? 'ok' : 'wait') + '">' + a.status + '</span></div></div>' +
    '<div class="val">' + a.valor + '</div></div>'
  ).join('') || '<p style="color:var(--dim)">Nenhuma consulta marcada.</p>';

  const re = await fetch('/api/exames?token=' + token);
  const exs = await re.json();
  document.getElementById('vExames').innerHTML = (Array.isArray(exs) ? exs.map(e =>
    '<div class="ag"><div><b>' + e.nome + '</b><div class="meta">' + e.data + ' · ' + e.medico + '</div></div>' +
    '<button class="btn ghost small" onclick="baixarExame(\'' + e.arquivo + '\')">Baixar PDF</button></div>'
  ).join('') : '') || '<p style="color:var(--dim)">Nenhum exame disponível.</p>';

  const rp = await fetch('/api/admin/pacientes?token=' + token);
  const todos = await rp.json();
  const eu = Array.isArray(todos) ? todos.find(p => p.email === localStorage.getItem('emailSalvo')) : null;
  document.getElementById('vDados').innerHTML =
    '<div class="ag"><div class="meta">Nome: <b style="color:var(--txt)">' + nome + '</b></div></div>' +
    '<div class="ag"><div class="meta">CPF: <b style="color:var(--txt)">' + ((todos && Array.isArray(todos) && todos[0]) ? todos[0].cpf + ' *(carregado do painel interno)' : '—') + '</b></div></div>' +
    '<div class="ag"><div class="meta">Plano: <b style="color:var(--txt)">' + ((todos && Array.isArray(todos) && todos[1]) ? todos[1].plano : '—') + '</b></div></div>' +
    '<p style="color:var(--dim);font-size:13px;margin-top:10px">Para alterar seus dados, fale com a recepção.</p>';
}

function baixarExame(arquivo) { window.open('/api/exame?arquivo=' + arquivo); }

async function importarFoto() {
  const url = document.getElementById('urlFoto').value;
  const out = document.getElementById('saida');
  out.style.display = 'block';
  out.textContent = 'Buscando...';
  const r = await fetch('/api/importar-foto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
  const d = await r.json();
  out.textContent = JSON.stringify(d, null, 2).slice(0, 3000);
}

/* assistente virtual (mock) */
let chatAberto = false;
function toggleChat() {
  chatAberto = !chatAberto;
  document.getElementById('chatBox').style.display = chatAberto ? 'block' : 'none';
  if (chatAberto && !document.getElementById('chatLog').children.length) {
    document.getElementById('chatLog').innerHTML = '<div style="margin-bottom:8px"><b>Vida:</b> Oi! Sou a assistente virtual da VidaPlena 💚 Posso ajudar com agendamento, convênios e resultados.</div>';
  }
}
function enviarChat() {
  const inp = document.getElementById('chatIn');
  const t = inp.value.trim(); if (!t) return;
  const log = document.getElementById('chatLog');
  log.innerHTML += '<div style="margin-bottom:8px;text-align:right"><b>Você:</b> ' + t + '</div>';
  inp.value = '';
  const respostas = [
    'Anotado! Posso verificar sua agenda. Quer remarcar ou confirmar sua próxima consulta?',
    'Nosso horário de atendimento é de segunda a sábado, das 08h às 20h. Quer que eu já reserve um horário?',
    'Aceitamos Ampla Saúde, MedPlus e Saúde Total. Posso conferir a cobertura do seu plano.',
  ];
  setTimeout(() => {
    log.innerHTML += '<div style="margin-bottom:8px"><b>Vida:</b> ' + respostas[Math.floor(Math.random() * respostas.length)] + '</div>';
    log.scrollTop = log.scrollHeight;
  }, 600);
}

/* auto-login se tinha token salvo */
if (token) {
  localStorage.setItem('emailSalvo', localStorage.getItem('emailSalvo') || 'mariana@exemplo.com');
  abrirPainel(localStorage.getItem('nome') || 'paciente');
}
