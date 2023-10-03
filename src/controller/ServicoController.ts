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

export const atualizarSituacaoDoServico = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const servico = await prisma.servico.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if(!servico){
            console.error('Servico não encontrado');
            return;
        }

        const servicoAtualizado = await prisma.servico.update({
            where: {
                id: parseInt(id),
            },
            data: {
                situacao: 'Concluido',
            }
        
            
        })
        res.json(servicoAtualizado);
    } catch(error){
        console.error('Erro ao atualizar situação dos serviço', error)
    }
}

export const deleteServico = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const servico = await prisma.servico.delete({
            where: {
                id: parseInt(id),
            }
        });

        res.json({message: `Serviço excluido com sucesso`});
    } catch(error){
        console.error('Erro ao excluir servico', error);
        res.status(500).json({error: 'Erro ao excluir servico'})
    }
}