import Papa from "papaparse";
import axios from "axios";
const apiProvider = (): Promise<Data> => {
    return new Promise(async (resolve, reject) => {
        try {
            let req = await axios.get("https://api.dane.gov.pl/1.4/resources/33185,aktualne-dane-dla-wojewodztw");
            console.log(req.data.data.attributes.link);
            let data = await axios.get(req.data.data.attributes.link);
            Papa.parse(data.data, {
                delimiter: ";",
                header: true,
                complete: (data) => resolve(<Data>data.data[0]),
                error: reject,
            });
        } catch (err) {
            return reject(err);
        }
    });
};

export default apiProvider;

export interface Data {
    wojewodztwo: string;
    liczba_przypadkow: string;
    liczba_na_10_tys_mieszkancow: string;
    zgony: string;
    zgony_w_wyniku_covid_bez_chorob_wspolistniejacych: string;
    zgony_w_wyniku_covid_i_chorob_wspolistniejacych: string;
    liczba_zlecen_poz: string;
    liczba_ozdrowiencow: string;
    liczba_osob_objetych_kwarantanna: string;
    liczba_wykonanych_testow: string;
    liczba_testow_z_wynikiem_pozytywnym: string;
    liczba_testow_z_wynikiem_negatywnym: string;
    liczba_pozostalych_testow: string;
    teryt: string;
    stan_rekordu_na: string;
}
