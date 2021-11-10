const casesDiv = document.querySelector("div#cases");
const dacia = document.querySelector("img.stepway");
const formatCases = (cases) => cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");




let dataRefreshing = false;

const refreshData = async () => {
    if (!dataRefreshing) {
        dataRefreshing = true;
        dacia.classList.add("chameleon");
        setTimeout(() => {
            dacia.classList.remove("chameleon")
            dataRefreshing = false;
        }, 1000);

    }

    casesDiv.innerText = "-";
    await loadData();

}
const logo = document.querySelector("div#logo");
logo.addEventListener("click", refreshData);

const loadData = async () => {
    let req = await fetch("https://api.dane.gov.pl/1.4/resources/33185,aktualne-dane-dla-wojewodztw")
    let jsondata = await req.json();
    let url = jsondata.data.attributes.link
    Papa.parse(url, {
        download: true,
        delimiter: ";",
        header: true,
        complete: (data) => {
            let cases = data.data[0].liczba_przypadkow;
            casesDiv.innerText = formatCases(cases);
        }
    });


}
loadData()


window.ondragstart = () => false

const initLightMode = () => {
    let mode = localStorage.getItem("mode");
    if (mode !== null) {
        document.documentElement.classList.add(mode);
    }
}
const toggleDarkMode = () => {
    let list = document.documentElement.classList;
    if (list.contains("dark") || list.contains("light")) {
        let currState = list.contains("dark") ? "dark" : "light";
        let newState = currState === "dark" ? "light" : "dark";
        list.remove(currState);
        list.add(newState);
    } else {
        list.add(window?.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");
    }
    localStorage.setItem("mode", document.documentElement.classList.contains("dark") ? "dark" : "light");
}
dacia.addEventListener("dblclick", toggleDarkMode);
initLightMode();


if (document.location.href.split('?')[1].includes('sus=1')) {
    dacia.style.content = 'url("daciasusero.png")';
}