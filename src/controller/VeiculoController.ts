import { Request, Response } from "express";
import { prisma } from "./../database/prisma";

export const getAllVeiculos = async (req: Request, res: Response) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      include: {
        cliente: true,
        servicos: true,
      },
    });

    res.json(veiculos);
  } catch (error) {
    console.error("Erro ao buscar veiculos: ", error);
    res.status(500).json({ error: "Erro ao buscar veiculos" });
  }
};

export const createVeiculo = async (req: Request, res: Response) => {
    try {
      const { marca, modelo, ano, placa, clienteId, servicos, dataAgendamento } = req.body;
  
      const cliente = await prisma.cliente.findUnique({
        where: { id: clienteId },
      });
  
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }
   
      const novoVeiculo = await prisma.veiculo.create({
        data: {
          marca,
          modelo,
          ano,
          placa,
          cliente: {
            connect: {
              id: clienteId,
            },
          },
          servicos: {
            create: servicos,
          },
        },
        include: {
          servicos: true
        },
      });
  
      if (dataAgendamento) {
        const novoAgendamento = await prisma.agendamento.create({
          data: {
            data: dataAgendamento,
            cliente: {
              connect: {
                id: clienteId,
              },
            },
            servicos: {
              connect: novoVeiculo.servicos.map((servico) => ({ id: servico.id })),
            },
          },
        });
      }
  
      res.json({
        message: "Veículo criado com agendamento e serviços",
        novoVeiculo,
      });
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
      res.status(500).json({ error: "Erro ao criar veículo" });
    }
  };
  