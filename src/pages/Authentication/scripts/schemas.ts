import { z } from 'zod';

// =-=-=-Schemas Users-=-=-= //

export const AuthUserFormSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.'),
    password: z
        .string()
        .nonempty('A senha é obrigatória.')
});

export const UserFormSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.'),
    password: z
        .string()
        .nonempty('A senha é obrigatória.'),
    status: z
        .boolean().optional(),
    confirmpassword: z
        .string()
        .nonempty('A confirmação de senha é obrigatória.')
}).refine((data) => data.password === data.confirmpassword, {
    message: 'As senhas não se coincidem',
    path: ['confirmpassword']
})

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .nonempty('O email é obrigatório.')
});

// =-=-=-Schemas Dashboard-=-=-= //

export const CompanyFormSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    nomeEmpresa: z
        .string()
        .nonempty('Razão social obrigatória.'),
    cnpj: z
        .string()
        .nonempty('CNPJ obrigatório.'),
    cep: z
        .string()
        .nonempty('CEP obrigatório.'),
    endereco: z
        .string()
        .nonempty('Endereço obrigatório.'),
    endereco2: z
        .string(),
    numero: z
        .string()
        .nonempty('Número obrigatório.')
})

  export const ClientsFormSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    nomeEmpresa: z
        .string()
        .nonempty('Razão social obrigatória.'),
    cnpj: z
        .string()
        .nonempty('CNPJ obrigatório.'),
    cep: z
        .string()
        .nonempty('CEP obrigatório.'),
    endereco: z
        .string()
        .nonempty('Endereço obrigatório.'),
    endereco2: z
        .string(),
    numero: z
        .string()
        .nonempty('Número obrigatório.'),
    contatos: z
        .array(
            z.object({
                nome: z.string(),
                cargo: z.string(),
                email: z.string(),
                tel1: z.string(),
                tel2: z.string(),
            })
        )
})

export const SuppliersFormSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    nomeFornecedor: z
        .string()
        .nonempty('Razão social obrigatória.'),
    cnpj: z
        .string()
        .nonempty('CNPJ obrigatório.'),
    cep: z
        .string()
        .nonempty('CEP obrigatório.'),
    endereco: z
        .string()
        .nonempty('Endereço obrigatório.'),
    endereco2: z
        .string(),
    numero: z
        .string()
        .nonempty('Número obrigatório.'),
    contatos: z.array(
        z.object({
            nome: z
                .string()
                .nonempty('Nome obrigatório.'),
            cargo: z
                .string()
                .nonempty('Posição obrigatória.'),
            email: z
                .string()
                .nonempty('E-mail obrigatório.'),
            tel1: z
                .string()
                .nonempty('Telefone 1 obrigatório.'),
            tel2: z
                .string()
        })),
    servicos: z.array(z.object({ servico: z.string() })).min(1, 'O mínimo de serviço é 1'),
    serviceselected: z
        .string()
})

export const ServicesFormSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    nomeServico: z
        .string()
        .nonempty('Nome obrigatório.'),
});

export const EventsFormSchema = z.object({
    codigo: z
        .union([z.string().optional(), z.number().optional()]).optional(),
    nome: z
        .string()
        .nonempty('Nome obrigatório.'),
    cep: z
        .string()
        .nonempty('CEP obrigatório.'),
    endereco: z
        .string()
        .nonempty('Endereço obrigatório.'),
    numero: z
        .string()
        .nonempty('Requerido.'),
    endereco2: z
        .string(),
    solicitante: z
        .string()
        .nonempty('Solicitante obrigatório.'),
    emailEvento: z
        .string()
        .optional(),
    emailCC: z
        .string()
        .optional(),
    dataEntrada: z
        .string()
        .nonempty('Data entrada obrigatório.'),
    dataSaida: z
        .string()
        .nonempty('Data saída obrigatório.'),
    numeroParticipantes: z
        .union([z.string().nonempty('Número de participantes obrigatório.'), z.number()]),
    tipoEvento: z
        .string()
        .nonempty('Tipo evento obrigatório.'),
    statusEvento: z
        .string(),
    nacional: z
        .string(),
    observacao1: z
        .string(),
    observacao2: z
        .string(),
    observacao3: z
        .string(),
    cartaConvite: z
        .string()
        .optional(),
    dadosCadastrais: z
        .string()
        .optional(),
    questionario: z
        .string()
        .optional(),
    servicos: z.array(z.object({ servico: z.string() })).min(1, 'O mínimo de serviço é 1'),
    clientes: z.array(
        z.object({
            codigo: z.union([z.string(), z.number()]),
        })
    ),
    serviceselected: z
        .string()
})

export const TypeEventsFormSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    tipo_evento: z
        .string()
        .nonempty('Nome obrigatório.'),
});

export const TypeComentsFormSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    tipo_comentario: z
        .string()
        .nonempty('Nome obrigatório.'),
});

export const historicDinamicSchema = z.object({
    data: z.string().optional(),
    tipo: z.string(),
    comentario: z.string().optional(),
    origem: z.string().optional(),
    usuario: z.string().optional(),
    questionario: z.array(
        z.object({
            pergunta: z.string(),
            resposta: z.string()
        })
    ).optional()
});

export const AirDinamicSchema = z.object({
    trecho: z.string(),
    data: z.string(),
    ciaArea: z.string(),
    voo: z.string(),
    origem: z.string(),
    destino: z.string(),
    horaSaida: z.string(),
    horaChegada: z.string(),
});

export const AirStaticSchema = z.object({
    statusEmissao: z.string(),
    dataEmissao: z.string(),
    dataRemissao: z.string(),
    trechos: z.array(AirDinamicSchema).optional()
});

export const transportDinamicSchema = z.object({
    data: z.string(),
    origem: z.string(),
    destino: z.string(),
    horaSaida: z.string(),
    horaChegada: z.string(),
    tipo: z.string(),
});

export const hotelDinamicSchema = z.object({
    nomeHotel: z.string(),
    enderecoHotel: z.string(),
    dataCheckIn: z.string(),
    dataCheckOut: z.string(),
    horaCheckIn: z.string(),
    horaCheckOut: z.string(),
});

export const cartaConviteSchema = z.object({
    codigo: z.union([z.string().nonempty('Código obrigatório.'), z.number()]),
    titulo: z.string().nonempty('Titulo obrigatório.'),
    descricao: z.string().nonempty('Descrição obrigatório.'),
    clientes: z.array(
      z.object({
        codigo: z.union([z.string(), z.number()]),
      })
    ).optional(),
    ativo: z.any(),
  });
  

export const dadosCadastraisSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]).optional(),
    descricao: z
        .string()
        .nonempty('Descrição obrigatório.'),
    dados: z.array(
        z.object({
            campo: z.string()
        })
    ),
    clientes: z.array(
        z.object({
            codigo: z.union([z.string(), z.number()]),
        })
    ),
    ativo: z
        .any(),
    camposelected: z
        .string()
});

export const QuestionarioDinamicoSchema = z.object({
        pergunta: z.string(),
        tipo: z.string(),
        justifique: z.any(),
        obrigatoria: z.any(),
        resposta: z.string().optional(),
        multipla: z.array(
            z.object({
                opcoes: z.string()
            })
        ).optional()
});

export const QuestionarioSchema = z.object({
    codigo: z
        .union([z.string().nonempty('Código obrigatório.'), z.number()]),
    descricao: z
        .string()
        .nonempty('Descrição obrigatório.'),
    orientacoes: z
        .string()
        .nonempty('Orientação obrigatório.'),
    clientes: z.array(
            z.object({
                codigo: z.union([z.string(), z.number()]),
            })
        ),
    ativo: z
        .any(),
    questoes: z.array(QuestionarioDinamicoSchema).optional()
});

export const InvitationResponseLetter = z.object({
    codigo: z
        .union([z.string(), z.number()]).optional(),
    dadosCadastrais: z
        .array(
            z.object({
                campo: z.string(),
                resposta: z.string()
            })
        ).optional(),
    questionario: z
        .array(
            z.object({
                pergunta: z.string(),
                resposta: z.string()
            })
        ).optional()
});

export const ParticipantsFormSchema = z.object({
    _id: z.string().optional(),
    codigo: z
        .union([z.string().optional(), z.number().optional()]).optional(),
    codigoEvento: z
        .union([z.string().optional(), z.number().optional()]).optional(),
    nome: z
        .string()
        .optional(),
    nomeCracha: z
        .string()
        .optional(),
    crm: z
        .string()
        .optional(),
    cep: z
        .string()
        .optional(),
    cpf: z
        .string()
        .optional(),
    endereco: z
        .string()
        .optional(),
    endereco2: z
        .string()
        .optional(),
    numero: z
        .string()
        .optional(),
    email: z
        .string()
        .optional(),
    cidade: z
        .string()
        .optional(),
    estado: z
        .string()
        .optional(),
    tel: z
        .string()
        .optional(),
    whats: z
        .string()
        .optional(),
    nascimento: z
        .string()
        .optional(),
    identidade: z
        .string()
        .optional(),
    passporte: z
        .string()
        .optional(),
    complemento: z
        .string()
        .optional(),
    status: z
        .string()
        .optional(),
    inscricao: z
        .string()
        .optional(),
    seguro: z
        .string()
        .optional(),
    historico: z
        .array(historicDinamicSchema).optional(),
    aereo: z
        .array(AirStaticSchema).optional(),
    transporte: z
        .array(transportDinamicSchema).optional(),
    hotel: z
        .array(hotelDinamicSchema).optional()
})