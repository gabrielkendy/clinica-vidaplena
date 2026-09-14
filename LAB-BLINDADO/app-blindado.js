/* Portal do Paciente — Clínica VidaPlena (VERSÃO BLINDADA)
   ✅ CORREÇÃO 07: aqui NÃO existe mais chave nenhuma.
   O site só conversa com o servidor (/api/assistente) — a chave
   fica lá, e o navegador nunca vê. Abre o F12 e confere. */

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

  // ✅ CORREÇÃO 01/03: os dados agora vêm da própria sessão, não da lista interna.
  const rp = await fetch('/api/meus-dados?token=' + token);
  const eu = await rp.json();
  document.getElementById('vDados').innerHTML =
    '<div class="ag"><div class="meta">Nome: <b style="color:var(--txt)">' + nome + '</b></div></div>' +
    '<div class="ag"><div class="meta">CPF: <b style="color:var(--txt)">' + (eu.cpf || '—') + '</b></div></div>' +
    '<div class="ag"><div class="meta">Plano: <b style="color:var(--txt)">' + (eu.plano || '—') + '</b></div></div>' +
    '<p style="color:var(--dim);font-size:13px;margin-top:10px">Para alterar seus dados, fale com a recepção.</p>';
}

function baixarExame(arquivo) { window.open('/api/exame?arquivo=' + arquivo + '&token=' + token); }

async function importarFoto() {
  const url = document.getElementById('urlFoto').value;
  const out = document.getElementById('saida');
  out.style.display = 'block';
  out.textContent = 'Buscando...';
  const r = await fetch('/api/importar-foto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
  const d = await r.json();
  out.textContent = JSON.stringify(d, null, 2).slice(0, 3000);
}

/* assistente virtual — ✅ CORREÇÃO 07: sem chave no front.
   O site manda a pergunta pro servidor; o servidor usa a chave. */
let chatAberto = false;
function toggleChat() {
  chatAberto = !chatAberto;
  document.getElementById('chatBox').style.display = chatAberto ? 'block' : 'none';
  if (chatAberto && !document.getElementById('chatLog').children.length) {
    document.getElementById('chatLog').innerHTML = '<div style="margin-bottom:8px"><b>Vida:</b> Oi! Sou a assistente virtual da VidaPlena 💚 Posso ajudar com agendamento, convênios e resultados.</div>';
  }
}
async function enviarChat() {
  const inp = document.getElementById('chatIn');
  const t = inp.value.trim(); if (!t) return;
  const log = document.getElementById('chatLog');
  log.innerHTML += '<div style="margin-bottom:8px;text-align:right"><b>Você:</b> ' + t + '</div>';
  inp.value = '';
  try {
    const r = await fetch('/api/assistente', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensagem: t }) });
    const d = await r.json();
    log.innerHTML += '<div style="margin-bottom:8px"><b>Vida:</b> ' + (d.resposta || 'Desculpa, tentei aqui e não consegui.') + '</div>';
  } catch {
    log.innerHTML += '<div style="margin-bottom:8px"><b>Vida:</b> Tive um problema técnico, tenta de novo?</div>';
  }
  log.scrollTop = log.scrollHeight;
}

/* auto-login se tinha token salvo */
if (token) {
  localStorage.setItem('emailSalvo', localStorage.getItem('emailSalvo') || 'mariana@exemplo.com');
  abrirPainel(localStorage.getItem('nome') || 'paciente');
}
