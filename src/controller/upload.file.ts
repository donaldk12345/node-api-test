import { Request, Response } from "express";

export const upload = async (req: Request, resp: Response) => {
    
    resp.send({
        url:`http://localhost:3000/api/file/${req.file.filename}`
 })
    
}