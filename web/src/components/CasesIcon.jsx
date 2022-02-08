const CasesIcon = ({ icon }) => {
    console.log(icon);
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
