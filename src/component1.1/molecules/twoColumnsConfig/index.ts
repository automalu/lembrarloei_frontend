import App from "../../../app";
import LayoutColumnsToTabs from "../../layout/columnsToTab";
import style from "./style.module.css";

export default class TwoColumnsConfig extends LayoutColumnsToTabs {
    constructor(app: App, ...child: any[]) {
        super(app);
        this.class(style.container)
        this.setSlides(() => child)
    }
}