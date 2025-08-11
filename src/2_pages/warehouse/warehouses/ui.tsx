import { Header } from "./header";
import { Body } from "./body";

export const Warehouses = () => {
    return <div>
        <div className="absolute -top-0 right-0">
            <Header />
        </div>
        <div className="my-8 relative">
            <Body />
        </div>
    </div>

}