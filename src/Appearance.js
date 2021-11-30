import React from 'react';
import { createContainer } from 'unstated-next';

const readBrowserTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");


const AppearanceState = () => {
    const [theme, setTheme] = React.useState(localStorage.getItem("mode") ?? readBrowserTheme());

    const toggleTheme = () => {
        console.log('pizda');
        let newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("mode", newTheme);
    };
    return { theme, toggleTheme };
}

const Appearance = createContainer(AppearanceState);

export default Appearance;


// for class components
export const subscribeAsProp = (ClassComponent) =>
    (props) => {
        let container = Appearance.useContainer();
        return (
            <ClassComponent
                {...props}
                appearance={container}
            />
        );
    }