import { Request, Response } from "express"
import { prisma } from './../database/prisma';

export const createCliente = async (req: Request, res: Response) => {
    const {nome, email} = req.body;

    const cliente = await prisma.cliente.create({
        data: {nome, email},
    });

    return res.json(cliente);
}

export const getAllClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await prisma.cliente.findMany();

        res.json(clientes);
    } catch (error){
        console.error("Erro ao buscar clientes: ", error);
        res.status(500).json({error:"Erro ao buscar clientes"})
    }
}

export const getClienteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cliente = await prisma.cliente.findUnique({
            where: {id: parseInt(id)},
        });

        if(!cliente){
            return res.status(404).json({error: "Cliente não encontrado"});
        }

        res.json(cliente);

    } catch(error){
        console.error("Erro ao buscar cliente por ID: ", error);
        res.status(500).json({error: "Erro ao buscar cliente por ID"});
    }
}

export const updateCliente = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {nome, email} = req.body;

        const cliente = await prisma.cliente.update({
            where: {id: parseInt(id)},
            data: {nome, email},
        });

        res.json(cliente);
    } catch (error){
        console.error("Erro ao atualizar cliente por ID: ", error);
        res.status(500).json({error: "Erro ao atualizar cliente por ID"});
    }
}

export const deleteCliente = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const cliente = await prisma.cliente.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.json({message: 'Cliente excluido com sucesso'});
    } catch(error){
        console.error('Errro ao excluir cliente: ', error);
        res.status(500).json({error: 'Erro ao excluir cliente'})
    }
};