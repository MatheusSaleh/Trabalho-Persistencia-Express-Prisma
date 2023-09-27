import { Request, Response } from "express";
import {prisma} from "./../database/prisma";

export const getAllServicos = async (req: Request, res: Response) => {
    try{
        const servicos = await prisma.servico.findMany({
            include: {
                agendamento: true,
                veiculos: true
            }
        })
        res.json(servicos);
    } catch(error){
        console.error("Erro ao buscar Serviços: ", error);
        res.status(500).json({error: "Erro ao buscar Serviços"})
    }
};