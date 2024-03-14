import Cptec from "../src/services/Cptec";
import api from "../src/services/api";

jest.mock("../src/services/api", () => {
     return {
        get: jest.fn().mockResolvedValue({ data: "response data" }) 
    };
});


describe("Cptec Module", ()=> {
    const cptec = new Cptec();

    test("testing lista cidades", async () => {
        let cidade: string = "Sao Jose";

        await cptec.listaCidades(cidade);

        expect(api.get).toHaveBeenCalledWith(`/listaCidades?city=${cidade.toLocaleLowerCase()}`);
    })

    test("testing previsao", async () => {
        let id: string = '13';

        await cptec.previsao(id);

        expect(api.get).toHaveBeenCalledWith(`/cidade/${id}/previsao.xml`);
    })
})