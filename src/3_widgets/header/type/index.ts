import { Payload } from "6_shared/types"

export type DashboardHeaderProps = {
    payload: Payload;
}

export type NavuserProfileProps = {
    onClickLogout: () => void;
    user: Payload;
}
