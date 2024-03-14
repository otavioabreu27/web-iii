import { Request, Response, NextFunction } from "express";
import PrevisaoController from "../src/controllers/PrevisaoController";

jest.mock("../src/services/Cptec", () => {
    return jest.fn()
        .mockImplementationOnce(() => {
            return {
                listaCidades: jest.fn().mockImplementation(() => {
                        return "<note><cidade>teste</cidade><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
                    })
            };
        })
        .mockImplementationOnce(() => {
            return {
                listaCidades: jest.fn().mockImplementation(() => {
                        return undefined;
                    })
            }
        })
        .mockImplementationOnce(() => {
            return {
                previsao: jest.fn().mockImplementation(() => {
                        return "<note><cidade>teste</cidade><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
                    })
            };
        })
        .mockImplementationOnce(() => {
            return {
                previsao: jest.fn().mockImplementation(() => {
                        return undefined;
                    })
            }
        });
});

describe("Previsao Controller", () => {
    const previsao = PrevisaoController;

    test("listaCidades - xml valido", async () => {
        const req: Request = {
            params: { cidade: "jacarei" }
        } as unknown as Request;

        const res: Partial<Response> = {
            locals: {},
        };

        const next: NextFunction = jest.fn();

        await previsao.listaCidades(req, res as Response, next);

        expect(res.locals).not.toBeNull();
        expect(next).toHaveBeenCalled();
    });

    test("listaCidades - xml invalido", async () => {
        const req: Request = {
            params: { cidade: "jacarei" }
        } as unknown as Request;

        const res: Partial<Response> = {
            json: jest.fn()
        };

        const next: NextFunction = jest.fn();

        await previsao.listaCidades(req, res as Response, next);
        
        expect(res.json).toHaveBeenCalled();
    });

    test("previsao - xml valido", async () => {
        const req: Request = {} as unknown as Request;

        const res: Partial<Response> = {
            locals: {
                id: "10"
            },
            json: jest.fn()
        };

        await previsao.previsao(req, res as Response);

        expect(res.json).not.toHaveBeenCalledWith({ message: expect.any(TypeError) });
    })

    test("previsao - xml invalido", async () => {
        const req: Request = {} as unknown as Request;

        const res: Partial<Response> = {
            locals: {
                id: "10"
            },
            json: jest.fn()
        };

        await previsao.previsao(req, res as Response);

        expect(res.json).toHaveBeenCalledWith({message: expect.any(TypeError)});
    })
});
