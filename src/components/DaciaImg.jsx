import daciaNight from "../assets/imgs/daciasanderonoc.jpg";
import daciaDay from "../assets/imgs/daciasandero.jpg";
import daciaSus from "../assets/imgs/daciasusero.png";

const getImg = (theme) => {
    if (document.location.href.split("?")[1]?.includes("sus=1")) {
        return daciaSus;
    }
    if (theme === "dark") {
        return daciaNight;
    }
    return daciaDay;
};

const DaciaImg = (props) => {
    return (
        <img
            src={getImg(props.theme)}
            alt="Dacia Sandero Stepway"
            draggable="false"
            {...props}
            className={`stepway unselectable ${props.className ?? ""}`}
        />
    );
};

export default DaciaImg;
