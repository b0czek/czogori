import React from "react";
import Papa from "papaparse";

import DaciaImg from "./DaciaImg";
import Cases from "./Cases";
import mocnyAmper from "../assets/sounds/mocnyamper.mp3";
import "../style.css";
import { subscribeAsProp } from "../Appearance";

//#region audio
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
const audioFade = (audio, duration, step) => {
    let interval = (duration * 1000) / Math.ceil(duration / step);
    let i = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = audio.volume > step ? audio.volume - step : 0;
        } else {
            clearInterval(i);
        }
    }, interval);
    return i;
};

const fadeDuration = 1000;
//#endregion audio

const displayableData = ["liczba_przypadkow", "zgony", "liczba_wykonanych_testow"];

class Dacia extends React.Component {
    state = {
        data: {},
        displayedData: 0,
        dataRefreshing: false,
    };

    refreshData = async () => {
        if (this.state.dataRefreshing) {
            return;
        }
        this.setState({ dataRefreshing: true });
        let audio = new Audio(mocnyAmper);
        audio.play();

        let timeout = random(4, 10) * 1000;
        setTimeout(() => audioFade(audio, fadeDuration, 0.05), timeout - fadeDuration);
        setTimeout(() => {
            this.setState({
                dataRefreshing: false,
            });
            audio.pause();
        }, timeout);
        await this.fetchData();
    };

    updateData = (data) => this.setState({ data: data.data[0] });

    async fetchData(completeCallback = this.updateData) {
        let req = await fetch("https://api.dane.gov.pl/1.4/resources/33185,aktualne-dane-dla-wojewodztw");
        let jsondata = await req.json();
        let url = jsondata.data.attributes.link;
        Papa.parse(url, {
            download: true,
            delimiter: ";",
            header: true,
            complete: completeCallback,
        });
    }

    carouselData = () => {
        this.setState({
            displayedData: (this.state.displayedData + 1) % displayableData.length,
        });
    };

    componentDidMount() {
        window.ondragstart = () => false;

        this.fetchData();
    }

    render() {
        console.log(this.props.appearance);
        return (
            <picture>
                <DaciaImg
                    theme={this.props.appearance.theme}
                    onDoubleClick={this.props.appearance.toggleTheme}
                    className={this.state.dataRefreshing ? "chameleon" : ""}
                />
                <div className="logo unselectable" id="logo" onClick={this.refreshData}>
                    &nbsp;
                </div>
                <Cases
                    data={this.state.data}
                    dataRefreshing={this.state.dataRefreshing}
                    displayedData={displayableData[this.state.displayedData]}
                    onClick={this.carouselData}
                />
            </picture>
        );
    }
}

export default subscribeAsProp(Dacia);
