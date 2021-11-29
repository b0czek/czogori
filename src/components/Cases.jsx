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
                    <CasesIcon displayedData={displayedData} />
                </div>
                <div className="unselectable">{dataRefreshing ? "-" : formatCases(data[displayedData] ?? "-")}</div>
            </div>
        </div>
    );
};
export default Cases;
