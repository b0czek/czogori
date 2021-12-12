import Papa from "papaparse";

const apiProvider = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let req = await fetch("https://api.dane.gov.pl/1.4/resources/33185,aktualne-dane-dla-wojewodztw");
            let jsondata = await req.json();
            let url = jsondata.data.attributes.link;
            let data = await (await fetch(url)).text();
            Papa.parse(data, {
                delimiter: ";",
                header: true,
                complete: (data) => resolve(data.data[0]),
                error: reject
            });
        }
        catch (err) {
            return reject(err);
        }
    });
}
export default apiProvider;