import { Router } from "express";
import { createCliente, getAllClientes, getClienteById, updateCliente, deleteCliente } from "./controller/ClienteController";
import { createVeiculo, getAllVeiculos } from "./controller/VeiculoController";
import { getAllServicos } from "./controller/ServicoController";
import { getAllAgendamentos } from "./controller/AgendamentoController";

export const router = Router()

router.get("/clientes", getAllClientes)
router.get("/clientes/:id", getClienteById)
router.post("/clientes", createCliente)
router.put("/clientes/:id", updateCliente);
router.delete("/clientes/:id", deleteCliente)

router.get("/veiculos", getAllVeiculos)
router.post("/veiculos", createVeiculo)

router.get("/servicos", getAllServicos)

router.get("/agendamentos", getAllAgendamentos)
