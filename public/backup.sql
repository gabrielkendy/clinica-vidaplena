-- ==============================================================
-- Clínica VidaPlena — backup do banco de dados (exemplo/fictício)
-- ⚠️ Deixado na pasta pública DE PROPÓSITO (lab de treinamento).
-- ==============================================================
-- Dump: 2026-09-14 02:13 · database "vidaplena" · user "admin_vidaplena"
-- senha: senha-de-exemplo-123

CREATE TABLE pacientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(140),
  email VARCHAR(140) UNIQUE,
  senha VARCHAR(120),
  cpf VARCHAR(20),
  telefone VARCHAR(30),
  plano VARCHAR(60),
  staff BOOLEAN DEFAULT false
);

CREATE TABLE agendamentos (
  id SERIAL PRIMARY KEY,
  paciente_id INT,
  medico VARCHAR(120),
  especialidade VARCHAR(80),
  data TIMESTAMP,
  status VARCHAR(40),
  observacoes TEXT,
  valor VARCHAR(20)
);

CREATE TABLE exames (
  id SERIAL PRIMARY KEY,
  paciente_id INT,
  nome VARCHAR(120),
  arquivo VARCHAR(160),
  data DATE,
  medico VARCHAR(120)
);

INSERT INTO pacientes (id, nome, email, senha, cpf, telefone, plano, staff) VALUES
  (1, 'Mariana Ferreira Alves', 'mariana@exemplo.com', 'Mariana2026', '412.365.897-00', '(11) 98231-4455', 'Ampla Saúde', false),
  (2, 'Bruno Carvalho Lima',    'bruno@exemplo.com',   'Bruno2026',   '318.442.176-00', '(11) 97744-2210', 'MedPlus',     false),
  (3, 'Carla Mendes Rocha',     'carla@exemplo.com',   'Carla2026',   '295.774.038-00', '(11) 96612-8877', 'Particular',  false),
  (4, 'Dra. Camila Rocha',      'equipe@vidaplena.com','equipe2026',  '—',              '(11) 3011-8899',  '—',           true);

INSERT INTO agendamentos (id, paciente_id, medico, especialidade, data, status, observacoes, valor) VALUES
  (103, 2, 'Dr. Rafael Menezes', 'Clínica Geral', '2026-09-19 09:00', 'confirmada',
       'Paciente relata insônia e ansiedade há 3 semanas. Encaminhado para avaliação complementar.', 'R$ 280,00'),
  (105, 3, 'Dra. Juliana Prado', 'Estética', '2026-09-21 11:30', 'confirmada',
       'Preenchimento labial. ATENÇÃO: alergia relatada a lidocaína.', 'R$ 1.450,00');

-- login do painel interno da equipe: equipe@vidaplena.com / equipe2026
-- financeiro setembro: faturamento bruto R$ 187.430,00
