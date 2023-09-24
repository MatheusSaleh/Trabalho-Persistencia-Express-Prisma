import { Router } from "express";
import { createCliente, getAllClientes, getClienteById } from "./controller/ClienteController";

export const router = Router()

router.get("/clientes", getAllClientes)
router.get("/clientes/:id", getClienteById)
router.post("/clientes", createCliente)

