import { Request, Response } from "express";
import {prisma} from "./../database/prisma";

export const getAllAgendamentos = async(req: Request, res: Response) => {
    try {
        const agendamentos = await prisma.agendamento.findMany({
            include: {
                cliente: true,
                servicos: true
            }
        });

       
        res.json(agendamentos);
    } catch(error) {
        console.error("Erro ao buscar agendamentos: ", error);
        res.status(500).json({error: "Erro ao buscar agendamentos"});
    }
}