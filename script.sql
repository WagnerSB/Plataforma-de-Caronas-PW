create table usuarios (
   codigo serial not null primary key, 
   nome varchar(40) not null,
   telefone varchar(15) not null,
   email varchar(60) unique not null,
   senha varchar(60) not null,
   is_motorista boolean not null default false,
   tipo char(1) NOT NULL CHECK (tipo IN ('A', 'U')),
   constraint campos_nao_vazios check (trim(email) <> '' AND trim(telefone) <> '' and trim(nome) <> '' AND trim(senha) <> '')
);

create type enum_status_carona as enum ('Cancelada', 'Concluída', 'Em andamento', 'Confirmada');

create table caronas (
	codigo serial not null primary key,
	codigo_motorista integer not null,
	origem varchar(120) not null,
	destino varchar(120) not null,
	horario timestamp not null,
	horario_chegada timestamp not null,
	vagas integer not null,
	vagas_ocupadas integer not null default 0,
	status_carona enum_status_carona not null default 'Confirmada',
	
	constraint fk_motorista foreign key (codigo_motorista) references usuarios (codigo),
	constraint chk_vagas_ocupadas check (vagas_ocupadas <= vagas),
	constraint chk_vagas check (vagas_ocupadas >= 0 and vagas > 0),
	constraint chk_horario check (horario_chegada>horario)
);

create table avaliacoes (
	codigo serial not null primary key,
	codigo_usuario integer not null,
	codigo_carona integer not null,
	nota integer not null,
	comentario varchar(200),

	constraint fk_usuario foreign key (codigo_usuario) references usuarios (codigo),
	constraint fk_carona foreign key (codigo_carona) references caronas (codigo),
	constraint chk_notas check (nota >= 1 and nota <= 5),
	constraint avaliacao_unica unique (codigo_usuario, codigo_carona)
);

create table reservas (
	codigo serial primary key,
    codigo_carona integer not null,
    codigo_usuario integer not null,
    foreign key (codigo_carona) references caronas (codigo) on delete cascade,
    foreign key (codigo_usuario) references usuarios (codigo) on delete cascade,
	CONSTRAINT reserva_unica UNIQUE (codigo_usuario, codigo_carona)
);


-- inserindo registros
-- usuarios 
insert into usuarios (nome, telefone, email, is_motorista)
values
('João da Silva', '55987654321', 'joaodasilva@gmail.com', false),
('Maria Oliveira', '54988765432', 'mariaoliveira@gmail.com', false),
('Carlos Souza', '54999876543', 'carlossouza86@gmail.com', true);

-- caronas
insert into caronas (codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona)
values 
(3, 'Passo Fundo', 'Porto Alegre', '2025-04-09 08:00', '2025-04-09 12:00', 4, 1, 'Confirmada'),
(3, 'Carazinho', 'Passo Fundo', '2025-03-15 20:00', '2025-03-15 20:40', 2, 2, 'Concluída');

-- avaliações
insert into avaliacoes (codigo_usuario, codigo_carona, nota, comentario)
values (2, 2, 5, 'A viagem foi excelente, o motorista foi muito atencioso e pontual.');

-- reservas
insert into reservas (codigo_carona, codigo_usuario)
values 
(2, 3),
(2, 2),
(2, 1);

-- consultas
-- encontrar motoristas e passageiros de uma carona específica
select u.codigo as usuario_codigo, u.nome as usuario_nome, u.is_motorista as is_motorista 
from caronas c
join usuarios u on u.codigo = c.codigo_motorista 
where c.codigo = 2
union 
select r.codigo_usuario as usuario_codigo, u.nome as usuario_nome, u.is_motorista as is_motorista 
from reservas r
join usuarios u on u.codigo = r.codigo_usuario 
where r.codigo_carona = 2;

select * from usuarios;
