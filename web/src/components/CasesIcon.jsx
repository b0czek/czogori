import grave from "../assets/icons/grave.svg";
import virus from "../assets/icons/virus.svg";
import microscope from "../assets/icons/microscope.svg";
const getIcon = (displayedData) => {
    switch (displayedData) {
        case "zgony":
            return grave;
        case "liczba_przypadkow":
            return virus;
        case "liczba_wykonanych_testow":
            return microscope;
        default:
            return null;
    }
};

const CasesIcon = ({ displayedData }) => {
    let icon = getIcon(displayedData);
    if (icon) {
        return (
            <div className="centerChildren unselectable">
                <img src={icon} alt="icon" className="casesIcon" draggable="false" />
            </div>
        );
    }
    return null;
};

export default CasesIcon;
