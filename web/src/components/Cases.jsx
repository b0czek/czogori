import CasesIcon from "./CasesIcon";
const formatCases = (cases) => cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const Cases = ({ data, displayedData, dataRefreshing, onClick }) => {
    return (
        <div className="cases centerChildren" onClick={onClick}>
            <div
                className="casesText centerChildren"
                id="cases"
                ref={(el) => el && el.style.setProperty("color", "#000", "important")}
            >
                <div>
                    <CasesIcon icon={displayedData.icon} />
                </div>
                <div className="unselectable">
                    {dataRefreshing ? "-" : formatCases(data[displayedData.name] ?? "-")}
                </div>
            </div>
        </div>
    );
};
export default Cases;
